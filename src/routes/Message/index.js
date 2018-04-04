import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TabBar from '../../components/TabBar';

export default class Message extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <TabBar />
        <div>
          <p>message</p>
          <p>message</p>
          <p>message</p>
          <p>message</p>
          <p>message</p>
          <p>message</p>
          <p>message</p>
        </div>
      </div>
    );
  }
};

Message.propTypes = {
};
