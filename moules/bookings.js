import mongoose from "mongoose";
import { Patient, Doctor } from "./Users.js";
import { MedicalTests } from "./MeidcalTests.js";
const bookingSchema = new mongoose.Schema(
    {

        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
        },
        medicalTests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MedicalTests",
                required: true,
            }
        ],
        totalPrice: {
            type: Number,
            min: 0,
        },
        bookingCode: {
            type: String,
            unique: true, // unique booking identifier
        },
        amountPaid: {
            type: Number,
            default: 0,
            min: 0,
        },
        amountRemaining: {
            type: Number,
            default: function () {
                return this.totalPrice - this.amountPaid;
            },
            min: 0,
        },
        results: [
            {
                testId: { type: mongoose.Schema.Types.ObjectId, ref: "MedicalTests", required: true },
                value: { type: Number, required: true },
                note: { type: String }, // optional remarks
            }
        ],
    },
    { timestamps: true } // adds createdAt and updatedAt
);

export const Booking = mongoose.model("Booking", bookingSchema);
