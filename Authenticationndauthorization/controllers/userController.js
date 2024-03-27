const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.userHandler = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const checkExist = await User.find({ email });

        if (checkExist.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            success: true,
            data: result,
            message: "Data inserted successfully...",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server did not respond...",
        });
    }
};
