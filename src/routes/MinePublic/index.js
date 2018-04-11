import React from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../config/web.config';
import { getUserInfo } from '../../utils/getUserInfo';

import EmptyWatermark from '../../public/img/empty.png';

import './index.less';
import List from '../../components/List';
export default class MinePublic extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      userUid: ''
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
    const url = `${urls.graphql}/welink/v1/teams/${_id}/created`

    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
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
            list: list
          })
        }
      });
    });
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '我的创建' });
  }

  render() {
    if(this.state.list.length !== 0) {
      return (
        <div>
          <List className="list" listData={ this.state.list } page="public" />
        </div>
      );
    } else {
      return (
        <div className='EmptyWatermarkBox'>
          <img className='EmptyWatermark' src={ EmptyWatermark } />
        </div>
      );
    }
  }
};

MinePublic.propTypes = {
};
