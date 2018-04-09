import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Link } from 'react-router-dom';
export default function Item(props) {
  var path = '';
  const { 
    itemData, page 
  } = props;
  console.log(itemData.title);
  if (page === 'home') {
    path = '/team/'+itemData.id;
  } else if (page === 'teams') {
    path = '/team/'+itemData.id;
  } else if (page === 'apply') {
    path = '/team/'+itemData.id;
  } else if (page === 'public') {
    path = '/team/'+itemData.id; 
  }
  return (
    <Link to={{ pathname: path }}>
      <div className="weui-panel weui-panel__access container">
        <div className="weui-panel__bd">
          <span className="weui-media-box__desc applyNum">战队人数：{itemData.memberCount}/{itemData.memberMaxNumber}</span>
          <h4 className="weui-media-box__title">{itemData.title}</h4>
          <p className="weui-media-box__desc">{itemData.description}</p>
          <p className="weui-media-box__desc getDetail">......</p>
        </div>
      </div>
    </Link>
  );
  
};
Item.propTypes = {
  itemData: PropTypes.object,
  page: PropTypes.string
};
