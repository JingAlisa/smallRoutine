import React from 'react';
import './index.less';
import PropTypes from 'prop-types';
import Right from './images/right.png';
import Item from '../../components/Item';
export default function List(props) { 
  const { 
    listData,
    page 
  } = props;
  console.log(listData);
  console.log(page);
  return (
    <div className="app">
      {
        listData.map((item, index)=>(
          <Item 
            itemData={item}
            page={page}
            key={index}
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
