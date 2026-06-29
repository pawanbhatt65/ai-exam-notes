import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import connectDb from "./utils/connectDb.js";
dotenv.config();

// routes
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import generateRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdf.route.js";

const port = process.env.PORT || 5000;
const app = express();

// node inbuilt middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))
app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", generateRouter)
app.use('/api/pdf', pdfRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});