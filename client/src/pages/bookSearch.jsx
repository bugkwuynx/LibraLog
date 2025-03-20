import { useState } from "react";
import BookComponent from "../components/bookComponent";

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
        <div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {books.map((book, index) => (
                <BookComponent key={book._id || index} book={book} isInLibrary={false} onRemoveBook={() => {}} onAddBook={() => {}} />
            ))}
        </div>
    )
}

export default BookSearch;
