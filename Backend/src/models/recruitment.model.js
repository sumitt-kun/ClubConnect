import mongoose, { Schema } from "mongoose";

const recruitmentSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "User is required"],
    },
    club: {
      type: String,
      required: [true, "Club is required"],
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
    reason: {
      type: String,
      required: [true, "Reason is required"],
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
    },
  },
  { timestamps: true }
);

const Recruitment = mongoose.model("Recruitment", recruitmentSchema);
export default Recruitment;
