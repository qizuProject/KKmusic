import request from '../untils/request'
// 默认歌单
export const  reqPlayList = (rn=1,pn=3) => {
  return request.get(`/playList?&rn=${rn}0&pn=${pn}`)
}