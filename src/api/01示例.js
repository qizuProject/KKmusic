import request from "@utils/request";

// 当前公共请求地址前缀
const url_prefix = "/";

// 需要参数
export const reqVerifyCode = (randStr, ticket) => {
  return request({
    method: "POST",
    url: `${url_prefix}/verifycode`,
    data: {
      randStr,
      ticket,
    },
  });
};

// 不需要参数
export const reqCountryData = () => {
  return request({
    method: "GET",
    url: `${url_prefix}/countryData`,
  });
};



