import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Link } from 'react-router-dom';
export default function Item(props) {
  const { 
    acceptNum, memberMaxNumber, title, description 
  } = props;
  return (
    <Link to={{ pathname: '/team/123', data: props }}>
      <div className="weui-panel weui-panel__access container">
        <div className="weui-panel__bd">
          <span className="weui-media-box__desc applyNum">战队人数：{acceptNum}/{memberMaxNumber}</span>
          <h4 className="weui-media-box__title">{title}</h4>
          <p className="weui-media-box__desc">{description}</p>
        </div>
      </div>
    </Link>
  );
};
Item.propTypes = {
  acceptNum: PropTypes.string,
  memberMaxNumber: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};
