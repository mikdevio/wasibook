import express from "express";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as reservationController from "../controllers/reservation.controller.js";

import { ROLES_GROUP } from "../settings.js";

const router = express.Router();

// Routes with authorization from Admin and stafff
router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    reservationController.getAll
  );

router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    reservationController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.STAFF_AND_ADMIN),
    reservationController.generateReport
  );

// Routes with authorization for all roles
router
  .route("/:id")
  .get(VerifyAuth, VerifyRole(ROLES_GROUP.ALL), reservationController.getItem);

router
  .route("/edit/:id")
  .get(VerifyAuth, VerifyRole(ROLES_GROUP.ALL), reservationController.editItem);

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.ALL),
    reservationController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(ROLES_GROUP.ALL),
    reservationController.uptadeItem
  );

export default router;
