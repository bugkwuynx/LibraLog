import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {v4 as uuidv4} from "uuid";

// Register a new user
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({
            message: "User already exists",
        });
        return;
    }
    bcrypt.hash(password, 10)
        .then((hash) => {
            const user = new User({
                username,
                email,
                password: hash,
            });
            user.save();
            res.status(201).json({
                message: "User created successfully",
                data: user,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                data: err,
            });
        });
});

// Login a user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let getUser;

    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
    getUser = user;
    console.log(getUser);
    return bcrypt.compare(password, getUser.password)
        .then((isMatch) => {
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }
            const jwtToken = jwt.sign({
                userId: getUser._id,
                email: getUser.email,
            }, 
            process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({
                message: "Login successful",
                data: {
                    token: jwtToken,
                    user: getUser,
                }
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                data: err,
            });
        });
});

// logout a user
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Logout successful",
    });
});

export { register, login, logout };
