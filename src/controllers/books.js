const { Book } = require("../models");

const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("./helpers");

const create = (req, res) => {
  createItem(res, "book", req.body);
};

const list = (req, res) => {
  getAllItems(res, "book");
};

const getBookById = (req, res) => {
  const { id } = req.params;

  getItemById(res, "book", id);
};

const update = (req, res) => {
  const { id } = req.params;

  updateItem(res, "book", req.body, id);
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  deleteItem(res, "book", id);
};

module.exports = { create, list, getBookById, update, deleteBook };
