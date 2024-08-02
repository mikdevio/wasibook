import express from "express";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as reservationController from "../controllers/reservation.controller.js";

import { RolesGroup } from "../settings.js";

const router = express.Router();

// Routes with authorization for all roles
router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(RolesGroup.all), reservationController.getItem);

router
  .route("/edit/:id")
  .get(VerifyAuth, VerifyRole(RolesGroup.all), reservationController.editItem);

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.all),
    reservationController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(RolesGroup.all),
    reservationController.uptadeItem
  );

// Routes with authorization from Admin and stafff
router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    reservationController.getAll
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    reservationController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(RolesGroup.staffAndAdmin),
    reservationController.generateReport
  );

export default router;
