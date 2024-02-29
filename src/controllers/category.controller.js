import { Category } from "../models/category.model.js";

async function createCategory(req, res) {
    const { name, description } = req.body;

    try {
        const category = await Category.create({
            name,
            description
        })

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        })
    } catch (error) {
        console.log("Error creating category")
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            })
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export {
    createCategory,
}