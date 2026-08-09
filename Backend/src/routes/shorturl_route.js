import express from "express";
import { createShortUrl } from "../controller/short_url_controller.js";
const router = express.Router();

router.post("/",createShortUrl)

export default router;