import React from 'react';
import './index.less';

import { Link } from 'react-router-dom';

export default class TabBar extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="weui-tab">
        <div className="weui-tab-panel" />
        <div className="weui-tabbar">
          <Link className="weui-tabbar__item weui-bar__item_on" to="/">
            <img className="weui-tabbar__icon" src="#" alt="icon" />
            <p className="weui-tabbar__label">首页</p>
          </Link>
          <Link className="weui-tabbar__item" to="/team">
            <img className="weui-tabbar__icon" src="#" alt="icon" />
            <p className="weui-tabbar__label">分类页</p>
          </Link>
          <Link className="weui-tabbar__item" to="/add">
            <img className="weui-tabbar__icon" src="#" alt="icon" />
            <p className="weui-tabbar__label">添加</p>
          </Link>
          <Link className="weui-tabbar__item" to="/message/:id">
            <span>
              <img className="weui-tabbar__icon" src="#" alt="icon" />
              <span className="weui-badge">6</span>
            </span>
            <p className="weui-tabbar__label">消息</p>
          </Link>
          <Link className="weui-tabbar__item" to="/mine">
            <span>
              <img className="weui-tabbar__icon" src="#" alt="icon" />
              <span className="weui-badge">6</span>
            </span>
            <p className="weui-tabbar__label">我的</p>
          </Link>
        </div>
      </div>
    );
  }
};
