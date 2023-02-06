### 项目介绍

货代社交小程序，基于 **`taro3.5.10 + mobx + ts`**

ui 组件库采用：<a href="https://nutui.jd.com/react/#/">nutui-react</a>

### 设计稿尺寸

默认 750 ，在编写页面时需要指定设计稿的尺寸

### iconfont 的使用

当 ui 设计稿有新的图标变动时，需要到<a href="https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.db775f1f3&manage_type=myprojects&projectId=3839803&keyword=&project_type=&page=">iconfont</a>生成新的 Symbol 类型的链接，然后将该链接复制到根目录下 iconfont.json 配置文件中的 symbol_url 属性

命令行运行

```shell
pnpm run genicon
```

该命令会自动拉取远程 icon 至项目本地，支持多彩 iconfont。
直接在代码中使用：

```jsx
<iconfont name="your icon name" size={48}></iconfont>
```

注意在组件内部自动加了 name 前缀，因此在书写时**`前缀`**不用再加 icon

### openapi

运行

```shell
pnpm run openapi
```

会将接口生成到 src/\_openapi 目录，注意该目录在 gitignore 中，因此我们需要将对应的接口单独复制出来，当然也可以自己手写不用跑 openapi

如果需要指定 openapi 地址，则修改 package.json >>>> scripts >>>> openapi 命令中的 --serverPath 参数

### 接口请求

**`微信小程序不支持 patch 请求`**，需要特别注意

### 本地运行

```shell
pnpm run dev
# pnpm start
```
