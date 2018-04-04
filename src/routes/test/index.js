import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TabBar from '../../components/TabBar';
import { Swiper } from '../../../node_modules/@huawei/react-weui';
import { NavBar, TabBarItem } from '../../../node_modules/@huawei/react-weui';
import Item from '../../components/Item';

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
        <br /><br /><br /><br />
        <Item />
        <Swiper>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
          <div>test1</div>
        </Swiper>
      </div>
    );
  }
};

test.propTypes = {
};
