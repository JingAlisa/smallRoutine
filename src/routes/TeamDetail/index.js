import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import { urls } from '../../../config/web.config';

import JoinedInfo from '../../components/joinedInfo'
import JudgeDialog from '../../components/JudgeDialog'

export default class TeamDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      team: {},
      userUid: 'hw000008',
      dialogsDisplayUid: {}        // 所有申请信息的集合
    }
  }

  async componentWillMount() {
    // const userInfo = await this.props.getUserInfo();

    const _id = this.props.match.params.id
    const url = `${urls.graphql}/welink/v1/team/${_id}`

    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          let team = reply.data.team
          team.applyingList.map((applicant, index) => {
            applicant.dialogShow = 'none'
            applicant.btnText = this.getBtnText(applicant, team.createrUid)
            applicant.btnClass = this.getBtnClass(applicant , team.createrUid)
          })
          this.setState({
            team: { ...team }
          })
          let dialogsDisplayUid = {}
          this.state.team.applyingList.map((applicant, index) => {
            let uid = applicant.uid
            dialogsDisplayUid[uid] = 'none'
          })
          this.setState({
            dialogsDisplayUid
          })
          console.log(this.state)
        }
      });
    });
  }

  componentDidMount() {
  }

  // 战队详情页，每个申请条目的按钮文字
  getBtnText(applicant, createrUid) {
    console.log(applicant)
    if(createrUid === this.state.userUid) {
      if(!applicant.judgment) {
        return '审核'
      } else if(applicant.judgment.accept) {
        return '通过'
      } else {
        return '已拒'
      }
    } else {
      if(!applicant.judgment) {
        return '待审'
      } else if(applicant.judgment.accept) {
        return '通过'
      } else {
        return '未通过'
      }
    }
  }

  getBtnClass(applicant, createrUid) {
    if(createrUid === this.state.userUid && !applicant.judgment) {
      return 'weui-swiped-btn weui-swiped-btn_warn'
    } else {
      return 'weui-swiped-btn weui-swiped-btn_default'
    }
  }

  clickBtn(applicant) {
    if(applicant.btnClass === 'weui-swiped-btn weui-swiped-btn_warn') {
      this.showJudgeDialog(applicant.uid)
    }
  }

  showJudgeDialog(key) {
    let team = this.state.team
    let applyingList = team.applyingList
    applyingList.map((applicant, index) => {
      if(applicant.uid === key) {
        applicant.dialogShow = 'show'
        return true
      }
    })
    team.applyingList = applyingList
    this.setState({
      team
    })
  }

  hideJudgeDialog(key) {
    let team = this.state.team
    let applyingList = team.applyingList
    applyingList.map((applicant, index) => {
      if(applicant.uid === key) {
        applicant.dialogShow = 'none'
        return true
      }
    })
    team.applyingList = applyingList
    this.setState({
      team
    })
  }

  judgeAgree(applicantUid, applyInfo) {
    const url = `${urls.graphql}/welink/v1/team/${this.state.team._id}/judgment`

    window.HWH5.fetchInternet(url, { 
      method: 'post', 
      headers: { 
        'Content-Type' : 'application/json' 
      }, 
      body: JSON.stringify({
        'uid': applicantUid,
        'accept': 'true',
        'applyInfo': applyInfo
      }),
      timeout: 6000 
    }).then((res) => {
      res.json().then((reply) => {
        console.log(reply)
        if (!reply.code) {
          console.log('成功提交')
          console.log(reply)
          // 刷新页面
          let team = reply.data.team
          team.applyingList.map((applicant, index) => {
            applicant.dialogShow = 'none'
            applicant.btnText = this.getBtnText(applicant, team.createrUid)
            applicant.btnClass = this.getBtnClass(applicant , team.createrUid)
          })
          this.setState({
            team: { ...team }
          })
        }
      });
    });
    console.log('同意了 ' + applicantUid + ' 的申请')
    this.hideJudgeDialog(applicantUid)
  }

  judgeReject(applicantUid, applyInfo) {
    const url = `${urls.graphql}/welink/v1/team/${this.state.team._id}/judgment`

    window.HWH5.fetchInternet(url, { 
      method: 'post', 
      headers: { 
        'Content-Type' : 'application/json' 
      }, 
      body: JSON.stringify({
        'uid': applicantUid,
        'accept': 'false',
        'applyInfo': applyInfo
      }),
      timeout: 6000 
    }).then((res) => {
      res.json().then((reply) => {
        console.log(reply)
        if (!reply.code) {
          console.log('成功提交')
          // 刷新页面
          let team = reply.data.team
          team.applyingList.map((applicant, index) => {
            applicant.dialogShow = 'none'
            applicant.btnText = this.getBtnText(applicant, team.createrUid)
            applicant.btnClass = this.getBtnClass(applicant , team.createrUid)
          })
          this.setState({
            team: { ...team }
          })
        }
      });
    });
    console.log('拒绝了 ' + applicantUid + ' 的申请')
    this.hideJudgeDialog(applicantUid)
  }

  render() {
    const team = this.state.team
    if (team._id) {
      const applyingList = team.applyingList
      return (
        <div className="page">
            <div className="page__hd teamHeader">
              <h1 className="page__title">
                { team.title } 
                <span className="weui-badge" style={{ marginLeft: '5px', position: 'absolute', top: 10, right: 15, lineHeight: '150%' }}>
                  { team.memberCount } / { team.memberMaxNumber }
                </span>
              </h1>
              <p className="page__desc">{ team.description }</p>
            </div>
            <div className="page__bd">
              {/* 剩余人数/总人数 */}
              <div className="weui-cells">
                <div className="weui-cell">
                  <div className="weui-cell__hd">
                    <label className="weui-label">剩余 / 总人数</label>
                  </div>
                  <div className="weui-cell__bd" style={{ textAlign: 'right' }}>
                  { team.memberMaxNumber - team.memberCount } / { team.memberMaxNumber }
                  </div>
                </div>
              </div>
              {/* 当前用户在此战队申请通过/拒绝的信息条 */}
              <div className='weui-cells'>
                <JoinedInfo applyingList={ applyingList } userUid={ this.state.userUid } />
              </div>
              {/* 新申请 */}
              <div className='weui-cells'>
              {
                applyingList.map((applicant, index) => (
                  <div key={ index }>
                    <div className='weui-cell'>
                      <div className='weui-cell__bd'>
                        <p>{ applicant.uid }</p>
                      </div>
                      {/* 未加入时显示‘申请加入’，加入成功之后显示联系方式 */}
                      <div className='weui-cell__ft'>{ '申请加入' }</div>
                    </div>
                    <div className='weui-cell weui-cell_swiped' key={ index }>
                      <div className='weui-cell__bd' style={{ 'transform': 'translateX(-68px)' }} >
                        <div className='weui-cell'>
                          <div className='weui-cell__bd'>
                            <p> </p>
                          </div>
                          <div className="weui-cell__ft">
                            { applicant.application.info  }
                          </div>
                        </div>
                      </div>
                      <div className="weui-cell__ft">
                        <a className={ applicant.btnClass } href="javascript:void(0)" onClick={ () => this.clickBtn(applicant) }>
                          { applicant.btnText }
                        </a>
                      </div>
                    </div>
                    <JudgeDialog 
                      applicant={ applicant } 
                      JudgeAgree = { () => this.judgeAgree(applicant.uid, applicant.application.info) }
                      JudgeReject = { () => this.judgeReject(applicant.uid, applicant.application.info) }
                    />
                  </div>
                ))
              }
              </div>
            </div>
        </div>
      );
    } else {
      return (
        <div>加载中</div>
      )
    }
    
  }
};

TeamDetail.propTypes = {
};
