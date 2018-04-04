import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Link } from 'react-router-dom';

import TabBar from '../../components/TabBar';
import { SearchBar } from '../../../node_modules/@huawei/react-weui';

export default class Teams extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <TabBar />
        <p>22</p>
        <p>22</p>
        <p>22</p>
        <p>22</p>
        <p>22</p>
        <SearchBar />
        <ul>
          <li><Link to="/team/1">list1</Link></li>
          <li><Link to="/team/2">list2</Link></li>
          <li><Link to="/team/3">list3</Link></li>
        </ul> 
      </div>
    );
  }
};

Teams.propTypes = {
};
