import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Link } from 'react-router-dom';

import { urls } from '../../../config/web.config';

import TabBar from '../../components/TabBar';
import List from '../../components/List';
import { Tab, NavBarItem, SearchBar } from '../../../node_modules/@huawei/react-weui';

export default class Teams extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          acceptNum: 2,
          memberMaxNumber: 5,
          title: 'study',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: 3,
          memberMaxNumber: 5,
          title: 'study',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: 4,
          memberMaxNumber: 5,
          title: 'study',
          description: 'hello world, I am happy I am here!'
        }
      ],
      originData: [],
      filter: {
        category: 'all',
        keyword: ''
      }
    };
  }

  componentWillMount() {
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
              description: team.description,
              category: team.category
            })
          })
          this.setState({
            originData: dataList
          })
        }
      });
    }).catch((error) => {
      console.error('输出错误')
      console.error(error)
    });
  }

  componentDidMount() {
    let navbar = document.getElementsByClassName('navbar')[0];
    let self = this
    navbar.addEventListener('click', function (e) {
      let filter = self.state.filter
      filter.category = e.target.attributes.value.value
      self.setState({
        'filter': filter
      });
      console.log(self.state.filter)
    });
  }

  searchResult(e) {
    var origin = this.state.originData;
    var filterData = [];
    // e.preventdefault();
    console.log(origin);
    console.log(typeof e);
    let filter = this.state.filter
    filter.keyword = e
    this.setState({
      filter: filter
    });
    // if (e === '') {
    //   this.setState({
    //     list: origin
    //   });
    //   return ;
    // }
    // for (let i = 0; i < origin.length; i++) {
    //   origin[i].map((item, index) => {
    //     if (item.title.indexOf(e) !== -1) {
    //       filterData.push(item);
    //     }
    //   });
    // }

    // this.setState({
    //   list: filterData
    // });
  }

  // 根据this.state.filter中的category和keyword得到筛选结果，返回true/false
  getFilter(team) {
    const category = this.state.filter.category
    const keyword = this.state.filter.keyword

    if(category !== 'all' && category !== team.category) {
      return false
    }

    if(keyword !== '' && team.title.indexOf(keyword) === -1){
      return false
    }

    return true
  }

  // 遍历originData，给出符合筛选条件的teams
  getFiltedList() {
    let filtedList = []
    this.state.originData.map((team, index) => {
      if (this.getFilter(team) === true) {
        filtedList.push(team)
      }
    })
    console.log('即将显示筛选出的数据')
    console.log(filtedList)
    return filtedList
  }


  render() {
    return (
      <div>
        <div className="contentContainer">
          <div>
            <SearchBar onChange={this.searchResult.bind(this)} placeholder="请输入关键字" />
          </div>
          <div className="navbar">
            <Tab type="navbar">
              <NavBarItem className="navBarItem" label="全部" value="all" />
              <NavBarItem className="navBarItem" label="学习类" value="study" />
              <NavBarItem className="navBarItem" label="生活类" value="life" />
              <NavBarItem className="navBarItem" label="交友类" value="friends" />
            </Tab>
          </div>
          <div className="listArea">
            <List listData={this.getFiltedList()} page="teams" />
          </div>
        </div>
        <div className="tabbar"><TabBar /></div>
      </div>
    );
  }
};

Teams.propTypes = {
};
