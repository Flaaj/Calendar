const path = require("path");

module.exports = {
    entry: ["@babel/polyfill", "./src/app.js"],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, "build"),
    },
    devServer: {
        contentBase: path.join(__dirname),
        publicPath: "/build/",
        compress: true,
        port: 3001,
        open: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.s[ac]ss/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
        ],
    },
};
