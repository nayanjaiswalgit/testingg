const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const proxyTarget = process.env.PROXY_TARGET || "http://localhost/";
  if (process.env.NODE_ENV === "development") {
    app.use(
      createProxyMiddleware("/api", {
        target: proxyTarget,
        secure: false,
      }),
    );
  } else {
    app.use(
      createProxyMiddleware("/api", {
        target: proxyTarget,
        secure: false,
      }),
    );
  }
};
