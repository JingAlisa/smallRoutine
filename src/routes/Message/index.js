import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import TabBar from '../../components/TabBar';
import MsgList from '../../components/MsgList'

import openNewView from '../../utils/openNewView';
import { urls } from '../../../config/web.config';
import { getUserInfo } from '../../utils/getUserInfo';
import EmptyWatermark from '../../public/img/empty.png';

export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      userUid: '',
      userName: '',
      firstLoad:true,
      msgs_creater: [],
      msgs_applicant: []
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

    const userUid = this.state.userUid

    const url_1 = `${urls.graphql}/welink/v1/message/${userUid}/created`
    window.HWH5.fetchInternet(url_1, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          this.setState({
            msgs_creater: reply.data.msgs
          })
        }
      });
    }).catch((error) => {
      console.error('输出错误')
      console.error(error)
    });

    const url_2 = `${urls.graphql}/welink/v1/message/${userUid}/apply`
    window.HWH5.fetchInternet(url_2, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        this.setState({
          firstLoad:false
        })
        if (!reply.code) {
          this.setState({
            msgs_applicant: reply.data.msgs
          })
        }
      });
    });
  }

  CompareDate(d1,d2)
  {
    return ((new Date(d1.updateTime.replace(/-/g,"\/"))) < (new Date(d2.updateTime.replace(/-/g,"\/"))));
  }

  getMsgs(listName) {
    let list = []
    if(listName === 'applicant') {
      // 当前用户申请加入别人战队的信息
      this.state.msgs_applicant.map((msg) => {
        if(!msg.applicantKnown)  list.push(msg)
      })
    } else if(listName === 'creater') {
      // 别人申请当前用户所创建的战队的信息
      this.state.msgs_creater.map((msg) => {
        if(!msg.createrKnown)  list.push(msg)
      })
    } else {
      this.state.msgs_applicant.map((msg) => {
        if(msg.applicantKnown)  list.push(msg)
      })
      this.state.msgs_creater.map((msg) => {
        if(msg.createrKnown)  list.push(msg)
      })
      list.sort((a, b) => {
        return this.CompareDate(a, b)
      })
    }
    return list
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '校缘' });
  }

  render() {
    return (
      <div>
        <div className="contentContainer">
          {
            (this.state.msgs_creater.length === 0 && this.state.msgs_applicant.length === 0 && this.state.firstLoad === false) ? (
              <div className='EmptyWatermarkBox'>
                
                <img className='EmptyWatermark' src={ EmptyWatermark } />
                <div id="dialogs">
                  <div className="js_dialog" id="iosDialog1">
                    <div className="weui-mask"></div>
                    <div className="weui-dialog">
                      <div className="weui-dialog__hd"><strong className="h5ui-dialog__title">空空如也</strong></div>
                      <div className="weui-dialog__bd">你还没有最新消息，要不要去首页逛逛？</div>
                      <div className="weui-dialog__ft">
                        <a href="javascript:;" onClick={()=>{document.getElementById("dialogs").style.display='none'}} className="weui-dialog__btn weui-dialog__btn_primary">No</a>
                        <a href="javascript:;" onClick={()=>{openNewView('/')}} className="weui-dialog__btn weui-dialog__btn_primary">好嘞</a>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            ) : (
              <div>
                {this.getMsgs('applicant').length === 0 ? '' : <MsgList msgs={ this.getMsgs('applicant') } kind='applicant' />}
                {this.getMsgs('creater').length === 0 ? '' : <MsgList msgs={ this.getMsgs('creater') } kind='creater' />}
                {this.getMsgs('known').length === 0 ? '' : <MsgList msgs={ this.getMsgs('known') } kind='known' />}
                {/* <MsgList msgs={ this.getMsgs('applicant') } kind='applicant' />
                <MsgList msgs={ this.getMsgs('creater') } kind='creater' />
                <MsgList msgs={ this.getMsgs('known') } kind='known' /> */}
              </div>
            )
          }
        </div>

        <div className="tabbar"><TabBar /></div>
      </div>
    );
  }
};

Message.propTypes = {
};
