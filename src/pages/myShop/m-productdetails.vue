<template>
  <div class="productdetails_common pddingTop">
    <header class="productdetails_header">
      <van-nav-bar
        title="代理推广"
        left-arrow
        @click-left="onGoback"
      />
      <div class="header_img">
        <img :src=productList.bannerUrl alt="">
      </div>
    </header>
    <div class="productdetails_center">
      <div class="productdetails_process">
        <div class="process">
          <span class="process1"></span>
          <span class="process2">申请流程</span>
        </div>
        <ul class="process_img clearfix">
          <li class="left" v-for="(item,index) in productList.applicationProcedureList">
            <div class="left">
              <img :src=item.productParamIcon class="img_top" alt="">
              <p>{{item.productParamName}}</p>
            </div>
            <p v-if="index != productList.applicationProcedureList.length-1" class="left img_bottom"><img src="./imgs/arrows_icon@2x.png" alt=""></p>
          </li>
        </ul>
      </div>
      <div class="productdetails_process">
        <div class="process">
          <span class="process1"></span>
          <span class="process2">申请资料</span>
        </div>
        <ul class="process_text">
          <li v-for="(item,index) in productList.applicationMaterialList">{{index+1+'、'+item.productParamName}}</li>
        </ul>
      </div>
      <div class="productdetails_process">
        <div class="process">
          <span class="process1"></span>
          <span class="process2">申请条件</span>
        </div>
        <ul class="process_text">
          <li v-for="(item,index) in productList.applyCondition">{{index+1+'、'+item}}</li>
        </ul>
      </div>
    </div>
    <footer class="productdetail_footer">
      <van-row>
        <van-col class="van_daili" span="8">
          代理后推荐用户 赚 <span style="color:#FE951E">{{productList.agentContent}}</span> 佣金
        </van-col>
        <div v-if="this.$route.query.num == 1">
          <van-col span="8">
            <button @click="productposter">产品海报</button>
          </van-col>
          <van-col span="8">
            <button @click="recommenduser" class="button_user">
              <p>推荐用户</p>
              <p>推荐后会隐藏佣金</p>
            </button>
          </van-col>  
        </div>
        <div v-else>
          <van-col span="16">
            <button @click="moneyShow = true" class="button_user button_userc">
              我要代理
            </button>
          </van-col> 
        </div>
      </van-row>
    </footer>
    <!-- 弹出层 -->
    <van-popup v-model="showPoster"  :close-on-click-overlay=false>
      <div v-if="logoUrl == ''" ref="imageWrapper" id="posterdom">
        <div class="popup_img_op">
          <img :src="'data:image/png;base64,'+showPosterList.bannerUrl" alt="">
        </div>
        <div class="popup_center">
          <div id="qrcode" ></div>
          <!-- <img :src=showPosterList.productLogo alt=""> -->
          <p>长按识别二维码马上申请</p>
        </div>
        <div class="popu_footer">
          <van-row >
            <van-col span="16">
              <van-col class="popuf_img">
                <img :src="showPosterList.personImg?'data:image/png;base64,'+showPosterList.personImg:require('./imgs/topimg.png')" alt="">
              </van-col>
              <van-col class="popuf_text">
                <p>欢迎咨询</p>
                <p>{{showPosterList.phone}}</p>
              </van-col>
            </van-col>
            <van-col class="popuf_logo clearfix" span="8">
              <img src="./imgs/logo@2x.png" alt="">
            </van-col>
          </van-row>
        </div>
      </div>
      <div  v-if="logoUrl != ''" class="haibaoIMg">
        <img :src=logoUrl alt="">
      </div>
      <div class="popu_close" @click="showPoster = false">
        <img src="./imgs/turn_off@2x.png" alt="">
      </div>
    </van-popup>
    <!-- 弹窗 -->
    <van-popup class="van_popup_text" v-model="moneyShow" :close-on-click-overlay=false>
      <div>
        <p class="product_message">确认代理后您将获得该产品 专属推广链接，是否确认？</p>
        <p class="product_radio">
          <van-radio-group v-model="radioName">
            <van-radio name="1">已阅读并同意<router-link to="/Proxyagreement"><span style="color:#4597FB;">《微店代理协议》</span></router-link></van-radio>
          </van-radio-group>
        </p>
        <p class="product_button">
          <button @click="moneyShow = false">取消</button>
          <button @click="flag && confirm()">确定</button>
        </p>
      </div>
    </van-popup>
    <!-- 分享提示框 -->
    <van-popup class="yindaoshow" v-model="yindaoshow">
      <img src="./imgs/yindao.png" alt="">
    </van-popup>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import { qrcanvas } from 'qrcanvas';
