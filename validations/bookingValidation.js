import Joi from "joi";
import mongoose from "mongoose";

// Custom validation for ObjectId
const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

export const createBookingValidation = Joi.object({
    patientId: Joi.string().custom(objectId, "ObjectId validation").required()
        .messages({
            "any.required": "patientId is required",
            "any.invalid": "patientId must be a valid MongoDB ObjectId"
        }),
    doctorId: Joi.string().custom(objectId, "ObjectId validation").optional()
        .messages({
            "any.invalid": "doctorId must be a valid MongoDB ObjectId"
        }),
    medicalTests: Joi.array().items(
        Joi.string().custom(objectId, "ObjectId validation").required()
            .messages({
                "any.required": "Medical test ID is required",
                "any.invalid": "Medical test ID must be a valid MongoDB ObjectId"
            }),
    ).min(1).required()
        .messages({
            "any.required": "medicalTests array is required",
            "array.min": "At least one medical test must be provided"
        }),
    bookingCode: Joi.string().optional(),
    amountPaid: Joi.number().min(0).optional()
});
export const updateBookingValidation = Joi.object({
    patientId: Joi.string().custom(objectId, "ObjectId validation").optional()
        .messages({
            "any.invalid": "patientId must be a valid MongoDB ObjectId"
        }),
    doctorId: Joi.string().custom(objectId, "ObjectId validation").optional()
        .messages({
            "any.invalid": "doctorId must be a valid MongoDB ObjectId"
        }),
    medicalTests: Joi.array().items(
        Joi.string().custom(objectId, "ObjectId validation").optional()
            .messages({
                "any.invalid": "Medical test ID must be a valid MongoDB ObjectId"
            }),
    ).optional().messages({
        "array.min": "At least one medical test must be provided if updating medicalTests"
    }),
    bookingCode: Joi.string().optional(),
    totalPrice: Joi.number().min(0).optional(),
    amountPaid: Joi.number().min(0).optional(),
    results: Joi.array().items(
        Joi.object({
            testId: Joi.string().required(),
            value: Joi.number().required(),
            note: Joi.string().optional()
        })
    ).optional()
});

