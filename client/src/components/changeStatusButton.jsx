import { Button } from "@mui/material";
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { useState } from "react";

const ChangeStatusButton = ({book, status, onChangeStatus}) => {
    const [newStatus, setNewStatus] = useState(status);
    const handleChange = async (e) => {
        const updatedStatus = e.target.value;
        setNewStatus(updatedStatus);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${book.userName}/${book._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    status: updatedStatus
                })
            });
            if (!response.ok) {
                console.log("Error changing status");
                return false;
            }
            onChangeStatus(updatedStatus);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    return (
        <FormControl style={{minWidth: 120}}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select label="Status" labelId="status-label" value={newStatus} onChange={handleChange}>
                <MenuItem value="to read">To Read</MenuItem>
                <MenuItem value="reading">Reading</MenuItem>
                <MenuItem value="finished">Finished</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ChangeStatusButton;
