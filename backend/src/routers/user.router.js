import express from "express";
import upload from "../middlewares/upload.js";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as userController from "../controllers/user.controller.js";

import { RolesGroup } from "../settings.js";

const router = express.Router();

// Routes without authorization
router.route("/login").post(userController.postLogin);
router.route("/logout").get(userController.getLogout);
router.route("/signup").post(userController.postSignup);
router.route("/check-auth").get(userController.checkAuth);

// Routes with authorization
router
  .route("/all")
  .get(VerifyAuth, VerifyRole(RolesGroup.staffAndAdmin), userController.getAll);
router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    userController.editItem
  );
router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    upload.single("img"),
    userController.createItem
  );
router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    userController.uptadeItem
  );
router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    userController.deleteItem
  );
router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    userController.generateReport
  );

export default router;
