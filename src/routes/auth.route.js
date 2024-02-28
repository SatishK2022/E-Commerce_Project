import express from 'express'
import { signup } from '../controllers/auth.controller.js';
import { verifySignup } from '../middlewares/auth.middleware.js';
const authRouter = express.Router();

authRouter.post('/signup', verifySignup, signup);

export default authRouter;