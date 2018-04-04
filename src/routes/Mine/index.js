import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TabBar from '../../components/TabBar'

export default class Mine extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <TabBar />
        <div>
          <p>Mine</p>
          <p>Mine</p>
          <p>Mine</p>
          <p>Mine</p>
          <p>Mine</p>
          <p>Mine</p>
          <p>Mine</p>
        </div>
      </div>
    );
  }
};

Mine.propTypes = {
};
