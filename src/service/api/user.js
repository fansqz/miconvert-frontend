import request from '../utils';

const user = {
  // 注册
  register(data) {
    return request.postByFrom('/user/register', data);
  },
  // 登录
  login(data) {
    return request.postByFrom('/user/login', data);
  },
  changePassword(data) {
    return request.post('/user/changePassword', data);
  },
  getUserInfo() {
    return request.get('/user/getUserInfo');
  },
};

export default user;
