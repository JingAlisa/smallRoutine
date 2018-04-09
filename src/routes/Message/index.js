import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { urls } from '../../../config/web.config';
import { userInfo } from '../../../config/debug.userInfo';

import TabBar from '../../components/TabBar';
import MsgList from '../../components/MsgList'

export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      userUid: userInfo.uid,
      msgs_creater: [],
      msgs_applicant: []
    }
  }

  componentWillMount() {

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
        if (!reply.code) {
          console.log(reply.data.msgs)
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
  }

  render() {
    return (
      <div>
        <div className="contentContainer">
          {/* <MsgList msgs={this.state.msgs_creater} kind='creater' />
          <MsgList msgs={this.state.msgs_applicant} kind='applicant' /> */}

          <MsgList msgs={ this.getMsgs('applicant') } kind='applicant' />
          <MsgList msgs={ this.getMsgs('creater') } kind='creater' />
          <MsgList msgs={ this.getMsgs('known') } kind='known' />
        </div>
        <div className="tabbar"><TabBar /></div>
      </div>
    );
  }
};

Message.propTypes = {
};
