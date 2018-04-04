# WeLink React开发框架
-----------------------------

使用WeLink React开发框架可以快速构建和开发We码程序，基于 npm + webpack + react + redux + less + weui 的快速开发本地化的框架。

+ 遵循WeLink目录规范，构建项目时会生成遵循WeLink目录规范的目录。
+ 集成了WeLink JSAPI，构建项目时会自动引入JSAPI。
+ 基于[weui](https://github.com/weui/react-weui)（mit license），适配WeLink风格。

## 开发环境

node版本需8.6.0以上

## 开始

1. 运行项目。
```bash
$ npm start
```
> 执行命令后，会自动打开默认浏览器并访问：http://localhost:3000/apps/welink.h5reactdemo/1/html/index.html
![React Hello WeLink](./images/reacthellowelink.png)
2. eslint 代码规范检查，需严格按照js语法规范开发。
```bash
npm run lint
```
3. 打包项目前，需配置下 pluginAndroid.json 和 pluginIOS.json ，需特别注意别名和入口的配置，详情请参考[配置 plugin.json](./configapp.md#plugin)。

4. 打包项目，包括测试和生产环境，可通过此命令生成对应环境zip包。
```bash
$ npm run build -- uat
$ npm run build -- prod
```

## 使用说明

#### 项目目录结构

```text
|—— build
│   ├── common // jsapi文件目录
│   └── apps   // 打包生成的app目录
|—— config
│   ├── web.config.js // 项目配置目录，区分生产、uat和开发环境配置
│   └── server.config.js // 开发环境设置，可修项目名称、端口号等
├── package.json // node相关环境的配置文件
├── server.js // 本地开发服务器
├── src // 源代码目录
│   ├── actions // action控制中心，处理请求
│   ├── components // 页面组件
│   ├── core 
│       └── checkLogin // sso登录
│   ├── locales // 国际化信息
│       ├── en_US // 英文配置信息
│       └── zh_CN // 中文配置信息
│   ├── reducers // 存放state
│   ├── routes // 组件路由
│       ├── Home // 首页路由
│       ├── AsyncComponent.js // 异步react组件HOC
│       └── index.js // 路由定义
│   ├── utils // 提供一些小工具
│   └── App.js // 根react组件
│   ├── app.less // 公共样式
│   ├── entry.js // webpack打包入口，获取当前app语言
│   └── i18n.js // 国际化处理
├── test // jest测试集
│   └── __snapshots__
├── templates // 模板文件
├── tools // 打包相关 
└── webpack.config.js // webpack配置文件

```

#### 模板生成

通过命令行可生成Action，Component，Reducer和Route模板，代替人工新增或复制文件或目录，减少冗余操作，提高工作效率。

示例：

生成一个路由 `Demo`

```bash
  npm run add route Demo
```

生成一个组件 `Demo`

```bash
  npm run add component Demo
```

生成一个Action `demo`

```bash
  npm run add action demo
```

生成一个Reducer `demo`

```bash
  npm run add reducer demo
```

#### 添加路由

可通过模板命令先添加一个路由，将在目录 `./src/routes` 下，生成一个Test路由。

```bash
  npm run add route Test
```

![welink-react-add-route](./images/welink-react-add-route.png)

然后在 `src/routes/index.js` 添加配置。

```js
import Home from './Home';
import asyncComponent from './AsyncComponent';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/test', component: asyncComponent(() => import(/* webpackChunkName: 'test' */ './Test')) }
];

export default routes;
```

访问路由 `#/test` 路由时，页面将按需异步加载 `test.js`。

![welink-react-add-route2](./images/welink-react-add-route2.png)


#### 使用 Redux
  Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

> 应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。惟一改变 state 的办法是触发 action，一个描述发生什么的对象。

  * Reducers：

    新增一个Reducer，可通过模板命令生成：
    `npm run add reducer test`

    编辑 `src/reducers/test.js`。
    ```js
    // 初始化状态
    const initState = {
      list: []
    };
    export function test(state = initState, action) {
      switch (action.type) {
        case 'RECEIVE_DATA':
          return {
            ...state,
            list: action.list
          };
        default:
          return { ...state };
      }
    };
    ```
    编辑 `src/reducers/index.js`，配置到 rootReducer 中。

    ```js
    import { test } from './test';
    import { global } from './global';
    const rootReducer = {
      test,
      global
    };
    export default rootReducer;
    ```

  * Action 创建函数和常量：

    新增一个Action，可通过模板命令生成：
    `npm run add action test`

    编辑 `src/actions/test.js`

    ```js
      const receiveData = (response) => ({
        type: 'RECEIVE_DATA',
        data: response
      });
      export const getListData = () => async (dispatch, getState) => {
        try {
          // 通过fetch获取数据
          // const url = '';
          // const response = await window.HWH5.fetch(url).then((res) =>
          //   res.json().then((reply) => reply).catch((error) => {
          //     console.log(error);
          //   }));
          const response = [
            { name: '张三' },
            { name: '李四' }
          ];
          await dispatch(receiveData(response));
          return response;
        } catch (error) {
          console.log('error: ', error);
          return error;
        }
      };
    ```
  * 容器组件：

    编辑文件 `src/routes/Test/index.js`。

    ```js
    import React from 'react';
    import PropTypes from 'prop-types';
    import { bindActionCreators } from 'redux';
    import { connect } from 'react-redux';
    import './index.less';

    import * as test from '../../actions/test';

    @connect(
      state => ({ ...state.test }),
      dispatch => bindActionCreators({ ...test }, dispatch)
    )
    export default class Test extends React.Component {

      componentWillMount() {
      }

      componentDidMount() {
        // 调用action，改变状态
        this.props.getListData();
      }
      // 处理返回事件
      backHandle() {
      }

      render() {
        const { list } = this.props;
        console.log(list, 'list');
        return (
          <div>
            Test
          </div>
        );
      }
    };

    Test.propTypes = {
      getListData: PropTypes.func
    };
    ```
    了解更多，请参考Redux 中文文档：http://www.redux.org.cn/

#### 引用 weui 组件

需引用 `@huawei/react-weui` 模块。

```jsx
import React from 'react';
import {
  Tab,
  TabBody,
  TabBar,
  TabBarItem,
  TabBarIcon,
  TabBarLabel,
  Article
} from '@huawei/react-weui';
```

#### 国际化

国际化信息在 `src/locales` 目录中配置。

使用：
```jsx
import i18n from 'i18n';
// 输出src/locales中common.json配置的国际化字段appName信息。
i18n.t('common:appName');
```

#### 配置本地代理服务

目的：解决本地调试接口可能存在跨域问题，便于本地调试接口

方法：本地开发框架集成webpack-dev-server，可在项目根目录的 <code>server.js</code> 中添加对应的代理配置信息，如：

```javascript
app.use('/demo', proxy({ target: 'http://xx.xx.com', changeOrigin: true }));
```

即本地通过请求 `http://localhost:3000/demo`，将代理去请求 `http://xx.xx.com/demo`，并返回数据。

了解更多代理配置信息，可参考[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)。