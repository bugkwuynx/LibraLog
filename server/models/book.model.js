import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["reading", "finished", "want to read"],
        required: true,
    },
    cover: {
        type: String,
        default: "https://via.placeholder.com/150",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

export default Book;

