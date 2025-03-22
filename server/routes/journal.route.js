import { updateJournal, getJournal } from "../controllers/journal.controller.js";
import express from "express";

const router = express.Router();

router.put("/:userName/:bookId", updateJournal);
router.get("/:userName/:bookId", getJournal);

export default router;
