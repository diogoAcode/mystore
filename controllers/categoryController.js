const filesystem = require("fs").promises;
const path = require("path");

const categoriesFilePath = path.join(__dirname, '../data/categories.json');

const getCategories = () => {
  return filesystem.readFile(categoriesFilePath, 'utf-8')
    .then((categoriesData) => JSON.parse(categoriesData))
    .catch((error) => {
      throw new Error('Não foi possível ler o arquivo');
    });
};

module.exports = {
  getCategories
};



