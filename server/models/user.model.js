import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  credits: {
    type: Number,
    default: 50,
    min: 0
  },
  isCreditsAvailable: {
    type: Boolean,
    default: true
  },
  notes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Note",
    default: []
  },
}, { timestamps: true });

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;