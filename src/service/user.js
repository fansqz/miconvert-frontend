// 引入实例
import req from '@/service/utils/request.js';

export const test = () => {
  return req({

  })
}

export const login = ()=>{
  return req({
    url:'/login',
    method:'post'
  })
}