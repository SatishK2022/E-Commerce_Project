import express from 'express'
const categoryRoute = express.Router()
import { createCategory } from '../controllers/category.controller.js'
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js'

categoryRoute.post('/', verifyToken, isAdmin, createCategory)



export default categoryRoute