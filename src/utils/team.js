import { urls } from '../../config/web.config';

let getTeamsOfPage = async (pageCount, teamsPerPage) => {
  let page = (pageCount && pageCount > 0) ? pageCount : 1
  let perPage = (teamsPerPage && teamsPerPage > 0) ? teamsPerPage : 6

  let list = []

  let teams = await new Promise((resolve, reject)=>{
    const url = `${urls.graphql}/welink/v1/teams/page/${page}?status=true&perpage=${perPage}`
    window.HWH5.fetchInternet(url, { method: 'get', headers: { 'Content-Type' : 'application/json' }, timeout: 6000 }).then((res) => {
      res.json().then((reply) => {
        if (!reply.code) {
          resolve(reply.data.teams)
        } else {
          resolve(list)
        }
      });
    }).catch((error) => {
      console.log('获取战队失败')
      reject(error)
    });
  }); 
  return teams
}

export  { getTeamsOfPage }