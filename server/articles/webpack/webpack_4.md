# source map

经过之前的学习，我们知道入口文件最终会被编译成为出口文件，然后将出口js文件引入到dist(webpack默认出口文件夹)的index.html文件中，那么如果这个出口的js文件存在语法错误呢？下边我们来看一个例子。

在src文件夹中创建一个error.js文件，代码如下：

```javascript
console.log(a);
let a = 100;
export default a;
```
如果你学习过es6的语法，可以知道let定义的变量是不能变量提升的，因此在定义之前访问a变量就会报错。然后，将这个error.js文件引入到index.js这个入口文件中，代码如下：
```javascript
//src/index.js
import a from './error';
```
然后进行webpack的编译，webpack只负责将你的入口文件进行编译，并不会检查你的入口文件是否存在语法的错误，因此会产生一个存在语法错误的出口文件。假如这个出口文件为app.bundle.js，将这个js文件引入到html文件中在浏览器中打开，浏览器控制台会出现以下错误：
```javascript
app.bundle.js:1 Uncaught ReferenceError: Cannot access 'e' before initialization
    at app.bundle.js:1:32
    at app.bundle.js:1:46
```
可以发现，报错的位置在app.bundle.js第一行第32和第46个字符的位置。而我们回到app.bundle.js文件中查看这个错误，会发现这根本不是人读的代码(如果代码量比较多的情况下)。
总之一句话，我们既需要在看到错误的时候能够很方便的找到报错的位置，又需要找到报错真正发生在源文件的位置。webpack给我们提供了一个source map功能，可以在报错的时候，告诉我们是哪个文件的哪一行报错，方便了我们去更改错误。下边我们就使用一下这个功能。

```javascript
//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```
上述代码中，添加inline-source-map，然后重新编译。当编译完成重新打开dist文件夹中的html文件的时候，浏览器控制台报错变成了如下这样：
```javascript
error.js:1 Uncaught ReferenceError: Cannot access 'e' before initialization
    at error.js:1:13
    at app.bundle.js:1:46
```
可以看到，在这份错误报告中，明确告诉了我们报错在源文件error.js中的位置。
# 使用观察者模式

使用了webpack之后，我们发现当修改了webpack的入口文件以及与入口文件相互引用的文件之后，需要重新执行编译的指令，那有没有一种可以自动编译的工具呢？此时就可以使用webpack的观察者模式，只需要在第一次运行编译命令的时候，加一个watch，指令如下：

```javascript
npx webpack --watch
```
当使用这个指令编译的时候，在你修改了入口文件或者与入口文件存在相互引用的文件的时候，webpack就会自动编译。
# webpack-dev-server

如果你有使用过react的经验，就会知道当我们运行npm start之后，react会自动编译并且打开一个服务器，将我们编辑的组件显示到浏览器中，而且当我们修改了某一个文件并进行保存后，修改的内容会自动同步到浏览器中。webpack给我们提供了一个跟上述功能一致的服务器，下边我们来使用一下。

**1.安装webpack-dev-server**

```javascript
npm i webpack-dev-server --save-dev
```
**2.修改webpack.config.js文件**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static : {
            directory : path.resolve(__dirname , 'dist'),
        }
    },
};
```
**3.执行**
我们在执行的时候，执行以下语句：

```javascript
npx webpack-dev-server --open
```
可以发现，当编译完毕，webpack会自动打开浏览器，并将dist文件夹中的html文件运行在http://lcoalhost:8080 ，如果你再去修改入口文件或者与入口文件相关的文件，webpack会自动编译并且将最新的编译结果反馈到浏览器中。
知道了webpack-dev-server的基本使用之后，我们来学习一下它的一些属性。在webpack.config.js文件的devServer中，static属性中通过directory规定webpack服务器打开的html页面的文件夹。如果你想修改一下webpack打开的服务器的地址的端口的话，可以给devServer添加port属性，比如：

```javascript
devServer: {
        static : {
            directory : path.resolve(__dirname , 'dist'),
        },
        port : 3000
    },
    
```
此时服务器的端口就会变成3000
# 使用脚本

编译webpack的方式有很多，我们可以把常用的编译指令编写成为脚本，方便我们运行，只需要在package.json文件的scripts中编辑即可，下边我们将常用的编译指令都编辑成为脚本：

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "npx webpack-dev-server --open",
    "build" : "npx webpack",
    "watch" : "npx webpack --watch"
  },
  
```
运行脚本有两种方式：
```javascript
npm run start
npm start
```
可以选择其中一种进行运行。
# 抽离css文件

在之前的webpack的css学习中，我们使用style-loader和css-loader来解析和构建css，可以发现编译好的css样式可以在浏览器的head标签中显示，下边我们尝试将css进行分离，分离成为单独的css文件，并且自动引入到index.html文件之中。

**1.安装mini-css-extract-plugin**

```javascript
npm i mini-css-extract-plugin --save-dev
```
**2.配置webpack.config.js**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ]
}
```
**3.运行**
运行webpack，可以发现dist文件夹中多了一个css文件，并且自动引入到了html文件之中。

