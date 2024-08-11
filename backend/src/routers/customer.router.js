import express from "express";
import upload from "../middlewares/upload.js";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as customerController from "../controllers/customer.controller.js";

import { ROLES_GROUP } from "../settings.js";

const router = express.Router();

// Routes with authorization
router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    customerController.getAll
  );

router.route("/:id").get(VerifyAuth, customerController.getItem);

router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    customerController.editItem
  );
router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    upload.single("img"),
    customerController.createItem
  );
router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    customerController.uptadeItem
  );
router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    customerController.deleteItem
  );
router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    customerController.generateReport
  );

export default router;
