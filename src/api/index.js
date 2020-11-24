import request from "@utils/request";

// 轮播图接口
export const reqBannerImg = () => {
  return request({
    method: "GET",
    url: "/banner",
  });
};

// 歌单分类导航接口
export const reqPlayListTags = () => {
  return request({
    method: "GET",
    url: "/playList_tags",
  });
};

// 根据id获取对应的歌单接口
export const reqPlayListById = (id) => {
  return request({
    method: "GET",
    url: `/playList/category?id=${id}`,
  });
};

// 获取每日推荐数据
export const reqRecommend = () => {
  return request({
    method: "GET",
    url: "/playList",
  });
};

// 获取排行榜数据
export const reqBangList = () => {
  return request({
    method: "GET",
    url: "/rank/rec_bangList",
  });
};

// 获取推荐歌手数据
export const reqRecSinger = (categoryId) => {
  return request({
    method: "GET",
    url: `/rec_singer?category=${categoryId}`,
  });
};
