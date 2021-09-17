const salesModel = require('../models/salesModel');

const isValidQuantityPositive = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};
const isValidQuantityInterget = (quantity) => {
  if (!Number.isInteger(quantity)) return false;
  return true;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  return product;
};

const createSale = async (completeSale) => {
  const { quantity } = completeSale[0];
  const isSalesValidQuantityPositive = isValidQuantityPositive(quantity);
  const isSalesValidQuantityInterger = isValidQuantityInterget(quantity);
  if (!isSalesValidQuantityPositive) return false;
  if (!isSalesValidQuantityInterger) return false;
  const salesCreated = await salesModel.create(completeSale);
    return salesCreated;
  };

const update = async (id, productId, quantity) => {
  const isSalesValidQuantityPositive = isValidQuantityPositive(quantity);
  const isSalesValidQuantityInterger = isValidQuantityInterget(quantity);
  if (!isSalesValidQuantityPositive) return false;
  if (!isSalesValidQuantityInterger) return false;
  const up = await salesModel.update(id, productId, quantity);
  // if (!up) return null;
  return up;
};

const deletedProduct = async (id) => {
 const productToDelete = await salesModel.exclude(id);
 return productToDelete;
};

module.exports = {
  createSale,
  isValidQuantityPositive,
  isValidQuantityInterget,
  getById,
  update,
  deletedProduct,
};