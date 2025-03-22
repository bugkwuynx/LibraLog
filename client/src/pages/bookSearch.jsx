import { useState } from "react";
import BookComponent from "../components/bookComponent";
import { TextField, Button } from "@mui/material";
const BookSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        const formattedSearchTerm = searchTerm.trim().toLowerCase().replace(/\s+/g, '+');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/search?q=${formattedSearchTerm}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }   
        );
        if (!response.ok) {
            console.log("Error searching for books");
            return;
        }
        const data = await response.json();
        setBooks(data.docs);
    }

    return (
        <div style={{margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <TextField style={{ marginTop: "20px", marginBottom: "20px", width: "500px" }} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button style={{ marginTop: "30px", marginBottom: "20px", width: "100px", marginLeft: "10px" }} onClick={handleSearch} variant="contained" color="primary">Search</Button>
            {books.map((book, index) => (
                <BookComponent style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} key={book._id || index} book={book} isInLibrary={false} onRemoveBook={() => {}} onAddBook={() => {}} />
            ))}
        </div>
    )
}

export default BookSearch;
