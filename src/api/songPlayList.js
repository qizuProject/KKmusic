import request from "@utils/request";
// 默认歌单
export const reqPlayList = (pid = "1082685104") => {
  return request.get(`/musicList?pid=${pid}`);
};
