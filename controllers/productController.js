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

const updateProduct = (productId, updatedData) => {
  return getProducts()
    .then((productsData) => {
      const productIndex = productsData.findIndex(
        (product) => product.id === parseInt(productId)
      );

      if (productIndex != -1) {
        const existingProduct = productsData[productIndex];

        if (updatedData.title != undefined) {
          existingProduct.title = updatedData.title;
        }
        if (updatedData.price != undefined) {
          existingProduct.price = updatedData.price;
        }

        productsData[productIndex] = existingProduct;

        return filesystem
          .writeFile(
            productFilePath,
            JSON.stringify(productsData, null, 2),
            "utf-8"
          )
          .then(() => {
            return existingProduct;
          })
          .error((error) => {
            throw new Error("Não foi possível atualizar o produto!");
          });
      } else {
        throw new Error("Não foi encontrado produto com esse id!");
      }
    })
    .catch((error) => {
      throw new Error("Não possível ler os produtos!");
    });
};

const deleteProducts = (productId) => {
  return getProducts()
    .then((productsData) => {
      const productIndex = productsData.findIndex(
        (product) => product.id === parseInt(productId)
      );

      if (productIndex != -1) {
        const updatedProductsData = productsData.filter(
          (product) => product.id !== parseInt(productId)
        );

        const deletedProduct = productsData[productIndex];

        return filesystem
          .writeFile(
            productFilePath,
            JSON.stringify(updatedProductsData, null, 2),
            "utf-8"
          )
          .then(() => {
            return deletedProduct;
          })
          .catch((error) => {
            throw new Error("Não foi possível excluir o produto!");
          });
      } else {
        throw new Error("Produto não encontrado!");
      }
    })
    .catch((error) => {
      throw new Error(
        "Não possível ler os produtos para posteriormente apagar um deles!"
      );
    });
};

const addProduct = (newProductData) => {
  return getProducts()
    .then((productsData) => {
      // Lógica para encontrar o maior id presente na lista de produtos
      let maxProductId = -1;
      productsData.forEach((product) => {
        if (product.id > maxProductId) {
          maxProductId = product.id;
        }
      });

      const newProductId = maxProductId + 1;
      const newProductWithId = Object.assign(
        { id: newProductId },
        newProductData
      );

      productsData.push(newProductWithId);

      return filesystem
        .writeFile(
          productFilePath,
          JSON.stringify(productsData, null, 2),
          "utf-8"
        )
        .then(() => {
          return newProductWithId;
        })
        .catch((error) => {
          throw new Error("Não foi possível adicionar o produto");
        });
    })
    .catch((error) => {
      console.error("Não possível ler o arquivo de produtos:" + error);
    });
};

const applyDiscount = (productId) => {
  return getProducts()
    .then((productsData) => {
      const productIndex = productsData.findIndex(
        (product) => product.id === parseInt(productId)
      );

      if (productIndex != -1) {
        const existingProduct = productsData[productIndex];

        existingProduct.price = existingProduct.price * 0.9;

        productsData[productIndex] = existingProduct;

        return filesystem
          .writeFile(
            productFilePath,
            JSON.stringify(productsData, null, 2),
            "utf-8"
          )
          .then(() => {
            return existingProduct;
          })
          .catch((error) => {
            throw new Error("Não foi possível aplicar o desconto ao produto!");
          });
      } else {
        throw new Error("Produto não encontrado");
      }
    })
    .catch((error) => {
      throw new Error("Não possível ler o arquivo de produtos");
    });
};

const updateProductRating = (productId, newRating) => {
  if (newRating < 0 || newRating > 5) {
    throw new Error("Nota inválida");
  }

  return getProducts()
    .then((productsData) => {
      const productIndex = productsData.findIndex(
        (product) => product.id === parseInt(productId)
      );

      if (productIndex != -1) {
        const existingProduct = productsData[productIndex];

        //jeito mais rápido de fazer atribuições
        //const { rate, count } = existingProduct.rating;

        const rate = existingProduct.rating.rate;
        const count = existingProduct.rating.count;

        existingProduct.rating.rate = (rate * count + newRating) / (count + 1);
        existingProduct.rating.count += 1;

        productsData[productIndex] = existingProduct;

        return filesystem
          .writeFile(
            productFilePath,
            JSON.stringify(productsData, null, 2),
            "utf-8"
          )
          .then(() => {
            return existingProduct;
          })
          .catch((error) => {
            throw new Error("Não foi possível atualizar a nota do produto");
          });
      } else {
        throw new Error("Produto não encontrado");
      }
    })
    .catch((error) => {
      throw new Error("Não possível ler o arquivo de produtos");
    });
};

module.exports = {
  getProducts,
  getProductById,
  searchProductByName,
  updateProduct,
  deleteProducts,
  addProduct,
  applyDiscount,
  updateProductRating,
};
