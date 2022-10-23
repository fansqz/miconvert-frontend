import request from '../utils';

const convert = {
  // 用户获取文件列表
  listFile() {
    return request.get('/userConvert/listFile', {});
  },
  // 获取一个文件支持的格式
  deleteFile(data) {
    return request.get('/userConvert/getSupportFormat', data);
  },
  // 下载一个文件
  downloadFile(data) {
    return request.download(`/userConvert/downloadFile/${data}`, {}, 'get');
  },
  // 异步解析一个文件
  convertFile(data) {
    return request.post('/userConvert/convertFile', data);
  },
};

export default convert;
