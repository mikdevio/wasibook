import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomReservationSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
});

const reservationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rooms: {
      type: [roomReservationSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ["reserved", "checked-in", "checked-out", "cancelled"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
