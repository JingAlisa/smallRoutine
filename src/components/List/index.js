import React from 'react';
import './index.less';
import PropTypes from 'prop-types';

import Right from './images/right.png';
import EmptyWatermark from '../../public/img/empty.png';
import { Link } from 'react-router-dom';
import Swipper from '../../components/Swipper';
import Item from '../../components/Item';
import TopImg from '../../public/img/icon/top.png';
export default function List(props) { 
  const { 
    listData,
    page,
    hotList 
  } = props;

  this.scrollTop=()=>{
    document.getElementById('backTop').scrollIntoView();
    // document.getElementsByClassName('scrollTop')[0].style.display="none";
  }

    // window.addEventListener('scroll', function(){
    //   // var scrollTop=document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
    //   // console.log(scrollTop);
    //   // if(scrollTop !== 0){
    //   document.getElementsByClassName('scrollTop')[0].style.display="block";
    // }, true);

  if (listData.length !== 0) {
    return (
      <div className="app">
      <div id="backTop" />
        {
          page === 'home' ? (
            <div>
            <Swipper 
              number={5} 
              boxStyle="content" 
              interval={4000} 
            > 
              <li className="boxStyleLi" />
              {
                hotList.map((item, index) => (
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
            </div>) : <span />
        }
        <div className="scrollTop" onClick={this.scrollTop}><img src={TopImg} /></div>
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
  } else {
    return (
      <div className='EmptyWatermarkBox'>
        <img className='EmptyWatermark' src={ EmptyWatermark } />
      </div>
    );
  }

  
};
List.propTypes = {
  listData: PropTypes.array,
  page: PropTypes.string
};
