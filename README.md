## 1.初始化

### 环境

##### 安装

```
npm i
```

在 thestudynote 中启动该项目

```
npm run serve
```

在 server 中启本地服务器

```
npm start
```


```
支持直接将md文件放入后端的articles中(需要放在分类文件夹中 如/articles/某分类/文章.md)
```

##### 使用了以下模块(没啥用的部分，我只是记录下我用了啥)

###### 前端部分

```
npm i -g @vue/cli   //全局安装vue环境
```

```
npx vue create thestudynote //初始化vue项目(用的vue2版本 注意文件名字规范)
```

```
npm run serve   //启动项目
```

```
npm i vuex vue-router -S //安装vuex vue-router
(不知道为什么
router安装4.0.12的
vuex安装4.0.2的会报错
我还是用3.5.3和3.6.2的版本好了)
```

```
npm i marked --save //安装marked模块
npm i highlight.js --save //代码高亮
```

```
npm i axios --save //安装axios
```

###### 后端部分

```
npm i express nodemon mongoose --save
//别忘了在package里写上"start": "nodemon app.js"
//npm start调用脚本
```

```
npm i cors --save //解决跨域的包
```

```
npm i async --save //async模块包
```
```
npm i pinyin-pro --save //拼音模块包
```

### git 使用(没啥用的部分，只是记录下)

#### 个人

1. 克隆仓库 或 初始化仓库：  
   `git clone XXX 或 git init`
2. 设置一个 Git 用户名：  
   `git config --global user.name "webDog"`
3. 在 Git 中设置电子邮件地址：  
   `git config --global user.email "2725550609@qq.com"`
4. 添加文件到暂存区  
   `git add -A`
5. 把暂存区的文件提交到仓库  
   `git commit -m "提交信息,用于描述本次提交"`
   也可以  
   `在vscode源码管理中 书写描述 然后 ctrl+回车`
6. 查看提交的历史记录  
   `git log --stat`
   也可以
   `在vscode源码管理中 查看comment`
7. 工作区回滚  
   `git checkout + 文件名`
   也可以  
   `在vscode源码管理中 -->更改-->返回的箭头`
8. 撤销最后一次提交  
   `git reset HEAD^1`
   也可以  
   `在vscode源码管理中 -->comment-->右键undo comment`
9. 查看以前的历史记录  
   `在vscode源码管理中 FILE HISTORY查看有关当前文件的所有记录`

#### 多人协作-分支

1. 以当前分支为基础新建分支  
   `git checkout -b + 名字`
2. 列举所有的分支  
   `git branch`
3. 单纯地切换到某个分支  
   `git checkout + 名字`
4. 删掉特定的分支  
   `git branch -D + 名字`
5. 合并分支  
   `git merge + 名字`
6. 推送当前分支最新的提交到远程  
   `git push + 名字`
7. 拉取远程分支最新的提交到本地  
   `git pull + 名字`

在 vscode 源码管理中 -->BRANCHES 中也可以查看和操作

## 2.文件(简单介绍一下)

### src (vue 入口文件)

> src
>
> > App.vue  
> > router.js //创建 router  
> > store.js //创建根 store  
> > main.js //将 router 和 store 加入到 vue  
> > components //组件模块  
> > style //css 样式合集 其中的 index.css 为导出文件

### components (组件模块)

> components
>
> > home //首页  
> > nav //导航栏  
> > search //搜索框  
> > thefilter // 筛选按钮  
> > list // 文章部分  
> > ... ...

### 模块格式

> 某模块
>
> > index.js //整合并导出 store , 导出 views  
> > state.js //状态  
> > mutations.js //改变 state 的函数  
> > action.js //动作  
> > type.js //类型  
> > getter.js //获取计算后的状态  
> > views //存放 vue 的文件

