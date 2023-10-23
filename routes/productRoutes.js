const express = require("express");
const router = express.Router();

router.get('/:id', (req,res) => {
  const IdRecebido = req.params.id;
  //conectar com um controller pra buscar os dados
})


module.exports = router;