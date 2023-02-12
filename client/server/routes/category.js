import express from "express";
// Router function of express
const router = express.Router();

// middlewares
import { requireSignIn, isAdmin } from "../middlewares/auth.js";
// controllers
import { create, update, remove, list, read } from "../controllers/category.js";

// Route where you can create category
// CRUD operations
router.post("/category", requireSignIn, isAdmin, create);
router.put("/category/:categoryId", requireSignIn, isAdmin, update);
router.delete("/category/:categoryId", requireSignIn, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);

export default router;
