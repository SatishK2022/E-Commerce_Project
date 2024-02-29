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

async function getAllCategories(req, res) {
    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "No categories found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        })
    } catch (error) {
        console.log("Error fetching categories")
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

async function updateCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }

        category.name = name;
        category.description = description;

        await category.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        })

    } catch (error) {
        console.log("Error Updating Category");
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

async function deleteCategory(req, res) {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }

        await category.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        })

    } catch (error) {
        console.log("Error Deleting Category");
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}