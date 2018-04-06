import React from 'react';
import PropTypes from 'prop-types';
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
export default class TeamDetail extends React.Component {

  constructor(props, context) {
    super(props, context);
    console.log(props.location);
    this.state = {
      title: props.location.data.title,
      acceptNum: props.location.data.acceptNum,
      memberMaxNumber: props.location.data.memberMaxNumber,
      description: props.location.data.description,
      // status应该也是从后台获取的，这先用假数据替代
      status: 'no'
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  apply(permit,e) {
    console.log(e);
    console.log(permit);
    // if(permit) {

    // }
  }

  render() { 
    return (
      <Page>
        <div><img src="../assets/images/3dPaVX1fcS.png" alt="back" onClick={()=>this.props.history.goBack()} /></div>
        <Panel>
          <PanelHeader>战队信息介绍</PanelHeader>
          <PanelBody>
            <div>
              <div><span>{this.state.title}</span><span><Button type="primary" size="small" onClick={({this.state.status}, event) => this.apply} value="apply">申请</Button></span></div>
              <div><span>成功加入人数/战队上限人数:</span><span>{this.state.acceptNum}/{this.state.memberMaxNumber}</span></div>
              <div>{this.state.description}</div>
            </div>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelHeader>个人信息介绍</PanelHeader>
          <PanelBody>
            <Form>
              <FormCell>
                <CellHeader>
                  <Select defaultValue="wechat" required>
                    <option value="qq">QQ</option>
                    <option value="wechat">微信</option>
                    <option value="phone">电话</option>
                  </Select>
                </CellHeader>
                <CellBody>
                  <Input type="text" placeholder="请输入联系方式" />
                </CellBody>
              </FormCell>
              <FormCell>
                <CellBody>
                  <TextArea placeholder="请大胆的展示自己，增加申请成功几率，不超过500字" rows="3" maxLength="500" />
                </CellBody>
              </FormCell>
            </Form>
          </PanelBody>
        </Panel>
      </Page>
    );
  }
};

TeamDetail.propTypes = {
};
