import React from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../config/web.config';
import { getUserInfo } from '../../utils/getUserInfo';

import './index.less';
import { 
  Page,
  Button,
  Panel,
  PanelHeader,
  PanelBody,
  MediaBox,
  Form,
  FormCell,
  CellHeader,
  CellBody,
  Select,
  Input,
  TextArea
} from '../../../node_modules/@huawei/react-weui';

import JudgeDialog from '../../components/JudgeDialog'

export default class TeamDetail extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      team: {},
      userUid: '',
      userName: '',
      status: 'no',
      warningNotComplete: false
    };

    this.changeValue = this.changeValue.bind(this);
  }

  async componentWillMount() {

    const userInfo = await getUserInfo()
    if(userInfo && userInfo.uid) {
      this.setState({
        userUid: userInfo.uid,
        userName: userInfo.userNameZH
      })
    }  

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
    window.HWH5.navTitle({ title: '战队详情介绍' });
  }

  addDate(date,days){ 
    var d=new Date(date); 
    d.setDate(d.getDate()+days); 
    var m=d.getMonth()+1; 
    return d.getFullYear()+'/'+m+'/'+d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes(); 
  } 

  // 根据传入的从服务端获取的原始team数据，经过处理，更新state中的team数据
  refreshTeam(team) {
    let applicants = [], applying = [], joined = [], rejected = [], currUser = []
    // let createTime = team.createTime
    // team.deadlineDate = team.createTime + team.preserveMaxDays
    team.deadlineDate = this.addDate(team.createTime, team.preserveMaxDays)
    if (team.createrUid === this.state.userUid) {
      team.role = {
        class: 'creater'
      }
    }
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

  changeValue(e) {
    var item = e.target.name;
    switch (item) {
      case 'contactWaySelecter':
        this.setState({
          contactWay: e.target.value
        });
        break;
      default:
        break;
    }
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
        'name': this.state.userName,
        'applyInfo': applyInfo,
        'contact': {
          way: contactWayValue,
          text: contactText
        }
      }),
      timeout: 6000 
    }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          // console.log('成功提交')
          // 刷新页面
          this.refreshTeam(reply.data.team)
        }
      });
    });
  }

  // 战队详情页，每个申请条目的按钮文字
  getBtnText(applicant, createrUid) {
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
        return '已拒'
      }
    }
  }

  getBtnClass(applicant, createrUid) {
    if(createrUid === this.state.userUid && !applicant.judgment) {
      return 'weui-swiped-btn weui-swiped-btn_warn'
    } else {
      return 'weui-swiped-btn weui-swiped-btn_default '
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

  judgeAgree(applicant) {
    const url = `${urls.graphql}/welink/v1/team/${this.state.team._id}/judgment`

    const applicantUid = applicant.uid
    const applicantName = applicant.name
    const applyInfo = applicant.application.info

    window.HWH5.fetchInternet(url, { 
      method: 'post', 
      headers: { 
        'Content-Type' : 'application/json' 
      }, 
      body: JSON.stringify({
        'uid': applicantUid,
        'name': applicantName,
        'accept': 'true',
        'applyInfo': applyInfo
      }),
      timeout: 6000 
    }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          // console.log('成功提交')
          // 刷新页面
          this.refreshTeam(reply.data.team)
        }
      });
    });
    this.hideJudgeDialog(applicantUid)
  }

  judgeReject(applicant) {
    const url = `${urls.graphql}/welink/v1/team/${this.state.team._id}/judgment`

    const applicantUid = applicant.uid
    const applicantName = applicant.name
    const applyInfo = applicant.application.info

    window.HWH5.fetchInternet(url, { 
      method: 'post', 
      headers: { 
        'Content-Type' : 'application/json' 
      }, 
      body: JSON.stringify({
        'uid': applicantUid,
        'name': applicantName,
        'accept': 'false',
        'applyInfo': applyInfo
      }),
      timeout: 6000 
    }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          // console.log('成功提交')
          // 刷新页面
          this.refreshTeam(reply.data.team)
        }
      });
    });
    this.hideJudgeDialog(applicantUid)
  }

  render() { 
    const team = this.state.team
    if (team && team._id) {
      console.log(team)
      let applyingList = team.applyingList
      return (
        <div>
          {/* <div>
            <h3>调试信息</h3>
            <p>战队Creater: { this.state.team.createrUid }</p>
            <p>当前用户: { this.state.userUid }</p>
          </div> */}
          <Panel>
            <PanelHeader>战队信息介绍</PanelHeader>
            <PanelBody>
              <MediaBox type="text">
              <div>
                <div className="titleAndBtn">
                  <span className="teamTitle">{this.state.team.title}</span>
                  {
                    // 若为创建者，则不显示申请按钮；若为申请者，则显示可用的申请按钮或灰色的'已申请'
                    (!(team.role && team.role.class === 'creater')) && (
                      <span>
                        <button className="applyBtn" onClick={ () => this.apply() } disabled={ !team.role ? '' : 'disabled' }>
                          { !team.role ? '申 请' : team.role.result  }
                        </button>
                      </span>
                    )
                  }
                </div>
                <div className="listContent">{this.state.team.description}</div>
                <div className="listContent numCount">
                  <span>人数: {this.state.team.memberCount}/{this.state.team.memberMaxNumber}人</span>
                  <span>截至: { this.state.team.deadlineDate }</span>
                </div>
              </div>

          
          </MediaBox>
          </PanelBody>
          </Panel>
          
          {
            (team.role && (team.role.class === 'creater' || team.role.result === '已加入')) ?
            (
              <div>
                <div className="weui-cells__title">队长联系方式</div>
                <div className='weui-cells'>
                {
                  team.contact.map((item, index) => (
                    <div className='weui-cell'>
                      <div className='weui-cell__bd'>
                        <p>
                          {
                            ((item.qq) ? 'QQ' : (item.wechat ? '微信' : '电话'))
                          }
                        </p>
                      </div>
                      <div className='weui-cell__ft'>
                        { (item.qq) ? item.qq : (item.wechat ? item.wechat : item.phone) }
                      </div>
                    </div>
                  ))
                }
                </div>
              </div>
            ) : ''
          }
          

          {
            (team.role) ? (
              // 作为 战队创建者或已申请者 看到的信息
              <div>
                {
                  applyingList.length>0 ? <div className="weui-cells__title">申请者信息</div> : <div className="emptyApplicat">还木有人加入战队，请耐心等待</div>
                }
                
                <div className='weui-cells'>
                {
                  applyingList.map((applicant, index) => (
                    <div key={ index } className="eachMessage">
                      <div className='weui-cell'>
                        <div className='weui-cell__bd'>
                          <p>{ applicant.name || applicant.uid }</p>
                        </div>
                        {/* 加入成功或为当前用户时，显示联系方式 */}
                        {/* <div className='weui-cell__ft'>{ '申请加入' }</div> */}
                        <div className='weui-cell__ft'>
                          { 
                            ((applicant.judgment && applicant.judgment.accept === true) || (applicant.uid === this.state.userUid)) 
                            ? (applicant.application.contact.way === 'qq' ? 'QQ' : (applicant.application.contact.way === 'wechat' ? '微信' : '电话') ) + ': ' + applicant.application.contact.text 
                            : '申请加入' 
                          }
                        </div>
                      </div>
                      <div className='weui-cell weui-cell_swiped' key={ index }>
                        <div className='msgInfo weui-cell__bd' style={{ 'width': '80%' }} >
                          <div className='weui-cell'>
                            <div className='msgInfo weui-cell__bd'>
                              { applicant.application.info  }
                            </div>
                          </div>
                        </div>
                        <div className="weui-cell__ft resultBtn" style={{ 'width': '20%' }}>
                          <div className="weui-cell__ft" >
                            <a className={ applicant.btnClass } href="javascript:void(0)" onClick={ () => this.clickBtn(applicant) }>
                              { applicant.btnText }
                            </a>
                          </div>
                        </div>
                        
                      </div>
                      <JudgeDialog 
                        applicant={ applicant } 
                        JudgeAgree = { () => this.judgeAgree(applicant) }
                        JudgeReject = { () => this.judgeReject(applicant) }
                      />
                    </div>
                  ))
                }
                </div>
              </div>
            ) : (

              <div>
                <div className="weui-cells__title">个人信息介绍</div>
                <div className="weui-cells">
                  <div className="weui-cell weui-cell_select weui-cell_select-before">
                    <div className="weui-cell__hd">
                      <select className="weui-select" id="contactSelecter" onChange={ this.changeValue } name='contactWaySelecter'>
                        <option value="qq">QQ</option>
                        <option value="wechat">微信</option>
                        <option value="phone">电话</option>
                      </select>
                    </div>
                    <div className="weui-cell__bd">
                      <input type={ (this.state.contactWay === 'wechat') ? 'text' : 'number' } className="weui-input typeContact" value={this.state.title} onChange={this.changeValue} name="title" id="contactText" placeholder="请输入联系方式" required />
                    </div>
                  </div>
                  <div className="weui-cell">
                    <div className="weui-cell__bd">
                      <TextArea className="weui-textarea textAreaInput" placeholder="请大胆的展示自己，增加申请成功几率，不超过500字" rows="3" id="applyInfoTextArea" maxLength={500} />
                    </div>
                  </div>
                  {
                      this.state.warningNotComplete === true ? (
                        // <FormCell>
                        //   <CellBody style={{ color: 'red' }}>
                        //     提示：请填写所有项目！
                        //   </CellBody>
                        // </FormCell>
                        <div id="dialogs">
                          <div className="js_dialog" id="iosDialog1">
                            <div className="weui-mask"></div>
                            <div className="weui-dialog">
                              <div className="weui-dialog__hd"><strong className="h5ui-dialog__title">完善信息</strong></div>
                              <div className="weui-dialog__bd">请选择并填写联系方式，同时完善个人介绍</div>
                              <div className="weui-dialog__ft">
                                <a href="javascript:;" onClick={()=>{this.setState({warningNotComplete:false})}} className="weui-dialog__btn weui-dialog__btn_primary">好嘞</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (<a></a>)
                    }
                </div>
              </div>

              // 未申请者填写申请信息
              // <Panel>
              //   <PanelHeader>个人信息介绍</PanelHeader>
              //   <PanelBody>
              //     <MediaBox>
              //       <div className="weui-cells">
              //         <div className="weui-cell weui-cell_select weui-cell_select-before">
              //           <div className="weui-cell__hd">
              //             <select className="weui-select" id="contactSelecter">
              //               <option value="qq">QQ</option>
              //               <option value="wechat">微信</option>
              //               <option value="phone">电话</option>
              //             </select>
              //           </div>
              //           <div className="weui-cell__bd">
              //             <input type="text" className="weui-input" value={this.state.title} onChange={this.changeValue} name="title" placeholder="请输入战队名称" required />
              //           </div>
              //         </div>
              //         <div className="weui-cell">
              //           <div className="weui-cell__bd">
              //             <TextArea className="weui-textarea textAreaInput" placeholder="请大胆的展示自己，增加申请成功几率，不超过500字" rows="3" id="applyInfoTextArea" />
              //           </div>
              //         </div>
              //       </div>
              //     </MediaBox> 
                    // {
                    //   this.state.warningNotComplete === true ? (
                    //     <FormCell>
                    //       <CellBody style={{ color: 'red' }}>
                    //         提示：请填写所有项目！
                    //       </CellBody>
                    //     </FormCell>
                    //   ) : (<a></a>)
                    // }
              //   </PanelBody>
              // </Panel>
            )  
            
          }
          
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
