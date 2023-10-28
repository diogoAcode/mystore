const requestCountByIp = {};

const rateLimit = (req, res, next) => {
  const clientIP = req.ip;

  if(requestCountByIp[clientIP]) {
    if(requestCountByIp[clientIP] > 5) {
      return res.status(429).json({
        error: 'Você atingiu o limite de requisições à cada 30 segundos!'
      })        
    }
    requestCountByIp[clientIP]++;    
  } else {
    requestCountByIp[clientIP] = 1;

    setTimeout(() => {
      delete requestCountByIp[clientIP];
    }, 30000)
  }

  next();
}

module.exports = rateLimit;