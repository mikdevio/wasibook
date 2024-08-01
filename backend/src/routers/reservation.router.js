import express from "express";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as reservationController from "../controllers/reservation.controller.js";

const router = express.Router();

// Routes with authorization for all roles
router
  .route("/:id")
  .get(
    VerifyAuth,
    VerifyRole(["customer", "staff", "admin"]),
    reservationController.getItem
  );

router
  .route("/edit/:id")
  .get(
    VerifyAuth,
    VerifyRole(["customer", "staff", "admin"]),
    reservationController.editItem
  );

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(["customer", "staff", "admin"]),
    reservationController.createItem
  );

router
  .route("/update/:id")
  .post(
    VerifyAuth,
    VerifyRole(["customer", "staff", "admin"]),
    reservationController.uptadeItem
  );

router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(["customer", "staff", "admin"]),
    reservationController.getAll
  );

// Routes with authorization from Admin and stafff
router
  .route("/delete/:id")
  .get(
    VerifyAuth,
    VerifyRole(["staff", "admin"]),
    reservationController.deleteItem
  );

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(["staff", "admin"]),
    reservationController.generateReport
  );

export default router;
