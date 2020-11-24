import request from "@utils/request";

//请求推荐歌单数据
export const reqSongList = () => {
  return request({
    method: "GET",
    url: `/rec_gedan`,
  });
};

//请求最新或最热歌单
export const reqDefaultPlayList = (order = "new", rn = 10, pn = 1) => {
  return request.get(`/playList?order=${order}&rn=${rn}&pn=${pn}`);
};

//请求标签
export const reqTags = () => {
  return request.get(`/playList_tags`);
};

//根据tag的id请求歌单
export const reqPlayListById = (id) => {
  return request.get(`/playList/category?id=${id}`);
};

//请求歌单音乐
export const reqMusicList = (pid) => {
  return request.get(`/musicList?pid=${pid}`);
};

//请求播放链接
export const reqPlayUrl = (rid) => {
  return request.get(`/url?rid=${rid}`);
};
