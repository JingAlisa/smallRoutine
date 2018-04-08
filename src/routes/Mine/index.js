import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TabBar from '../../components/TabBar';
import { Link } from 'react-router-dom';
import UserAvatar from '../../public/img/5M.jpg';

export default class Mine extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
    // 后台获取数据

  }

  render() {
    return (
      <div>
        <div className='userInfo'>
          <img className="userAvatar" src={ UserAvatar } />
          <p className="userName">张三</p>
        </div>
        <div className='weui-cells'>
          <Link className='weui-cell weui-cell_access' to={{ pathname: '/mine/public' }}>
            <div className="weui-cell__bd">
              <p>我的发布</p>
            </div>
            <div className="weui-cell__ft"></div>
          </Link>
          <Link className='weui-cell weui-cell_access' to={{ pathname: '/mine/apply' }}>
            <div className="weui-cell__bd">
              <p>我的申请</p>
            </div>
            <div className="weui-cell__ft"></div>
          </Link>
        </div>
        <div className="tabbar"><TabBar /></div>
      </div>
    );
  }
};