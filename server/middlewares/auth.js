import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // assign to req.user the decoded user with the header auth token
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    // Get user from db
    const user = await User.findById(req.user._id);
    console.log("ROLE:", user.role);
    if (user.role !== 1) {
      return res.status(401).send("Unauthorized");
    } else {
      // Admin get access to the route
      next();
    }
  } catch (err) {}
};
