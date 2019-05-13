import axios from 'axios';
// import qs from 'qs';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.VUE_APP_URL;

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}

const redirectUrls = [
  'static/address_json.json'
]
// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders)

const methods = ['get', 'post', 'put', 'delete']

const http = {}
methods.forEach(method => {
  http[method] = axios[method].bind(axios)
})

export default http

export const addRequestInterceptor =
  axios.interceptors.request.use.bind(axios.interceptors.request)
// request前自动添加api配置
addRequestInterceptor(
  (config) => {
    if (config && config.url) {
      if (redirectUrls.filter(url => config.url.indexOf(url)).length > 0) {
        return config
      }
    }
    // config.url = `/api${config.url}`
    config.url = '/api/proxy' // .env 的地址   '/api/proxy'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const addResponseInterceptor =
axios.interceptors.response.use.bind(axios.interceptors.response)
addResponseInterceptor(
  (response) => {
    // 在这里统一前置处理请求响应
    if (Number(response.status) !== 200) {
      // 全局notify有问题，还是自己处理吧
      return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    return Promise.reject(error || '出错了')
  }
)
