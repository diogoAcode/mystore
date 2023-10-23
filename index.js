const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bem vindo a API de E-commerce do Infnet!');  
})

app.use('/categories', categoryRoutes);
app.use('./products', productRoutes);


app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port)
})