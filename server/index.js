import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
// With node you need to include file extension .js when importing
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
<<<<<<< HEAD
=======
import productRoutes from "./routes/product.js";
>>>>>>> 34efe73a4f4e6125573cd424bec27a19e129dd8a
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
<<<<<<< HEAD
mongoose.set("strictQuery", false);
// db
mongoose
  .connect(process.env.MONGO_URI)
=======

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
>>>>>>> 34efe73a4f4e6125573cd424bec27a19e129dd8a
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB ERROR", err));

// To allow cross origin requests
<<<<<<< HEAD
// You can even list allowed domains
=======
>>>>>>> 34efe73a4f4e6125573cd424bec27a19e129dd8a
app.use(cors());
// know which route get api request
app.use(morgan("dev"));
// To actually read data in req.body
app.use(express.json());

// router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
<<<<<<< HEAD
=======
app.use("/api", productRoutes);
>>>>>>> 34efe73a4f4e6125573cd424bec27a19e129dd8a

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
