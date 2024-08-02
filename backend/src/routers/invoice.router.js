import express from "express";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as invoiceController from "../controllers/invoice.controller.js";
import { RolesGroup } from "../settings.js";

const router = express.Router();

// Routes with authorization for all roles
router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(RolesGroup.all, invoiceController.getItem));

// Routes with authorization for Admins and Staff
router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    invoiceController.getAll
  );

router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    invoiceController.editItem
  );

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    invoiceController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    invoiceController.uptadeItem
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    invoiceController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    invoiceController.generateReport
  );

export default router;
