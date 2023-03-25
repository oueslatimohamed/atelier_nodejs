import Fan from "../models/fan.js";
import { spawn } from "child_process"
import { validationResult } from "express-validator";


export function addFan(req, res) {
    if(!validationResult(req).isEmpty()){
        res.status(400).json({errors:validationResult(req).array()});
      } else {
        Fan.create({
          fullname: req.body.fullname,
          phone: req.body.phone,
          team: req.body.team,
          image : `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
        })
        .then(newFan => {
          res.status(201).json(newFan);
        })
        
        .catch((err) => {
          res.status(500).json({ error: err });
        });
      }
  }

  export function getfanbyteam (req,res) {
    const team = req.params.team;
    Fan.find({team : team})
    .then((fans) => {
        res.status(200).json(fans);
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export function uploadDiagram(req,res) {
  const python = spawn('python', ['script.py', req.file.path]);
  
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(data.toString());
  });
  
  python.stderr.on('data', function (data) {
    console.error('Error from python script ...');
    console.error(data.toString());
  });
  
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send('Done!');
  });
}