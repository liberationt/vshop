/**
 * 为vue实例添加http方法
 * Vue.use(http)
 */
import http from './http'
import utils from './utils'
import {
  Toast
} from 'vant';
import MD5 from "js-md5";

// TOKEN_ERROR("300011", "登录已过期，请重新登录！"),
	// USER_FREEZE("300012", "您的账户已被冻结，具体详情请关注微信公众号咨询！"),
	// USER_SQUEEZE("300013", "您的账号在其他设备上登录！"),
// 公共言
let saltcomm = "*(&!*(Q#IUHAX89y19823h*&(YQ#($(*AGFsd"

export function request(apiKey, data = {}, isShowError = true) {
  let baseParams = getRequestInfo(apiKey, data)
  
  return new Promise((resolve, reject) => {
    return http.post("/api/proxy", baseParams).then((response = {}) => {
      if (response.code == 'success') {
        console.log('response=====> ' + apiKey + "   " + JSON.stringify(response))
        resolve && resolve(response)
      } else if (response.code == '110019') {
        console.log('response=====> ' + JSON.stringify(response))
        resolve && resolve(response)
      } else if (response.code == '300013' || response.code == '300011' || response.code == '300013') {
        console.log('response=====> ' + JSON.stringify(response))
        window.location.href = window.location.origin+'/#/'
      }  else {
        handleError(apiKey, response, reject, isShowError)
      }
    }).catch(err => {
      handleError(apiKey, err, reject, isShowError)
    });
  })
}
/**
 * 文件上传
 *
 * @param url
 * @param
 * parameters :{
 *      fileKey:'file',
 *      filePath:"",
 *      fileName:"image.png",
 *      fileType:"multipart/form-data",
 * }
 * @returns {*}
 */
export function upload(file = {}) {
  let params = {
    type: '1', //头像图片固定传1
  }
  let formData = new FormData();
  formData.append("file", file);

  let baseParams = getRequestInfo('', params)
  formData.append("form", JSON.stringify(baseParams))

  let config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return new Promise((resolve, reject) => {
    return http.post('/upload', formData, config).then(response => {
      if (response.code == 'success') {
        console.log('response=====> ' + JSON.stringify(response))
        resolve && resolve(response.data)
      } else {
        handleError('', response, reject, true)
      }
    }).catch(err => {
      handleError('', err, reject, true)
    });
  })
}
// 公共参数的封装
let getRequestInfo = (apiKey = '', data = {}) => {
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
        hardware:"weidian"
      },
    }
  // 取用户信息
  if(utils.getCookie('user')){
    let userInfo = JSON.parse(utils.getCookie('user')) // 获取本地内容
    if (userInfo) { // 用户信息
      baseParams.session = {
        userId: userInfo.userId,
        token: userInfo.token
      }
    }
  }
  
  let token = (baseParams.session && baseParams.session.token) ? baseParams.session.token : ''

  baseParams.sign = MD5(baseParams.apiKey + token + baseParams.data + saltcomm)

  console.log('request=====> ' + apiKey + "   " + JSON.stringify(baseParams))

  return baseParams
}


let handleError = (apiKey, e = {}, reject, isShowError = true) => {
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

  if (response.code == undefined) {
    response.code = '-1'
  }
  if (!response.message) {
    response.message = '网络开小差啦~'
  }
  switch (response.code) {
    case "": //商户注销

      break
    default:
      if (isShowError) {
        Toast(response.message);
      }
      break
  }
  console.log('response  fail=====> ' + apiKey + "   " + JSON.stringify(response));
  reject && reject(e)
}

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install(Vue) {
    Vue.prototype.request = request,
      Vue.prototype.upload = upload
  },
}