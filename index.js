const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controlers/productsController');
const salesController = require('./controlers/salesController');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json('Hello, World!');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// products route
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', productsController.create);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.remove);

// sales route
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.post('/sales', salesController.create);
app.put('/sales/:id', salesController.update);
app.delete('/sales/:id', salesController.remove);

app.listen(3000, () => console.log('Listening port 3000'));