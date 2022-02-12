# 条件渲染

## v-if

实现元素是否渲染可以使用Vue的v-if语法，代码如下：

```html
<body>
<div id="app">
    <h1 v-if="now">now为true</h1></h1>
    <h2 v-else>now为false</h2>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data : {
            now : true
        }
    })
</script>
</body>
```
同样，你也可以使用类似于原生JS的else if语法，代码如下：
```html
<body>
<div id="app">
        <span v-if="num == 1">1</span>
        <span v-else-if="num == 2">2</span>
        <span v-else>3</span>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                num : 3
            }
        })
</script>
</body>
```
在你所绑定的v-if元素会根据是否满足条件而选择食肉去渲染这个元素。即会根据破判断条件决定dom结构。
## v-show

v-show跟v-if使用效果一样，但不同之处在于v-show只会更改元素的display状态，而不会改变dom结构。代码如下：

```html
<body>
    <div id="app">
        <p v-show="now">now为true</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                now : false
            }
        })
    </script>
</body>
```
# 列表渲染

## v-for

使用v-for可以将一个数组进行元素的循环渲染，代码如下：

```html
<body>
    <div id="app">
        <ul>
            <li v-for="item in list">{{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                list : ["A" ,"B" , "C"]
            }
        })
    </script>
</body>
```
上述代码中item作为v-for第一个参数指代数组中每一个元素，list就是要遍历的数组。
v-for还支持第二个参数索引值，代码如下：

```html
<body>
    <div id="app">
        <ul>
          <li v-for="(item,index) in list">第{{index}} : {{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                list : ["A" ,"B" , "C"]
            }
        })
    </script>
</body>
```
上述代码中index就是数组中每一个元素的下标。
## 使用of作为分隔符

在使用v-for的时候，我们也可以用of代替in作为分隔符，他也是最接近JS原生语法的语句。代码如下：

```html
<body>
    <div id="app">
        <ul>
            <li v-for="item of list">{{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                list : ["A" ,"B" , "C"]
            }
        })
    </script>
</body>
```
## 对象的v-for使用

v-for除了能遍历数组之外，也可以遍历对象，代码如下：

```html
<body>
    <div id="app">
        <ul>
            <li v-for="item of obj">{{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                obj : {
                    name : "Eric",
                    age : 10
                }
            }
        })
    </script>
</body>
```
同样的，你也可以使用v-for第二个参数来代指对象的键，代码如下：
```html
<body>
    <div id="app">
        <ul>
            <li v-for="(item,key) of obj">{{key}} : {{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                obj : {
                    name : "Eric",
                    age : 10
                }
            }
        })
    </script>
</body>
```
## v-for配合计算属性

使用v-for可以实现简单的数据渲染工作，但是如果想要使用v-for来渲染某一条数据处理之后的副本，即一条数据改变之后的结果，可以配合计算属性使用，代码如下:

```html
<body>
    <div id="app">
        <ul>
            <li v-for="item of newArr">{{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data : {
                arr : [1,2,3]
            },
            computed: {
                newArr : function(){
                    return this.arr.map((item)=>{
                        return item*2;
                    })
                } 
            }
        })
    </script>
</body>
```
## v-for v-if同时使用

我们先来看一段代码：

```html
<body>
    <div id="app">
        <ul>
            <li v-for="item in list" v-if="item % 2 == 0">{{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                list: [1, 2, 3, 4]
            }
        })
    </script>
</body>
```
上述代码中我们对list数组进行循环渲染，但也添加了条件，对偶数值渲染，基数值不渲染。当存在这种既有v-for又有v-if的时候，v-for优先级会更高一些。也就是说v-if会对每一个循环到的数据进行判断，最后才决定哪些渲染哪些不渲染。如果开发者仅要渲染一部分是数据，这种方式可以节省很多性能。
## 组件中使用v-for

在组件中使用v-for时，需要添加一个key属性，代码如下：

```html
<div id="app">
   <my-component v-for="{item,index} in list" v-   bind:key="index"></my-component>
</div>
```
## key关键字

为了给Vue一个提示，以便跟踪每一个通过v-for渲染的元素，从而选择是否重用现有的元素，开发者需要给每一个这样的元素提供一个key。

## 事件处理on

## 方法事件处理器

## 内联处理器

## 键值修饰符

在监听键盘事件时，我们经常需要检测常用的键值，即每一个键盘中的键的代码，vue允许我们在v-on监听键盘事件时添加修饰符，代码如下：

```html
<body>
    <div id="app">
        <input type="text" v-on:keyup.13='change'>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el : "#app",
            methods :{
                change : function(){
                    console.log('111')
                }
            }
        })
    </script>
</body>
```
上述中keyup为13就是我们的回车键，当然记数字比较麻烦，你也可以使用vue提供的常用键的别名操作，比如回车键可以写为：
```html
<input type="text" v-on:keyup.enter='change'>
```
vue全部的按键别名如下：
.enter

.delete

.esc

.space

.up

.down

.left

.right

## 鼠标修饰符

.left

.right

.middle

示例如下：

```html
<body>
    <div id="app">
        <button v-on:mousedown.right="change">按钮</button>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el : "#app",
            methods :{
                change : function(){
                    console.log('111')
                }
            }
        })
    </script>
</body>
```
# 表单

## 文本输入

文本输入框常使用v-model双向绑定来实现视图和数据的统一，代码如下：

```html
<body>
    <div id="app">
        <input type="text" v-model="message">
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el : "#app",
            data : {
                message : ""
            }
        })
    </script>
</body>
```
## 多行文本

多行文本是网页中的代码块，代码如下：

```html
<body>
    <div id="app">
        <p style="white-space: pre-line;">{{message}}</p>
        <textarea v-model="message"></textarea>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el : "#app",
            data : {
                message : ""
            }
        })
    </script>
</body>
```
## 复选框

复选框用于逻辑值的勾选，代码如下：

```html
<body>
    <div id="app">
        <div>checkName ：{{checkName}}</div>
        <label for="a">张三</label>
        <input type="checkbox" id="a" value="张三" v-model="checkName">
        <label for="b">李四</label>
        <input type="checkbox" id="b" value="李四" v-model="checkName">
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el : "#app",
            data : {
                checkName : []
            }
        })
    </script>
</body>
```
## 单选按钮

单选框只能选中其中一个，所以在设置数据时，可以将多个单选框选中一个数据，代码如下：

```html
<body>
    <div id="app">
        <p>选择了：{{value}}</p>
        <label for="a">A</label>
        <input type="radio" id="a" value="A" v-model="value">
        <label for="b">B</label>
        <input type="radio" id="b" value="B" v-model="value">
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el : "#app",
            data : {
                value : ""
            }
        })
    </script>
</body>
```
## select按钮

如果页面中有很多选项可以使用select选择按钮，代码如下：

```html
<body>
    <div id="app">
        <p>选择了：{{selected}}</p>
        <select v-model="selected">
            <option>上海</option>
            <option>北京</option>
            <option>天津</option>
            <option>大连</option>
        </select>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        var vm = new Vue({
            el : "#app",
            data : {
                selected : ""
            }
        })
    </script>
</body>
```

## 

