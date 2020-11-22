import request from "../untils/request";
// const url_prefix = "/";
// 歌曲详情信息
export const reqMusicInfo = (mid) => {
  return request.get(`/musicInfo?mid=${mid}`);
};
// 获取歌曲热门评论
