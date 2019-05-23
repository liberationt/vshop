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
export function refuseJacking(element){
  if(isAndroid()){
    var originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = function() {
      //键盘弹起与隐藏都会引起窗口的高度发生变化
      var resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (resizeHeight - 0 < originalHeight - 0) {
        element = false
        //当软键盘弹起，在此处操作
      } else {
        element = false
        //当软键盘收起，在此处操作
      }
    };
  }
}

export default {
  getCookie,
  setCookie,
  delCookie,
  putlocal,
  getlocal,
  selectFrom,
  refuseJacking
}