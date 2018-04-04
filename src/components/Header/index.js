import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import backImg from './images/back.png';

export default function Header(props) {
  const { title, backHandle, shareHandle } = props;
  return (
    <header>
      <img id="back" src={backImg} alt={title} onClick={() => backHandle()} />
      <div className="tit">发票</div>
      <div id="share" onClick={() => shareHandle()}>分享</div>
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  backHandle: PropTypes.func,
  shareHandle: PropTypes.func
};
