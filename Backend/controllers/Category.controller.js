import { handleError } from "../helpers/handleError.js"
import Category from "../models/category.model.js"

export const addCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body
        const category = new Category({
            name, slug
        })

        await category.save()

        res.status(200).json({
            success: true,
            message: 'Category added successfully.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const showCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        const category = await Category.findById(categoryid)
        if (!category) {
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const updateCategory = async (req, res, next) => {
    try {
        const { name, slug } = req.body
        const { categoryid } = req.params
        const category = await Category.findByIdAndUpdate(categoryid, {
            name, slug
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Category updated successfully.',
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryid } = req.params
        await Category.findByIdAndDelete(categoryid)
        res.status(200).json({
            success: true,
            message: 'Category Deleted successfully.',
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find().sort({ name: 1 }).lean().exec()
        res.status(200).json({
            category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}




//----------------------------------------------------------------------------------------------------------------------------------------------------

// import { handleError } from "../helpers/handleError.js"
// import Category from "../models/category.model.js"

// export const addCategory = async (req, res, next) => {
//     console.log("📥 Incoming request to /api/category/add")

//     try {
//         console.log("📝 Request body received:", req.body)

//         const { name, slug } = req.body

//         // Check if fields are missing
//         if (!name || !slug) {
//             console.warn("⚠️ Missing 'name' or 'slug' in request body.")
//             return next(handleError(400, "Both name and slug are required."))
//         }

//         // Log before attempting to save
//         console.log("💾 Attempting to save category:", { name, slug })

//         const category = new Category({ name, slug })

//         const savedCategory = await category.save()

//         console.log("✅ Category saved to DB:", savedCategory)

//         res.status(200).json({
//             success: true,
//             message: "Category added successfully.",
//         })

//     } catch (error) {
//         console.error("🔥 Error while saving category:", error)
//         next(handleError(500, error.message))
//     }
// }


// export const addCategory = async (req, res, next) => {
//     console.log("📥 Incoming request to /api/category/add");

//     // 👇 REMOVE try/catch
//     const { name, slug } = req.body;

//     if (!name || !slug) {
//         throw new Error("Both name and slug are required.");
//     }

//     const category = new Category({ name, slug });
//     const savedCategory = await category.save();

//     res.status(200).json({
//         success: true,
//         message: "Category added successfully.",
//         category: savedCategory,
//     });
// };


// export const showCategory = async (req, res, next) => {
//     try {
//         const { categoryid } = req.params
//         const category = await Category.findById(categoryid)
//         if (!category) {
//             next(handleError(404, 'Data not found.'))
//         }
//         res.status(200).json({
//             category
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const updateCategory = async (req, res, next) => {
//     try {
//         const { name, slug } = req.body
//         const { categoryid } = req.params
//         const category = await Category.findByIdAndUpdate(categoryid, {
//             name, slug
//         }, { new: true })

//         res.status(200).json({
//             success: true,
//             message: 'Category updated successfully.',
//             category
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const deleteCategory = async (req, res, next) => {
//     try {
//         const { categoryid } = req.params
//         await Category.findByIdAndDelete(categoryid)
//         res.status(200).json({
//             success: true,
//             message: 'Category Deleted successfully.',
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
// export const getAllCategory = async (req, res, next) => {
//     try {
//         const category = await Category.find().sort({ name: 1 }).lean().exec()
//         res.status(200).json({
//             category
//         })
//     } catch (error) {
//         next(handleError(500, error.message))
//     }
// }
