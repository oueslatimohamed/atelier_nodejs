import Match from "../models/match.js";

import { validationResult } from "express-validator";


export function addMatch(req, res) {
    if(!validationResult(req).isEmpty()){
        res.status(400).json({errors:validationResult(req).array()});
      } else {
        Match.create({
          date: req.body.date,
          teamHome: req.body.teamHome,
          teamAway: req.body.teamAway,
          nbPlaces: req.body.nbPlaces
        })
        .then(newMatch => {
          res.status(201).json(newMatch);
        })
        
        .catch((err) => {
          res.status(500).json({ error: err });
        });
      }
  }

  export function getAllMatch (req,res) {
    Match.find()
    .then((matchs) => {
        res.status(200).json(matchs);
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export function editDateMatch(req, res) {
    if(!validationResult(req).isEmpty()){
        res.status(400).json({errors:validationResult(req).array()});
    } else {
        Match.findByIdAndUpdate(req.params.id, req.body)
        .then((doc1) => {
            Match.findById(req.params.id)
            .then((doc2) => {
                res.status(200).json(doc2);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
    }
  }