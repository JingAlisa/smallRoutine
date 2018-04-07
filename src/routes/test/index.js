import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TabBar from '../../components/TabBar';
import { NavBar, TabBarItem } from '../../../node_modules/@huawei/react-weui';

export default class test extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <TabBar />
        <NavBar>
          <TabBarItem>nav1</TabBarItem>
          <TabBarItem>nav1</TabBarItem>
          <TabBarItem>nav1</TabBarItem>
        </NavBar>
      </div>
    );
  }
};

test.propTypes = {
};
