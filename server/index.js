import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
// With node you need to include file extension .js when importing
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
mongoose.set("strictQuery", false);
// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB ERROR", err));

// To allow cross origin requests
// You can even list allowed domains
app.use(cors());
// know which route get api request
app.use(morgan("dev"));
// To actually read data in req.body
app.use(express.json());

// router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
