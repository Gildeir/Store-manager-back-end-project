const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (completeSale) => {
  const db = await connect();
  const sale = await db.collection('sales').insertOne({ itensSold: completeSale });  
  return sale.ops[0];
};

const getAll = async () => {
  const db = await connect();
  const all = db.collection('sales').find().toArray();
  return all;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  return db.collection('sales').findOne(ObjectId(id));
};

const update = async (id, quantity) => {
  const db = await connect();
  await db.collection('sales')
    .updateOne({
      _id: ObjectId(id),
    }, { $set: { quantity } });
  const updatedProduct = await db.collection('sales').findOne({
    _id: ObjectId(id),
  });
  return (updatedProduct);
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connect();
  const productToExlude = await db.collection('sales').findOne({
    _id: ObjectId(id),
  });

  await db.collection('sales').deleteOne({
    _id: ObjectId(id),
  });
  return productToExlude;
};

module.exports = {
  getAll,
  getById,
  exclude,
  update,
  create,
};
