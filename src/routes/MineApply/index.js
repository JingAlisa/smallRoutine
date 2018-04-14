import React from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../config/web.config';
import { getUserInfo } from '../../utils/getUserInfo';

import EmptyWatermark from '../../public/img/empty.png';
import openNewView from '../../utils/openNewView';
import './index.less';
import List from '../../components/List';
export default class MineApply extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      userUid: '',
      firstLoad: true
    }
  }

  async componentWillMount() {

    const userInfo = await getUserInfo()
    if(userInfo && userInfo.uid) {
      this.setState({
        userUid: userInfo.uid,
        userName: userInfo.userNameZH
      })
    }

    const _id = this.state.userUid
    const url = `${urls.graphql}/welink/v1/teams/${_id}/apply`

    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        console.log(reply.code);
        if (!reply.code) {
          let teams = reply.data.teams
          let list = []
          teams.map((team, index) => {
            let item = {
              title: team.title,
              id: team._id,
              application: false,
              uid: team.createrUid,
              userName: userInfo.name,
              memberCount: team.memberCount,
              memberMaxNumber: team.memberMaxNumber,
              description: team.description
            }
            list.push(item)
          })
          this.setState({
            list: list,
            firstLoad: false
          })
        }
      });
    });
      
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '我的申请' });
  }

  render() {
    if(this.state.list.length === 0 && this.state.firstLoad === false) {
      return (
        <div className='EmptyWatermarkBox'>
          <img className='EmptyWatermark' src={ EmptyWatermark } />
          <div id="dialogs">
            <div className="js_dialog">
              <div className="weui-mask"></div>
              <div className="weui-dialog">
                <div className="weui-dialog__hd"><strong className="h5ui-dialog__title">空空如也</strong></div>
                <div className="weui-dialog__bd">你还没有申请加入任何战队，要不要去首页逛逛？</div>
                <div className="weui-dialog__ft">
                  <a href="javascript:;" onClick={()=>{document.getElementById("dialogs").style.display='none'}} className="weui-dialog__btn weui-dialog__btn_primary">No</a>
                  <a href="javascript:;" onClick={()=>{openNewView('/')}} className="weui-dialog__btn weui-dialog__btn_primary">好嘞</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <List className="list" listData={ this.state.list } page="apply" />
        </div>
      );
    }
  }
};

MineApply.propTypes = {
};
