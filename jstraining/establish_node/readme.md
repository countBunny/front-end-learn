### Webpack搭建react开发环境详解
#### 必要依赖一览(npm install) 安装好。
```
"dependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "webpack": "^4.16.5"
    ...
}
```
babel系列是干什么用的呢？是为了支持es6以上的高级语法的编译。但是因为react有jsx这个东西存在，所以单纯的babel是不够的，此外要让babel作用于webpack，需要给webpack添加一个loader（以前版本叫loader，4.x版本开始改用‘rules’），在工程根目录新建`webpack.config.js`文件，并添加如下代码：
```
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var deps = [ 
  ];

//以上代码可以忽略，没有必要不要添加noParse，因为依赖代码中可能会有环境的判断，而浏览器中是拿不到process变量的，会报错！
var config = {
    //这里是打包的入口
  entry: path.resolve(__dirname, './react/app.js'),
  resolve: {
    alias: {
    }
  },
  //打包完成后输出到./build/bundle.js文件中
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
      //上述的规则，loader就放在这里，这段没什么好说的，从Webpack官方文档上直接拿来用
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
                //刚刚下载的module之一
              presets: ['babel-preset-env']
            }
          }
        }
      ]
  }
};

//遍历你的自定义要排除的依赖，安装到node_modules里的依赖一般不需要排除掉
deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
  });

module.exports = config;
```
以上代码可以直接用，请先将注释去掉。有了以上文件配置，你可以直接在package.json中添加scripts来打包你的app.js。
```
...
"scripts": {
    ...
    "build-config": "webpack",
    ...
}
...
```
执行`npm run build-config`可执行打包操作，但是目前为止还是会报错，因为缺少babel设置，webpack打包时无法识别jsx语法，什么时jsx语法？就是在js代码中写的类似于dom结构的东西，如下:
```
...
<h1 onClick={this.handleClick.bind(this)} style={{ color: "red" }}>
    {'Hello ' + this.state.text}
</h1>
...
```
要解析这个东西还需要添加`.babelrc`文件，在其中添加：
```
{
    "plugins": ["transform-react-jsx"]
}
```
这句主要是说在babel参与打包时，会启用jsx转换成js的插件。到这里你已经可以成功打出你想要的`bundle.js`
```
> webpack

Hash: e716d360a6a752006c09
Version: webpack 4.16.5
Time: 973ms
Built at: 2018-08-14 15:19:14
    Asset     Size  Chunks             Chunk Names
bundle.js  715 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./react/app.js] 2.74 KiB {main} [built]
    + 21 hidden modules
```
webpack打包的好处就是这里，可以让你的app加载速度更快，如上的包总计715kb，隐藏了没有用到的模块21个。这就是为什么要搭手脚架开发的理由。
#### jsx-transform的坑
此外还有一点要说一下，就是在引入React时，请整个引入，要么就额外引入它在编译后的代码中可能会用到的api，否则会说什么什么没找到而导致页面加载不出来。看编译后的代码：
```
var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var _react2 = _interopRequireDefault(_react);
...
_createClass(MyTitle, [{
key: "handleClick",
value: function handleClick() {
    this.setState({
    text: "Clicked"
    });
}
}, {
key: "render",
value: function render() {
    return _react2.default.createElement(
    "h1",
    { onClick: this.handleClick.bind(this), style: { color: "red" } },
    'Hello ' + this.state.text
    );
}
}]);
```
如果你不引入react, 编译后render()函数中的_react2会是React.createElement而React显然是找不到这个变量的。看到编译后的代码，你可能更能理解，哦在jsx的dom中那样写原来是这个意思啊···
### Vscode中开发，需要配置好eslint
react中有大量的es6的写法，如果不配置eslint你会看到大量飘红，首先是在项目的开发环境安装依赖：
```
"devDependencies": {
    ···
    "eslint": "^5.3.0",
    "eslint-plugin-import": "^2.14.0"
    ···
}
```
在项目根路径下添加`.eslintrc.json`，并添加以下代码[^eslint]：
```
{
  "parserOptions": {
      //使用的ecma版本
    "ecmaVersion": 6,
    "sourceType": "module",
    //使用jsx特性
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
      //忽略console的警告
    "no-console": "off",
    "semi": ["error", "always"]
  }
}
```
参考：  
[eslint官方文档](http://eslint.cn/docs/user-guide/configuring)  
[babel-plugin-transform-jsx文档](https://www.npmjs.com/package/babel-plugin-transform-jsx)   
[webpack4.15.1 官方文档](http://webpack.css88.com/loaders/babel-loader.html)  
[babelrc 配置文档](https://babeljs.io/docs/en/babelrc)  
[React+Webpack快速上手指南\(虽然已经过时，还有部分不适用，但是还是借鉴了一部分代码\)](https://www.jianshu.com/p/418e48e0cef1)  
[阮一峰 四课时培训课，虽然过时，但是还是能带你体验一番前端开发](https://github.com/ruanyf/jstraining/blob/master/docs/engineering.md)  
