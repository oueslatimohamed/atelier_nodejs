import cv2
import pytesseract
import re
import json


print("test")
# Get the path of the uploaded image from the command line arguments
image_path = sys.argv[1]

# Load the UML class diagram image using OpenCV
img = cv2.imread(image_path)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Convert the image to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply thresholding to binarize the image
thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
#kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1,1))
#thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=1)
#thresh = cv2.medianBlur(thresh, 3)

# Apply OCR to recognize text in the image
text = pytesseract.image_to_string(thresh, config="--psm 12")

# Split the text into lines
lines = text.split('\n')

# Initialize variables to hold class and attribute information
class_name = ''
attributes = []
output = []
class_data = []

#print(lines)
# Iterate over each line
for line in lines:
    # Check if the line matches the pattern for a UML class name
    if re.match(r'^[A-Z][a-zA-Z0-9_]{2,}$', line) and not re.match(r'^[A-Z][a-zA-Z0-9_]+\s*\(', line):
        # If we've already processed a class, add its attributes to the output list
        if class_name != '':
            # Skip classes with no attributes
            if len(attributes) > 0:
                # Format the class and its attributes
                class_data.append({'classname': class_name, 'attributes': attributes})
                output.append(class_data)
                # Reset the attributes list
                attributes = []
        # Store the name of the current class
        class_name = line
    else:
        # Check if the line matches the pattern for a UML attribute
        #match = re.match(r'^\s*[+-]\s*([a-zA-Z_][a-zA-Z0-9_]*):\s*([a-zA-Z_][a-zA-Z0-9_]*(\[\])?)', line)
        match = re.match(r'^\s*[+-]\s*(\w+)\s*:\s*(\w+)', line)
        if match:
            # Store the name and type of the attribute
            groups = match.groups()
            if len(groups) >= 2:
                attribute_name, attribute_type = groups[:2]
                #attributes.append('{}: {}'.format(attribute_name.strip(), attribute_type.strip()))
                attributes.append({'name':attribute_name.strip(),'type' : attribute_type.strip()})

# If there is a class and attributes remaining, add them to the output list
if class_name != '':
    class_data.append({'classname': class_name, 'attributes': attributes})

# Convert the list of classes to JSON format
json_data = json.dumps({"classes" : class_data},indent=2)

# Print the JSON data
print(json_data)
# Send the JSON string to the Node.js server using a HTTP POST request
import requests

url = 'http://localhost:9090/generate/ocr-data'
headers = {'Content-Type': 'application/json'}
response = requests.post(url, data=json_data,headers=headers)

# Print the response from the server
print(response)
