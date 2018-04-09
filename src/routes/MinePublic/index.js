import React from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../config/web.config';
import { userInfo } from '../../../config/debug.userInfo';
import Back from '../../public/img/icon/back.png';
import './index.less';
import List from '../../components/List';
export default class MinePublic extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      userUid: userInfo.uid
    }
  }

  componentWillMount() {
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
          console.log(this.state)
        }
      });
    });
  }

  componentDidMount() {
  }

  render() {
    const list = [
      {
        title: '跑步小分队',
        id: '001',
        application: true,
        uid: 'num1',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '003',
        application: false,
        uid: 'num9',
        memberCount: '1',
        memberMaxNumber: '5'
      },
      {
        title: '跑步小分队',
        id: '001',
        application: true,
        uid: 'num3',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '008',
        application: true,
        uid: 'num7',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '002',
        application: false,
        uid: 'num6',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '0013',
        application: true,
        uid: 'num4',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '0011',
        application: true,
        uid: 'num2',
        memberCount: '2',
        memberMaxNumber: '5'
      }
    ];
    return (
      <div>
        <div className="backAndTitle">
          <img src={Back} alt="back" onClick={()=>this.props.history.goBack()} />
          <span>我的发布</span>
        </div>
        <List className="list" listData={ this.state.list } page="public" />
      </div>
    );
  }
};

MinePublic.propTypes = {
};
