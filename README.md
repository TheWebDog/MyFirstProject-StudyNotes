## 1.初始化

### 环境

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

### git 使用

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

## 2.文件

### src (vue 入口文件)

> src
>
> > App.vue  
> > router.js //创建 router  
> > store.js //创建根 store  
> > main.js //将 router 和 store 加入到 vue  
> > components //组件模块

### components (组件模块)

> components
>
> > home //首页  
> > nav //导航栏  
> > search //搜索框  
> > thefilter // 筛选按钮  
> > list // 文章部分

### 模块化格式

> 某模块
>
> > index.js //整合并导出 store , 导出 views  
> > state.js //状态  
> > mutations.js //改变 state 的函数  
> > action.js //动作  
> > type.js //类型  
> > getter.js //获取计算后的状态  
> > views //存放 vue 文件
