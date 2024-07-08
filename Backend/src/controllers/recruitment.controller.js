import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Recruitment from "../models/recruitment.model.js";
const addRecruitment = asyncHandler(async (req, res) => {
  const { user, club, mobile, roll, branch, reason, batch } = req.body;
  if (!user || !club || !mobile || !roll || !branch || !reason || !batch) {
    throw new ApiError(400, "All fields are required");
  }
  const newRecruitment = await Recruitment.create({
    user,
    club,
    mobile,
    roll,
    branch,
    reason,
    batch,
  });

  const createdRecruitment = await Recruitment.findById(newRecruitment._id);
  res
    .status(201)
    .json(
      new ApiResponse(201, "Recruitment added successfully", createdRecruitment)
    );
});

const getRecruitmentsByClub = asyncHandler(async (req, res) => {
  const { club } = req.body;

  if (!club) {
    throw new ApiError(400, "Club name is required");
  }
  const recruitments = await Recruitment.find({ club });
  if (!recruitments || recruitments.length === 0) {
    throw new ApiError(404, `No recruitments found for club '${club}'`);
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Recruitments fetched successfully", recruitments)
    );
});

export { addRecruitment, getRecruitmentsByClub };
