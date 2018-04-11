import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TabBar from '../../components/TabBar';
import { Link } from 'react-router-dom';

import { getUserInfo } from '../../utils/getUserInfo';

import UserAvatar_1 from '../../public/img/avatar/1.png'
import UserAvatar_2 from '../../public/img/avatar/2.png'
import UserAvatar_3 from '../../public/img/avatar/3.png'
import UserAvatar_4 from '../../public/img/avatar/4.png'
import UserAvatar_5 from '../../public/img/avatar/5.png'
import UserAvatar_6 from '../../public/img/avatar/6.png'
import UserAvatar_7 from '../../public/img/avatar/7.png'
import UserAvatar_8 from '../../public/img/avatar/8.png'
import UserAvatar_9 from '../../public/img/avatar/9.png'
import UserAvatar_10 from '../../public/img/avatar/10.png'
import UserAvatar_11 from '../../public/img/avatar/11.png'
import UserAvatar_12 from '../../public/img/avatar/12.png'
import UserAvatar_13 from '../../public/img/avatar/13.png'
import UserAvatar_14 from '../../public/img/avatar/14.png'
import UserAvatar_15 from '../../public/img/avatar/15.png'
import UserAvatar_16 from '../../public/img/avatar/16.png'
import UserAvatar_17 from '../../public/img/avatar/17.png'
import UserAvatar_18 from '../../public/img/avatar/18.png'
import UserAvatar_19 from '../../public/img/avatar/19.png'
import UserAvatar_20 from '../../public/img/avatar/20.png'
import UserAvatar_21 from '../../public/img/avatar/21.png'
import UserAvatar_22 from '../../public/img/avatar/22.png'
import UserAvatar_23 from '../../public/img/avatar/23.png'
import UserAvatar_24 from '../../public/img/avatar/24.png'
import UserAvatar_25 from '../../public/img/avatar/25.png'
import UserAvatar_26 from '../../public/img/avatar/26.png'
import UserAvatar_27 from '../../public/img/avatar/27.png'
import UserAvatar_28 from '../../public/img/avatar/28.png'
import UserAvatar_29 from '../../public/img/avatar/29.png'
import UserAvatar_30 from '../../public/img/avatar/30.png'
import UserAvatar_31 from '../../public/img/avatar/31.png'
import UserAvatar_32 from '../../public/img/avatar/32.png'
import UserAvatar_33 from '../../public/img/avatar/33.png'
import UserAvatar_34 from '../../public/img/avatar/34.png'
import UserAvatar_35 from '../../public/img/avatar/35.png'
import UserAvatar_36 from '../../public/img/avatar/36.png'
import UserAvatar_37 from '../../public/img/avatar/37.png'
import UserAvatar_38 from '../../public/img/avatar/38.png'
import UserAvatar_39 from '../../public/img/avatar/39.png'
import UserAvatar_40 from '../../public/img/avatar/40.png'
import UserAvatar_41 from '../../public/img/avatar/41.png'

export default class Mine extends React.Component {
  constructor() {
    super();
    this.state = {
      userAvatar: [UserAvatar_1, UserAvatar_2, UserAvatar_3, UserAvatar_4, UserAvatar_5, UserAvatar_6, UserAvatar_7, UserAvatar_8, UserAvatar_9, UserAvatar_10, UserAvatar_11, UserAvatar_12, UserAvatar_13, UserAvatar_14, UserAvatar_15, UserAvatar_16, UserAvatar_17, UserAvatar_18, UserAvatar_19, UserAvatar_20, UserAvatar_21, UserAvatar_22, UserAvatar_23, UserAvatar_24, UserAvatar_25, UserAvatar_26, UserAvatar_27, UserAvatar_28, UserAvatar_29, UserAvatar_30, UserAvatar_31, UserAvatar_32, UserAvatar_33, UserAvatar_34, UserAvatar_35, UserAvatar_36, UserAvatar_37, UserAvatar_38, UserAvatar_39, UserAvatar_40, UserAvatar_41]
    }
  }

  async componentWillMount() {
    const userInfo = await getUserInfo()
    if (userInfo && userInfo.uid) {
      this.setState({
        userUid: userInfo.uid,
        userName: userInfo.userNameZH
      })
    }  
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '校缘' });

  }

  render() {
    const avatarNum = parseInt(Math.random() * 40) + 1
    const avatarUrl = '../../public/img/avatar/' + avatarNum + '.jpg'
    return (
      <div>
        <div className='userInfo'>
          {/* <img className="userAvatar" src={ avatarUrl } /> */}
          {
            this.state.userAvatar.map((item, index) => {
              if(index == avatarNum) {
                return (
                  <img className="userAvatar" src={ item } />
                )
              }
            })
          }
          <span className="userName">{this.state.userName}</span>
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