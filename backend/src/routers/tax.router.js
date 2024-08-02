import express from "express";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as taxController from "../controllers/tax.constroller.js";

import { RolesGroup } from "../settings.js";

const router = express.Router();

// Routes with authorization for all roles
router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(RolesGroup.all), taxController.getItem);

// Routes with authorization for Admins and Staff
router
  .route("/all")
  .get(VerifyAuth, VerifyRole(RolesGroup.staffAndAdmin), taxController.getAll);

router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    taxController.editItem
  );

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    taxController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    taxController.uptadeItem
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    taxController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    taxController.generateReport
  );

export default router;
