const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controlers/productsController');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json('Hello, World!');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/product', productsController.getAll);
app.get('/product/:id', productsController.getById);
app.post('/product', productsController.create);
app.put('/product/:id', productsController.update);
app.delete('/product/:id', productsController.remove);

app.listen(3000, () => console.log('Listening port 3000'));