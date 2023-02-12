import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // cut whitespace with trim
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    // unique: don't create another user with same email
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true, minLength: 6, maxLength: 64 },
    address: { type: String },
    role: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);
// create collection name + schema
export default mongoose.model("User", userSchema);
