/**
 * 为vue实例添加http方法
 * Vue.use(http)
 */
import http from './http'
import utils from './utils'
console.log (utils.getCookie(name)) // 获取本地内容
import {
  Toast
} from 'vant';
import MD5 from "js-md5";

export function request(apiKey,data={}, isShowError = true) {

  let baseParams = {
		apiKey: apiKey,
		data: JSON.stringify(data),
		session: null,
		sign: "",
		system: {
			appType: "H5",
			appVersion: "1.0.0",
			channel: "",
			identifier: "weidian",
		},
  }
  if(true) {  //用户信息
    baseParams.session = {}
  }
  let token = (baseParams.session && baseParams.session.token) ? baseParams.session.token : ''
  let salt = "*(&!*(Q#IUHAX89y19823h*&(YQ#($(*AGFsd"
  baseParams.sign = MD5(baseParams.apiKey + token + baseParams.data + salt)

  console.log ('request=====> ' + apiKey + "   " + JSON.stringify(baseParams))
  return new Promise((resolve, reject)=>{
    return http.post("/api/proxy", baseParams).then((response={}) => {
      if (response.code == 'success') {
        console.log ('response=====> ' + apiKey + "   " + JSON.stringify(response))
        resolve && resolve(response.data)
      } else {
        handleError(apiKey, response, reject, isShowError)
      }
    }).catch(err => {
        handleError(apiKey, err, reject, isShowError)
      });
  })
}

let handleError = (apiKey, e = {}, reject, isShowError = true)=>{
  let response = {}
  if (e instanceof Error) {
    response.code = e.code
    if (e.message === 'Network request failed') {
        if (e.stack && e.stack.includes('XMLHttpRequest.xhr.ontimeout')) {
            response.message = '服务器超时，请稍后重试'
        } else {
            response.message = '请检查手机网络状态'
        }
    } else {
        response.message = '网络开小差啦~'
    }
  } else {
    response.code = e.code
    response.data = e.data
    response.message = e.message
  }

  if(response.code == undefined){
    response.code = '-1'
  }
  if (!response.message) {
    response.message = '网络开小差啦~'
  }
  switch (response.code) {
    case "": //商户注销
    
      break
    default:
      if(isShowError){
        Toast(response.message);
      }
      break
  }
  console.log ('response  fail=====> ' + apiKey + "   " + JSON.stringify(response));
  reject && reject(e)
}


export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install(Vue) {
      Vue.prototype.request = request
  },
}