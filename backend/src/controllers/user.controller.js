import fs from "fs";
import path from "path";

import User from "../models/user.model.js";
import Blacklist from "../models/blacklist.model.js";

import * as settings from "../settings.js";

export const postLogin = async (req, res) => {
  const data = req.body;
  console.log("intentando logear...");
  // Check if user exist
  const userFound = await User.findOne({ email: data.email }).select(
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
  console.log("Logeado");
};

export const getLogout = async (req, res) => {
  try {
    const authHeader = req.headers["cookie"];

    if (!authHeader) return res.sendStatus(204);

    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({
      token: accessToken,
    });

    if (checkIfBlacklisted) return res.sendStatus(204);

    const newBlacklist = new Blacklist({ token: accessToken });

    await newBlacklist.save();

    res.setHeader("Clear-Site-Data", "cookies");
    res.status(401).json({
      status: "Unathorized",
      message: "Logout from account",
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
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
    });

    // Check if user exist in database
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(200).json({
        status: "error",
        message: "It seems you already have an account, please log in instead.",
      });
    }

    const savedUser = await newUser.save();
    const { role, ...user_data } = savedUser._doc;
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

export const getAll = async (_, res) => {
  try {
    const usersList = await User.find({});
    res.status(200).json({
      data: usersList,
      message: "List of all users.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const editItem = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findById(id).exec();
    res.status(200).json({
      data: data,
      message: "User info provided.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const createItem = async (req, res) => {
  try {
    // TODO: Check functionality upload middleware <User>
    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      img: {
        data: fs.readFileSync(
          path.join(settings.__dirname, "uploads/user", req.body["img.data"])
        ),
        contentType: "image/png",
      },
    });

    const result = await newUser.save();

    res.status(200).json({
      data: data,
      message: "User info provided.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const uptadeItem = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      }
    );
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deleteItem = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findOneAndDelete({ _id: userId });
    res.status(200).json({
      status: "success",
      message: "User deleted from DB.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const generateReport = async (req, res) => {
  try {
    const userList = await User.find({});

    // TODO: Add open pdf file functionality

    res.status(200).json({
      status: "success",
      message: "User deleted from DB.",
    });
  } catch (error) {
    res.status(500).send("Error on PDF report generation.");
  }
};
