import axios from 'axios';

console.log(process.env.NODE_ENV);

const baseUrl = () => {
  let url;
  if (process.env.NODE_ENV === 'dev') {
    url = 'http://localhost:8080';
  }
  return url;
};

// 设置post方法的请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 创建一个新的axios实例
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

// 设置状态码回调提示
const errorHandle = (code, msg) => {
  switch (code) {
    case 4000:
      console.log(msg);
      break;
    case 5000 || 5001:
      console.log(msg);
      break;
    case 5002:
      console.log(msg);
      break;
    case 5011:
      console.log(msg);
      break;
    case 5010:
      console.log(msg);
      break;
    default:
      console.log('success');
  }
};

// 配置请求拦截器
instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.accessToken = token;
  }
  return config;
}, (error) => Promise.reject(error));

// 配置响应拦截器
instance.interceptors.response.use((response) => {
  const { data } = response;
  const { code } = data;
  const { msg } = data;
  errorHandle(code, msg);
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
