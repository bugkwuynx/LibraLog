import express from "express";
import { searchBook, addBook, getBooks, deleteBook, updateBook } from "../controllers/book.controller.js";

const router = express.Router();

router.get("/search", searchBook);
router.post("/add/:username", addBook);
router.get("/:username", getBooks);
router.delete("/:username/:id", deleteBook);
router.put("/:username/:id", updateBook);

export default router;
