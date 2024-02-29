import express from 'express'
const categoryRoute = express.Router()
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/category.controller.js'
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js'

categoryRoute.post('/', verifyToken, isAdmin, createCategory)
categoryRoute.get('/', verifyToken, isAdmin, getAllCategories)
categoryRoute.post('/:id', verifyToken, isAdmin, updateCategory)
categoryRoute.delete('/:id', verifyToken, isAdmin, deleteCategory)


export default categoryRoute;