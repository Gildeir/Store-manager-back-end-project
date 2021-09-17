const productsModel = require('../models/productsModel');
const productsService = require('../services/productsServices');

// error req 1
const NAME_CHARACTER_LENGHT_ERROR = (res) => res.status(422).json({
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      });

const PRODUCT_ALREADY_EXISTS_ERROR = (res) => res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      });

const MUST_BE_POSITIVE_ERROR = (res) => res.status(422).json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      });

const MUST_BE_AN_INTERGER_ERROR = (res) => res.status(422).json({
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
      });
// error req 2

const WRONG_ID_FORMAT = (res) => res.status(422).json({
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
});

const getAll = async (req, res) => {
  const products = await productsModel.getAll();
  return res.json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const products = await productsModel.getById(id);
  if (!products) return WRONG_ID_FORMAT(res);
  return res.status(200).json(products);
};

const create = async (req, res) => {
const { name, quantity } = req.body;
const newProduct = await productsService.createProdut(name, quantity);
  if (!productsService.isValidName(name)) return NAME_CHARACTER_LENGHT_ERROR(res);
  if (!productsService.isValidQuantityPositive(quantity)) return MUST_BE_POSITIVE_ERROR(res);
  if (!productsService.isValidQuantityInterger(quantity)) return MUST_BE_AN_INTERGER_ERROR(res);
  if (newProduct === null) return PRODUCT_ALREADY_EXISTS_ERROR(res);  
  return res.status(201).json(newProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removed = await productsService.deletedProduct(id);
    if (!removed) return WRONG_ID_FORMAT(res);
  return res.status(200).json(removed);
};
const update = async (req, res) => {
    const { id } = req.params;  
    const { name, quantity } = req.body;
    const updateDProduct = await productsService.update(id, name, quantity);
  if (!productsService.isValidName(name)) return NAME_CHARACTER_LENGHT_ERROR(res);
  if (!productsService.isValidQuantityPositive(quantity)) return MUST_BE_POSITIVE_ERROR(res);
  if (!productsService.isValidQuantityInterger(quantity)) return MUST_BE_AN_INTERGER_ERROR(res);
    return res.status(200).json(updateDProduct);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};