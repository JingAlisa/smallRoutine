import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as home from '../../actions/home';
import * as global from '../../actions/global';

import { urls } from '../../../config/web.config';
import { userInfo } from '../../../config/debug.userInfo';

// import { Swiper } from '../../../node_modules/@huawei/react-weui';
import './Home.less';
import openNewView from '../../utils/openNewView';
import List from '../../components/List';
import TabBar from '../../components/TabBar';
import Swipper from '../../components/Swipper';

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home, ...global }, dispatch)
)
export default class Home extends React.Component {
  // constructor(props) {
  constructor() {
    // super(props);
    super();
    this.state = {
      dataList: [],
      userUid: userInfo.uid
    };
  }

  async componentWillMount() {
    console.log(userInfo)
    const url = `${urls.graphql}/welink/v1/teams`
    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          // this.setState({
          //   msgs_creater: reply.data.msgs
          // })
          let dataList = []
          reply.data.teams.map((team, index) => {
            dataList.push({
              id: team._id,
              acceptNum: team.memberCount,
              memberMaxNumber: team.memberMaxNumber,
              title: team.title,
              description: team.description
            })
          })
          this.setState({
            dataList
          })
        }
      });
    }).catch((error) => {
      console.error('输出错误')
      console.error(error)
    });
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '校缘' });
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
      }
    ];
    console.log(this.state.dataList);
    return (
      <div>
        <div className="homeContainer">
          <Swipper 
            number={5} 
            boxStyle="content" 
            interval={4000} 
          > 
            {
              list.map((item, index) => (
                <li className="boxStyleLi">{item.acceptNum}</li>
              ))
            }
            {/* <li className="boxStyleLi">first</li> 
            <li className="boxStyleLi">second</li> 
            <li className="boxStyleLi">third</li> 
            <li className="boxStyleLi">forth</li>
            <li className="boxStyleLi">first</li> */}
          </Swipper>
          
          <List className="list" listData={this.state.dataList} page="home" />

          {/* <List className="list" listData={list} /> */}
        </div>
        <div className="tabbar"><TabBar /></div>
      </div>
    );
  }
};

Home.propTypes = {
  // dataList: PropTypes.array
};



