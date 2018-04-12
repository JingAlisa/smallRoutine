import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { Link } from 'react-router-dom';
export default class TeamList extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        TeamList of each category
        <ul>
          <li><Link to="/team/category/id">first</Link></li>  
          <li><Link to="/team/category/id">second</Link></li> 
          <li><Link to="/team/category/id">third</Link></li> 
        </ul> 
      </div>
    );
  }
};

TeamList.propTypes = {
};
