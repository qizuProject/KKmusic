import request from "../untils/request";
// const url_prefix = "/";
// 歌曲详情信息
export const reqMusicInfo = (mid) => {
  return request.get(`/musicInfo?mid=${mid}`);
};

// 歌曲播放链接
export const reqMusicPlayUrl = (mid) => {
  return request.get(`/url?rid=${mid}`)
}
