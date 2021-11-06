import express from "express";
import {index, encode, decode} from "../controller/controller"

const router = express.Router();

router.get("/", index)
router.post("/encode", encode)
router.post("/decode", decode)

module.exports = router;