长久以来，数组一直是js中唯一的集合类型，不过有些开发者认为非数组对象也是集合，只不过是键值对集合，他们与数组的用法完全不一样。es6制定以前，可选的集合类型有限，数组使用的又是数值型索引，如果开发者想用非数值索引，就会用到set集合和map集合。

# es5中Set和Map集合

在es5中，开发者们使用对象来模拟set和map集合，就想这样：

```javascript
var set = {};
set.foo = true;
if(set.foo){
    //要执行的代码
}
```
在这个示例中，将set的foo属性赋值为true，使用if判断判断set.foo
```javascript
var map = {};
map.foo = 200;
var value = map.foo;
console.log(value)
```
这段代码中将200存储在map的foo属性中
**一般来说，set集合常用作检查对象中是否存在某一个键名，map集合常用做获取已存的信息。**

# es6中的set集合

es6新增的set类型是一种有序列表，其中含有一些相互独立的非重复值，通过set集合可以快速访问其中的数据。

## 创建set集合并且添加数据

调用new Set()创建Set集合，调用add()方法向集合中添加元素，访问集合的size属性可以获取集合中目前存在的元素数量：

```javascript
let set = new Set();
set.add(5);
set.add("5")
console.log(set); //Set(2) { 5, '5' }
console.log(set.size); //2
```
在Set集合中，不会对所存在的值进行强制的类型转换，数字5和字符串5可以作为两个独立的元素存在。
```javascript
let set = new Set();
set.add(5);
set.add("5");
set.add(5); //重复，这一次忽略
console.log(set); //Set(2) { 5, '5' }
console.log(set.size); //2
```
上述代码中，重复添加了两次5，因为set中已经存在5这个元素，所以会忽略第二次添加的5。因此我们知道，set集合中重复的元素是会被清除的，所以可以使用set的这个特性来进行数组的去重(去除数组中重复的元素)，代码如下：
```javascript
var arr = [1,1,1,2,2,2,3,3,3]
console.log(new Set(arr)); //Set(3) { 1, 2, 3 }
```
从结果可知，数组中重复的项被清楚了，但是经过Set去重之后的数组，变成了一个set集合的形式，所以要想去重之后将set集合再变成数组，可以使用一个数组的方法Array.from
```javascript
var arr = [1,1,1,2,2,2,3,3,3]
console.log(
    Array.from(new Set(arr)); //[1,2,3]
)
```
其实通过上述的几个例子，我们除了要知道可以使用add方法往set集合中添加元素之外，我们还可以借助数组来初始化set集合中的元素，代码如下：
```javascript
var arr = [1,2,3]
var set = new Set(arr);
console.log(set); //Set(3) { 1, 2, 3 }
console.log(set.size); //3
```
## 移除set集合中的元素

调用delete方法可以移除set集合中的元素，使用clear方法可以移除集合中所有的元素，代码如下：

```javascript
var set = new Set()
set.add(1)
set.add(2)
set.add(3)
console.log(set); //Set(3) { 1, 2, 3 }
set.delete(3); 
console.log(set); //Set(2) { 1, 2 }
set.clear();
console.log(set); //Set(0) {}
```
上述代码中，我们经过delete或者clear方法之后，打印一下set的状态，就可以直到set中现在存在什么元素了。如果你想判断set中是否含有某一个元素，可以调用has方法。
```javascript
var set = new Set()
set.add(1)
set.add(2)
console.log(set.has(2)); //true
console.log(set.has(3)); //false
```
## set集合的forEach方法

遍历数组的时候可以使用forEach方法，代码如下：

```javascript
var arr = ['a','b','c']
arr.forEach((item,index)=>{
    console.log(item)
    console.log(index)
})
```
数组的forEach方法接受一个函数作为参数，这个函数接受item和index作为形参，其中item指每一次便利时候的项目，index指每一个被遍历到的项目在数组中的下标值。
可以发现使用forEach没必要再去写for循环，set集合也可以调用forEach，代码如下：

```javascript
var set = new Set()
set.add('a')
set.add('b')
set.add('c');
set.forEach((item)=>{
    console.log(item)
})
```
由于set集合中元素是没有下标值的，所以set使用forEach的时候，可以只写一个参数item，不用写index，其中item指代每一次被遍历到的元素。
## 将set集合转化为数组

之前我们使用Array.from将set集合转化为数组，还有一种方法，就是使用展开运算符，代码如下：

```javascript
var set = new Set()
set.add('a')
set.add('b')
set.add('c');
var arr = [...set];
console.log(arr);
```
上述代码中三个点就是展开运算符，他会将set集合中所有元素拿出来，然后我们在外部套一个[]，将从set集合中拿出来的元素放进去，就可以形成一个新的数组。
# es6中的map集合

es6中的Map类型是一种存储着许多键值对的有序列表，其中的键名和对应的值可以是任何数据类型，跟对象不一样的是，对象的键只能是字符串类型，而map的键可以是任何类型，代码如下：

```javascript
var obj = {}
obj["name"] = 'lucy';
obj["age"] = 20;
console.log(obj); //{ name: 'lucy', age: 20 }

var map = new Map()
map.set(100, "100")
map.set('name', 'lucy')
map.set(function () { }, 100);
console.log(map)
// Map(3) {
//     100 => '100',
//         'name' => 'lucy',
//             [Function(anonymous)] => 100
// }
```
map集合使用set方法往集合中添加元素，第一个参数是键名，第二个参数是值，可以看到map集合中键名可以是任何的数据类型，键和值用=>链接，并且键值对是一个有序列表，用逗号隔开。
如果要获取map集合中的键中保存的值，需要使用get方法：

```javascript
var map = new Map()
map.set(100, "100")
map.set('name', 'lucy')
console.log(
    map.get("name") //lucy
)
```
## 移除map集合中的元素

跟set一样，使用delete移除一个元素，使用clear方法移除所有元素，使用size获取map元素的数量，使用has判断map中是否含有某一个元素：

```javascript
var map = new Map()
map.set(100, "100")
map.set('name', 'lucy')
map.set('age' , 100)
map.delete('name')
console.log(map); //Map(2) { 100 => '100', 'age' => 100 }
console.log(map.size); //2
console.log(map.has("name")); //false
map.clear()
console.log(map); //Map(0) {}
```
## map集合的初始化方法

可以向map构造函数传入数组来初始化一个map集合，跟set一样，数组中的第一项是map的键，第二项是对应的值，代码如下：

```javascript
var arr1 = ['name' , 100]
var arr2 = [false , "abc"]
var map = new Map([arr1,arr2])
console.log(map); //Map(2) { 'name' => 100, false => 'abc' }
```
要注意的是，set直接传入数组即可，map将传入的数组外部还要嵌套一个[]
## map集合的forEach方法

```javascript
var arr1 = ['name' , 100]
var arr2 = [false , "abc"]
var map = new Map([arr1,arr2])
map.forEach((item,key)=>{
    console.log(item)
    console.log(key)
})
```
map的forEach中接受一个函数，函数接受item和key两个参数，其中item指被遍历到的键值对的值，key指被便利到的键值对的键。
