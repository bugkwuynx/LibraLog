import React, { useState } from "react";
import { Card, CardHeader, CardActions, CardContent, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        try {
            console.log({email, password})
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            console.log(data);
            if (data.data.token) {
                console.log(`Successfully logged in`);
                sessionStorage.setItem("token", data.token);
                navigate("/dashboard");
            }
            else {
                console.log(`Failed to log in`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card>
                <CardHeader title="Login" />
                <CardContent>
                    <TextField label="Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                </CardContent>
                <CardActions>
                    <Button onClick={handleLogin}>Login</Button>
                </CardActions>                
            </Card>
        </div>
    )
}

export default LoginComponent;
