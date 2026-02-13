import mongoose from "mongoose";

export const validateId = (res,id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID format",
        });
    }
}