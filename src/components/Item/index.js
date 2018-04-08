import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Link } from 'react-router-dom';
export default function Item(props) {
  const { 
    itemData, page, id, acceptNum, memberMaxNumber, title, description 
  } = props;
  console.log(itemData.title);
  if (page === 'home') {
    const path = '/team/'+itemData.id;
    return (
      <Link to={{ pathname: path, data: props }}>
        <div className="weui-panel weui-panel__access container">
          <div className="weui-panel__bd">
            <span className="weui-media-box__desc applyNum">战队人数：{acceptNum}/{memberMaxNumber}</span>
            <h4 className="weui-media-box__title">{title}</h4>
            <p className="weui-media-box__desc">{description}</p>
          </div>
        </div>
      </Link>
    );
  } else if (page === 'teams') {
    const path = '/team/'+itemData.id;
    return (
      <Link to={{ pathname: path, data: props }}>
        <div className="weui-panel weui-panel__access container">
          <div className="weui-panel__bd">
            <span className="weui-media-box__desc applyNum">战队人数：{acceptNum}/{memberMaxNumber}</span>
            <h4 className="weui-media-box__title">{title}</h4>
            <p className="weui-media-box__desc">{description}</p>
          </div>
        </div>
      </Link>
    );
  } else if (page === 'apply') {
    const path = '/team/'+itemData.id;
    return (
      <Link to={{ pathname: path }}>
        <div className="weui-panel weui-panel__access container">
          <div className="weui-panel__bd">
            <span className="weui-media-box__desc applyNum">战队人数：{itemData.memberCount}/{itemData.memberMaxNumber}</span>
            <h4 className="weui-media-box__title">{itemData.title}</h4>
            <p className="weui-media-box__desc">{itemData.uid}申请加入您的战队，点击获取详情</p>
          </div>
        </div>
      </Link>
    );
  } else if (page === 'public') {
    const path = '/team/'+itemData.id; 
    console.log(path)
    return (
      <Link to={{ pathname: path }}>
        <div className="weui-panel weui-panel__access container">
          <div className="weui-panel__bd">
            <span className="weui-media-box__desc applyNum">战队人数：{itemData.memberCount}/{itemData.memberMaxNumber}</span>
            <h4 className="weui-media-box__title">{itemData.title}</h4>
            <p className="weui-media-box__desc">{itemData.uid}申请加入您的战队，点击获取详情</p>
          </div>
        </div>
      </Link>
    );
  }
  
};
Item.propTypes = {
  itemData: PropTypes.object,
  page: PropTypes.string,
  id: PropTypes.string,
  acceptNum: PropTypes.string,
  memberMaxNumber: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};
