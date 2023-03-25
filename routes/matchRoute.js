import express from "express";
import { body } from "express-validator";
import { addMatch, editDateMatch, getAllMatch } from "../controllers/matchController.js";

const router = express.Router();

router
.route("/matchs")
.post(
    body("date").isLength({ min: 5}),
    body("teamHome").isLength({ min: 2 }),
    body("teamAway").isLength({ min: 2 }),
    body("nbPlaces").isNumeric(),
    addMatch
);

router
.route("/matchs")
.get(getAllMatch);

router
.route("/matchs/:id")
.patch(
    body("date").isLength({ min: 5}),
    editDateMatch);

export default router;