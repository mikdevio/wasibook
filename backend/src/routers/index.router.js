import express from "express";

import userRouter from "./user.router.js";

import * as indexController from "../controllers/index.controller.js";

const router = express.Router();

router.route("/").get(indexController.home);

router.route("/about").get(indexController.about);

router.use("/user", userRouter);

export default router;
