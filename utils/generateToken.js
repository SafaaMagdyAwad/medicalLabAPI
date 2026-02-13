import jwt from "jsonwebtoken";
export const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRES_IN || "7d" }
    );
};