module.exports = (req, res, next) => {
  if (req.url === "/produtos") {
    console.log("Redirecionamento ativado, encaminhando para products");
    return res.redirect(301, "/products");
  }
  next();
};
