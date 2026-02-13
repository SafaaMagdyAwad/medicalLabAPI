import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// import routes
import userRouter from './routes/userRouter.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import authRouter from './routes/authRoutes.js';
import medicalTestRouter from './routes/MedicalTestRouter.js';
import bookingRouter from './routes/bookingRouter.js';
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";


dotenv.config();

const app = express();

app.use(express.json());



app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // allow Postman
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
    //   "https://online-exam-front.vercel.app",
    //   "https://online-exam-lemon.vercel.app" // Swagger deployed
    ];
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS policy: origin ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
  allowedHeaders: ["Content-Type","Authorization"],
  methods: ["GET","POST","PATCH","DELETE","OPTIONS","PUT"]
}));
app.use(express.urlencoded({ extended: true })); // optional, parses form data


// test route
app.get("/", (req, res) => res.json({ message: "API is running..." }));

// routes
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/medical-tests",medicalTestRouter)
app.use("/api/bookings",bookingRouter)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: CSS_URL,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
  })
);
// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌', err));

// Only listen if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

// FIX: Use export default instead of module.exports
export default app;