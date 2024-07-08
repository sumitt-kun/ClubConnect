import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import News from "../models/news.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const addNews = asyncHandler(async (req, res) => {
  const { name, date, eventDate, link } = req.body;
  if (!date || !name || !eventDate || !link) {
    throw new ApiError(400, "All fields are required");
  }
  const poster_ = req.files?.poster[0]?.path;
  if (!poster_) {
    throw new ApiError(400, "Poster is required");
  }
  const poster = await uploadOnCloudinary(poster_);
  if (!poster) {
    throw new ApiError(500, "Poster cannot be uploaded");
  }
  const news = await News.create({
    name,
    date,
    eventDate,
    link,
    poster: poster.url,
  });
  const createdNews = await News.findById(news._id);
  res
    .status(201)
    .json(new ApiResponse(201, "News added successfully", createdNews));
});

const getNews = asyncHandler(async (req, res) => {
  const news = await News.find().sort({ date: -1 }); // Sort by date in descending order
  res.status(200).json(new ApiResponse(200, "News fetched successfully", news));
});
export { addNews, getNews };
