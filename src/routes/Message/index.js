import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { urls } from '../../../config/web.config';

import TabBar from '../../components/TabBar';
import MsgList from '../../components/MsgList'

export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      userUid: 'hw000008',
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

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <TabBar />
        <MsgList msgs={this.state.msgs_creater} kind='creater' />
        <MsgList msgs={this.state.msgs_applicant} kind='applicant' />
      </div>
    );
  }
};

Message.propTypes = {
};
