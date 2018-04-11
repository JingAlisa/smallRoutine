import { getForDebug, userInfoDebug } from '../../config/debug.userInfo'

let getUserInfo = async () => {
  let userInfo
  
  if (getForDebug === true) {
    // 直接返回本地信息
    userInfo = userInfoDebug
  } else {
    // 从HWH5接口获取
    userInfo = await new Promise((resolve, reject)=>{
      window.HWH5.userInfo().then((data) => {
        resolve(data);
      }).catch((error) => {
        console.log('获取用户信息失败')
        reject(error)
      });
    });
  }
  return userInfo
}

export  { getUserInfo }