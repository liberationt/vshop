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
    console.log(content)
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
  //     document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
      var a = document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
      if (!a){
          el.select();
          el.setSelectionRange(0, el.value.length), document.execCommand('Copy');// 执行浏览器复制命令
      }
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
  wx.config({ //errMsg:config ok
    debug:false,// 是否开启调试模式
    appId:data.appId,//appid
    timestamp:data.timestamp,// 时间戳
    nonceStr:data.nonceStr,// 随机字符串
    signature:data.signature,// 签名
    jsApiList:[
      'onMenuShareTimeline',   
      'onMenuShareAppMessage',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'updateAppMessageShareData'
        ]// 需要使用的JS接口列表
  })
}
//地图封装
export function ip(callback, error) {
  let map, geolocation;
  //加载地图，调用浏览器定位服务
  const mapObj = new AMap.Map("iCenter");
  mapObj.plugin("AMap.Geolocation", function() {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      timeout: 10000, // 超过10秒后停止定位，默认：无穷大
      maximumAge: 60 * 24 * 60 * 60 * 1000, // 定位结果缓存0毫秒，默认：0
      convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true, // 显示定位按钮，默认：true
      buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    })
    mapObj.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, "complete", onComplete) // 返回定位信息
    AMap.event.addListener(geolocation, "error", onError) // 返回定位出错信息
  })
  // 解析定位结果
  function onComplete (data) {
    var str = [ "定位成功" ]
    // alert(JSON.stringify(data));
    let { province, city, district } = data.addressComponent
    city = city || province
    // setCookie("province", JSON.stringify(data.addressComponent))
    // setCookie("city",JSON.stringify(city))
    callback && callback(city)
    str.push("经度：" + data.position.getLng())
    str.push("纬度：" + data.position.getLat())
    if (data.accuracy) {
      str.push("精度：" + data.accuracy + " 米");
    } // 如为IP精确定位结果则没有精度信息
    str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
    // document.getElementById("tip").innerHTML = str.join("<br>");
  }
  // 解析定位错误信息
  function onError(data) {
    error && error(data)
    console.log('定位失败');
  }
}

// 判断安卓
export function isAndroid1() {
  return navigator.userAgent.indexOf("Android") > -1
}

//图片压缩
export function compress(orgFile,callback){
  console.log(orgFile,"===========f")
  // orgFile = f.files[0]
  console.log('orgFile',orgFile)
  zipImgFile(orgFile,function(zipFile){
    console.log('zipFile',zipFile)
    callback(zipFile)  
  })
}
// 对图片进行压缩
const zipImgFile = (imgFile,callback) =>{
  let reader = new FileReader()
  console.log('render',imgFile)
  reader.readAsDataURL(imgFile)
  reader.onload = function(e) {
      let image = new Image() //新建一个img标签（还没嵌入DOM节点)
      image.src = e.target.result
      image.onload = function() {
          let canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          imageWidth = image.width / 2,    //压缩后图片的大小
          imageHeight = image.height / 2
          canvas.width = imageWidth
          canvas.height = imageHeight
          context.drawImage(image, 0, 0, imageWidth, imageHeight)
          let dataurl = canvas.toDataURL(imgFile.type)
          let zipFile = dataURLtoFile(dataurl,imgFile.name)
          callback(zipFile)
      }
  }
}
const dataURLtoFile = (dataurl, filename) => {
  console.log(dataurl)
  var arr = dataurl.split(','), 
  mime = arr[0].match(/:(.*?);/)[1],        
  bstr = atob(arr[1]), 
  n = bstr.length, 
  u8arr = new Uint8Array(n);    
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }    
  return new File([u8arr], filename, {type:mime});
}

// 海报生成
import html2canvas from 'html2canvas'
const generatePosters = (rect,offsetY,demo,wxLink,sjlink)=>{
  var scale = 2;//放大倍数
  var canvas = document.createElement('canvas');
  var content = canvas.getContext("2d");
  content.scale(scale,scale);
  content.translate(-rect.left,-rect.top);//设置context位置，值为相对于视窗的偏移量负值，让图片复位
  let offetLeft
  if(isAndroid1()){
    offetLeft = (document.body.clientWidth - 289)/2+5
  } else {
    offetLeft = rect.left
  }
  let parameter = {
    useCORS:true,
    backgroundColor: null, // 解决生成的图片有白边
    dpi: window.devicePixelRatio*2,
    scale:scale,
    timeout: 500,
    y:1,
    x:offetLeft,
    scrollY:offsetY
  }
  html2canvas(demo,parameter).then((canvas) => {
    let dataURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"); // 获取生成的图片的url
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    if(ua.match(/MicroMessenger/i) == "micromessenger"){
      wxLink(dataURL)
    } else {
      sjlink(dataURL)
    }
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
  wxShare,
  ip,
  isAndroid1,
  compress,
  dataURLtoFile,
  generatePosters
}