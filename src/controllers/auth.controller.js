import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Logic to register a user
async function signup(req, res) {
    const { name, userId, email, password, userType } = req.body;

    const userObj = {
        name,
        userId,
        email,
        password,
        userType
    }

    try {
        const user = await User.create(userObj)

        const responseData = { ...user.toObject() }
        delete responseData.password;

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: responseData
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Error While Registering User"
        })
    }
}

async function signin(req, res) {
    const { userId, password } = req.body;

    try {
        const user = await User.findOne({ userId })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const responseData = { ...user.toObject() }
        delete responseData.password;

        const token = user.jwtToken()

        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        })

        return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            data: responseData,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    signup,
    signin
}