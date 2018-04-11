import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Link } from 'react-router-dom';
export default function Item(props) {
  var path = '';
  const { 
    itemData, page 
  } = props;
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
    <Link className="eachItem" to={{ pathname: path }}>
      <div className="weui-panel weui-panel__access itemContainer">
        <div className="weui-panel__bd">
          <span className="weui-media-box__desc applyNum">人数：{itemData.memberCount}/{itemData.memberMaxNumber}</span>
          <h4 className="weui-media-box__title">{itemData.title}</h4>
          <p className="weui-media-box__desc itemDescription">{itemData.description}</p>
        </div>
      </div>
    </Link>
  );
  
};
Item.propTypes = {
  itemData: PropTypes.object,
  page: PropTypes.string
};
