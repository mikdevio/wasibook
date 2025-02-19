import Reservation from "../models/reservation.model.js";

import * as baseController from "../controllers/base.controller.js";
import { populate } from "dotenv";

export const getItem = (req, res) => {
  baseController.getItem(Reservation, req, res);
};

export const getAll = (req, res) => {
  baseController.getAll(Reservation, req, res);
};

export const editItem = (req, res) => {
  baseController.editItem(Reservation, req, res);
};

export const createItem = (req, res) => {
  baseController.createItem(Reservation, req, res);
};

export const uptadeItem = (req, res) => {
  baseController.updateItem(Reservation, req, res);
};

export const deleteItem = (req, res) => {
  baseController.deleteItem(Reservation, req, res);
};

export const generateReport = (req, res) => {
  baseController.generateReport(Reservation, req, res);
};