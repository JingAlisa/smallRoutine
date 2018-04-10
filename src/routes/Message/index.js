import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import TabBar from '../../components/TabBar';
import MsgList from '../../components/MsgList'

import { urls } from '../../../config/web.config';
import { userInfo } from '../../../config/debug.userInfo';
import EmptyWatermark from '../../public/img/empty.png';


export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      userUid: userInfo.uid,
      userName: userInfo.name,
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
    window.HWH5.navTitle({ title: '校缘' });
  }

  render() {
    console.log(this.getMsgs('creater'));
    console.log(this.getMsgs('applicant'));
    return (
      <div>
        <div className="contentContainer">
          {
            (this.state.msgs_creater.length === 0 && this.state.msgs_applicant.length === 0) ? (
              <div className='EmptyWatermarkBox'>
                <img className='EmptyWatermark' src={ EmptyWatermark } />
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
