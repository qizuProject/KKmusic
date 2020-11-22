import request from "../untils/request";
// const url_prefix = "/";
// 歌曲详情信息
export const reqMusicInfo = (mid) => {
  return request.get(`/musicInfo?mid=${mid}`);
};
// 获取歌曲热门评论
export const reqMusicRecComment = (mid,page=1,rows=5) => {
  return request.get(`/comment/?sid=${mid}&type=get_rec_comment&page=${page}&rows=${rows}`);
};
