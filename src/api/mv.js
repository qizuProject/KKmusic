import request from "../untils/request";
// 当前公共请求地址前缀
const url_prefix = "http://localhost:3300";

// 需要参数
export const reqRadioList = () => {
  return request({
    method: "GET",
    url: `${url_prefix}/radio`,
  });
};
export const reqPlayList = (rid) => {
  return request.get(`${url_prefix}/url?rid=${rid}`);
};
