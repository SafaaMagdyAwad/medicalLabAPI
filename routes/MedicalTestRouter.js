import express from 'express';
import { createOne, deleteOne, getAll, getById, updateOne } from '../controllers/MedicalTestController.js';
import { validate } from '../middlewares/validate.js';
import { createMedicalTestValidation } from '../validations/MedicalTestValidation.js';
import authDoctor from '../middlewares/authDoctor.js';

const medicalTestRouter = express.Router();

/* ================= Swagger Components ================= */
/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalTest:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - normalRange
 *       properties:
 *         title:
 *           type: string
 *           example: Blood Test
 *         image:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         price:
 *           type: number
 *           example: 500
 *         hasOffer:
 *           type: boolean
 *           example: true
 *         offerPrice:
 *           type: number
 *           example: 400
 *         normalRange:
 *           type: object
 *           required:
 *             - min
 *             - max
 *           properties:
 *             min:
 *               type: number
 *               example: 12
 *             max:
 *               type: number
 *               example: 16
 *             unit:
 *               type: string
 *               example: "g/dL"
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Fast for 12 hours", "Drink water before test"]
 */


/* ================= Routes ================= */

/**
 * @swagger
 * /api/medical-tests:
 *   post:
 *     summary: Create a new medical test (Doctor only)
 *     tags: [Medical Tests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MedicalTest"
 *     responses:
 *       201:
 *         description: Medical test created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MedicalTest"
 *       303:
 *         description: already exists
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
medicalTestRouter.post(
  "/",
  authDoctor,
  validate(createMedicalTestValidation),
  createOne
);

/**
 * @swagger
 * /api/medical-tests:
 *   get:
 *     summary: Get all medical tests
 *     tags: [Medical Tests]
 *     responses:
 *       200:
 *         description: List of all medical tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/MedicalTest"
 */
medicalTestRouter.get("/", getAll);

/**
 * @swagger
 * /api/medical-tests/{id}:
 *   get:
 *     summary: Get a medical test by ID
 *     tags: [Medical Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical test ID
 *     responses:
 *       200:
 *         description: Medical test details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MedicalTest"
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Medical test not found
 */
medicalTestRouter.get("/:id", getById);

/**
 * @swagger
 * /api/medical-tests/{id}:
 *   put:
 *     summary: Update a medical test (Doctor only)
 *     tags: [Medical Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical test ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MedicalTest"
 *     responses:
 *       200:
 *         description: Medical test updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MedicalTest"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Medical test not found
 */
medicalTestRouter.put(
  "/:id",
  authDoctor,
  validate(createMedicalTestValidation),
  updateOne
);

/**
 * @swagger
 * /api/medical-tests/{id}:
 *   delete:
 *     summary: Delete a medical test (Doctor only)
 *     tags: [Medical Tests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical test ID
 *     responses:
 *       200:
 *         description: Medical test deleted successfully
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Medical test not found
 */
medicalTestRouter.delete(
  "/:id",
  authDoctor,
  deleteOne
);

export default medicalTestRouter;
