import { Doctor, Assistant } from "../moules/Users.js";
import { generateToken } from "../utils/generateToken.js";
import { randomBytes, createHash } from "crypto";
import sendEmail from "../utils/sendEmail.js";


export const register = async (req, res) => {
    try {
        const { name, email, password, mobile, role } = req.body;
        if (!name || !email || !password || !mobile || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if email exists for any staff
        const existingStaff = await Doctor.findOne({ email }) || await Assistant.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: "Email already exists, please use another one" });
        }

        let staff;
        if (role === "doctor") {
            staff = await Doctor.create({ name, email, password, mobile });
        } else if (role === "assistant") {
            staff = await Assistant.create({ name, email, password, mobile });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        return res.status(201).json({ message: "Registered successfully", staff });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find staff by email (either Doctor or Assistant)
        const staff = await Doctor.findOne({ email }).select("+password")
            || await Assistant.findOne({ email }).select("+password");

        if (!staff) return res.status(404).json({ message: "Staff not found" });

        const isMatch = await staff.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token = generateToken(staff._id, staff.role);
        return res.status(200).json({ message: "Login successful", staff, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const staff = await Doctor.findOne({ email }) || await Assistant.findOne({ email });
        if (!staff) {
            return res.status(404).json({ message: "Email is not connected to any account" });
        }

        // Generate reset token
        const resetToken = randomBytes(32).toString("hex");
        staff.resetPasswordToken = createHash("sha256").update(resetToken).digest("hex");
        staff.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await staff.save();

        const resetUrl = `${process.env.FRONT_URL}/reset-password/${resetToken}`;

        await sendEmail({
            to: staff.email,
            subject: "اعد ضبط كلمة المرور",
            html: `
        <h2>اعاده ضبط كلمة المرور</h2>
        <p>اضغط على الرابط بالاسفل لاعاده تعيين كلمة المرور:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>سيتم تعطيل الرابط خلال 10 دقائق.</p>
      `,
        });

        res.json({
            message: "If this email exists, a reset link has been sent",
            token: resetToken // only for testing, remove in production
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                message: "Password Is required"
            });
        }

        const hashedToken = createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const stuff = await Doctor.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        }) || await Assistant.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!stuff) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        // password will be hashed by pre-save hook
        stuff.password = password;
        stuff.resetPasswordToken = undefined;
        stuff.resetPasswordExpire = undefined;

        await stuff.save();

        res.status(200).json({
            message: "Password reset successful"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
