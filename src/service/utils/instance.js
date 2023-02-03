/* eslint-disable no-console */
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import baseUrl from './baseUrl';

console.log(process.env.NODE_ENV);

// 设置post方法的请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 创建一个新的axios实例
const instance = axios.create({
  baseURL: baseUrl,
//  timeout: 50000000,
});

// 设置状态码回调提示
const errorHandle = (code, msg) => {
  switch (code) {
    case 1:
      ElMessage.error(msg);
      return true;
    case 2:
      ElMessageBox.error(msg);
      return true;
    case 500:
      console.log(msg);
      break;
    case 201:
      console.log(msg);
      break;
    case 205:
      console.log(msg);
      break;
    default:
      console.log('success');
  }
  return false;
};

// 配置请求拦截器
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.token = token;
  }
  return config;
}, (error) => Promise.reject(error));

// 配置响应拦截器
instance.interceptors.response.use((response) => {
  const { data } = response;
  const { code } = data;
  const { message } = data;
  // 处理异常
  if (errorHandle(code, message)) {
    return Promise.reject(response);
  }
  return data;
}, (error) => {
  const { response } = error;
  if (axios.isCancel(error)) {
    console.log(`已取消重复的请求：${error.msg}`);
  } else if (response) {
    errorHandle(response.status, response.data.msg);
    return Promise.reject(response);
  } else console.log(1);
  return Promise.reject(error);
});

export default instance;
