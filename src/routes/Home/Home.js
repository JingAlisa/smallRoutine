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
      userUid: ''
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
    
    const url = `${urls.graphql}/welink/v1/teams?status=true`
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
                slogan: '来不及解释了，快上车吧！',
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
                  <div className="boxContent">
                    <p>{item.title}</p>
                    <p>{item.description.length > 20 ? item.description.substring(0, 25)+'......' : item.description}</p>
                    <p>{item.slogan}</p>
                  </div>
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



