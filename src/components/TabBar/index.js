import React from 'react';
import './index.less';
import { Link } from 'react-router-dom';
// icon
import Home from '../../public/img/icon/home.png';
import Item from '../../public/img/icon/item.png';
import Add from '../../public/img/icon/add.png';
import Message from '../../public/img/icon/message.png';
import Mine from '../../public/img/icon/mine.png';

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
            <img className="weui-tabbar__icon" src={Home} alt="icon" />
            <p className="weui-tabbar__label">首页</p>
          </Link>
          <Link className="weui-tabbar__item" to="/team">
            <img className="weui-tabbar__icon" src={Item} alt="icon" />
            <p className="weui-tabbar__label">分类页</p>
          </Link>
          <Link className="weui-tabbar__item" to="/add">
            <img className="weui-tabbar__icon" src={Add} alt="icon" />
            <p className="weui-tabbar__label">添加</p>
          </Link>
          <Link className="weui-tabbar__item" to="/message/:id">
            <img className="weui-tabbar__icon" src={Message} alt="icon" />
            <p className="weui-tabbar__label">消息</p>
          </Link>
          <Link className="weui-tabbar__item" to="/mine">
            <img className="weui-tabbar__icon" src={Mine} alt="icon" />
            <p className="weui-tabbar__label">我的</p>
          </Link>
        </div>
      </div>
    );
  }
};
