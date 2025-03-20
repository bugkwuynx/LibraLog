import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import BookComponent from "./bookComponent";

const BookDisplayLibrary = () => {
    const [books, setBooks] = useState([]);

    const handleRemoveBook = (book) => {
        setBooks(books.filter((b) => b._id !== book._id));
    }

    const handleAddBook = (book) => {
        setBooks([...books, book]);
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!token) {
            navigate("/login");
            return;
        }
        const getBook = async () => {
            try {
                console.log(user.username);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${user.username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    console.log('Error fetching library');
                }
                const data = await response.json();
                const res = Array.isArray(data) ? data  : [data];
                setBooks(res);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        };
        getBook();
    }, []);

    return (
        <>
            <div>
                {books.map((book) => (
                    <div key={book._id}>
                        <BookComponent book={book} isInLibrary={true} onRemoveBook={handleRemoveBook} onAddBook={handleAddBook} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default BookDisplayLibrary;