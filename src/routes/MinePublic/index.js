import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import List from '../../components/List';
export default class MinePublic extends React.Component {

  componentWillMount() {
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
        <div>
          <img src="#" alt="back" />
          <span>我的发布</span>
        </div>
        <List className="list" listData={list} page="public" />
      </div>
    );
  }
};

MinePublic.propTypes = {
};
