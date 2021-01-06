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