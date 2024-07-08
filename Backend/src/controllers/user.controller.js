import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and acess token!"
    );
  }
};
const registerUser = asyncHandler(async (req, res) => {
  //   const { fullName, email, username, password } = req.body;
  const { fullName, mobile, roll, branch, email, password } = req.body;
  console.log("email:", email);
  if (
    [fullName, mobile, roll, branch, email, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required:");
  }
  const existedUser = await User.findOne({
    email: email.toLowerCase(),
  });
  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }
  const idLocalPath = req.files?.idCard[0]?.path;
  if (!idLocalPath) {
    throw new ApiError(400, "idCard file is required:");
  }
  const idCard = await uploadOnCloudinary(idLocalPath);
  if (!idCard) {
    throw new ApiError(500, "id card file is cannot be uploaded");
  }
  const user = await User.create({
    email: email.toLowerCase(),
    fullName,
    mobile,
    roll,
    branch,
    password,
    avatar: idCard.url,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email);
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials!");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully!"));
});

export { registerUser, loginUser, logoutUser };
