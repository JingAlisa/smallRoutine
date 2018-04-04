import React from 'react';
import './index.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as home from '../../actions/home';
import * as global from '../../actions/global';
import PropTypes from 'prop-types';
var QRCode = require('qrcode.react');

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home, ...global }, dispatch)
)
export default class Editor extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '发票查询' });
  }

  utf16to8(str) {
    var out, 
      i, 
      len, 
      c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  } 

  render() {
    console.log(this.props, '-- this.props');
    const { index, path, dataList } = this.props;
    const myArr = dataList[index];
    const arr = [];
    arr[0] = this.utf16to8(myArr.companyName);
    arr[1] = myArr.taxNumber;
    arr[2] = this.utf16to8(myArr.address);
    arr[3] = myArr.tell;
    arr[4] = this.utf16to8(myArr.bank);
    arr[5] = myArr.num;

    const newPath = arr.join('/');
    console.log(path);
    this.props.setPath(newPath);
    const data = dataList[index];
    return (
      <div className="container">
        <div className="weui-cells weui-cells_form forms">
          <div className="weui-cell">
            <div className="weui-cell__hd">
              <span className="weui-span name">名称:</span>
            </div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="name_input">{data.companyName}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd">
              <span className="weui-span tax">税号:</span>
            </div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="num_input">{data.taxNumber}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span address">单位地址:</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="add_input">{data.address}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span phoneNumber">电话号码:</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="tell_input">{data.tell}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span bank">开户银行:</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="bank_input">{data.bank}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span bankAccount">银行账户:</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="num_input">{data.num}</span>
            </div>
          </div>
        </div>
        <div className="more">
          <div id="myimage">
            {
              path && <QRCode value={path} />
            }
          </div>
          <div className="my-footer" >
            {
              path && <p className="my-footer__text">开票时候出示</p>
            }
          </div>
        </div>
      </div>
    );
  }
};

Editor.propTypes = {
  index: PropTypes.number,
  dataList: PropTypes.array,
  setPath: PropTypes.func,
  path: PropTypes.string
};
