// 获取cookie、
export function getCookie(name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(name + '=')
    if (c_start != -1) {
      c_start = c_start + name.length + 1
      let c_end = document.cookie.indexOf(';', c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
// 设置cookie,增加到vue实例方便全局调用
export function setCookie(cname, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除cookie
export function delCookie(name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
// 设置localstorage
export function putlocal(key, value) {
  if (!key || !value) return
  window.localStorage[key] = JSON.stringify(value)
}
// 获取localstorage
export function getlocal(key) {
  if (!key) return null
  const tem = window.localStorage[key]
  if (!tem) return null
  return JSON.parse(tem)
}

// 随机更换内容
export function selectFrom(minValue, maxValue) {
  var num = maxValue - minValue + 1;
  return Math.floor(Math.random() * num + minValue);
}

const isAndroid = () => {
  return navigator.userAgent.indexOf("Android") > -1
}

// 拒绝input框弹出 顶起底部按钮 暂无用
export function copyContent(content){
  const copyToClipboard = str => {
    const el = document.createElement('textarea'); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied
    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
    el.style.position = 'absolute'; 
    el.style.left = '-9999px'; // Move outside the screen to make it invisible
    document.body.appendChild(el); // Append the <textarea> element to the HTML document
    const selected = 
    document.getSelection().rangeCount > 0 // Check if there is any content selected previously
    ? document.getSelection().getRangeAt(0) // Store selection if found
    : false; // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el); // Remove the <textarea> element
    if (selected) { // If a selection existed before copying
    document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
    document.getSelection().addRange(selected); // Restore the original selection
    }
   };
   copyToClipboard(content)
}
// 封控 方法
export function sealControl(captchaId,subCallback) {
	initNECaptcha({
		captchaId: captchaId,
		element: "#captcha_div",
		mode: "float",
		width: "320px",
		onVerify: function(err, ret) {
      return subCallback(err, ret,captchaId)
		}
	});
}
// 微信分享
import wx from 'weixin-js-sdk'
export function wxShare(data){
  console.log(data,2222,wx)
  wx.config({
    debug:false,// 是否开启调试模式
    appId:data.appId,//appid
    timestamp:data.timestamp,// 时间戳
    nonceStr:data.nonceStr,// 随机字符串
    signature:data.signature,// 签名
    jsApiList:[
      'onMenuShareTimeline',   
      'onMenuShareAppMessage',   
      'onMenuShareQQ', 
      'onMenuShareWeibo',
          'onMenuShareQZone'
        ]// 需要使用的JS接口列表
  })
}

export default {
  getCookie,
  setCookie,
  delCookie,
  putlocal,
  getlocal,
  selectFrom,
  copyContent,
  sealControl,
  wxShare
}