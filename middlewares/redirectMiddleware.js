module.exports = (req, res, next) => {
  if(req.url === '/produtos') {
    console;log('Redicionamento ativado, encaminhando para a products');
    return res.redirect(301, '/products')
  }
  next();
}