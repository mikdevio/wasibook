import express from "express";
import upload from "../middlewares/upload.js";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as roomController from "../controllers/room.controller.js";

import { ROLES_GROUP } from "../settings.js";

const router = express.Router();

// Routes with authorization for all roles
router
  .route("/all")
  .get(VerifyAuth, VerifyRole(ROLES_GROUP.ALL), roomController.getAll);

router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(ROLES_GROUP.ALL), roomController.getItem);

// Routes with authorization for Admins and Staff
router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    roomController.editItem
  );

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    upload.single("img"),
    roomController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    roomController.uptadeItem
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    roomController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    roomController.generateReport
  );

export default router;
