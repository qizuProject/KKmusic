import request from "@utils/request";

// 当前公共请求地址前缀
const url_prefix = "";

//请求推荐歌单数据
export const reqSongList = () => {
  return request({
    method: "GET",
    url: `/rec_gedan`,
  });
};

//请求默认歌单
// order:new最新，hot最热  rn:每页的条数，  pn:页数
// export const reqDefaultPlayList = (order = "new", rn = 10, pn = 1) => {
//   return request({
//     method: "GET",
//     url: `/playList`,
//     data: {
//       order,
//       rn,
//       pn,
//     },
//   });
// };

export const reqDefaultPlayList = (order = "new", rn = 10, pn = 1) => {
  return request.get(`/playList?order=${order}&rn=${rn}&pn=${pn}`);
};
