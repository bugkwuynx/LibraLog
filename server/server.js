import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authenticationRoutes from "./routes/authentication.route.js";
import bookRoutes from "./routes/book.route.js";
import journalRoutes from "./routes/journal.route.js";

dotenv.config();

const app = express();

app.use(cors());    

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api/auth", authenticationRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/journals", journalRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



