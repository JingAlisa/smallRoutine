import React from 'react';
import './index.less';

import { Link } from 'react-router-dom';
import { NavBar, NavBarItem } from '../../../node_modules/@huawei/react-weui';

export default class TabBar extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <NavBar className="navbar">
          <NavBarItem className="navBarItem"><Link className="itemText" to="/">首页</Link></NavBarItem>
          <NavBarItem className="navBarItem"><Link className="itemText" to="/team">分类页</Link></NavBarItem>
          <NavBarItem className="navBarItem"><Link className="itemText" to="/add">添加</Link></NavBarItem>
          <NavBarItem className="navBarItem"><Link className="itemText" to="/message/9856">消息</Link></NavBarItem>
          <NavBarItem className="navBarItem"><Link className="itemText" to="/mine">我的</Link></NavBarItem>
        </NavBar>
      </div>

    );
  }
};
