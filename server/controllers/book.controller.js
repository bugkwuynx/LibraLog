import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const searchBook = async (req, res) => {
    try {
        const input = req.query.q;
        if (!input) {
            return res.status(400).json({ message: "Input is required" });
        }
        const apiURL = `${process.env.OPEN_LIBRARY_URL}/search.json?q=${input}`;
        const response = await axios.get(apiURL);
        const result = response.data;
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addBook = async (req, res) => {
    try {
        const newBook = {
            username: req.params.username,
            title: req.body.title,
            author_name: req.body.author_name[0],
            cover_i: req.body.cover_i,
            cover_edition_key: req.body.cover_edition_key,
            has_fulltext: req.body.has_fulltext,
            edition_count: req.body.edition_count,
            first_publish_year: req.body.first_publish_year,
            key: req.body.key,
            author_key: req.body.author_key[0],
            public_scan_b: req.body.public_scan_b,
        };
        console.log(newBook);
        const book = new Book(newBook);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error(req.body);
        res.status(500).json({ message: error.message });
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({ userName: req.params.userName });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        const { userName, id } = req.params;
        console.log(userName, id);
        await Book.findOneAndDelete({ userName, _id: id });
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBook = async (req, res) => {
    try {
        const { userName, id } = req.params;
        const status = req.body.status;
        await Book.findOneAndUpdate({ userName, _id: id }, { status });
        res.status(200).json({ message: "Book updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { searchBook, addBook, getBooks, deleteBook, updateBook };
