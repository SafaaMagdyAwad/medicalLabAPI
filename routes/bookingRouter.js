import express from "express";
import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBookingByCode,
    getBookingById,
    getBookingsByDoctor,
    getBookingsByPatient,
    updateBooking,
 
} from "../controllers/bookingController.js";
import authStuff from "../middlewares/authStuff.js";
import { validate } from "../middlewares/validate.js";
import { createBookingValidation, updateBookingValidation } from "../validations/bookingValidation.js";


const bookingRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management endpoints
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Bookings:
 *       type: object
 *       required:
 *         - patientId
 *         - medicalTests
 *       properties:
 *         patientId:
 *           type: string
 *           example: 698dcaa89188f83c11c7d8ff
 *         medicalTests:
 *           type: array
 *           example: [698f85e6c92668546779c886 ,698f6fafeb95bba6244a8582]
 *         amountPaid:
 *           type: number
 *           example: 400
 */


/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Bookings"
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
bookingRouter.post("/", authStuff,validate(createBookingValidation), createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings (doctor or assistant)
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 */
bookingRouter.get("/",authStuff, getAllBookings);

/**
 * @swagger
 * /api/bookings/patient/{patientId}:
 *   get:
 *     summary: Get bookings for a specific patient (doctor or assistant)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: List of bookings for the patient
 */
bookingRouter.get("/patient/:patientId",authStuff , getBookingsByPatient);

/**
 * @swagger
 * /api/bookings/doctor/{doctorId}:
 *   get:
 *     summary: Get bookings for a specific doctor (doctor or assistant)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: true
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: List of bookings for the doctor
 */
bookingRouter.get("/doctor/:doctorId",authStuff , getBookingsByDoctor);

/**
 * @swagger
 * /api/bookings/id/{id}:
 *   get:
 *     summary: Get a booking by ID (doctor or assistant)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 */
bookingRouter.get("/id/:id",authStuff, getBookingById);

/**
 * @swagger
 * /api/bookings/code/{code}:
 *   get:
 *     summary: Get a booking by booking code (anyone)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking code
 *     responses:
 *       200:
 *         description: Booking details
 */
bookingRouter.get("/code/:code", getBookingByCode);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update a booking by ID (doctor or assistant)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Bookings"
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
bookingRouter.put("/:id",authStuff,validate(updateBookingValidation), updateBooking);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID (doctor or assistant)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 */
bookingRouter.delete("/:id",authStuff, deleteBooking);

export default bookingRouter;