import { Popup, RadioGroup, Radio,} from 'vant';
import utils from "../../utils/utils";
import wx from 'weixin-js-sdk'
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Popup.name] : Popup,
    [RadioGroup.name] : RadioGroup,
    [Radio.name] : Radio,
  },
  data(){
    return{
      showPoster: false,
      productList:[],
      showPosterList:{},
      moneyShow: false,
      radioName:"1",
      flag:true,
      logoUrl:"",
      yindaoshow:false
    }
  },
  created(){
  },
  methods:{
    onGoback(){
      this.$router.push({path:'/magentproduct'})
    },
    productposter(){
      // this.showPoster = true
      this.operationType(1)
      statistics.click("mproductdetails","productposter")
    },
    // 分享授权
    wxShare() {
      let url
      if( !utils.isAndroid1() ){
        // if(utils.getlocal('id') ==1) {
        //   url = window.location.origin+'/mlogin'
        // } else {
        //   url = window.location.origin+'/myshop'
        // }
        url = decodeURIComponent(this.$store.state.iosUrl) || decodeURIComponent(window.location.href)
      } else {
        url = window.location.href
      }
      console.log(window.location.origin+window.location.pathname)
      this.request("wisdom.vshop.wechatOpen.getJsconf", {
        url: url
      }).then(data => {
        utils.wxShare(data.data)
      })
      .catch(err => {
        console.log(err);
      });
    },
    // 推荐用户
    recommenduser(){
      this.yindaoshow= true
      statistics.click("mproductdetails","recommenduser")
      this.request('wisdom.vshop.product.createProductPoster',{url: window.location.origin+'/productnamedetail',operationType:2,productCode:this.$route.query.code}).then(data=>{
        let dataList = data.data
        wx.ready(function(){
            wx.updateAppMessageShareData({
              title: dataList.shareTitle, // 分享标题
              desc: dataList.shareDescribe, // 分享描述
              link: dataList.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://wisdom-loan.oss-cn-shanghai.aliyuncs.com/productParam/60938f68-1fa0-4620-a90a-7a4d7a7c7117.png',//dataList.productLogo, // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
                // alert('分享成功回调')
              },
              cancel: function(err){
                // alert('分享取消回调')
              }
            });
          })
      }).catch(err=>{console.log(err)})
    },
    // 确认代理
    confirm(){
      this.flag = false
      let agentStatusData = [{productCode:this.$route.query.code,productType:this.$route.query.type}]
      statistics.click("mproductdetails","woyaodaili")
      this.request('wisdom.vshop.product.batchAgentProducts',{queryH5UserProductDetailReqList:agentStatusData}).then(data=>{
        this.moneyShow =  false
        this.flag = true
        this.$router.push({path:"./magentproduct"})
      }).catch(err=>{console.log(err);this.moneyShow =  false})
    },
    Initialization(){
      this.request("wisdom.vshop.product.queryH5ProductMarketDetail",{productCode:this.$route.query.code}).then(data=>{
        this.productList = data.data
      }).catch(err=>{console.log(err)})
    },
    // operationType操作类型：1产品海报，2推荐用户
    operationType(num){
      this.request("wisdom.vshop.product.createProductPoster",{productCode:this.$route.query.code,operationType:num,url: window.location.origin+'/productnamedetail'}).then(data=>{
        switch(num){
          case 1:
            this.showPosterList = data.data
            this.showPoster = true
            this.logoUrl = ""
            this.qrcode(data.data.url)
            setTimeout(() => {
              this.rrrr()
　　　　     }, 500)
            break;
          case 2:
            break;
        }
      }).catch(err=>{console.log(err)})
    },
    qrcode(url){
       this.$nextTick(()=>{
        var canvas = qrcanvas({
          data:url,
          size:100,
          colorDark:'red'
        })
        var img = document.createElement( 'img' );
        img.src = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩)
        document.getElementById("qrcode").innerHTML = '',
        document.getElementById("qrcode").appendChild(img)
      })
    },
    // 生成图片
    rrrr () {
      var scale = 2;//放大倍数
      var canvas = document.createElement('canvas');
      var content = canvas.getContext("2d");
      content.scale(scale,scale);
      var rect = document.getElementById('posterdom').getBoundingClientRect();//获取元素相对于视察的偏移量
      content.translate(-rect.left,-rect.top);//设置context位置，值为相对于视窗的偏移量负值，让图片复位
      console.log(rect)
      html2canvas(this.$refs.imageWrapper,{
        backgroundColor: null,    // 解决生成的图片有白边
        dpi: window.devicePixelRatio*2,
        scale:scale,
        y:1,
        scrollY:-rect.top
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"); // 获取生成的图片的url
          this.logoUrl = dataURL
          console.log(dataURL)
       })
    }
  },
  mounted(){
    statistics.page("mproductdetails")
    // 微信授权
    this.wxShare()
  },
  created(){
    this.Initialization()
  }
}
</script>
<style lang="less" scoped>
.productdetails_common {
  background-color: #f1f1fb;
  padding-bottom: 76px;
  .productdetails_header {
    .header_img {
      img {
        width: 375px;
        height: 157px;
      }
    }
  }
  .productdetails_process {
    background-color: #fff;
    margin-bottom: 8px;
    .process {
      height: 40px;
      padding: 11px;
      color: #4597fb;
      font-size: 14px;
      border-bottom: 1px solid rgba(231, 231, 231, 1); /*no*/
      padding-left: 15px;
      position: relative;
      .process1{
        display: inline-block;
        width: 3px;
        height: 18px;
        background-color: #4597fb;
        border-radius: 1px;
      }
      .process2{
        padding-left: 8px;
        position: absolute;
        top: 10px;
      }
    }
    .process_img {
      padding: 10px 0px 15px 15px;
      li {
        color: #333333;
        font-size: 13px;
        .img_top {
          width: 26px;
          height: 28px;
          margin: 0px 13px 10px 13px;
        }
        .img_bottom {
          img {
            width: 26px;
            height: 9px;
            margin-top: 9px;
            // margin-left: 7px;
          }
        }
      }
    }
    .process_text {
      padding: 10px 7px 7px 15px;
      color: #333333;
      font-size: 13px;
      li{
        margin-bottom: 5px;
      }
    }
  }
  .productdetail_footer {
    position: fixed;
    bottom: 0px;
    width: 375px;
    height: 65px;
    background: url("./imgs/dibutouying.png") no-repeat;
    background-size: 100%;
    padding-top: 13px;
    padding-right: 5px;
    .van_daili {
      padding: 4px 17px 0px 18px;
      text-align: center;
      font-size: 12px;
    }
    .button_userc {
      width: 240px;
    }
    button {
      font-size: 15px;
      width: 120px;
      height: 44px;
      color: #fff;
      background-color: #f3b13e;
      border-radius: 3px;
    }
    .button_user {
      background-color: #4597fb;
      :nth-child(2) {
        font-size: 11px;
      }
    }
  }
  .van-popup {
    border-radius: 5px 5px 0px 0px;
    width: 289px;
    background-color: transparent;
  }
  .popup_img_op {
    background-color: #fff;
    img {
      width: 289px;
      height: 233px;
    }
  }
  .popup_center {
    background-color: #fff;
    text-align: center;
    padding-top: 15px;
    font-size: 12px;
    color: #333333;
    #qrcode {
      margin-bottom: 10px;
    }
  }
  .popu_footer {
    background-color: #fff;
    padding: 18px 15px 20px 16px;
    border-radius: 0px 0px 5px 5px;
    .popuf_img {
      width: 48px;
      height: 48px;
    }
    .popuf_text {
      font-size: 15px;
      color: #333;
      padding-left: 8px;
      line-height: 25px;
    }
    .popuf_logo {
      img {
        width: 38px;
        height: 38px;
        float: right;
        margin-top: 5px;
      }
    }
  }
  .popu_close {
    text-align: center;
    margin-top: 34px;
    img {
      width: 35px;
      height: 36px;
    }
  }
}
</style>
