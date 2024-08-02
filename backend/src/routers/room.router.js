import express from "express";
import upload from "../middlewares/upload.js";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as roomController from "../controllers/room.controller.js";

import { RolesGroup } from "../settings.js";

const router = express.Router();

// Routes with authorization for all roles
router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(RolesGroup.all), roomController.getItem);

router
  .route("/all")
  .get(VerifyAuth, VerifyRole(RolesGroup.all), roomController.getAll);

// Routes with authorization for Admins and Staff
router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    roomController.editItem
  );

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    upload.single("img"),
    roomController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    roomController.uptadeItem
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    roomController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    roomController.generateReport
  );

export default router;