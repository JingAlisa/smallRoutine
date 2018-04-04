import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/index';

import FastClick from 'fastclick';

// 按模块导入lodash，可以有效减小vendor.js的大小
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import isArray from 'lodash/isArray';
import i18n from './i18n.js';
import isiOS from './utils/isiOS';
import getLang from './utils/getLang';

window.isEmpty = isEmpty;
window.isEqual = isEqual;
window.debounce = debounce;
window.isArray = isArray;

const history = createHistory();
const middleware = routerMiddleware(history);

// 解决移动端300毫秒延迟
FastClick.attach(document.body);
// 解决iOS webview 滚动反弹会出现整个页面可以跟着动的问题
if (isiOS) {
  require.ensure(['./public/js/inobounce'], () => { }, 'inobounce');
}
const middlewares = [thunk, middleware];

const store = createStore(
  combineReducers({ routing: routerReducer, ...rootReducer }),
  composeWithDevTools(applyMiddleware(...middlewares))
);

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

// 获取当前app语言参数，并初始化国际化和渲染页面。开发时，mock数据默认返回中文。
getLang().then((language)=>{
  i18n.initByLang(language === 'zh' ? 'zh_CN' : 'en_US');
  render(App);
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextRootContainer = require('./App').default;
      render(NextRootContainer);
    });
  };
});
