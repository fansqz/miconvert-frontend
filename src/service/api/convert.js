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
  // 获取输出各格式列表
  listAllOutFormat() {
    return request.get('/convert/listAllOutFormat', {});
  },
  // 根据输出格式获取支持的输入格式
  listAllInFormatByOutFormat(data) {
    return request.get('/convert/listInFormatByOutFormat', data);
  },
};

export default convert;
