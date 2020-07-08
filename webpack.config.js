const path = require("path");

module.exports = {
  // entry: "./src/index.js",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  devServer: {
    contentBase: path.join(__dirname, ""),
    compress: true,
    port: 9000,
  },
  target: "node",
};
