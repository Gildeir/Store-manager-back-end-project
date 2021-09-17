const salesServices = require('../services/salesServices');
const salesModel = require('../models/salesModel');

const INVALID_QUANTITY_ERROR = (res) => res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });

// error req 2

const WRONG_ID_FORMAT = (res) => res.status(404).json({
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
});
const WRONG_ID_FORMAT_DELET = (res) => res.status(422).json({
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
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
  const sales = await salesModel.getById(id);
  if (!sales) return WRONG_ID_FORMAT(res);
  return res.status(200).json(sales);
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
    if (!removed) return WRONG_ID_FORMAT_DELET(res);
  return res.status(200).json(removed);
};

const update = async (req, res) => {
    const { id } = req.params;
    const saleData = req.body;
    const { productId, quantity } = saleData[0];
    console.log(productId);
    if (!salesServices.isValidQuantityPositive(quantity)) return INVALID_QUANTITY_ERROR(res);
    if (!salesServices.isValidQuantityInterget(quantity)) return INVALID_QUANTITY_ERROR(res);
    const updatedSale = await salesServices.update(id, productId, quantity);
    return res.status(200).json(updatedSale);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};