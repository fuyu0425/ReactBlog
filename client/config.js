const config = {
  'apiServer' : (process.env.NODE_ENV == 'development') ? '' : 'http://localhost:8000'
};

module.exports = config;
