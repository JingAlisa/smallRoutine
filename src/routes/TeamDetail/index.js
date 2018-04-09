import React from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../config/web.config';
import { userInfo } from '../../../config/debug.userInfo';

import './index.less';
import { 
  Page,
  Button,
  Panel,
  PanelHeader,
  PanelBody,
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Select,
  Input,
  TextArea
} from '../../../node_modules/@huawei/react-weui';

import JoinedInfo from '../../components/joinedInfo'
import JudgeDialog from '../../components/JudgeDialog'

export default class TeamDetail extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      team: {},
      userUid: userInfo.uid,
      status: 'no',
      warningNotComplete: false
    };

    // this.apply = this.apply.bindActionCreators(this)
  }

  componentWillMount() {
    const teamId = this.props.match.params.id
    const url = `${urls.graphql}/welink/v1/team/${ teamId }`

    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          this.refreshTeam(reply.data.team)
          // let team = reply.data.team
          // let applicants = [], applying = [], joined = [], rejected = [], currUser = []
          // if (team.createrUid === this.state.userUid) {
          //   team.role = {
          //     class: 'creater'
          //   }
          // }
          // team.applyingList.map((applicant, index) => {
          //   if (applicant.uid === this.state.userUid) {
          //     team.role = {
          //       class: 'applicant',
          //       result: !applicant.judgment ? '已申请' : (applicant.accept === 'true' ? '已加入' : '已被拒')
          //     }
          //   }
          //   applicant.dialogShow = 'none'
          //   applicant.btnText = this.getBtnText(applicant, team.createrUid)
          //   applicant.btnClass = this.getBtnClass(applicant , team.createrUid);
          //   // 根据不同的状态加入不同的Array
          //   (!applicant.judgment) ? applying.push(applicant) : (applicant.accept === 'true' ? joined.push(applicant) : rejected.push(applicant))
          //   // 若为当前用户，...
          //   if (applicant.uid === this.state.userUid) currUser.push(applicant)
          // })
          // if(team.role.class === 'creater') {
          //   applicants = applying.concat(joined).concat(rejected)
          // } else if(team.role.class === 'applicant' && team.role.result === '已加入') {
          //   applicants = joined
          // } else {
          //   applicants = currUser
          // }
          // team.applyingList = applicants
          // this.setState({
          //   team: { ...team }
          // })
        }
      });
    });
  }

  componentDidMount() {
    console.log(this.state.teamId)
  }

  // 根据传入的从服务端获取的原始team数据，经过处理，更新state中的team数据
  refreshTeam(team) {
    let applicants = [], applying = [], joined = [], rejected = [], currUser = []
    if (team.createrUid === this.state.userUid) {
      team.role = {
        class: 'creater'
      }
    }
    console.log(team)
    team.applyingList.map((applicant, index) => {
      if (applicant.uid === this.state.userUid) {
        // 在Team层面上为当前用户添加角色
        team.role = {
          class: 'applicant',
          result: !applicant.judgment ? '已申请' : (applicant.judgment.accept === true ? '已加入' : '已被拒')
        }
      }
      applicant.dialogShow = 'none'
      applicant.btnText = this.getBtnText(applicant, team.createrUid)
      applicant.btnClass = this.getBtnClass(applicant , team.createrUid);
      // 根据不同的状态加入不同的Array
      (!applicant.judgment) ? applying.push(applicant) : (applicant.judgment.accept === true ? joined.push(applicant) : rejected.push(applicant))
      // 若为当前用户，...
      if (applicant.uid === this.state.userUid) currUser.push(applicant)
    })
    if(team.role && team.role.class === 'creater') {
      applicants = applying.concat(joined).concat(rejected)
    } else if(team.role && team.role.class === 'applicant' && team.role.result === '已加入') {
      applicants = joined
    } else {
      applicants = currUser
    }
    team.applyingList = applicants
    this.setState({
      team: { ...team }
    })
  }

  apply() {
    const contactWayObj = document.getElementById("contactSelecter")
    let contactWayIndex = contactWayObj.selectedIndex; // 选中索引
    let contactWayValue = contactWayObj.options[contactWayIndex].value; // 所选联系方式

    // 填写的联系方式的内容（号码）
    const contactText = document.getElementById("contactText").value
    // 申请信息
    const applyInfo = document.getElementById("applyInfoTextArea").value

    // 所有项目都必须填写，否则弹出提示
    if(!(contactText && applyInfo)) {
      this.setState({
        warningNotComplete: true
      })
      return;
    }

    const url = `${urls.graphql}/welink/v1/team/${this.state.team._id}/applicant`

    window.HWH5.fetchInternet(url, { 
      method: 'post', 
      headers: { 
        'Content-Type' : 'application/json' 
      }, 
      body: JSON.stringify({
        'uid': this.state.userUid,
        'applyInfo': applyInfo,
        'contact': {
          way: contactWayValue,
          text: contactText
        }
      }),
      timeout: 6000 
    }).then((res) => {
      res.json().then((reply) => {
        console.log(reply)
        if (!reply.code) {
          console.log('成功提交')
          console.log(reply)
          // 刷新页面
          this.refreshTeam(reply.data.team)
        }
      });
    });
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
          this.refreshTeam(reply.data.team)
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
          this.refreshTeam(reply.data.team)
        }
      });
    });
    console.log('拒绝了 ' + applicantUid + ' 的申请')
    this.hideJudgeDialog(applicantUid)
  }

  render() { 
    const team = this.state.team
    if (team && team._id) {
      let applyingList = team.applyingList
      return (
        <Page>
          <div><img src="../assets/images/3dPaVX1fcS.png" alt="back" onClick={()=>this.props.history.goBack()} /></div>
          <div>
            <h3>调试信息</h3>
            <p>战队Creater: { this.state.team.createrUid }</p>
            <p>当前用户: { this.state.userUid }</p>
          </div>
          <Panel>
            <PanelHeader>战队信息介绍</PanelHeader>
            <PanelBody>
              <div>
                <div>
                  <span>{this.state.team.title}</span>
                  {
                    // 若为创建者，则不显示申请按钮；若为申请者，则显示可用的申请按钮或灰色的'已申请'
                    (!(team.role && team.role.class === 'creater')) && (
                      <span>
                        <Button type="primary" size="small" onClick={ () => this.apply() } disabled={ !team.role ? '' : 'disabled' }>
                          { !team.role ? '申请' : team.role.result  }
                        </Button>
                      </span>
                    )
                  }
                </div>
                <div><span>成功加入人数/战队上限人数:</span><span>{this.state.team.memberCount}/{this.state.team.memberMaxNumber}</span></div>
                <div>{this.state.description}</div>
              </div>
            </PanelBody>
          </Panel>
          {
            (team.role) ? (
              // 作为 战队创建者或已申请者 看到的信息
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
            ) : (
              // 未申请者填写申请信息
              <Panel>
                <PanelHeader>个人信息介绍</PanelHeader>
                <PanelBody>
                  <Form>
                    <FormCell>
                      <CellHeader>
                        <Select defaultValue="wechat" required id="contactSelecter">
                          <option value="qq">QQ</option>
                          <option value="wechat">微信</option>
                          <option value="phone">电话</option>
                        </Select>
                      </CellHeader>
                      <CellBody>
                        <Input type="text" placeholder="请输入联系方式" id="contactText" />
                      </CellBody>
                    </FormCell>
                    <FormCell>
                      <CellBody>
                        <TextArea placeholder="请大胆的展示自己，增加申请成功几率，不超过500字" rows="3" id="applyInfoTextArea" />
                      </CellBody>
                    </FormCell>
                    {
                      this.state.warningNotComplete === true ? (
                        <FormCell>
                          <CellBody style={{ color: 'red' }}>
                            提示：请填写所有项目！
                          </CellBody>
                        </FormCell>
                      ) : (<a></a>)
                    }
                    
                  </Form>
                </PanelBody>
              </Panel>
            )  
            
          }
          
        </Page>
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
