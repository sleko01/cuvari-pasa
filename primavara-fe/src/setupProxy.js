const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://cuvari-pasa-be.onrender.com",
      changeOrigin: true,
    })
  );
};
