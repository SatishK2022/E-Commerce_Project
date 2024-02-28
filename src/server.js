import express from 'express';
import { PORT } from './config/server.config.js';
import { DB_URL } from './config/db.config.js';
import {User} from './models/user.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());


// DB Connection
mongoose.connect(DB_URL)
    .then(() => {
        console.log("✅ Database connected successfully");
        init()
    })
    .catch((err) => {
        console.log("❌ Error connecting to database", err);
    })

// Create an admin user at the starting of the application if not already present
async function init() {
    let user;

    try {
        user = await User.findOne({ userId: "admin" });

        if (user) {
            console.log("Admin is already present")
            return;
        }
    } catch (error) {
        console.log("Error while reading the data", error)
    }

    try {
        user = await User.create({
            name: "Satish",
            userId: "admin",
            email: "sk7399052@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1", 10)
        })

        console.log("Admin Created Successfully", user)
    } catch (error) {
        console.log("Error while creating admin", error)
    }
}


// routes import
import authRouter from './routes/auth.route.js';

// routes decleration
app.use('/api/v1/auth', authRouter)






app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to E-Commerce API"
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})