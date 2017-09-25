module.exports = {
	entry: "./app/app.js",
	output: {
		filename: "public/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: /app/,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015"]
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},
	devtool: "eval-source-map"
};

//original:
// module.exports = {
// 	//describe the entry point or start of this react application
// 	entry: "./app/app.js",
// 	//the plain compiled JavaScript will be output into this file
// 	output: {
// 		filename: "public/bundle.js"
// 	},
// 	//describe the transformations to perform
// 	module: {
// 		loaders: [
// 			{
// 				//only work with files that end with a .js or .jsx extension
// 				test: /\.jsx?$/,
// 				// webpack will only process files in the app folder. This avoids processing
// 				// node modules and server files unnecessarily
// 				include: /app/,
// 				loader: "babel",
// 				query: {
// 					// these are the specific transformations you will use:
// 					presets: ["react", "es2015"]
// 				}
// 			},
// 			{
// 				//this lets you use css files!
// 				//NB version of css-loader https://github.com/webpack-contrib/css-loader/issues/124
// 				test: /\.css$/,
// 				loader: "style-loader!css-loader"
// 			}
// 		]
// 	},
// 	//this will let you debug the react code in chrome dev tools. Errors will
// 	//have lines and file names. Without this, the console will say all errors
// 	//are coming from bundle.js
// 	devtool: "eval-source-map"
// };