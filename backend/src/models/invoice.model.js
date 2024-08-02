import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  reservation: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["paid", "unpaid", "cancelled"],
  },
  details: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Invoice", invoiceSchema);
