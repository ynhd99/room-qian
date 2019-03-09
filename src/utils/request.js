import fetch from 'dva/fetch';
import { stringify } from 'qs';
import { message } from 'antd';
import { getFormData, getSession } from './index';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let newOptions;
  let newUrl = url;
  let responseBody = {};
  const { body, params } = options;
  const token = window.sessionStorage.getItem('token');
  // 将token放到请求参数中
  const paramBody = options && options.body ? JSON.parse(options.body) : {};
  if (token) {
    console.log(window.sessionStorage.getItem('token'));
    // 把token放入到参数中
    paramBody.token = token;
    options.body = JSON.stringify(paramBody);
  }
  if (!(typeof body === 'string') && body) {
    newOptions = Object.assign({}, options, { body: getFormData(body) });
    responseBody = {
      credentials: 'same-origin',
      ...newOptions,
    };
  } else {
    newOptions = options;
    responseBody = {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      ...newOptions,
    };
  }
  // get
  if (params) {
    newUrl += `?${stringify(params)}`;
  }
  // 将token添加到头部
  if (token) {
    newUrl = url.lastIndexOf('?') > -1 ? `${url}&authToken=${token}` : `${url}?authToken=${token}`;
  }
  const response = await fetch(newUrl, responseBody);

  if (response.status !== 200) {
    return {
      data: {
        code: response.status,
      },
    };
  }
  const data = await response.json();
  if (data.code === '401') {
    window.sessionStorage.removeItem('token');
    window.location = `http://${window.location.host}/index.html#/system/book/home`;
  }
  if (data.code !== '200') {
    if (data.code === '70201131') {
      window.location = `http://${window.location.host}/index.html#/system/book/home`;
    }
  }
  return { data };
}
