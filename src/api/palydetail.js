import request from "@utils/request";
// const url_prefix = "/";
// 歌曲详情信息
export const reqMusicInfo = (mid) => {
  return request.get(`/musicInfo?mid=${mid}`);
};

// 歌曲播放链接
export const reqMusicPlayUrl = (mid) => {
  return request.get(`/url?rid=${mid}`);
};

// 歌曲歌词
export const reqMusicLrcList = (mid) => {
  return request.get(`/lrc?musicId=${mid}`);
};
