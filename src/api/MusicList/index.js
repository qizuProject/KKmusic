import request from "@utils/request";

// 当前公共请求地址前缀
const url_prefix = "http://localhost:3300";

// 音乐排行榜(不需要)
export const reqMusicList = (page = 93, size = 1, sizePage = 30) => {
  return request.get(
    `${url_prefix}/rank/musicList?bangId=${page}&pn=${size}&rn=${sizePage}`
  );
};
