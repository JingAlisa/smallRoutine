// 用于在teamDetail中显示当前用户的申请获得审核通过/拒绝的通知条

import React from 'react';
import './index.less';

export default class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isJudged: false,
      accepted: false
    }
  }

  componentWillMount() {
    console.log('准备循环')
    this.props.applyingList.map((applicant, index) => {
      console.log(applicant.uid)
      console.log(this.props.userUid)
      if(applicant.uid === this.props.userUid && applicant.judgment){
        this.setState({
          isJudged: true,
          accepted: applicant.judgment.accept
        })
        return true
      }
    })
  }

  componentDidMount() {
  }

  render() {
    if(this.state.isJudged){
      return (
        <div className='weui-cell'>
          您的申请结果为：{ this.state.accepted ? '通过' : '拒绝' }
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
    
  }
};
