import express from "express";

import userRouter from "./user.router.js";
import roomRouter from "./room.router.js";
import reservationRouter from "./reservation.router.js";

import * as indexController from "../controllers/index.controller.js";

const router = express.Router();

router.route("/").get(indexController.home);
router.route("/about").get(indexController.about);
router.use("/user", userRouter);
router.use("/room", roomRouter);
router.use("/reservation", reservationRouter);

export default router;
