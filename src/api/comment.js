import request from "@utils/request";
// 热门评论
export const reqMusicRecComment = (mid, page = 1, rows = 3) => {
  return request.get(
    `/comment/?sid=${mid}&type=get_rec_comment&page=${page}&rows=${rows}`
  );
};
// 最新评论
export const reqNewComment = (mid, page = 1, rows = 7) => {
  return request.get(
    `/comment/?sid=${mid}&type=get_comment&page=${page}&rows=${rows}`
  );
};
