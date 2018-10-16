module.exports = {
  // webpack folder's entry js - excluded from jekll's build process.
  entry: "./webpack/entry.js",
  output: {
    // we're going to put the generated file in the assets folder so jekyll will grab it.
    path: __dirname + 'src/assets/javascripts/',
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  mode: 'development' // Avoids a warning when running `webpack`.
                      // Set to 'production' for minified version.
};
