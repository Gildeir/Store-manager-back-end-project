const productsModel = require('../models/productsModel');
// const ProductsService = require('../services/ProductsServices');

const getAll = async (req, res) => {
  const products = await productsModel.getAll();
  return res.json(products);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productsModel.getById(id);
  return res.status(200).json(products);
};
const create = async (req, res) => {
const { name, quantity } = req.body;
const newProduct = await productsModel.create(name, quantity);
if (newProduct === null) return res.status(400).json({ message: 'Product alredy exists' }); 
return res.status(200).json(newProduct);
};
const remove = async (req, res) => {
  const { id } = req.params;
  await productsModel.exclude(id);
  return res.status(202).send();
};
const update = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updateProduct = await productsModel.update(id, name, quantity);
    return res.status(200).json(updateProduct);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};