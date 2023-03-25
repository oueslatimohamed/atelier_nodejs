FROM node:16

LABEL maintainer="COTE SERVEUR <cote.serveur@esprit.tn>"

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

USER node

COPY package*.json ./

RUN npm install --production

COPY . .
EXPOSE 9090

CMD ["node","server.js"]