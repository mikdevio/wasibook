import Room from "../models/room.model.js";

import * as baseController from "../controllers/base.controller.js";

export const getItem = (req, res) => {
  baseController.getItem(Room, req, res);
};

export const getAll = (req, res) => {
  baseController.getAll(Room, req, res, "taxes");
};

export const editItem = (req, res) => {
  baseController.editItem(Room, req, res);
};

export const createItem = (req, res) => {
  baseController.createItem(Room, req, res);
};

export const uptadeItem = (req, res) => {
  baseController.updateItem(Room, req, res);
};

export const deleteItem = (req, res) => {
  baseController.deleteItem(Room, req, res);
};

export const generateReport = async (req, res) => {
  baseController.generateReport(Room, req, res);
};
