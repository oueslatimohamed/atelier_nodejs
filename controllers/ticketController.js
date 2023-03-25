import Ticket from "../models/ticket.js";
import Fan from '../models/fan.js';
import Match from '../models/match.js';


export function buyTicket(req, res) {
  Match.findById(req.params.matchId)
    .then((match) => {
      if (match.nbPlaces > 0) {
        Fan.findById(req.params.fanId)
          .then((fan) => {
            if (fan.team == match.teamHome || fan.team == match.teamAway) {
              Ticket.create({
                fanId: req.params.fanId,
                matchId: req.params.matchId,
              })
                .then((ticket) => {
                  Match.findByIdAndUpdate(req.params.matchId, {
                    nbPlaces: match.nbPlaces - 1,
                  })
                  .then((doc2) => {
                    res.status(200).json(ticket);
                  })
                    .catch((err) => {
                      res.status(500).json({ error: err });
                    });
                })
                .catch((err) => {
                  res.status(500).json({ error: err });
                });
            } else {
              res.status(403).json({ message: "Not a fan !" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      } else {
        res.status(403).json({ message: "No free place !" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function buytickets (req,res) {
    try {
        const match = await Match.findById(req.params.matchId);
        const fan = await Fan.findById(req.params.fanId);
        console.log(fan);
        if(match.nbPlaces > 0) {
            if(fan.team == match.teamHome || fan.team == match.teamAway){
                const ticket =  await Ticket.create({
                    fanId: req.params.fanId,
                    matchId: req.params.matchId,
                  });
                match.nbPlaces = match.nbPlaces - 1;
                await match.save();
            }else {
              return res.status(403).json({ message: "Not a fan !" });
            }
            
        }else{
            return res.status(403).json({ message: "No free place !" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }

}

export function getticketbyfan (req,res) {
    const fanId = req.params.fanId;
    Ticket.find({fanId : fanId})
    .then((tickets) => {
        res.status(200).json(tickets);
    })
    .catch((err) => {
        res.status(500).json({error : err});
    })
}

export function testMethode (req,res) {
    res.status(200).json({message : "hello"});
}