import express from "express";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as invoiceController from "../controllers/invoice.controller.js";
import { ROLES_GROUP } from "../settings.js";

const router = express.Router();

// Routes with authorization for Admins and Staff
router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    invoiceController.getAll
  );

router
  .route("/pay-stripe")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.ONLY_CUSTOMER),
    invoiceController.payStripe
  );

router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    invoiceController.editItem
  );

router
  .route("/create")
  .post(VerifyAuth, VerifyRole(ROLES_GROUP.ALL), invoiceController.createItem);

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    invoiceController.uptadeItem
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    invoiceController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    invoiceController.generateReport
  );

// Routes with authorization for all roles
router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(ROLES_GROUP.ALL), invoiceController.getItem);

export default router;
