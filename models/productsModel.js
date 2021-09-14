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
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  return db.collection('products').findOne(ObjectId(id));
};

const create = async (name, quantity) => {
  const db = await connect();
  const { insertedId } = await db.collection('products').insertOne({ name, quantity });
  console.log(insertedId);
  return { _id: insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
  const db = await connect();
  await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  const updatedProduct = await db.collection('products').findOne({ _id: ObjectId(id) });
  return (updatedProduct);
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connect();
  const productToExlude = await db.collection('products').findOne({
      _id: ObjectId(id),
    });

  await db.collection('products').deleteOne({
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
  productExists,
};
