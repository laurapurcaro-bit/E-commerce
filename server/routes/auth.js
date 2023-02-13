import express from "express";
// Router function of express
const router = express.Router();

// middlewares
import { requireSignIn, isAdmin } from "../middlewares/auth.js";
// controllers
import { register, login, secret } from "../controllers/auth.js";

// 1: endpoint, 2: callback
router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignIn, (req, res) => {
  res.json({ ok: true });
});
// Protect routes so only logged in user have access to it
// Admin middleware
router.get("/secret", requireSignIn, isAdmin, secret);

export default router;
