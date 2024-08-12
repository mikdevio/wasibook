import express from "express";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as taxController from "../controllers/tax.constroller.js";

import { ROLES_GROUP } from "../settings.js";

const router = express.Router();

// Routes with authorization for Admins and Staff
router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    taxController.getAll
  );

// Routes with authorization for all roles
router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(ROLES_GROUP.ALL), taxController.getItem);

router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    taxController.editItem
  );

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    taxController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    taxController.uptadeItem
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    taxController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    taxController.generateReport
  );

export default router;
