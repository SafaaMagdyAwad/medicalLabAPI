import express from "express";
import {
  createPatient,
  getDoctors,
  getMyProfile,
  getPatients,
} from "../controllers/userController.js";
import authStuff from "../middlewares/authStuff.js";
import { createPatientValidation } from "../validations/userValidation.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (Doctors & Patients)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - mobile
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         role:
 *           type: string
 *           example: doctor
 *
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - mobile
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: string
 */

/**
 * @swagger
 * /api/users/me:
 *   post:
 *     summary: Get doctors profile
 *     tags: [Users]
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Doctor created successfully
 */
router.get("/me", authStuff, getMyProfile);

/**
 * @swagger
 * /api/users/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.get("/doctors", getDoctors);

/**
 * @swagger
 * /api/users/patients:
 *   post:
 *     summary: Create a new patient [doctor or assistant]
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Patient created successfully
 */
router.post("/patients", authStuff, validate(createPatientValidation), createPatient);

/**
 * @swagger
 * /api/users/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get("/patients", authStuff, getPatients);

export default router;
