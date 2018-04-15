import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

import TeamsLazyLoader from '../../components/TeamsLazyLoader';

import { 
  Page,
  InfiniteLoader,
  Cells,
  CellsTitle,
  Cell,
  CellBody,
  CellFooter
} from '../../../node_modules/@huawei/react-weui';

import { getTeamsOfPage } from '../../utils/team';

export default class LazyLoadingPage extends React.Component {
  constructor(props)　{
    super(props);
    this.state = {
      teams: [],
      pageIndex: 1
    }
  }

  async componentWillMount() {
    const teams= await getTeamsOfPage(1, 9);
    console.log(teams)
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
      pageIndex: this.state.pageIndex + 3
    });
  }

  async getNextPage() {
    const teams= await getTeamsOfPage(this.state.pageIndex, 3);
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
      <TeamsLazyLoader
        teams={this.state.teams}
        onLoadMore={this.getNextPage.bind(this)}
      />
    )
  }
};

LazyLoadingPage.propTypes = {
};
