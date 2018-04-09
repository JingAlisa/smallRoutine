import React from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../config/web.config';
import { userInfo } from '../../../config/debug.userInfo';
import Back from '../../public/img/icon/back.png';
import './index.less';
import createHistory from 'history/createHashHistory';
const history = createHistory();
import { 
  Page,
  ButtonArea,
  Button,
  CellsTitle,
  CellHeader,
  CellBody,
  CellFooter,
  Form,
  FormCell,
  Icon,
  Input,
  Label,
  TextArea,
  Select,
  Toptips
} from '../../../node_modules/@huawei/react-weui';
export default class AddTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userUid: userInfo.uid,
      showWarnTips: false,
      showSuccessTips: false,
      category: 'study',
      title: '',
      preserveMaxDays: '3',
      memberMaxNumber: '3',
      description: '',
      qq: '',
      wechat: '',
      phone: '',
      status: ''
    };
    this.changeValue = this.changeValue.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }
  // 给每个表单添加change事件
  changeValue(e) {
    var item = e.target.name;
    switch (item) {
      case 'category':
        this.setState({
          category: e.target.value
        });
        break;
      case 'title':
        this.setState({
          title: e.target.value
        });
        break;
      case 'preserveMaxDays':
        this.setState({
          preserveMaxDays: e.target.value
        });
        break;
      case 'memberMaxNumber':
        this.setState({
          memberMaxNumber: e.target.value
        });
        break;
      case 'description':
        this.setState({
          description: e.target.value
        });
        break;
      case 'qq':
        this.setState({
          qq: e.target.value
        });
        break;
      case 'wechat':
        this.setState({
          wechat: e.target.value
        });
        break;
      case 'phone':
        this.setState({
          phone: e.target.value
        });
        break;
      case 'status':
        this.setState({
          status: e.target.value
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Page className="input" title="Input" subTitle="表单输入">
        <div className="backAndTitle"><img src={Back} alt="back" onClick={()=>this.props.history.goBack()} /></div>
        <CellsTitle>请选择战队类别</CellsTitle>
        <Form>
          <FormCell select>
            <CellBody>
              <Select defaultValue="study" value={this.state.category} onChange={this.changeValue} name="category" required>
                <option value="study">学习类</option>
                <option value="life">生活类</option>
                <option value="friends">交友类</option>
              </Select>
            </CellBody>
          </FormCell>
        </Form>

        <CellsTitle>战队信息</CellsTitle>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>名称</Label>
            </CellHeader>
            <CellBody>
              <Input type="text" value={this.state.title} onChange={this.changeValue} name="title" placeholder="请输入战队名称" required />
            </CellBody>
          </FormCell>
          <FormCell select>
            <CellHeader>
              <Label>发布时长</Label>
            </CellHeader>
            <CellBody>
              <Select defaultValue="3" value={this.state.preserveMaxDays} onChange={this.changeValue} name="preserveMaxDays" required>
                <option value="3">3天</option>
                <option value="5">5天</option>
                <option value="7">7天</option>
              </Select>
            </CellBody>
          </FormCell>
          <FormCell select>
            <CellHeader>
              <Label>上线人数</Label>
            </CellHeader>
            <CellBody>
              <Select defaultValue="3" value={this.state.memberMaxNumber} onChange={this.changeValue} name="memberMaxNumber" required>
                <option value="1">1人</option>
                <option value="2">2人</option>
                <option value="3">3人</option>
                <option value="4">4人</option>
                <option value="0">不限人数</option>
              </Select>
            </CellBody>
          </FormCell>
          <FormCell>
            <CellBody>
              <TextArea value={this.state.description} onChange={this.changeValue} name="description" placeholder="请简单介绍战队信息，以便大家积极加入，不超过500字" rows="3" maxLength={500} />
            </CellBody>
          </FormCell>
        </Form>

        <CellsTitle>联系方式(至少填写一项)</CellsTitle>
        <Form>
          <FormCell>
            <CellHeader>
              <Label>QQ</Label>
            </CellHeader>
            <CellBody>
              <Input type="tel" value={this.state.qq} onChange={this.changeValue} name="qq" placeholder="请输入qq号码" />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>微信</Label>
            </CellHeader>
            <CellBody>
              <Input type="tel" value={this.state.wechat} onChange={this.changeValue} name="wechat" placeholder="请输入微信号码" />
            </CellBody>
          </FormCell>
          <FormCell>
            <CellHeader>
              <Label>电话</Label>
            </CellHeader>
            <CellBody>
              <Input type="tel" value={this.state.phone} onChange={this.changeValue} name="phone" placeholder="请输入电话号码" />
            </CellBody>
          </FormCell>
        </Form>

        <CellsTitle>申请人是否需要您的审批？</CellsTitle>
        <Form>
          <FormCell select>
            <CellBody>
              <Select defaultValue="no" value={this.state.status} onChange={this.changeValue} name="status" required>
                <option value="no">NO</option>
                <option value="yes">YES</option>
              </Select>
            </CellBody>
          </FormCell>
        </Form>

        <ButtonArea>
          <Button
          // button to display toptips
            onClick={e=> {
              // 获取增加的信息
              console.log(this.state);
              if (this.state.title === '' || (this.state.qq && this.state.wechat && this.state.phone)) {
                this.setState({ showWarnTips: true });
                window.setTimeout(e=> this.setState({ showWarnTips: !this.state.showWarnTips }), 2000);
              } else {
                this.setState({ showSuccessTips: true });
                window.setTimeout(e=> this.setState({ showSuccessTips: !this.state.showSuccessTips }), 2000);
                // 保存到后台数据库,并跳转到首页
                let teamInState = this.state
                let contact = []
                if(teamInState.qq !== '')     contact.push({qq: teamInState.qq})
                if(teamInState.wechat !== '') contact.push({qq: teamInState.wechat})
                if(teamInState.phone !== '')  contact.push({qq: teamInState.phone})
                let newTeam = {
                  title: teamInState.title,
                  description: teamInState.description,
                  category: teamInState.category,
                  createrUid: teamInState.userUid,
                  preserveMaxDays: teamInState.preserveMaxDays,
                  memberMaxNumber: teamInState.memberMaxNumber,
                  contact: contact
                }

                const url = `${urls.graphql}/welink/v1/new`

                window.HWH5.fetchInternet(url, { 
                  method: 'post', 
                  headers: { 
                    'Content-Type' : 'application/json' 
                  }, 
                  body: JSON.stringify({
                    ...newTeam
                  }),
                  timeout: 6000 
                }).then((res) => {
                  res.json().then((reply) => {
                    console.log(reply)
                    if (!reply.code) {
                      // console.log('成功提交')
                      // console.log(reply)
                      // // 刷新页面
                      // let team = reply.data.team
                      // if (team.createrUid === this.state.userUid) {
                      //   team.role = 'creater'
                      // }
                      // team.applyingList.map((applicant, index) => {
                      //   applicant.dialogShow = 'none'
                      //   applicant.btnText = this.getBtnText(applicant, team.createrUid)
                      //   applicant.btnClass = this.getBtnClass(applicant , team.createrUid)
                      // })
                      // this.setState({
                      //   team: { ...team }
                      // })
                    }
                  });
                });


                // this.context.router.push('/');
                setTimeout(()=>history.push('/'), 2000);



 
                
              }
            }}
          >
              OK
          </Button>
        </ButtonArea>
        {/* 提示完善信息的地方 */}
        <Toptips 
          type="warn"
          show={this.state.showWarnTips}
        >
          请完善信息
        </Toptips>
        {/* 提示提交成功的地方 */}
        <Toptips 
          type="primary"
          show={this.state.showSuccessTips}
        >
          保存成功
        </Toptips>
      </Page>
    );
  }
};

AddTeam.propTypes = {
};
