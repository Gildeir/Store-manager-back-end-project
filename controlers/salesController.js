const salesServices = require('../services/salesServices');
const salesModel = require('../models/salesModel');

const INVALID_QUANTITY_ERROR = (res) => res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
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
  const sales = await salesModel.getAll();
  // const itemSoldValues = itemSold.values();
  // console.log(itemSoldValues);  
  return res.json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await salesModel.getById(id);
  if (!products) return WRONG_ID_FORMAT(res);
  return res.status(200).json(products);
};

const create = async (req, res) => {
  const completeSale = req.body;
  const { quantity } = completeSale[0];
  if (!salesServices.isValidQuantityPositive(quantity)) return INVALID_QUANTITY_ERROR(res);
  if (!salesServices.isValidQuantityInterget(quantity)) return INVALID_QUANTITY_ERROR(res);
  const salesCreated = await salesServices.createSale(completeSale);
return res.status(200).json(salesCreated);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removed = await salesServices.deletedProduct(id);
    if (!removed) return WRONG_ID_FORMAT(res);
  return res.status(200).json(removed);
};
const update = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const updateDProduct = await salesServices.update(id, quantity);
  if (!salesServices.isValidQuantityPositive(quantity)) return INVALID_QUANTITY_ERROR(res);
  if (!salesServices.isValidQuantityInterget(quantity)) return INVALID_QUANTITY_ERROR(res);
    return res.status(200).json(updateDProduct);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};