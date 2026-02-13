import mongoose from "mongoose";


const MedicalTestsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        hasOffer: {
            type: Boolean,
            default: false,
        },
        offerPrice: {
            type: Number,
        },
        instructions: {
            type: [String],
        },
        // Numeric range for comparison
        normalRange: {
            min: {
                type: Number,
                required: true,
            },
            max: {
                type: Number,
                required: true,
            },
            unit: {
                type: String, // e.g., mg/dL, x10^9/L
                default: "",
            },
        },
    },
);

const MedicalTests = mongoose.model("MedicalTests", MedicalTestsSchema);


export { MedicalTests };
