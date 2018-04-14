import React from 'react';
import PropTypes from 'prop-types';

import { urls } from '../../../config/web.config';
import { getUserInfo } from '../../utils/getUserInfo';
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
  Form,
  FormCell,
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
      userUid: '',
      userName: '',
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

  async componentWillMount() {
    const userInfo = await getUserInfo()
    if(userInfo && userInfo.uid) {
      this.setState({
        userUid: userInfo.uid,
        userName: userInfo.userNameZH
      })
    }  
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '创建新战队' });
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
      <div className="input" title="Input" subTitle="表单输入">
        <CellsTitle>请选择战队类别</CellsTitle>
        <Form>
          <FormCell select>
            <CellBody>
              <Select value={this.state.category} className="categorySelect" onChange={this.changeValue} name="category" required>
                <option value="study">学习类</option>
                <option value="life">生活类</option>
                <option value="friends">交友类</option>
              </Select>
            </CellBody>
          </FormCell>
        </Form>

        <div className="weui-cells__title">战队信息</div>
        <div className="weui-cells weui-cells_form">
          <div className="weui-cell">
            <div className="weui-cell__hd"><label className="weui-label">名称</label></div>
            <div className="weui-cell__bd">
              <input type="text" className="weui-input" value={this.state.title} onChange={this.changeValue} name="title" placeholder="请输入战队名称" required />
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><label className="weui-label">发布时长</label></div>
            <div className="weui-cell__bd">
              <Select value={this.state.preserveMaxDays} onChange={this.changeValue} name="preserveMaxDays" required>
                <option value="3">3天</option>
                <option value="5">5天</option>
                <option value="7">7天</option>
              </Select>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><label className="weui-label">战队人数</label></div>
            <div className="weui-cell__bd">
              <Select value={this.state.memberMaxNumber} onChange={this.changeValue} name="memberMaxNumber" required>
                <option value="1">1人</option>
                <option value="2">2人</option>
                <option value="3">3人</option>
                <option value="4">4人</option>
                <option value="5">5人</option>
              </Select>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__bd">
            <TextArea value={this.state.description} onChange={this.changeValue} name="description" placeholder="请简单介绍战队信息，以便大家积极加入，不超过500字" rows="3" maxLength={500} />
            </div>
          </div>
        </div>

        {/* <CellsTitle>战队信息</CellsTitle>
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
              <Select value={this.state.preserveMaxDays} onChange={this.changeValue} name="preserveMaxDays" required>
                <option value="3">3天</option>
                <option value="5">5天</option>
                <option value="7">7天</option>
              </Select>
            </CellBody>
          </FormCell>
          <FormCell select>
            <CellHeader>
              <Label>上限人数</Label>
            </CellHeader>
            <CellBody>
              <Select value={this.state.memberMaxNumber} onChange={this.changeValue} name="memberMaxNumber" required>
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
        </Form> */}

        <div className="weui-cells__title">联系方式(至少填写一项)</div>
        <div className="weui-cells weui-cells_form">
          <div className="weui-cell">
            <div className="weui-cell__hd"><label className="weui-label">QQ</label></div>
            <div className="weui-cell__bd">
              <input type="number" className="weui-input" value={this.state.qq} onChange={this.changeValue} name="qq" placeholder="请输入qq号码" />
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><label className="weui-label">微信</label></div>
            <div className="weui-cell__bd">
              <input type="text" pattern='[a-zA-Z][0-9]*' className="weui-input" value={this.state.wechat} onChange={this.changeValue} name="wechat" placeholder="请输入微信号" />
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><label className="weui-label">电话</label></div>
            <div className="weui-cell__bd">
              <input type="number" pattern='[0-9]*' className="weui-input" value={this.state.phone} onChange={this.changeValue} name="phone" placeholder="请输入手机号" />
            </div>
          </div>
        </div>

        <ButtonArea>
          <Button
          // button to display toptips
            onClick={e=> {
              // 获取增加的信息
              if (this.state.title === '' || !(this.state.qq || this.state.wechat || this.state.phone)) {
                this.setState({ showWarnTips: true });
                window.setTimeout(e=> this.setState({ showWarnTips: !this.state.showWarnTips }), 2000);
              } else {
                this.setState({ showSuccessTips: true });
                window.setTimeout(e=> this.setState({ showSuccessTips: !this.state.showSuccessTips }), 2000);
                // 保存到后台数据库,并跳转到首页
                let teamInState = this.state
                let contact = []
                if(teamInState.qq !== '')     contact.push({qq: teamInState.qq})
                if(teamInState.wechat !== '') contact.push({wechat: teamInState.wechat})
                if(teamInState.phone !== '')  contact.push({phone: teamInState.phone})
                let newTeam = {
                  title: teamInState.title,
                  description: teamInState.description,
                  category: teamInState.category,
                  createrUid: teamInState.userUid,
                  createrName: teamInState.userName,
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
                    if (!reply.code) {
                      // console.log('成功提交')
                    }
                  });
                });
                setTimeout(()=>history.push('/'), 2000);
              }
            }}
          >
              创  建
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
      </div>
    );
  }
};

AddTeam.propTypes = {
};
