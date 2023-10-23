const filesystem = require("fs").promises;
const path = require("path");

const productFilePath = path.join(__dirname, "../data/products.json");

const getProducts = () => {
  return filesystem
    .readFile(productFilePath, "utf-8")
    .then((productsData) => JSON.parse(productsData))
    .catch((error) => {
      throw new Error("Não foi possível ler o arquivo de produtos!");
    });
};

const getProductById = (productId) => {
  return getProducts()
    .then((allProducts) =>
      allProducts.find((product) => product.id === parseInt(productId))
    )
    .catch((error) => {
      throw new Error("Não foi possível encontrar o produto");
    });
};

const searchProductByName = (productName) => {
  return getProducts()
    .then((productsData) => {
      const filtredProds = productsData.filter((product) =>
        product.title.toLowerCase().includes(productName.toLowerCase())
      );

      return filtredProds;
    })
    .catch((error) => {
      throw new Error("Não foi possível encontrar produtos pelo nome");
    });
};

module.exports = {
  getProducts,
  getProductById,
  searchProductByName,
};
