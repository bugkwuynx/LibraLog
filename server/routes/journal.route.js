import { addJournal, getJournal } from "../controllers/journal.controller.js";
import express from "express";

const router = express.Router();

router.post("/:userName/:id", addJournal);
router.get("/:userName/:id", getJournal);

export default router;
