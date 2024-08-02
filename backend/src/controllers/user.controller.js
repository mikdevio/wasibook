import fs from "fs";
import path from "path";

import { User, Customer, UserBase } from "../models/user.model.js";
import Blacklist from "../models/blacklist.model.js";

import * as baseController from "../controllers/base.controller.js";

import * as settings from "../settings.js";

export const postLogin = async (req, res) => {
  const data = req.body;
  // Check if user exist
  const userFound = await UserBase.findOne({ email: data.email }).select(
    "+password"
  );

  if (!userFound) {
    return res.status(404).send("User not found.");
  }

  // Checking password valid
  const passValid = await userFound.comparePassword(data.password);
  if (!passValid) {
    return res.status(401).send("Unautorized - Password invalid.");
  }

  // Open session
  let options = {
    maxAge: 20 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  // Session token
  const token = userFound.generateAccessJWT();
  // Set token to response header
  res.cookie("SessionID", token, options);
  res.status(200).json({
    status: 200,
    message: "Ok. New token assigned.",
  });
  console.log(`Usuario ${userFound.email} logeado`);
};

export const getLogout = async (req, res) => {
  try {
    const authHeader = req.headers["cookie"];

    if (!authHeader) return res.sendStatus(204);

    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];

    const checkIfBlacklisted = await Blacklist.findOne({
      token: accessToken,
    }).exec();

    if (checkIfBlacklisted) return res.sendStatus(204);

    const newBlacklist = new Blacklist({ token: accessToken });

    await newBlacklist.save();

    // res.setHeader("Clear-Site-Data", "cookies");
    res.clearCookie("SessionID", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({
      status: 200,
      message: "Logout successful.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error: " + error,
    });
  }
};

export const postSignup = async (req, res) => {
  // Get params from body
  const { first_name, last_name, email, password } = req.body;
  try {
    // Create a user to save
    const newCustomer = new Customer({
      first_name,
      last_name,
      email,
      password,
    });

    // Check if user exist in database
    const customerExist = await Customer.findOne({ email: email });

    if (customerExist) {
      return res.status(200).json({
        status: "error",
        message: "It seems you already have an account, please log in instead.",
      });
    }

    const savedCustomer = await newCustomer.save();

    const { role, ...user_data } = savedCustomer._doc;

    res.status(200).json({
      status: "success",
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
};

export const checkAuth = async (req, res) => {
  const accessToken = req.cookies["SessionID"];
  if (accessToken) {
    const checkIfBlacklisted = await Blacklist.findOne({
      token: accessToken,
    }).exec();

    if (!checkIfBlacklisted)
      return res.status(200).json({ status: "Authenticated" });
    else {
      res.status(401).json({ status: "Unauthorized" });
    }
  } else {
    res.status(401).json({ status: "Unauthorized" });
  }
};

export const getAll = (req, res) => {
  baseController.getAll(User, req, res);
};

export const editItem = (req, res) => {
  baseController.editItem(User, req, res);
};

export const createItem = (req, res) => {
  baseController.createItem(User, req, res);
};

export const uptadeItem = async (req, res) => {
  baseController.updateItem(User, req, res);
};

export const deleteItem = async (req, res) => {
  baseController.deleteItem(User, req, res);
};

export const generateReport = async (req, res) => {
  baseController.generateReport(User, req, res);
};
