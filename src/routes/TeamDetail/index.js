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
    // this.state = {
    //   title: props.location.data.title,
    //   acceptNum: props.location.data.acceptNum,
    //   memberMaxNumber: props.location.data.memberMaxNumber,
    //   description: props.location.data.description,
    //   // status应该也是从后台获取的，这先用假数据替代
    //   status: 'no'
    // };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // this.props.match.params.id获取id值和页面
    // console.log(this.props.match.params.id);
    // 获取id值
    var id = this.props.match.params.id.split(' ')[0];
    console.log(id);
    // 根据id请求后台数据
  }

  apply(permit, e) {
    console.log(e);
    console.log(permit);
    // if(permit) {

    // }
  }

  render() { 
    var page = this.props.match.params.id.split(' ')[1];
    console.log(page);
    if (page === 'teams') {
      return (
        <div>
          <div>teams detail</div>
        </div>
      );
    } else if (page === 'apply') {
      return (
        <div>apply detail</div>
      );
    } else if (page === 'public') {
      return (
        <div>
          <div>public detail</div>
        </div>
      );
    }
    return (
      <div>haha</div>
    );
  };
};

TeamDetail.propTypes = {
};
