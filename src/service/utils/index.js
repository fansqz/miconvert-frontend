import axiosInstance from './instance';

const request = {
  get(url, data, cancelRequest) {
    return axiosInstance.get(url, {
      params: data,
      ...(cancelRequest !== undefined && cancelRequest),
    });
  },
  post(url, data, config) {
    return axiosInstance.post(url, data, config);
  },

  put(url, data, config) {
    return axiosInstance.put(url, data, config);
  },

  download(url, data, method) {
    const param = method ? 'data' : 'params';
    const headers = method
      ? { 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/octet-stream' };
    return axiosInstance(url, {
      responseType: 'blob',
      headers,
      method,
      [param]: data,
    });
  },
};

export default request;
