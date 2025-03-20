import Journal from "../models/journal.model.js";

const addJournal = async (req, res) => {
    try {
        const { userName, bookId } = req.params;
        const { content } = req.body;
        const journal = new Journal({ bookId, userName, content });
        await journal.save();
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getJournal = async (req, res) => {
    const { userName, bookId } = req.params;
    const journal = await Journal.find({ userName, bookId });
    res.status(200).json(journal);
}   

export { addJournal, getJournal };
