const filesystem = require("fs").promises;
const path = require("path");

const categoriesFilePath = path.join(__dirname, "../data/products.json");

const getProductById = (productId) => {
  //logica para acessar os produtos, procurar pelo "productId" e retornar esse produto (ou um erro)
}


module.exports = {
  getProductById
}
