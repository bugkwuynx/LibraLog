import { Card, CardHeader, CardContent, Button } from "@mui/material";
import ChangeStatusButton from "./changeStatusButton";
import { useState } from "react";

const BookComponent = ({book, isInLibrary, onRemoveBook, onAddBook}) => {
    const [status, setStatus] = useState(book.status);
    const [inLibrary, setInLibrary] = useState(isInLibrary);

    const handleChangeStatus = (status) => {
        console.log(status);
        setStatus(status);
    }

    const handleAddToLibrary = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (inLibrary) {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${user.username}/${book._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                console.log("Error removing book from library");
                return false;
            }
            onRemoveBook(book);
            return true;
        }
        else {
            try {   
                console.log(book);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/add/${user.username}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(book)
                });
                console.log(response);
                if (!response.ok) {
                    console.log("Error adding book to library");
                    return false;
                }
                onAddBook(book);
                return true;
            } catch (error) {
                console.log("Error adding book to library", error);
                return false;
            }
        }
    }

    const handleAddToJournal = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/journals/add/${user.username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({book})
        });
        if (!response.ok) {
            console.log("Error adding book to journal");
            return false;
        }
        onAddBook(book);
        return true;
    }

    return (
        <Card>
            <img src={`${import.meta.env.VITE_BOOK_COVER_URL}${book.cover_edition_key}.jpg`} alt={book.title} style={{width: 100, height: 150}}/>
            <CardHeader title={book.title} subheader={book.author_name} />
            <CardContent>
                <Button variant="contained" color="primary" onClick={handleAddToLibrary}>
                    {inLibrary ? "Remove" : "Add"}
                </Button>
                {inLibrary && <ChangeStatusButton book={book} status={status} onChangeStatus={handleChangeStatus} />}
            </CardContent>
        </Card>
    );
}

export default BookComponent;