import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taxSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Tax", taxSchema);
