import { addJournal, getJournal } from "../controllers/journal.controller.js";
import express from "express";

const router = express.Router();

router.post("/:userName/:bookId", addJournal);
router.get("/:userName/:bookId", getJournal);

export default router;
