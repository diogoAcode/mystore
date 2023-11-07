const cors = require("cors");
const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const redirectMiddleware = require("./middlewares/redirectMiddleware");
const logMiddleware = require("./middlewares/logMiddleware");
const rateLimit = require("./middlewares/rateLimitMiddleware");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(redirectMiddleware);
app.use(logMiddleware);
//app.use(rateLimit);

app.get("/", (req, res) => {
  res.send("Bem vindo a API de E-commerce do Infnet!");
});
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:" + port);
});
