const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // For production builds

module.exports = {
  entry: './src/NavBarButton.jsx', // Entry point of your application
  mode: 'development',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
  },
  plugins: [
    // Other plugins...
    new MiniCssExtractPlugin({
      filename: 'navBarButtonStyles.css', // Name of the extracted CSS file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader', // Use file-loader to handle SVG files
            options: {
              name: 'images/[name].[ext]', // Define the output directory and file name
            },
          },
        ],
      },
      {
        test: /\.js$/, // Match JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel loader
        },
      },
    ],
  },
};
