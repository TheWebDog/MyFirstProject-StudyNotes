# 思考

在学习webpack之前，我们先思考几个问题：

```javascript
1.浏览器能读懂哪些类型的文件？支持es6吗？
2.为什么浏览器能读懂react编写的jsx语法？
3.模块化是什么？浏览器怎么请求多个js文件？
```
## 问题1

浏览器可以读懂css，js，html文件，对于es6的部分语法不支持，比如：

```javascript
var a = 100;
export default a;
```
将上述代码在浏览器中运行会报错。
## 问题2

react编写的主要是jsx语法，在编写好jsx语法的文件之后，运行npm start会编译并且运行这些文件，编译好的jsx语法会转化成浏览器能读懂的html，css，js语法。

## 问题3

模块化是一个语言膨胀发展的必经之路，它能够帮助开发者拆分和组织代码。如果你想写一个非常简单的demo，那么只需要很简单的一个html文件和js文件等其他文件即可，但如果项目的逻辑非常多，也就意味着js文件会非常的大，为了更好的维护，不得不将一个项目的多个功能拆分成不同的js文件。但这会影响浏览器的加载速度，浏览器不得不发起多个http请求来请求不同的js文件。

# 为什么使用webpack的总结

```javascript
1.浏览器加载js效率可以提高
2.可以让浏览器支持各种类型的语法或者文件
```


