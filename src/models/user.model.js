import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../config/auth.config.js";


// name, userId, email, password, userType
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    }
}, { timestamps: true, versionKey: false })

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    return next();
})

// JWT Token
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this.userId },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        )
    }
}

export const User = mongoose.model("User", userSchema)