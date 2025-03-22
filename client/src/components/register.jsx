import React, { useState } from "react";
import { Card, CardHeader, CardActions, CardContent, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleRegister = async() => {
        try {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: name, email, password })
            });
            const data = await response.json();
            if (data) {
                console.log(`Successfully registered`);
                navigate("/login");
            }
            else {
                console.log(`Failed to register`);
            }
        }
        catch (error) {
            console.log(error); 
        }
    }

    return (
        <div>
            <Card>
                <CardHeader title="Register" />
                <CardContent>
                    <TextField label="User Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </CardContent>
                <CardActions>
                    <Button onClick={handleRegister}>Register</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default RegisterComponent;