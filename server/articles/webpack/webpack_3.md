# 安装

创建一个项目文件夹，初始化package.json

```javascript
npm init -y
```
安装webpack和webpack-cli命令行工具：
```javascript
npm i webpack webpack-cli --save-dev
```
如果你有使用过第三方包的经历，就会知道我们需要通过--save来保存包的信息到package.json文件的dependencies字段中，这些第三方包会在项目的运行阶段使用。而webpack要用做构建项目，因此我们在安装webpack以及webpack-cli的时候，需要使用--save-dev来讲这两个包保存在package.json的devDependencies字段中。
# 基本使用

在创建的项目文件夹中，创建src文件夹，并在src文件夹中创建index.js作为入口文件，在index.js文件中，我们先简单写一些js语句，代码如下：

```javascript
// src/index.js
console.log('abc')
```
然后在命令行中运行以下语句：
```javascript
npx webpack
```
执行完之后，会发现当前的项目文件夹中多了一个dist文件夹，并且有一个main.js文件，这个文件就是经过编译webpack之后的js文件。所有的经过编译的文件都会默认添加到dist文件夹中。
我们在dist文件夹中创建index.html文件，然后引入main.js，打开浏览器，可以在浏览器中看到main.js运行之后的效果。

下边我们在src文件夹中使用es6语法书写一个demo.js文件，并将demo.js文件引入到index.js文件中：

**index.js：**

```javascript
import demo2 from './demo';
console.log(demo2)
console.log('abc')
```
**demo.js:**
```javascript
var demo1 = ()=>{
    console.log('demo1')
}
demo1()

var demo2 = 'demo2';
export default demo2
```
然后使用以下语句进行编译：
```javascript
npx webpack
```
将编译好的main.js引入到index.html文件中，并在浏览器中打开index.html，可以发现demo.js和index.js都运行，且浏览器读懂了es6的语法。
# webpack的配置文件

经过之前的学习，我们知道webpack的默认入口为src文件夹中的index.js文件，默认出口为dist文件夹中的main.js文件，且只能编译js文件，而这远远不够。我们可以根据我们的需要个性化的配置webpack。

在项目文件夹的根目录中创建webpack.config.js文件，代码如下：

```javascript
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
这是webpack默认的配置代码，其中我们用node的path模块来处理文件路径，将webpack的配置通过module.exports进行导出。entry为配置的入口文件，output为配置的出口文件。其中output的filename为出口文件的名称，path为出口文件的目录。下面我们就来学习一下webpack的配置。
# 管理输出

## 管理输入输出

webpack默认的配置中我们只能输入一个js文件且输出一个js文件，可以通过修改默认配置来达到输入输出多个文件。

我们在src文件夹中创建一个print.js文件，代码如下：

```javascript
console.log('print')
```
现在我们将index.js和print.js都作为输入文件，webpack配置如下：
```javascript
const path = require('path');
module.exports = {
  entry: {
      app : './src/index.js',
      print : './src/print.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
将输入的index.js规定为app键名的值，将输入的print.js作为print键名的值。为了让多个输入对应多个输出，我们将输出改为如下：
```javascript
const path = require('path');
module.exports = {
  entry: {
      app : './src/index.js',
      print : './src/print.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
其中[name]会将输入的文件键名进行翻译并且输出，现在我们继续运行webpack，你会在dist文件夹中发现新建了app.js和print.js两个文件。为了展示这两个文件的效果，我们将这两个文件引入到index.html文件中，并且在浏览器中打开。
## **HtmlWebpackPlugin**

在我们上述的实战中，会发现以下几点问题：

```javascript
1.需要手动创建index.html文件
2.需要将输出的js文件手动输入到html文件中
```
而这些问题不应该是全自动的吗？如果不是全自动的，那我们就配置！！！
**1.安装****HtmlWebpackPlugin插件：**

```javascript
npm install --save-dev html-webpack-plugin
```
**2.重新配置webpack**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
};
```
**3.运行webpack**
当配置完上述的插件之后，每次编译webpack你会发现index.html都会被重写，也就说明每一次的编译会重新创建一个html文件并且覆盖之前的。且新建的index.html文件会自动引入输出的所有js文件。

## clean-webpack-plugin

你会发现，当我们每次编译完webpack，dist文件夹中都会根据每次输出的不同产生很多之前遗留的垃圾文件，比如在我们之前的学习中dist文件夹中会残留一个main.js文件，而这只是冰山一角，随着编译次数的增多和不断的修改webpack的输出配置，这种垃圾文件将会一直困扰我们，除非你手动删除。那有没有一种自动清理dist文件夹的方法呢，那就使用clean-webpack-plugin插件吧。

**1.安装**

```javascript
npm install clean-webpack-plugin --save-dev
```
**2.重新配置webpack**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
};
```
**3.运行webpack**
运行完webpack之后，你会发现dist文件夹中的多余文件已经被清除了。只保留webpack配置文件中的输出文件以及index.html文件。

# 管理资源

## 加载css文件

如果你有react或者vue开发的经历，会发现我们在一个组建中可以引入css文件，比如：

```javascript
import 'App.css'
```
那如果我们在输入的index.js文件中引入一个css文件会发生什么呢？
下面我们在src文件夹中创建一个index.css文件，代码如下：

```javascript
div{
    font-size: 40px;
}
```
然后修改index.js文件如下：
```javascript
import demo2 from './demo';
import './index.css'
console.log(demo2)
console.log('abc')

var div = document.createElement('div');
div.innerText = 'hello world'
document.body.appendChild(div)
```
然后运行webpack，你会发现此时控制台报错：
```javascript
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> div{
|     color : 'red'
| }
 @ ./src/index.js 2:0-20
```
这是因为在webpack的编译的时候，需要读取css文件，并且将css文件中的代码输出到index.html的head标签中以内联style的样式进行保存，因此我们需要给webpack添加能解析css的loader，
**1.安装style-loader和css-loader**

```javascript
npm i style-loader css-loader --save-dev
```
**2.重新配置webpack**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
console.log(CleanWebpackPlugin)
module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};
```
**3.运行webpack**
运行之后，我们打开index.html文件，在浏览器的控制台中打开elements选项，并且点击head标签，可以发现index.css中的css语法添加到了head标签的style属性中。

## 加载图片

当我们需要在页面中引入图片的时候，webpack给我们提供了一些loader用于解析图片。

**1.安装file-loader**

```javascript
npm install --save-dev file-loader
```
**2.重新配置webpack**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
console.log(CleanWebpackPlugin)
module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
```
**3.运行webpack**
配置完webpack之后，我们在index.css文件中引入一张图片，然后运行webpack。





