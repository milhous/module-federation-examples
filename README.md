###  Webpack Module Federation do
多个单独的构建应该形成一个应用程序。这些独立的构建不应该相互依赖，因此可以单独开发和部署它们。

### Lerna do
1.  可以管理公共依赖和单独依赖；
2.  多package相互依赖直接内部 link，不必发版；
3.  可以单独发布和全体发布
4.  多包放一个git仓库，也有利于代码管理，如配置统一的代码规范

### 项目初始化
初始化项目时使用 Independent 模式，可以单独发版，更灵活

```
npm install -g lerna

lerna init --independent
```

### 安装项目依赖
lerna bootstrap命令为每个包安装依赖，链接相互依赖的库到具体的目录，--hoist这个选项，会把共同依赖的库安装到根目录的node_modules下， 统一版本

```
lerna bootstrap --hoist
```

### 项目提交代码
lerna version命令执行以下操作

1. 标识自上一个标记版本以来已更新的包。
2. 提示输入新版本。
3. 修改包元数据以反映新版本，在根目录和每个包中运行适当的生命周期脚本。
4. 提交这些更改并标记提交。
5. 推到git远程。

```
lerna version --conventional-commits
```

### 项目脚本命令
lerna run命令执行每个包package.json中的脚本命令，
```
npm run start 
lerna run --parallel start

npm run build
lerna run build

npm run serve
lerna run --parallel serve

npm run clean
lerna run --parallel clean
```