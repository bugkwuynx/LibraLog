import Journal from "../models/journal.model.js";

const addJournal = async (req, res) => {
    const { userName, id } = req.params;
    const { content } = req.body;
    const journal = new Journal({ userName, id, content });
    await journal.save();
    res.status(201).json(journal);
}

const getJournal = async (req, res) => {
    const { userName, id } = req.params;
    const journal = await Journal.find({ userName, id });
    res.status(200).json(journal);
}   

export { addJournal, getJournal };
