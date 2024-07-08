import mongoose, { Schema } from "mongoose";
const newsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event Date is required"],
    },
    link: {
      type: String,
      required: [true, "Link is required"],
    },
    poster: {
      type: String,
      required: [true, "Poster is required!"],
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
export default News;
