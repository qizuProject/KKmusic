// 封装axios 定义拦截器
import axios from "axios";

const request = axios.create({
  baseURL: "/",
  // headers:{},
  // timeout:10000
});

//请求拦截器
request.interceptors.request.use((config) => {
  // if (token) {
  //   // config.headers["authorization"] = `Bearer ${token}`;
  //   config.headers["token"] = token;
  // }
  return config;
});
//响应拦截器
request.interceptors.response.use(
  //响应成功
  (response) => {
    if (response.data.code) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },
  //响应失败
  (error) => {
    if (error.message) {
      if (error.message.status === 401) {
      }
    } else {
    }
  }
);

export default request;
