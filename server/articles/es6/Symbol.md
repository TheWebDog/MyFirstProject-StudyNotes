在es5以及早期版本中，js包含5中基本数据类型，分别是：

```javascript
字符串类型
数字类型
布尔类型
null
undefined
```
es6新增了一种基本数据类型：Symbal
之前我们访问一个对象的时候，可以通过点语法或者方括号[]语法来访问，比如以下代码：

```javascript
var obj = {
    name : 'lucy',
    age : 10
}
console.log(obj.name)
console.log(obj["age"])
```
实质上，对象的键都是用字符串类型来表示的，所以我们可以用方括号语法，里边传入一个字符串来访问。
也就是说在es6之前对象的键只能由字符串来表示，es6中的symbol类型，也可以作为对象的键存在

# 创建symbol

所有基本数据类型，除了symbol之外都有自己的字面形式，比如布尔类型的true或者false，数字类型的100，然而symbol是没有自己的字面形式的，他的创建如下：

```javascript
var first = Symbol();
```
这样就创建了一个symbol，可以给symbol设置一个可选的描述值，这个描述值被保存在内部的[[Description]]中，即我们直接获取是获取不到的，只有在在console.log的时候，他会自动调用toString方法，代码如下：
```javascript
var first = Symbol('这是first的描述');
console.log(first); //Symbol(这是first的描述)
```
# symbol的使用方法

我们可以使用symbol来创建对象的键，代码如下：

```javascript
var first = Symbol('这是first的描述');
var obj = {
    [first] : 100,
    name : "lucy",
    age : 10
}
console.log(obj)
console.log(obj[first])
```
在所有可以计算属性名的地方，都可以使用symbol。
