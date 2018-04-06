import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as home from '../../actions/home';
import * as global from '../../actions/global';

import { Swiper } from '../../../node_modules/@huawei/react-weui';
import './Home.less';
import openNewView from '../../utils/openNewView';
import List from '../../components/List';
import TabBar from '../../components/TabBar';

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home, ...global }, dispatch)
)
export default class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dataList: []
  //   };
  // }

  // async componentWillMount() {

  // }

  componentDidMount() {
    window.HWH5.navTitle({ title: '发票查询' });
    const url = '/welink/v1/teams';
    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        console.log(reply.data);
        // const data = JSON.parse(reply.data);
        // console.log(data);
        // this.props = { dataList };
        // console.log(this.props);
        // console.log(dataList);
        // console.log(reply.data instanceof Object);
        // this.setState({
        //   dataList: reply.data
        // });
      });
    });
  }

  more(key) {
    this.props.setInvoivceIndex(key);
    this.props.setPath(null);
    openNewView('/editor');
  }

  render() {
    const list = [
      {
        acceptNum: '2',
        memberMaxNumber: '5',
        title: 'title',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '3',
        memberMaxNumber: '5',
        title: 'title',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '4',
        memberMaxNumber: '5',
        title: 'title',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '5',
        memberMaxNumber: '5',
        title: 'title',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '6',
        memberMaxNumber: '5',
        title: 'title',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '7',
        memberMaxNumber: '5',
        title: 'title',
        description: 'hello world, I am happy I am here!'
      }
    ];
     
    // const lists = this.props.dataList;
    // const dataList = this.state.dataList.map((item, index)=>{ 
    //   return dataList[index]; 
    // });
    const rel = true;
    return (
      <div>
        <div className="homeContainer">
          <Swiper className="swiper" height={150} speed={3000} indicator={rel}> 
            <img src="../assets/images/3dPaVX1fcS.png" alt="logo" />
            <p>num2</p>
            <p>num3</p>
          </Swiper>
          <List className="list" listData={list} />
        </div>
        <TabBar className="tabbar" />
      </div>
    );
  }
};

Home.propTypes = {
  // dataList: PropTypes.array
};

