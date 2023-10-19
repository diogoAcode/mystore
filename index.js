const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Alteração');  
})

app.get('/categories', categoryRoutes);


app.listen(port, () => {
  console.log('Servidor rodando em http://localhost:' + port)
})