import { Customer } from "../models/user.model.js";
import * as baseController from "../controllers/base.controller.js";

export const getItem = (req, res) => {
  baseController.getItem(Customer, req, res);
};

export const getAll = (req, res) => {
  baseController.getAll(Customer, req, res);
};

export const editItem = (req, res) => {
  baseController.editItem(Customer, req, res);
};

export const createItem = (req, res) => {
  baseController.createItem(Customer, req, res);
};

export const uptadeItem = async (req, res) => {
  baseController.updateItem(Customer, req, res);
};

export const deleteItem = async (req, res) => {
  baseController.deleteItem(Customer, req, res);
};

export const generateReport = async (req, res) => {
  baseController.generateReport(Customer, req, res);
};
