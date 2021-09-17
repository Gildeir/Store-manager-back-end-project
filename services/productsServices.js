const productsModel = require('../models/productsModel');

const isValidName = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;
  return true;
};

const isValidQuantityPositive = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};
const isValidQuantityInterger = (quantity) => {
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
  const isProductValidQuantityInterger = isValidQuantityInterger(quantity);
  if (!isProductValidName) return false;
  if (!isProductValidQuantityPositive) return false;
  if (!isProductValidQuantityInterger) return false;
  if (productExists) return null;
  const productCreated = await productsModel.create(name, quantity); 
  return productCreated;
};

const update = async (id, name, quantity) => {
  const up = await productsModel.update(id, name, quantity);
  const isProductValidName = isValidName(name);
  const isProductValidQuantityPositive = isValidQuantityPositive(quantity);
  const isProductValidQuantityInterger = isValidQuantityInterger(quantity);
  if (!isProductValidName) return false;
  if (!isProductValidQuantityPositive) return false;
  if (!isProductValidQuantityInterger) return false;
  if (!up) return null;
  return up;
};

const deletedProduct = async (id) => {
 const productToDelete = await productsModel.exclude(id);
 return productToDelete;
};

module.exports = {
  createProdut,
  isValidName,
  isValidQuantityPositive,
  isValidQuantityInterger,
  getById,
  update,
  deletedProduct,
};