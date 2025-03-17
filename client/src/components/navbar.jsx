import {Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const NavigationBar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                Login
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
                Register
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
                sessionStorage.removeItem("token");
                navigate("/login");
            }}>Log out</Button>
        </div>
    );
}

export default NavigationBar;
