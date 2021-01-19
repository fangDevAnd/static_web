/**
 * 对 Axios进行封装
 *
 *
 */
import Urls from "./Urls";
import axios from 'axios'


/**
 * post 请求
 * @param method
 * @param url
 * @param data
 * @returns {*}
 */
function axiosPost(method, url, data, callback) {
  axios({
    method: method,
    url: url,
    data: data,
    transformRequest: [function (data) {
      let ret = '';
      for (let i in data) {
        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + "&";
      }
      return ret;
    }],
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    callback(resp.data);
  }).catch(error => {
    return "exception=" + error;
  });
}

function postReal(path, method, data, callback) {
  path = Urls.urlRoot + path;
  axiosPost(method, path, data, callback);
}


function getReal(path, data, callback) {
  path = Urls.urlRoot + path;
  axios.get(path + "?" + data).then(resp => {
    callback(resp.data);
  }).catch(error => {
    return "exception=" + error;
  });
}


export default {
  postReal,
  getReal
}


