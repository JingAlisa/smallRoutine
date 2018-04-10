import React from 'react';
import './index.less';
import { urls } from '../../../config/web.config';

import openNewView from '../../utils/openNewView';

export default class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: this.props.msg
    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  handleClick(id) {
    const url_1 = `${urls.graphql}/welink/v1/team/${id}?msgid=${this.props.msg._id}`
    window.HWH5.fetchInternet(url_1, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          console.log('标记已读成功')
        }
      });
    }).catch((error) => {
      console.error(error)
    });

    openNewView('/team/' + id)
  }

  render() {
    const msg = this.props.msg
    let btnText, btnClass
    if(msg.operation === 'application') {
      btnText = '查看'
      btnClass = 'weui-swiped-btn '+ (msg.createrKnown === true ? 'weui-swiped-btn_default' : 'weui-swiped-btn_warn')
    } else {
      btnText = msg.accept ? '通过': '未通过'
      btnClass = 'weui-swiped-btn ' + (msg.applicantKnown === true ? 'weui-swiped-btn_default' : 'weui-swiped-btn_warn')
    }

    return (
      <div className='xd-weui-cell-unit'>
        <div className='weui-cell firstLine'>
          <div className='weui-cell__bd'>
            <p>{ msg.applicantName || msg.applicantUid }</p>
          </div>
          <div className='weui-cell__ft'>{ '申请加入<' + msg.teamTitle + '>' }</div>
        </div>
        <div className='weui-cell weui-cell_swiped'>
          <div className='weui-cell__bd' style={{ 'transform': 'translateX(-68px)' }} >
            <div className='weui-cell'>
              <div className='weui-cell__bd'>
                <p> </p>
              </div>
              <div className="weui-cell__ft">
                { msg.info }
              </div>
            </div>
          </div>
          <div className="weui-cell__ft">
            <a className={ btnClass } href="javascript:void(0)" onClick={ () => this.handleClick(msg.teamId) }>
              { btnText }
            </a>
          </div>
        </div>
      </div>
    );
  }
};
