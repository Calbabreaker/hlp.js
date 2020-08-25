const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");

module.exports = (env = {}) => {
  const minimize = env.MINIMIZE || false;
  const date = new Date().toISOString().slice(0, 10);

  const filename = `hlp${minimize ? ".min" : ""}.js`;
  const banner = `${pkg.name} v${pkg.version} by Calbabreaker ${date} \nFree to use. ${pkg.license}.`;

  return {
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: filename,
    },
    plugins: [new webpack.BannerPlugin(banner)],
    optimization: { minimize },
    devServer: {
      contentBase: [path.resolve(__dirname, "./demo"), path.resolve(__dirname, "./build")],
      open: true,
      openPage: "",
      compress: true,
      port: 8000,
      proxy: {
        "/build": {
          target: "http://localhost:8000/",
          pathRewrite: { "^/build": "/" },
        },
      },
    },
  };
};
