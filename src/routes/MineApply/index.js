import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import List from '../../components/List';
export default class MineApply extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const list = [
      {
        title: 'title',
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
        uid: 'num1',
        memberCount: '1',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '005',
        application: true,
        uid: 'num1',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '008',
        application: true,
        uid: 'num1',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '002',
        application: false,
        uid: 'num1',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '0013',
        application: true,
        uid: 'num1',
        memberCount: '2',
        memberMaxNumber: '5'
      },
      {
        title: 'title',
        id: '0011',
        application: true,
        uid: 'num1',
        memberCount: '2',
        memberMaxNumber: '5'
      }
    ];
    return (
      <div>
        <div>
          <img src="#" alt="back" />
          <span>我的申请</span>
        </div>
        <List className="list" listData={list} page="apply" />
      </div>
    );
  }
};

MineApply.propTypes = {
};
