import axiosInstance from './instance';

/**
 * 转化对象为formdata格式
 * @param data 对象
 */
function toFormData(data) {
  if (!data) {
    return new FormData();
  }
  if (data instanceof FormData) {
    return data;
  }
  const formData = new FormData();
  if (data instanceof File) {
    formData.append('file', data);
    return formData;
  }
  Object.keys(data).forEach((key) => {
    // 后来使用formData出现了传undefined变成字符串的问题，故删去值为undefined的字段
    if (data[key] !== undefined) formData.append(key, data[key]);
  });
  return formData;
}

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
  postByFrom(url, data, config) {
    const dataForm = toFormData(data);
    return axiosInstance.post(url, dataForm, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  put(url, data, config) {
    return axiosInstance.put(url, data, config);
  },
  putByFrom(url, data, config) {
    const dataForm = toFormData(data);
    return axiosInstance.put(url, dataForm, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  download(url, data, method) {
    const param = method ? 'data' : 'params';
    const headers = method
      ? { 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/octet-stream' };
    return axiosInstance.get(url, {
      responseType: 'blob',
      headers,
      method,
      [param]: data,
    });
  },
};

export default request;
