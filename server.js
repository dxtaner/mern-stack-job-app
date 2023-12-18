// Import necessary modules using import statements
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors module

// Import your database connection function
import connectDB from "./db/connect.js";

// Import routers and middleware using import statements
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Set up logging middleware in development environment
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Import path and use __filename and __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path"; // Import the path module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files only when ready to deploy
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Middleware for parsing JSON and handling common security issues
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

// Enable CORS with proper configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Route handlers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// Custom middleware for handling 404 Not Found errors
app.use(notFoundMiddleware);

// Custom middleware for handling errors
app.use(errorHandlerMiddleware);

// Define the port for the server
const port = process.env.PORT || 5000;

// import importData from "./populate.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // await importData();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
};

start();
