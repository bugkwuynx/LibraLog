import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        default: "",
        required: true,
    },
}, { timestamps: true });

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
