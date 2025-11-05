import express from "express";
import { handleParseRequest } from "../controllers/parseController.js";

const router = express.Router();

router.post("/", handleParseRequest);

export default router;
