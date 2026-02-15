import express from "express";
import authDoctor from "../middlewares/authDoctor.js";
import { validate } from "../middlewares/validate.js";
import { ResultValidation } from "../validations/bookingValidation.js";
import { AddResult } from "../controllers/resultController.js";


const resultRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: Result management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
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
 * /api/results/{id}:
 *   put:
 *     summary: Replace all booking results (doctor only)
 *     tags: [Results]
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
 *             $ref: "#/components/schemas/AddResultsRequest"
 *     responses:
 *       200:
 *         description: Results replaced successfully
 */
resultRouter.put("/:id", authDoctor, validate(ResultValidation), AddResult);


export default resultRouter;
