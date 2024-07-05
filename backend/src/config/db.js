// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/user.model.js";

dotenv.config();

export async function mogoDBConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

// TODO: Complete this DB initialization
export const initializeDB = async () => {
  // Insert data on customers collection
  // await Customer.insertMany([
  //   {
  //     first_name: "Pablo",
  //     last_name: "Contreras",
  //     tax_number: "ERDF12463215A",
  //     email: "pablo.cont@gmail.com",
  //     phone: "593945623158",
  //     password: "123456",
  //   },
  //   {
  //     first_name: "María",
  //     last_name: "Valladares",
  //     tax_number: "ERDF4578996246Z",
  //     email: "mar.vall@gmail.com",
  //     phone: "593985632147",
  //     password: "123456",
  //   },
  // ]);

  // Insert data on users collection
  await User.insertMany([
    {
      first_name: "admin",
      last_name: "admin",
      email: "admin@admin.com",
      password: "admin",
    },
    {
      first_name: "Borrable",
      last_name: "Borrado",
      email: "borrable.usuario@gmail.com",
      password: "123456",
      __v: 0,
    },
  ]);
};
