import express from "express";
import { body } from "express-validator";
import multer from '../middlewares/multer.js';
import { addFan, getfanbyteam, uploadDiagram } from "../controllers/fanController.js";
const router = express.Router();

router
.route("/fans")
.post(
    multer,
    body("fullname").isLength({ min: 5,max:50}),
    body("team").isLength({ min: 2,max:100}),
    body("phone").isNumeric().isLength({min:8,max:8}),
    addFan
)

router
.route("/fans/:team")
.get(getfanbyteam);

router
.route("/upload")
.post(multer,uploadDiagram)

export default router;