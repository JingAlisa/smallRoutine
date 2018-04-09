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
          <div className='weui-cells__title'>
            { this.props.kind === 'known' ? '历史消息' : (this.props.kind === 'creater' ? '未读--我的发布消息' : '未读--我的申请结果') }
          </div>
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
