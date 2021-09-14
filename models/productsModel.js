const { ObjectId } = require('mongodb');
const connect = require('./connection');

const productExists = async (name) => {
  const db = await connect();
  const product = await db.collection('products').findOne({
    name,
  });
  return product !== null;
};

const getAll = async () => {
  const db = await connect();
  return db.collection('products').find().toArray();
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  const db = await connect();
  return db.collection('products').findOne(ObjectId(id));
};

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { id: product.insertId, name, quantity };
};

const update = async (id, name, quantity) => {
  const db = await connect();
  await db.collection('products').updateOne({ name, quantity });
  return ({ _id: ObjectId(id) }, { $set: { name, quantity } });
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connect();
  await db.collection('products').deleteOne({
    _id: ObjectId(id),
  });
};

module.exports = {
  getAll,
  getById,
  exclude,
  update,
  create,
  productExists,
};
