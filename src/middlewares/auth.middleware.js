import JWT from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth.config.js';
import { User } from '../models/user.model.js';

function verifySignup(req, res, next) {
    try {
        const { name, userId, email, password } = req.body;

        if (!name || !userId || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const isValidEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (!isValidEmail) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }

        next()

    } catch (error) {
        console.log("Error While validating the request body", error);

        return res.status(400).json({
            success: false,
            message: "Error While validating the request body"
        })
    }
}

function verifySignin(req, res, next) {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        next()

    } catch (error) {
        console.log("Error While validating the request body");

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function verifyToken(req, res, next) {
    const token = req.cookies && req.cookies.token

    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Token missing"
            })
        }

        const payload = JWT.verify(token, JWT_SECRET);
        const user = await User.findOne({ userId: payload.id });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User doesn't exist"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error verifying")
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }


}

async function isAdmin(req, res, next) {
    const user = req.user;
    
    if (user && user.userType == "ADMIN") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Unauthorized: Not an Admin"
        })
    } 
}

export {
    verifySignup,
    verifySignin,
    verifyToken,
    isAdmin
}