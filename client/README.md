# create-gainor-app

A boilerplate application for creating react apps. Includes hot module replacement and webpack's dev server. Also comes configured with ESLint and Prettier. :)

# Scripts

When **webpack-dashboard** is enabled, update dev start script to:

```javscript
 "scripts": {
    "dev": "webpack-dashboard webpack-dev-server --mode development --open --hot",
 }
```

# DEPENDENCIES

* React
* ReactDOM

# DEV DEPENDENCIES

* **html-webpack-plugin:** Simplifies creation of HTML files to serve your webpack bundles
* **styled-jsx:** Full, scoped and component-friendly CSS support for JSX
* **style-loader:** Adds CSS to the DOM by injecting a <style> tag
* **css-loader:** interprets @import and url() like import/require() and will resolve them.
* **file-loader:** instructs webpack to emit the required object as file and to return its public URL
* **image-webpack-loader:** Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin
* **webpack-dashboard:** A CLI dashboard for webpack dev server
* **clean-webpack-plugin:** A webpack plugin to remove your build folder(s) before building
* **friendly-errors-webpack-plugin:** Recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience.

## webpack

To compile & bundle assets together into one file to serve to the browser

* **webpack:**
* **webpack-dev-server:**
  Use webpack with a development server that provides live reloading. This should be used for development only.
* **webpack-cli:** allows me to run webpack commands. Will use for the build script
* **webpack-manifest-plugin:** will generate a manifest.json file in your root output directory with a mapping of all source file names to their corresponding output file
* **extract-text-webpack-plugin@next:** Extract text from a bundle, or bundles, into a separate file: instead of inlining the CSS in JS, we create a separate style.css file that loads in parallel.

## babel

Turn ES6 (classes, imports, etc..) code into readable vanilla ES5

* **babel-core:** Babel compiler core.
* **babel-loader:** This package allows transpiling JavaScript files using Babel and webpack.
* **babel-preset-env:** Babel preset that automatically determines the Babel plugins you need based on your supported environments. Compiles ES6 and beyond.
* **babel-preset-react:** Transform JSX
* **babel-plugin-transform-class-properties:** https://reactjs.org/docs/handling-events.html
* **babel-plugin-transform-object-rest-spread:** Transform rest properties for object destructuring assignment and spread properties for object literals

## INSTALL

npm i react react-dom prop-types styled-jsx dotenv-webpack

### webpack

npm i -D webpack webpack-dev-server webpack-cli css-loader style-loader html-webpack-plugin image-webpack-loader file-loader clean-webpack-plugin extract-text-webpack-plugin@next

### babel

npm i -D babel-core babel-loader babel-preset-env babel-preset-react babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread
