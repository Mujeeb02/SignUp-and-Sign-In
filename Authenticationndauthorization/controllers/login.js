const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
            user.token=token;
            // Create an object without sensitive information
            const userWithoutSensitiveInfo = {
                email: user.email,
                id: user._id,
                role: user.role,
                name:user.name,
                token:user.token,
                // Add other non-sensitive properties if needed
            };

            user.token = token;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: userWithoutSensitiveInfo,
                message: "User logged in successfully...",
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error...",
        });
    }
};
