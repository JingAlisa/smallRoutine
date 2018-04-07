import React from 'react';
import './index.less';
import PropTypes from 'prop-types';
import Right from './images/right.png';

export default function Header(props) {
  const 
    {
      companyName,
      more, 
      taxNumber, 
      bank,
      index
    } = props;
  return (
    <div className="list" onClick={() => more(index)}>
      <div className="information">
        <div className="companyName">{companyName}</div>
        <div className="taxNumber">税号：<span className="tax1">{taxNumber}</span></div>
        <span className="info">{bank}</span>
      </div>
      <div className="right"><img alt="" src={Right} /></div>
    </div>
  );
};
Header.propTypes = {
  companyName: PropTypes.string,
  taxNumber: PropTypes.string,
  bank: PropTypes.string,
  index: PropTypes.number,
  more: PropTypes.func
};
