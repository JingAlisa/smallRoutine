import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as home from '../../actions/home';
import * as global from '../../actions/global';

import { urls } from '../../../config/web.config';
import { getUserInfo } from '../../utils/getUserInfo';

import './Home.less';
import openNewView from '../../utils/openNewView';
import List from '../../components/List';
import TabBar from '../../components/TabBar';
import Swipper from '../../components/Swipper';
import TeamsLazyLoader from '../../components/TeamsLazyLoader';
import { Link } from 'react-router-dom';
import TopImg from '../../public/img/icon/top.png';
// 懒加载
import {getTeamsOfPage} from '../../utils/team';

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
      hotList: [],
      userUid: '',
      teams: [],
      pageIndex: 1
    };
  }

  async componentWillMount() {

    const userInfo = await getUserInfo()
    if(userInfo && userInfo.uid) {
      this.setState({
        userUid: userInfo.uid,
        userName: userInfo.userNameZH
      })
    }

    const urlHot = `${urls.graphql}/welink/v1/teams?attr=hot&status=true`
    window.HWH5.fetchInternet(urlHot, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          const dataList = []
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
                title: '在校缘与你相遇',
                slogan: '校缘致力于为大家提供一个交流的机会，',
                description: '让每个有想法的人不再孤军奋战'
              };
            } else {
              dataList[i] = {
                id: item.team._id,
                pathName: '/team/'+item.team._id,
                title: item.team.title,
                slogan: (function () {
                  if(i==0){
                    return '众人拾柴火焰高，来来来再加把火'
                  }
                  if(i==1){
                    return '别犹豫了，再不疯狂就老了'
                  }
                  if(i==2){
                    return '来不及解释了，快上车！'
                  }
                })(),
                description: item.team.description
              };
            }
          })
          this.setState({
            hotList: dataList
          })
        }
      });
    }).catch((error) => {
      console.error('输出错误')
      console.error(error)
    });

    const teams= await getTeamsOfPage(1, 10);
    if(teams.length === 0) return 0;
    let dataList = []
    teams.map((team, index) => {
      dataList.push({
        id: team._id,
        memberCount: team.memberCount,
        memberMaxNumber: team.memberMaxNumber,
        title: team.title,
        description: team.description
      })
    });
    this.setState({
      teams: this.state.teams.concat(dataList),
      pageIndex: this.state.pageIndex + 1
    });
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '校缘' });  
    
  }

  async getNextPage() {
    console.log('进入懒加载...')
    const teams= await getTeamsOfPage(this.state.pageIndex, 10);
    console.log(teams)
    if (teams.length !== 0) {
      let dataList = []
      teams.map((team, index) => {
        dataList.push({
          id: team._id,
          memberCount: team.memberCount,
          memberMaxNumber: team.memberMaxNumber,
          title: team.title,
          description: team.description
        })
      });
      this.setState({
        teams: this.state.teams.concat(dataList),
        pageIndex: this.state.pageIndex + 1
      });
      return 1; // 获取数据不为0，下次还可获取
    } else {
      return 0; // 获取数据为0，结束
    }
  }

  render() {
    return (
      <div>
        <div className="contentContainer">
          {/* <Swipper 
            number={5} 
            boxStyle="content" 
            interval={4000} 
          > 
            <li className="boxStyleLi" />
            {
              this.state.hotList.map((item, index) => (
                <Link className="boxStyleLi" to={item.pathName}>
                  <div className="boxContent">
                    <p>{item.title}</p>
                    <p>{item.description.length > 20 ? item.description.substring(0, 25)+'......' : item.description}</p>
                    <p>{item.slogan}</p>
                  </div>
                </Link> 
              ))
            }
          </Swipper> */}
          
          <TeamsLazyLoader
            className="lazyLoader"
            teams={this.state.teams}
            hotList={this.state.hotList}
            onLoadMore={this.getNextPage.bind(this)}
            style={{ 'margin-bottom': '80px'}}
          />

        </div>
        <div className="tabbar"><TabBar /></div>
      </div>
    );
  }
};

Home.propTypes = {
  // dataList: PropTypes.array
};



