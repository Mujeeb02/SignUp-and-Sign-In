const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is not available...",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token did not match",
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while decoding the token",
        });
    }
};

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== 'Student') {
            return res.status(401).json({
                success: false,
                message: "Sorry, this is a protected route for students...",
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred while validating the route...",
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: "Sorry, this is a protected route for Admin...",
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred while validating the route...",
        });
    }
};
