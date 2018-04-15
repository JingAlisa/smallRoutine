import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import '../../../node_modules/@huawei/react-weui/build/dist/react-weui.css';

import { 
  Page,
  InfiniteLoader,
  Cells,
  CellsTitle,
  Cell,
  CellBody,
  CellFooter
} from '../../../node_modules/@huawei/react-weui';
import List from '../../components/List';

import { getTeamsOfPage } from '../../utils/team';

export default class TeamsLazyLoader extends React.Component {
  
  render() {
    return (
      <InfiniteLoader
        onLoadMore={ async (resolve, finish) => {
          const anyMore = await this.props.onLoadMore()
          if (anyMore) {
            // 后续还可能有数据
            resolve()
          } else {
            // 已经不会有更多数据了
            finish()
          }
        }}
      >
        <List className="list" listData={this.props.teams} page="home" hotList={this.props.hotList}  />
      </InfiniteLoader>
    )
  }
}
