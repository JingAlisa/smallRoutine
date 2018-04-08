import React from 'react';
import './index.less';
import PropTypes from 'prop-types';
import Right from './images/right.png';

// 引入Item组件
import Item from '../../components/Item';
export default function List(props) {
  // const 
  //   {
  //     companyName,
  //     more, 
  //     taxNumber, 
  //     bank,
  //     index
  //   } = props;
  // const list = [
  //   {
  //     acceptNum: '2',
  //     memberMaxNumber: '5',
  //     title: 'title',
  //     description: 'hello world, I am happy I am here!'
  //   },
  //   {
  //     acceptNum: '3',
  //     memberMaxNumber: '5',
  //     title: 'title',
  //     description: 'hello world, I am happy I am here!'
  //   },
  //   {
  //     acceptNum: '4',
  //     memberMaxNumber: '5',
  //     title: 'title',
  //     description: 'hello world, I am happy I am here!'
  //   }
  // ]; 
  const { 
    listData,
    page 
  } = props;
  console.log(listData);
  console.log(page);
  return (
    // <div className="list" onClick={() => more(index)}>
    //   <div className="information">
    //     <div className="companyName">{companyName}</div>
    //     <div className="taxNumber">税号：<span className="tax1">{taxNumber}</span></div>
    //     <span className="info">{bank}</span>
    //   </div>
    //   <div className="right"><img alt="" src={Right} /></div>
    // </div>
    <div className="app">
      {
        listData.map((item, index)=>(
          <Item 
            itemData={item}
            page={page}
            key={index}
            acceptNum={item.acceptNum}
            memberMaxNumber={item.memberMaxNumber}
            title={item.title}
            description={item.description}
          />
        ))
      }
    </div>
  );
};
List.propTypes = {
  listData: PropTypes.array,
  page: PropTypes.string
};
