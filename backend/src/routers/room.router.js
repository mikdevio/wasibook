import express from "express";
import upload from "../middlewares/upload.js";

import { VerifyAuth, VerifyRole } from "../middlewares/verify.js";

import * as roomController from "../controllers/room.controller.js";

const router = express.Router();

// Routes with authorization for all roles
router
  .route("/:id")
  .get(
    VerifyAuth,
    VerifyRole(["customer", "staff", "admin"], roomController.getItem)
  );

router
  .route("/all")
  .get(
    VerifyAuth,
    VerifyRole(["customer", "staff", "admin"]),
    roomController.getAll
  );

// Routes with authorization for Admins and Staff
router
  .route("/edit/:id")
  .get(VerifyAuth, VerifyRole(["staff", "admin"]), roomController.editItem);

router
  .route("/create")
  .post(
    VerifyAuth,
    VerifyRole(["staf", "admin"]),
    upload.single("img"),
    roomController.createItem
  );

router
  .route("/update/:id")
  .post(VerifyAuth, VerifyRole(["staff", "admin"]), roomController.uptadeItem);

router
  .route("/delete/:id")
  .get(VerifyAuth, VerifyRole(["staff", "admin"]), roomController.deleteItem);

router
  .route("/report")
  .get(
    VerifyAuth,
    VerifyRole(["staff", "admin"]),
    roomController.generateReport
  );

export default router;
