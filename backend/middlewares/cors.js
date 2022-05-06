const allowedCors = [
  'https://mesto.buldenkov.nomoredomains.xyz',
  'http://mesto.buldenkov.nomoredomains.xyz',
  'http://localhost:3000',
];

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;
  console.log(origin);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  // if (allowedCors.includes(origin)) {

  // }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
