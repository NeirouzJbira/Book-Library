const {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
  } = require("./helpers");
  
  const create = (req, res) => {
    createItem(res, "reader", req.body);
  };
  
  const list = (req, res) => {
    getAllItems(res, "reader");
  };
  
  const getReaderById = (req, res) => {
    const { id } = req.params;
  
    getItemById(res, "reader", id);
  };
  
  const update = (req, res) => {
    const { id } = req.params;
  
    updateItem(res, "reader", req.body, id);
  };
  
  const deleteReader = (req, res) => {
    const { id } = req.params;
    deleteItem(res, "reader", id);
  };
  
  module.exports = { create, list, update, deleteReader, getReaderById };
  