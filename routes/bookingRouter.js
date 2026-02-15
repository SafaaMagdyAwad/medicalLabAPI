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
import authDoctor from "../middlewares/authDoctor.js";
import { validate } from "../middlewares/validate.js";
import {
  createBookingValidation,
  ResultValidation,
  updateBookingValidation,
} from "../validations/bookingValidation.js";

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
 *
 *     Booking:
 *       type: object
 *       required:
 *         - patientId
 *         - medicalTests
 *       properties:
 *         patientId:
 *           type: string
 *           example: 698dcaa89188f83c11c7d8ff
 *         doctorId:
 *           type: string
 *           example: 698dcaa89188f83c11c7d8aa
 *         medicalTests:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - 698f85e6c92668546779c886
 *             - 698f6fafeb95bba6244a8582
 *         amountPaid:
 *           type: number
 *           example: 400
 *
 *     BookingResult:
 *       type: object
 *       required:
 *         - testId
 *         - value
 *       properties:
 *         testId:
 *           type: string
 *           description: Medical test ID
 *           example: 698f85e6c92668546779c886
 *         value:
 *           type: number
 *           description: Result numeric value
 *           example: 120
 *         note:
 *           type: string
 *           description: Optional doctor note
 *           example: Within normal range
 *
 *     AddResultsRequest:
 *       type: object
 *       required:
 *         - results
 *       properties:
 *         results:
 *           type: array
 *           description: Full list of test results (will replace existing results)
 *           items:
 *             $ref: "#/components/schemas/BookingResult"
 *           example:
 *             - testId: 698f85e6c92668546779c886
 *               value: 120
 *               note: Normal
 *             - testId: 698f6fafeb95bba6244a8582
 *               value: 90
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
 *             $ref: "#/components/schemas/Booking"
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
bookingRouter.post("/", authStuff, validate(createBookingValidation), createBooking);

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
bookingRouter.get("/", authStuff, getAllBookings);

/**
 * @swagger
 * /api/bookings/patient/{patientId}:
 *   get:
 *     summary: Get bookings for a specific patient
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings for the patient
 */
bookingRouter.get("/patient/:patientId", authStuff, getBookingsByPatient);

/**
 * @swagger
 * /api/bookings/doctor/{doctorId}:
 *   get:
 *     summary: Get bookings for a specific doctor
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings for the doctor
 */
bookingRouter.get("/doctor/:doctorId", authStuff, getBookingsByDoctor);

/**
 * @swagger
 * /api/bookings/id/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 */
bookingRouter.get("/id/:id", authStuff, getBookingById);

/**
 * @swagger
 * /api/bookings/code/{code}:
 *   get:
 *     summary: Get a booking by booking code
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 */
bookingRouter.get("/code/:code", getBookingByCode);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update booking basic info
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Booking"
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
bookingRouter.put("/:id", authStuff, validate(updateBookingValidation), updateBooking);


/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 */
bookingRouter.delete("/:id", authStuff, deleteBooking);

export default bookingRouter;
