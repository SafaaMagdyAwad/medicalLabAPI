import Joi from "joi";

/* ================= Reusable Password Schema ================= */
const passwordSchema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base":
      "Password must include uppercase, lowercase, number, and special character",
    "string.empty": "Password is required",
  });

/* ================= Base User Fields ================= */
const baseUserFields = {
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),

  mobile: Joi.string().required().messages({
    "string.empty": "Mobile number is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "string.empty": "Email is required",
  }),
};

/* =================  Register ================= */
export const StuffRegisterValidation = Joi.object({
  ...baseUserFields,
  password: passwordSchema,
  role: Joi.string()
    .valid("doctor","assistant")
    .required()
    .messages({
      "any.only": "Role must be doctor or assistant",
      "string.empty": "Role is required",
    }),
}).options({ allowUnknown: false });

/* ================= Login ================= */
export const StuffLoginValidation = Joi.object({
  email: baseUserFields.email,
  password: passwordSchema,
}).options({ allowUnknown: false });

/* ================= Forgot Password ================= */
export const forgotPasswordValidation = Joi.object({
  email: baseUserFields.email,
}).options({ allowUnknown: false });

/* ================= Reset Password ================= */
export const resetPasswordValidation = Joi.object({
  password: passwordSchema,
}).options({ allowUnknown: false });

/* ================= Create Patient ================= */
export const createPatientValidation = Joi.object({
  name: baseUserFields.name,
  mobile: baseUserFields.mobile,
  email: Joi.string().email().optional().messages({
    "string.email": "Email must be valid",
  }),
}).options({ allowUnknown: false });
