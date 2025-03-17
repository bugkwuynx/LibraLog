import express from "express";
import { searchBook, addBook, getBooks, deleteBook, updateBook } from "../controllers/book.controller.js";

const router = express.Router();

router.get("/search", searchBook);
router.post("/add/:userName", addBook);
router.get("/:userName", getBooks);
router.delete("/:userName/:id", deleteBook);
router.put("/:userName/:id", updateBook);

export default router;