## 3.遇到的问题

    1.css样式问题
        1.缩小后不到为啥老抽搐，后来发现是背景的一个东西在变形，并且设置它超出隐藏也不好使，导致一直忽略它了，后来直接让他position：flex让他在后面呆着去了
        2.在开始 我偷懒直接用*给所有元素设置了禁用文本(
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;)导致后来文章部分不能选中并复制文字 后来用所有子选择器(XXX>*{})样式修改为(  
        user-select: text;
        -webkit-user-select: text;
        -moz-user-select: text;
        -o-user-select: text;
        -ms-user-select: text;)解决
    2.回调地狱
        1.用 fs 读取判断再读取，导致回调地狱，后来改用 fs.promises大致解决了回调地狱
        2.fs.promises后面.then不要忘记return啊！！！
        3.如果使用链式调用 当获取到非理想数据时 主动锻炼 使用return Promise.reject('XXXerr')
        4.还是async+await香啊~
    3.路由问题：
        1.想要在主页不变，点击分类后只更改主体部分，需要用到子路由children，并且匹配HomeBody组件，因此使用星号*匹配
        2.星号*匹配要放在最下面，并且他的父路由也要放在最下面！！！真是的...
        3.在点击分类时 因为本身在某分类里 会导致路由一直+'ClassifyPage' 越来越长~ 后来改了一下逻辑 直接不让他匹配'ClassifyPage/:id'就直接'/:id'
        4.切换分类时 list组件不重新渲染 通过给组件设置key值为当前路由里的classify 当key改变 会使组件重新渲染
        5.再次点击当前的分类会报错-"路由重复"，据我所知的两种解决方式：
             1.在router中写下const originalPush = VueRouter.prototype.push;VueRouter.prototype.push = function push(location) {return originalPush.call(this, location).catch(err => err)}
             2.当然我用的第二种 判断this.$route.params.classify != classify再进行跳转路由
        6.给list组件打了个补丁 当列表为空时 判断是否需要重新拉取数据 修复了 在文章页面刷新后回到分类列表时列表丢失 的情况
        7.修复了 当在分类列表页面时 点击文章再返回 list不重新拉取而导致的访问次数不刷新问题
    4.异步问题
        1.fs 读取文件 创建文件 再读取文件 会导致最后读取时读取不到更改创建的 用 fs.promises 解决
        2.使用 Promise.all 大大节省异步时间
    5.文件保存问题
        1.获取文章时，发现该文章信息丢失，补录信息
        2.通过分类获取文章时 count计数丢失 将会补录
        3.让未通过前后端信息记录的md文档(自己直接拖拽到存放md的文件夹了) 可以信息补录
        4.用fs保存文件 再取读文件名 会带有文件格式后缀 如".md" 而mongoose保存时值会保存相应的名字 当在首页取出列表时 是从mongoose取出 格式为直接的名字 当进入分类时 通过fs取读存储的md文件 会多带其文件格式后缀 因此必须去除后缀 否则List组件会懵逼！！！
        5.如果手动删除了文件，会导致mongoose位同步 因此在首页获取文章列表时发生问题 所以在getHot链接中 设置了筛选功能
        6.逻辑优化 之前一直用fs来获取数据 当时没先弄mongo 因为要先录入文件 后来发现 前面用fs获取数据部分可以优化一下 对比fs来的数据和mongo里的数据一致性 mongo的少就补录
        7.因为主页面是先进行了获取热门文章 从哪里可以先 对比fs来的数据和mongo里的数据一致性 然后将mongo多的删掉  后来进入分类时 可以反之把mongo少的补充 其中对比数据部分 用到了算法：对比两个数组 返回出多不同部分。 该算法进行修改 改成传入两个数组 对比 第一个比第二个多了哪些 然后一数组形式返回出来
        8.为了使用模糊搜索 mongo也保存了相应的拼音(用了pinyin-pro组件) 然而测试发现 如苹果系统 打字时会先出现拼音+空格形式 win系统会时拼音+单引号形式 这与保存的数据格式不匹配 因此要对其进行处理

## 内心独白

吐了吐了 这是我纯自己手撸的第一个拿得出手的项目(不要笑我，以前写的一些东西感觉实在拿不出手)(样式也是我纯手撸的！！！没用框架！！除了 markdown 用了库和别人的样式包 并且对其 css 进行优化更改) 借鉴了网上一些样子 参考了大佬的项目 并对其进行了很多很多优化(到中后期 已经和他的项目有不小差异了 而且更完善 虽然人家是随便弄弄的 没有可比性) 通过这次完善项目 知道了 不自己弄就不知道自己有多菜 这 css 写的快吐了 因为分模块写的 并且中途还进行"合理化调试" 导致 css 文件已经不完全对应他自己的模块了 后期纯用 vscode 查找功能找的 class 在进行修改
