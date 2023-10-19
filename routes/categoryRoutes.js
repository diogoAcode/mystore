const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/categories', (req, res) => {
  categoryController.getCategories()
  .then((categories) => res.json(categories))
  .catch((error) => res.status(500).send('Erro ao obter as categorias'))

  console.log("camada de roteamento");
  
})


module.exports = router;