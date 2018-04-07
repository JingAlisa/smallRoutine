import React from 'react';
import './index.less';

import MsgItem from '../MsgItem'

export default class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const msgs = this.props.msgs
    return (
      <div className='page msgList'>
        <div className="page__bd">
          <div className='weui-cells__title'>{ this.props.kind === 'creater' ? '新增申请者' : '申请结果' }</div>
          <div className='weui-cells'>
          {
            msgs.map((item, index) => (
              <MsgItem 
                key={index}
                msg={item} 
              />
            )) 
          }
          </div>
        </div>
      </div>
    );
  }
};
