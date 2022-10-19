import Axios from 'axios';

const req = Axios.create({
  baseURL: '/api' 
});


//拦截器，公共行为，请求loading关闭loading
//401无权访问，路由跳转到401页面
//请求时，如果有token，自动添加到请求头

req.interceptors.response.use((response)=>{
  //如果有token，添加到本地存储
  if (response.data.token) {
    sessionStorage.setItem('token',response.data.token);
  }
  //响应异常处理
  //..todo:
  return response;
},()=> {
  //4xx 5xx异常
  console.log('响应异常',err)
})



req.interceptors.request.use((config)=>{
  //请求时如果有token就添加token
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
})