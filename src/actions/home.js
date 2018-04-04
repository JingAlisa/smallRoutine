import { urls } from '../../config/web.config';

const receiveHome = (response) => ({
  type: 'RECEIVE_HOME',
  homeInfo: response
});

export const getHomeInfo = () => async (dispatch, getState) => {
  try {
    const response = await new Promise((resolve, reject)=>{
      /* 模拟异步操作成功，这样可以通过fetch调接口获取数据 */
      setTimeout(()=>{
        resolve({ title: 'WeLink react app' });
      }, 1000);
    });
    await dispatch(receiveHome(response));
    return response;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

const receiveFetchDemo = (response) => ({
  type: 'RECEIVE_FETCHDEMO',
  dataList: response
});

export const getFetchDemo = () => async (dispatch, getState) => {
  try {

    // const url = `${urls.graphql}/km/m/w3bulletin/graphql?query={bulletins(id:%2019981,lan:%20%22cn%22,curPage:%202,unpolicy:%20true)%20{countNum,documents%20{id,author,createdDate,title,accessCount,deptname}}}`;

    // const response = await window.HWH5.fetch(url).then((res) => {
    //   res.json().then((reply) => reply);
    // });
    await dispatch(receiveFetchDemo(null));
    return response;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

const setIndex = (response) => ({ type: 'SET_INDEX', index: response });

export const setInvoivceIndex = (key) => async (dispatch, getState) => {
  try {
    await dispatch(setIndex(key));
    return key;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

const changePath = (response) => ({ type: 'SET_PATH', path: response });

export const setPath = (path) => async (dispatch, getState) => {
  try {
    await dispatch(changePath(path));
    return path;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};
