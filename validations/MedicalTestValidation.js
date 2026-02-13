import Joi from "joi";

/* ================= Create Medical Test ================= */
export const createMedicalTestValidation = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters",
        }),

    image: Joi.string()
        .uri()
        .optional()
        .messages({
            "string.uri": "Image must be a valid URL",
        }),

    price: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.positive": "Price must be greater than 0",
            "any.required": "Price is required",
        }),

    hasOffer: Joi.boolean().default(false),


    offerPrice: Joi.when("hasOffer", {
        is: true,
        then: Joi.number()
            .positive()
            .less(Joi.ref("price"))
            .required()
            .messages({
                "number.base": "Offer price must be a number",
                "number.less": "Offer price must be less than original price",
                "any.required": "Offer price is required when hasOffer is true",
            }),
        otherwise: Joi.forbidden().messages({
            "any.unknown": "Offer price is not allowed when hasOffer is false",
        }),
    }),

    instructions: Joi.array()
        .items(Joi.string().trim())
        .optional(),
}).options({ allowUnknown: false });


/* ================= Update Medical Test ================= */
export const updateMedicalTestValidation = Joi.object({
    title: Joi.string().trim().min(3).max(100),

    image: Joi.string().uri(),

    price: Joi.number().positive(),

    hasOffer: Joi.boolean(),

    offerPrice: Joi.number()
        .positive()
        .less(Joi.ref("price")),

    instructions: Joi.array().items(Joi.string().trim()),
}).options({ allowUnknown: false });
