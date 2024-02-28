import { User } from "../models/user.model.js";

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

export {
    signup
}