import Invoice from "../models/invoice.model.js";

import * as baseController from "../controllers/base.controller.js";

// TODO: Implement functionalities

export const getItem = (req, res) => {
  baseController.getItem(Invoice, req, res);
};

export const getAll = (req, res) => {
  baseController.getAll(Invoice, req, res);
};

export const editItem = (req, res) => {
  baseController.editItem(Invoice, req, res);
};

export const createItem = (req, res) => {
  baseController.createItem(Invoice, req, res);
};

export const uptadeItem = (req, res) => {
  baseController.updateItem(Invoice, req, res);
};

export const deleteItem = (req, res) => {
  baseController.deleteItem(Invoice, req, res);
};

export const generateReport = (req, res) => {
  baseController.generateReport(Invoice, req, res);
};
