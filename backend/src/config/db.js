// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import { User, Customer } from "../models/user.model.js";
import Room from "../models/room.model.js";
import Tax from "../models/tax.model.js";

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

export const initializeDB = async () => {
  // Insert data on customers collection
  try {
    // Checking collections on db
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    if (collections.length === 0) {
      const taxes = await Tax.insertMany([
        {
          name: "IVA12",
          rate: 0.12,
          description:
            "The Impuesto al Valor Agregado (IVA) is a consumption tax on goods and services, collected at each stage of production and distribution.",
        },
        {
          name: "IVA14",
          rate: 0.14,
          description:
            "The Impuesto al Valor Agregado (IVA) is a consumption tax on goods and services, collected at each stage of production and distribution.",
        },
        {
          name: "IVA0",
          rate: 0.0,
          description:
            "The Impuesto al Valor Agregado (IVA) is a consumption tax on goods and services, collected at each stage of production and distribution.",
        },
        {
          name: "ICE5",
          rate: 0.05,
          description:
            "The Impuesto a los Consumos Especiales (ICE) is a special tax on non-essential or luxury goods and services to regulate consumption and generate revenue.",
        },
      ]);

      const taxIVA12 = taxes.find((tax) => tax.name === "IVA12");
      const taxIVA14 = taxes.find((tax) => tax.name === "IVA14");
      const taxIVA0 = taxes.find((tax) => tax.name === "IVA0");
      const taxICE5 = taxes.find((tax) => tax.name === "ICE5");

      // Insert customer data
      await Customer.insertMany([
        {
          firstName: "cliente",
          lastName: "cliente",
          taxNumber: "ERDF12463215A",
          email: "cliente@cliente.com",
          phone: "593945623158",
          password: "123456",
          role: "customer",
          address: "Tena, calle Uno y calle Dos",
        },
        {
          firstName: "María",
          lastName: "Valladares",
          taxNumber: "ERDF4578996246Z",
          email: "mar.vall@gmail.com",
          phone: "593985632147",
          password: "123456",
          role: "customer",
          address: "Riobamba, Calle Francisco Rodriguez y Manual Caceres",
        },
      ]);

      // Insert users data
      await User.insertMany([
        {
          firstName: "admin",
          lastName: "admin",
          email: "admin@admin.com",
          password: "admin",
          phone: "593945623158",
          role: "admin",
          employeeId: "E001",
        },
        {
          firstName: "Borrable",
          lastName: "Borrado",
          email: "borrable.usuario@gmail.com",
          password: "123456",
          phone: "593945623158",
          role: "staff",
          employeeId: "E002",
        },
      ]);

      await Room.insertMany([
        {
          code: "A001",
          roomType: "Single",
          price: 15.25,
          amenities: [],
          description:
            "A cozy single room with modern amenities, featuring a comfortable bed, a sleek work desk, and a private bathroom. The room is designed for relaxation, with warm lighting and a flat-screen TV for entertainment.",
          taxes: [taxIVA12._id],
        },
        {
          code: "A002",
          roomType: "Double",
          price: 25.47,
          amenities: [],
          description:
            "A spacious double room featuring two plush beds, a stylish work desk, and a private bathroom. Enjoy the comfort of modern amenities, including a flat-screen TV and complimentary Wi-Fi, perfect for a relaxing stay.",
          taxes: [taxIVA14._id],
        },
        {
          code: "A003",
          roomType: "Suite",
          price: 75.15,
          amenities: [],
          description:
            "An elegant suite offering a luxurious experience with a separate living area, a king-size bed, and a lavish bathroom with a soaking tub. The suite includes premium amenities such as a flat-screen TV, a minibar, and panoramic views, ensuring a truly indulgent stay.",
          taxes: [taxIVA14._id],
        },
        {
          code: "A004",
          roomType: "Deluxe",
          price: 25.47,
          amenities: [],
          description:
            "A deluxe room combining elegance and comfort, featuring a king-size bed, a spacious seating area, and a modern bathroom. Enjoy premium amenities including a flat-screen TV, a work desk, and complimentary high-speed Wi-Fi for an enhanced stay experience.",
          taxes: [taxIVA14._id],
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
