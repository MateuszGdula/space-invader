const path = require("path");

module.exports = {
  entry: {
    "space-invader": "./src/js/init.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].min.js"
  }
};
