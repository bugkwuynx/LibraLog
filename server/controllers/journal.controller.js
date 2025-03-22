import Book from "../models/book.model.js";

const updateJournal = async (req, res) => {
    try {
        const { userName, bookId } = req.params;
        const { content } = req.body;
        const book = await Book.findOneAndUpdate({ username: userName, _id: bookId }, { journal: content }, { new: true });
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getJournal = async (req, res) => {
    const { userName, bookId } = req.params;
    const book = await Book.findOne({ username: userName, _id: bookId });
    res.status(200).json(book.journal);
}   

export { updateJournal, getJournal };
