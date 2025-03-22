import React, { useState, useEffect } from "react";
import { Dialog, Card, CardHeader, CardContent, TextField, Button } from "@mui/material";

const JournalComponent = ({book, isOpen, handleClose}) => {
    const [journal, setJournal] = useState(book.journal);

    useEffect(() => {
        const fetchJournal = async () => {
            console.log(book._id);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/journals/${book.username}/${book._id}`);
            if (!response.ok) {
                console.log("Error fetching journal");
                return;
            }
            const data = await response.json();
            console.log(data);
            setJournal(data);
        };
        if (isOpen) {
            fetchJournal();
        }
    }, [book._id, isOpen]);

    const handleSave = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/journals/${book.username}/${book._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({content: journal})
            });
            if (!response.ok) {
                console.log("Error saving journal");
                return;
            }
            handleClose();
        }
        catch (error) {
            console.error("Error saving journal", error);
        }
    };
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Card style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "500px"}}>
                <CardHeader title="Journal" />
                <CardContent style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <TextField style={{width: "400px"}} multiline rows={10} label="Content" value={journal} onChange={(e) => setJournal(e.target.value)} />
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                </CardContent>
            </Card>
        </Dialog>
    );
};

export default JournalComponent;
