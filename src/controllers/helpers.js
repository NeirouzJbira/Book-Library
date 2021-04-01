const { Book, Reader } = require("../models");

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };

  return models[model];
};

const getError = (model) => ({ error: `The ${model} could not be found.` });

const removePassword = (object) => {
  if (object.hasOwnProperty("password")) {
    delete object.password;
  }

  return object;
};

const createItem = (res, model, item) => {
  const Model = getModel(model);

  return Model.create(item)
    .then((newItem) => {
      const itemWithoutPassword = removePassword(newItem.dataValues);
      res.status(201).json(itemWithoutPassword);
    })
    .catch((error) =>
      res.status(400).json({
        error: error.name,
        message: error.errors[0].message,
      })
    );
};

const getAllItems = (res, model) => {
  const Model = getModel(model);

  return Model.findAll().then((items) => {
    const itemsWithoutPassword = items.map((item) =>
      removePassword(item.dataValues)
    );
    res.status(200).json(itemsWithoutPassword);
  });
};

const getItemById = (res, model, id) => {
  const Model = getModel(model);
  const error = getError(model);

  Model.findByPk(id).then((item) => {
    if (!item) {
      res.status(404).json(error);
    } else {
      const itemWithoutPassword = removePassword(item.dataValues);
      res.status(200).json(itemWithoutPassword);
    }
  });
};

const updateItem = (res, model, item, id) => {
  const Model = getModel(model);
  const error = getError(model);

  Model.update(item, { where: { id } }).then(([numOfRowsUpdated]) => {
    if (numOfRowsUpdated === 0) {
      res.status(404).json(error);
    } else {
      res.status(200).json([numOfRowsUpdated]);
    }
  });
};

const deleteItem = (res, model, id) => {
  const Model = getModel(model);
  const error = getError(model);

  Model.destroy({ where: { id } }).then((numOfRowsDeleted) => {
    if (numOfRowsDeleted === 0) {
      res.status(404).json(error);
    } else {
      res.status(204).json(numOfRowsDeleted);
    }
  });
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  removePassword,
};
