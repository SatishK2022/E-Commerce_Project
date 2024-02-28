import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js';
import { verifySignup } from '../middlewares/auth.middleware.js';
const authRouter = express.Router();

authRouter.post('/signup', verifySignup, signup);
authRouter.post('/signin', signin);

export default authRouter;