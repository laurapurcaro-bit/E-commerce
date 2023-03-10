import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/*
Things to do before saving user to db:
  * add validation
  * check if email is taken
  * hash password
*/

export const register = async (req, res) => {
  // with async request use " try catch"
  try {
    // 1. desctructure name, email, password from req.body
    const { firstName, lastName, email, password } = req.body;
    // 2. all fields require validation
    // if no name
    console.log(req.body);
    if (!firstName.trim()) {
      return res.json({ error: "First name is required" });
    }
    if (!lastName.trim()) {
      return res.json({ error: "Last name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least characters long" });
    }
    // if (!address || !address.trim()) {
    //   return res.json({ error: "Address is needed" });
    // }
    // 3. check if email is taken
    // you need await
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.json({ error: "Email already taken" });
    }
    // 4. hash password
    const hashedPassword = await hashPassword(password);
    // 5. register the user
    const user = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    // Save data to DB
    user.save();
    // 6. Create TOKEN, use id to be linked with user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log("Register " + err);
  }
};

export const login = async (req, res) => {
  // with async request use " try catch"
  try {
    // 1. desctructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least characters long" });
    }
    // 3. check if email is taken
    // you need await
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ error: "User not found. Please sign up" });
    }
    // 4. compare password
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.json({ error: "wrong password" });
    }
    // 5. Create TOKEN, use id to be linked with user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 6. send response
    res.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log("Login " + err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
