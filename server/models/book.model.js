import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    cover_i: {
        type: String,
        required: true,
    },
    cover_edition_key: {
        type: String,
        required: true,
    },
    has_fulltext: {
        type: Boolean,
        required: true,
    },
    edition_count: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author_name: {
        type: String,
        required: true,
    },
    first_publish_year: {
        type: Number,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    author_key: {
        type: String,
        required: true,
    },
    public_scan_b: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        enum: ["to read", "reading", "finished"],
        default: "to read",
    },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

export default Book;

