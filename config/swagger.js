import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Medical Lab",
      version: "1.0.0",
      description: "API documentation for Online Exam project",
    },
   servers: [
//   { url: 'https://online-exam-lemon.vercel.app', description: 'Production server' },
  { url: 'http://localhost:3000', description: 'Local server' }, // ✅ include http://
],
     components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token here. Example: Bearer <token>",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Use path.join to create an absolute path to your routes
  apis: [path.join(__dirname, "../routes/*.js")], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;