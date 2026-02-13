import { Booking } from "../moules/bookings.js";
import { MedicalTests } from "../moules/MeidcalTests.js";
import { generateBookingCode } from "../utils/generateBookingCode.js";
import { validateId } from "../utils/validateId.js";


export const createBooking = async (req, res) => {
    try {
        const { patientId, doctorId, medicalTests, amountPaid } = req.body;

        if (!patientId || !medicalTests || !Array.isArray(medicalTests) || medicalTests.length === 0) {
            return res.status(400).json({
                message: "patientId and medicalTests are required and medicalTests must be a non-empty array"
            });
        }

        // Calculate totalPrice from MedicalTests collection
        let totalPrice = 0;

        for (const test of medicalTests) {
            const item = await MedicalTests.findById(test);
            if (!item) {
                return res.status(404).json({ message: `Medical test with id ${test} not found` });
            }
            // Optionally overwrite the price from DB
            totalPrice += item.price;
        }
        // generate booking code 
        const bookingCode = generateBookingCode();

        const booking = await Booking.create({
            patientId,
            doctorId,
            medicalTests,
            bookingCode,
            totalPrice,
            amountPaid,
            amountRemaining: totalPrice - (amountPaid || 0)
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error", error: e.message });
    }
};

// ================= GET ALL BOOKINGS =================
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("patientId", "name email mobile")
            .populate("doctorId", "name email mobile")
            .populate("medicalTests", "title price");

        res.status(200).json({ message: "Success", bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ================= GET BOOKINGS BY PATIENT =================
export const getBookingsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        validateId(res, patientId);

        const bookings = await Booking.find({ patientId })
            .populate("medicalTests", "title price");

        res.status(200).json({ message: "Success", bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ================= GET BOOKINGS BY DOCTOR =================
export const getBookingsByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        validateId(res, doctorId);


        const bookings = await Booking.find({ doctorId })
            .populate("patientId", "name email mobile")
            .populate("medicalTests", "title price");

        res.status(200).json({ message: "Success", bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ================= GET BOOKING BY ID =================
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        validateId(res, id);


        const booking = await Booking.findById(id)
            .populate("patientId", "name email mobile")
            .populate("doctorId", "name email mobile")
            .populate("medicalTests", "title price");

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json({ message: "Success", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ================= GET BOOKING BY CODE =================
export const getBookingByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const booking = await Booking.findOne({ bookingCode: code })
            .populate("patientId", "name email mobile")
            .populate("doctorId", "name email mobile")
            .populate("medicalTests", "title price");

        if (!booking) return res.status(404).json({ message: "Booking not found" });
        if (booking.amountRemaining != 0) {
            res.status(300).json({ message: "you have to pay first" });
        }
        res.status(200).json({ message: "Success", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ================= UPDATE BOOKING =================
export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        validateId(res, id);

        const updateData = req.body;
        console.log(updateData);

        // Update amountRemaining if amountPaid or totalPrice changes
        if (updateData.amountPaid !== undefined || updateData.totalPrice !== undefined) {
            const existing = await Booking.findById(id);
            if (existing) {
                const newTotal = updateData.totalPrice ?? existing.totalPrice;
                const newPaid = updateData.amountPaid ?? existing.amountPaid;
                updateData.amountRemaining = newTotal - newPaid;
            }
        }

        const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json({ message: "Booking updated successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ================= DELETE BOOKING =================
export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        validateId(res, id);

        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json({ message: "Booking deleted successfully", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};