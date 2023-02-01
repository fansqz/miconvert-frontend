import request from '../utils';
import baseUrl from '../utils/baseUrl';

const convert = {
  // 同步转换文件
  convertFile(data) {
    return request.post('/convert/convertFile', data);
  },
  // 读取一个文件
  downloadFile(data) {
    request.download(`/convert/downloadFile/${data}`, {}, 'get');
  },
  // 获取输出各格式列表
  listAllOutputFormat() {
    return request.get('/convert/listAllOutputFormat', {});
  },
  // 根据输出格式获取支持的输入格式
  listAllInputFormatByOutputFormat(data) {
    return request.get('/convert/listInputFormatByOutputFormat', data);
  },
  getDowloadUrl(filename) {
    return `${baseUrl}/convert/downloadFile/${filename}`;
  },
};

export default convert;
