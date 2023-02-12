import express from "express";
import formidable from "express-formidable";
// Router function of express
const router = express.Router();

// middlewares
import { requireSignIn, isAdmin } from "../middlewares/auth.js";
// controllers
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
} from "../controllers/product.js";

// Route where you can create category
// Use formidable middleware to handle form data only in this route
router.post("/product", requireSignIn, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignIn, isAdmin, remove);
router.put("/product/:productId", requireSignIn, isAdmin, formidable(), update);

export default router;
