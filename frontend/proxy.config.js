const proxy = [
    {
      context: '/api',
      target: 'http://localhost:8088',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;