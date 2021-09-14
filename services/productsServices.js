const productsModel = require('../models/productsModel');

const isValidName = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;
  return true;
};

const isValidQuantityPositive = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};
const isValidQuantityInterget = (quantity) => {
  if (!Number.isInteger(quantity)) return false;
  return true;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const createProdut = async (name, quantity) => {
  const productExists = await productsModel.productExists(name); 
  const isProductValidName = isValidName(name);
  const isProductValidQuantityPositive = isValidQuantityPositive(quantity);
  const isProductValidQuantityInterger = isValidQuantityInterget(quantity);
  if (!isProductValidName) return false;
  if (!isProductValidQuantityPositive) return false;
  if (!isProductValidQuantityInterger) return false;
  if (productExists) return null;
  const productCreated = await productsModel.create(name, quantity); 
  return productCreated;
};

// const update = async({ id, name, quantity });
module.exports = {
  createProdut,
  isValidName,
  isValidQuantityPositive,
  isValidQuantityInterget,
  getById,
  // update,
};