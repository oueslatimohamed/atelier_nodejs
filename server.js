import express, { json } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler, notFoundError } from './middlewares/error-handler.js';

import fanRoute from "./routes/fanRoute.js";
import matchRoute from "./routes/matchRoute.js";
import ticketRoute from "./routes/ticketRoute.js";

const app = express();
const port = process.env.PORT || 9090;

const databaseName = 'Examencoteserveur2023sp';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
 //.connect(`mongodb://mongodb:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/img",express.static('public/images'));

app.get('/', function(req,res) {
    res.send("welcome to server")
  });


app.use('/fan', fanRoute);
app.use('/match', matchRoute);
app.use('/ticket', ticketRoute);



app.use(notFoundError)
app.use(errorHandler)


app.listen(port,() =>{
    console.log("localhost:"+ port)
})
   
