import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import { Link } from 'react-router-dom';

import TabBar from '../../components/TabBar';
import List from '../../components/List';
import { NavBar, NavBarItem, SearchBar } from '../../../node_modules/@huawei/react-weui';

export default class Teams extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          acceptNum: '2',
          memberMaxNumber: '5',
          title: 'study',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '3',
          memberMaxNumber: '5',
          title: 'study',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '4',
          memberMaxNumber: '5',
          title: 'study',
          description: 'hello world, I am happy I am here!'
        }
      ],
      originData: []
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // 从服务器端获取数据，目前先用假数据代替
    const replayData = [
      [{
        acceptNum: '2',
        memberMaxNumber: '5',
        title: 'study',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '3',
        memberMaxNumber: '5',
        title: 'study',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '4',
        memberMaxNumber: '5',
        title: 'study',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '2',
        memberMaxNumber: '9',
        title: 'study',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '2',
        memberMaxNumber: '8',
        title: 'study',
        description: 'hello world, I am happy I am here!'
      },
      {
        acceptNum: '3',
        memberMaxNumber: '5',
        title: 'study',
        description: 'hello world, I am happy I am here!'
      }],
      [
        {
          acceptNum: '2',
          memberMaxNumber: '5',
          title: 'life',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '3',
          memberMaxNumber: '5',
          title: 'life',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '4',
          memberMaxNumber: '5',
          title: 'life',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '4',
          memberMaxNumber: '5',
          title: 'life',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '2',
          memberMaxNumber: '5',
          title: 'life',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '1',
          memberMaxNumber: '5',
          title: 'life',
          description: 'hello world, I am happy I am here!'
        }
      ],
      [
        {
          acceptNum: '0',
          memberMaxNumber: '5',
          title: 'friends',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '3',
          memberMaxNumber: '5',
          title: 'friends',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '4',
          memberMaxNumber: '5',
          title: 'friends',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '1',
          memberMaxNumber: '5',
          title: 'friends',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '2',
          memberMaxNumber: '5',
          title: 'friends',
          description: 'hello world, I am happy I am here!'
        },
        {
          acceptNum: '4',
          memberMaxNumber: '5',
          title: 'friends',
          description: 'hello world, I am happy I am here!'
        }
      ]
    ];
    var navbar = document.getElementsByClassName('navbar')[0];
    var self = this;
    this.state.originData = replayData;
    navbar.addEventListener('click', function (e) {
      console.log(e.target.attributes.value.value);
      switch (e.target.attributes.value.value) {
        case 'study':
          self.setState({
            list: replayData[0]
          });
          break;
        case 'life':
          self.setState({
            list: replayData[1]
          });
          break;
        case 'friends':
          self.setState({
            list: replayData[2]
          });
          break;
        default:
          break;
      }
    });
  }

  searchResult(e) {
    var origin = this.state.originData;
    var filterData = [];
    // e.preventdefault();
    console.log(origin);
    console.log(e);
    for (let i = 0; i < origin.length; i++) {
      origin[i].map((item, index) => {
        if (item.title.indexOf(e) !== -1) {
          filterData.push(item);
        }
      });
    }
    
    this.setState({
      list: filterData
    });
  }
  render() {
    return (
      <div>
        <NavBar className="navbar">
          <NavBarItem className="navBarItem" value="study">学习类</NavBarItem>
          <NavBarItem className="navBarItem" value="life">生活类</NavBarItem>
          <NavBarItem className="navBarItem" value="friends">交友类</NavBarItem>
        </NavBar>
        <List listData={this.state.list} />
        <SearchBar onChange={this.searchResult.bind(this)} placeholder="请输入关键字" />
        <TabBar />
      </div>
    );
  }
};

Teams.propTypes = {
};
