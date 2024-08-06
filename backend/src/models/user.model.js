import fs from "fs";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as settings from "../settings.js";

const Schema = mongoose.Schema;

const userBaseSchema = new Schema(
  {
    firstName: {
      type: String,
      required: "Your first name is requiered",
      max: 25,
    },
    lastName: {
      type: String,
      required: "Your lastname is requiered",
      max: 25,
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: "Your password is required",
      select: false,
      max: 25,
    },
    img: {
      data: {
        type: Buffer,
        default: fs.readFileSync(settings.DEFAULT_PERFILE_IMG),
      },
      contentType: String,
    },
    phone: {
      type: String,
      required: false,
      max: 25,
    },
    address: {
      type: String,
      required: false,
      max: 52,
    },
    role: {
      type: String,
      enum: settings.ROLES_GROUP.ALL,
      default: "customer",
      required: true,
    },
  },
  { timestamps: true },
  { discriminationKey: "kind", collection: "Users" }
);

// Method to hash passwords with save
userBaseSchema.pre("save", function (next) {
  let user = this;

  // If password is not modified or new got to next
  if (!user.isModified("password")) return next();

  try {
    // Generating a salt
    bcrypt.genSalt(settings.SALT_WORK_FACTOR, (err, salt) => {
      // If error go to next
      if (err) return next();

      bcrypt.hash(user.password, salt, (err, hash) => {
        // If error go to next
        if (err) return next();
        user.password = hash;
        next();
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Method to hash passwords with insertMany
userBaseSchema.pre("insertMany", async function (next, docs) {
  try {
    for (const doc of docs) {
      const salt = await bcrypt.genSalt(settings.SALT_WORK_FACTOR);
      doc.password = await bcrypt.hash(doc.password, salt);
    }
  } catch (error) {
    console.log(error);
  }
});

// Method to create session token
userBaseSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };

  // console.log(settings.SECRET_ACCESS_TOKEN);
  return jwt.sign(payload, settings.SECRET_ACCESS_TOKEN, {
    expiresIn: "20m",
  });
};

// Method to compare password
userBaseSchema.methods.comparePassword = function (passwordToValidate) {
  return bcrypt.compare(passwordToValidate, this.password);
};

export const UserBase = mongoose.model("UserBase", userBaseSchema);

export const User = UserBase.discriminator(
  "User",
  new Schema({
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      requiered: false,
    },
    permisions: {
      type: [String],
      requiered: false,
    },
  })
);

export const Customer = UserBase.discriminator(
  "Customer",
  new Schema({
    taxNumber: {
      type: String,
      required: false,
    },
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
    loyaltyPoints: {
      type: Number,
      requiered: false,
      default: 0,
    },
    preferences: {
      type: [String],
      requiered: false,
    },
  })
);
