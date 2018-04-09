import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as home from '../../actions/home';
import * as global from '../../actions/global';

import { urls } from '../../../config/web.config';
import { userInfo } from '../../../config/debug.userInfo';

import './Home.less';
import openNewView from '../../utils/openNewView';
import List from '../../components/List';
import TabBar from '../../components/TabBar';
import Swipper from '../../components/Swipper';
import { Link } from 'react-router-dom';

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
      hotList: [],
      userUid: userInfo.uid
    };
  }

  async componentWillMount() {
    window.HWH5.userInfo().then((data)=>{
      console.log(data);
    });
    const url = `${urls.graphql}/welink/v1/teams`
    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          let dataList = []
          reply.data.teams.map((team, index) => {
            dataList.push({
              id: team._id,
              memberCount: team.memberCount,
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
    const urlHot = `${urls.graphql}/welink/v1/teams?attr=hot`
    window.HWH5.fetchInternet(urlHot, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          const dataList = []
          console.log(reply.data.teams);
          reply.data.teams.map((item, index) => {
            let i = 0;
            switch (item.category) {
              case 'study':
                i = 0;
                break;
              case 'life':
                i = 1;
                break;
              case 'friends':
                i = 2;
                break;
              default:
                break;
            }
            if (item.team === null) {
              dataList[i] = {
                pathName: '/team',
                title: '在校缘与你相聚',
                applyNum: '',
                description: '校缘致力于为大家提供一个交流的机会，让每个有想法的人不再孤军奋战'
              };
            } else {
              dataList[i] = {
                id: item.team._id,
                pathName: '/team/'+item.team._id,
                title: item.team.title,
                applyNum: '已经有'+item.team.memberCount+'个小伙伴加入我们了，你也来加入我们吧！',
                description: item.team.description
              };
            }
          })
          console.log(dataList);
          this.setState({
            hotList: dataList
          })
          console.log(this.state.hotList);
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
    console.log(this.state.hotList);
    // const hotData = this.state.hotList;
    // const swiperPath = [];
    // for (let i = 0; i < this.state.hotList.length;i++) {
    //   if (this.state.hotList[i].id !== null) {
    //     hotData[i] = {
    //       title: hotData[i].title,
    //       applyNum: hotData[i].applyNum,
    //       description: hotData[i].description
    //     };
    //     swiperPath[i] = '/team/'+hotData[i].id;
    //   } else {
    //     hotData[i] = {
    //       title: '在校缘与你相聚',
    //       applyNum: '',
    //       description: '校缘致力于为大家提供一个交流的机会，让每个有想法的人不再孤军奋战'
    //     };
    //     swiperPath[i] = '/team';
    //   }
    // }
    // console.log(swiperPath);
    return (
      <div>
        <div className="contentContainer">
          <Swipper 
            number={5} 
            boxStyle="content" 
            interval={4000} 
          > 
            <li className="boxStyleLi" />
            {
              this.state.hotList.map((item, index) => (
                <Link className="boxStyleLi" to={item.pathName}>
                  <p>{item.title}</p>
                  <p>{item.applyNum}</p>
                  <p>{item.description}</p>
                </Link> 
              ))
            }
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
