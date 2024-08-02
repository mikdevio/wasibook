// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import { User, Customer } from "../models/user.model.js";

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
  try {
    // Checking collections on db
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    if (collections.length === 0) {
      await Customer.insertMany([
        {
          firstName: "Pablo",
          lastName: "Contreras",
          taxNumber: "ERDF12463215A",
          email: "pablo.cont@gmail.com",
          phone: "593945623158",
          password: "123456",
        },
        {
          firstName: "María",
          lastName: "Valladares",
          taxNumber: "ERDF4578996246Z",
          email: "mar.vall@gmail.com",
          phone: "593985632147",
          password: "123456",
        },
      ]);

      // Insert data on users collection
      await User.insertMany([
        {
          firstName: "admin",
          lastName: "admin",
          email: "admin@admin.com",
          password: "admin",
          phone: "593945623158",
          role: "admin",
        },
        {
          firstName: "Borrable",
          lastName: "Borrado",
          email: "borrable.usuario@gmail.com",
          password: "123456",
          phone: "593945623158",
          role: "admin",
        },
      ]);

      console.log("Dabase initialized with data.");
    } else {
      console.log("Database already has data.");
    }
  } catch (error) {
    console.log("Error during database initialization: ", error);
  }
};
