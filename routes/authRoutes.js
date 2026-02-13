import express from "express";
import { validate } from "../middlewares/validate.js";

import {
  forgotPasswordValidation,
  resetPasswordValidation,
  StuffLoginValidation,
  StuffRegisterValidation,
} from "../validations/userValidation.js";

import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controllers/authController.js";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     register:
 *       type: object
 *       required:
 *         - name
 *         - mobile
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: Ahmed Ali
 *         role:
 *           type: string
 *           enum: [doctor, patient, assistant]
 *           example: doctor
 *         mobile:
 *           type: string
 *           example: "01012345678"
 *         email:
 *           type: string
 *           example: ahmed@test.com
 *         password:
 *           type: string
 *           example: Ahmed@123
 *
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: ahmed@test.com
 *         password:
 *           type: string
 *           example: Ahmed@123
 *
 *     ForgotPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: ahmed@test.com
 *
 *     ResetPassword:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           example: NewPass@123
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new doctor
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/register"
 *     responses:
 *       201:
 *         description: Doctor registered successfully
 *       400:
 *         description: Validation error or email already exists
 */
authRouter.post("/register", validate(StuffRegisterValidation), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login doctor and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/login"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
authRouter.post("/login", validate(StuffLoginValidation), login);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send reset password link to doctor email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ForgotPassword"
 *     responses:
 *       200:
 *         description: Reset password email sent successfully
 *       404:
 *         description: Email not found
 */
authRouter.post(
  "/forgot-password",
  validate(forgotPasswordValidation),
  forgotPassword
);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset doctor password using token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset password token sent by email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ResetPassword"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
authRouter.post(
  "/reset-password/:token",
  validate(resetPasswordValidation),
  resetPassword
);

export default authRouter;
