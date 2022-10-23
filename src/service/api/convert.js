import request from '../utils';

const convert = {
  // 同步转换文件
  convertFile(data) {
    return request.post('/convert/convertFile', data);
  },
  // 获取一个文件支持的格式
  getSupportFormat(data) {
    return request.get('/convert/getSupportFormat', data);
  },
  // 读取一个文件
  downloadFile(data) {
    return request.download(`/convert/downloadFile/${data}`, {}, 'get');
  },
};

export default convert;
