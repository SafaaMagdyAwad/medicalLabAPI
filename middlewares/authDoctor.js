import jwt from "jsonwebtoken";
import { Doctor } from "../moules/Users.js";

const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findById(decoded.id);

    if (!doctor)
      return res.status(401).json({ message: "Unauthorized" });

    req.user = doctor;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authDoctor;
