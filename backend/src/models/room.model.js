import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      min: 1,
    },
    roomType: {
      type: String,
      required: true,
      enum: ["Single", "Double", "Suite", "Deluxe"],
    },
    price: {
      type: Number,
      required: true,
      min: 0.0,
    },
    amenities: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    img: {
      data: {
        type: Buffer,
        default: null,
      },
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
