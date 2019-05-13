/**
 * 为vue实例添加http方法
 * Vue.use(http)
 */
import http from './http'
import {
  Toast
} from 'vant';
import MD5 from "js-md5";

export function request( apiKey,val, databack) {
  let salt = "*(&!*(Q#IUHAX89y19823h*&(YQ#($(*AGFsd"
  let params = {
		apiKey: apiKey,
		data: JSON.stringify(val),
		session: {},
		sign: "",
		system: {
			appType: "H5",
			appVersion: "1.0.0",
			bundleVersion: 0,
			channel: "",
			hardware: "cancro",
			identifier: "com.wisdom.market.dev",
			systemVersion: "6.0.1"
		},
  }
  params.sign = MD5(params.apiKey + '' + params.data + salt)
  this.http.post("/api/proxy", params).then(data => {
    if (data.code == 'success') {
      return databack(data.data)
    } else {
      Toast(data.message ? data.message : '网络开小差啦~');
    }
  }).catch(err => {
      console.log(err) // 报错原因
      Toast('网络开小差啦~');
    });
}

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install(Vue) {
    Vue.prototype.http = http,
      Vue.prototype.request = request
  },
}