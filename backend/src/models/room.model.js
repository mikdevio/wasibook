import fs from "fs";
import mongoose from "mongoose";

import * as settings from "../settings.js";

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
        default: fs.readFileSync(settings.DEFAULT_ROOM_IMG),
      },
      contentType: String,
    },
    stars: {
      type: Number,
      required: false,
      default: 1,
    },
    taxes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tax" }], // Referencia al esquema Tax
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
