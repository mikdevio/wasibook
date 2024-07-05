import express from "express";
import upload from "../middlewares/upload.js";

import { VerifyAuth } from "../middlewares/verify.js";

import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(userController.postLogin);

router.route("/logout").get(userController.getLogout);

router.route("/signup").post(userController.postSignup);

router.route("/all").get(VerifyAuth, userController.getAll);

router.route("/edit/:id").get(VerifyAuth, userController.editItem);

router
  .route("/create")
  .post(VerifyAuth, upload.single("img"), userController.createItem);

router.route("/update/:id").post(VerifyAuth, userController.uptadeItem);

router.route("/delete/:id").get(VerifyAuth, userController.deleteItem);

router.route("/report").get(VerifyAuth, userController.generateReport);

export default router;
