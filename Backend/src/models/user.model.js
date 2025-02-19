import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    roll: {
      type: String,
      required: [true, "Roll number is required"],
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
//access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      //payload
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    //ACCESS TOKEN
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
//refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      //payload
      _id: this._id,
    },
    //ACCESS TOKEN
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
