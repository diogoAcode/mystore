const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", (req, res) => {
  categoryController
    .getCategories()
    .then((categories) => res.json(categories))
    .catch((error) => res.status(500).send("Erro ao obter as categorias"));

  console.log("camada de roteamento");
});

router.post("/", (req, res) => {
  const newCategory = req.body;
  categoryController
    .createCategory(newCategory)
    .then(() => res.status(201).send("Categoria criada com sucesso"))
    .catch((error) => res.status(500).send("Erro ao criar a categoria"));
});

module.exports = router;
