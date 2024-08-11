import Tax from "../models/tax.model.js";

import * as baseController from "../controllers/base.controller.js";

export const getItem = (req, res) => {
  baseController.getItem(Tax, req, res);
};

export const getAll = (req, res) => {
  baseController.getAll(Tax, req, res);
};

export const editItem = (req, res) => {
  baseController.editItem(Tax, req, res);
};

export const createItem = (req, res) => {
  baseController.createItem(Tax, req, res);
};

export const uptadeItem = (req, res) => {
  baseController.updateItem(Tax, req, res);
};

export const deleteItem = (req, res) => {
  baseController.deleteItem(Tax, req, res);
};

export const generateReport = (req, res) => {
  baseController.generateReport(Tax, req, res);
};
