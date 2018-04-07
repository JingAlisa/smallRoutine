import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TabBar from '../../components/TabBar'

import UserAvatar from '../../public/img/5M.jpg'

export default class Mine extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <TabBar target='mine' />
        <div className='userInfo'>
          <img className="userAvatar" src={ UserAvatar } />
          <p className="userName">张三</p>
        </div>
        <div className='weui-cells'>
          <a className='weui-cell weui-cell_access' href='javascript:;'>
            <div className="weui-cell__bd">
              <p>我的发布</p>
            </div>
            <div className="weui-cell__ft"></div>
          </a>
          <a className='weui-cell weui-cell_access' href='javascript:;'>
            <div className="weui-cell__bd">
              <p>我的申请</p>
            </div>
            <div className="weui-cell__ft"></div>
          </a>
        </div>
      </div>
    );
  }
};

Mine.propTypes = {
};
