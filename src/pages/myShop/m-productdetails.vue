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
          <p>申请流程</p>
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
          <p>申请资料</p>
        </div>
        <ul class="process_text">
          <li v-for="(item,index) in productList.applicationMaterialList">{{index+1+'、'+item.productParamName}}</li>
        </ul>
      </div>
      <div class="productdetails_process">
        <div class="process">
          <p>申请条件</p>
        </div>
        <ul class="process_text">
          <li v-for="(item,index) in productList.applyCondition">{{index+1+'、'+item}}</li>
        </ul>
      </div>
    </div>
    <footer class="productdetail_footer">
      <van-row>
        <van-col class="van_daili" span="8">
          代理后推荐用户 赚 <span style="color:#FE951E">2.6%</span> 佣金
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
    <van-popup v-model="showPoster" :close-on-click-overlay=false>
      <div class="popup_img_op">
        <img :src=showPosterList.bannerUrl alt="">
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
              <img :src="showPosterList.personImg?showPosterList.personImg:'./imgs/topimg.png'" alt="">
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
  </div>
</template>
<script>
import { qrcanvas } from 'qrcanvas';
import { Popup, RadioGroup, Radio,} from 'vant';
import utils from "../../utils/utils";
import wx from 'weixin-js-sdk'
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
      radioName:"",
      flag:true
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
    },
    recommenduser(){
      this.request('wisdom.vshop.product.createProductPoster',{url: window.location.origin+'/productnamedetail',operationType:2,productCode:this.$route.query.code}).then(data=>{
        let dataList = data.data
        utils.wxShare(dataList.wechatJsConfRes)
        console.log(dataList.wechatJsConfRes)
        wx.ready(function(){
            wx.updateAppMessageShareData({
              title: dataList.shareTitle, // 分享标题
              desc: dataList.shareDescribe, // 分享描述
              link: dataList.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: dataList.bannerUrl, // 分享图标
              success: function () {
                // 用户点击了分享后执行的回调函数
                alert('分享成功回调')
              },
              cancel: function(err){
                alert('分享取消回调')
              }
            });
          })
      }).catch(err=>{console.log(err)})
    },
    // 确认代理
    confirm(){
      this.flag = false
      let agentStatusData = [{productCode:this.$route.query.code,productType:this.$route.query.type}]
      this.request('wisdom.vshop.product.batchAgentProducts',{queryH5UserProductDetailReqList:agentStatusData}).then(data=>{
        this.moneyShow =  false
        this.flag = true
        this.$router.push({path:"./magentproduct"})
      }).catch(err=>{console.log(err)})
    },
    Initialization(){
      this.request("wisdom.vshop.product.queryH5ProductMarketDetail",{productCode:this.$route.query.code}).then(data=>{
        this.productList = data.data
      }).catch(err=>{console.log(err)})
    },
    // operationType操作类型：1产品海报，2推荐用户
    operationType(num){
      this.request("wisdom.vshop.product.createProductPoster",{productCode:this.$route.query.code,operationType:num,url: window.location.href}).then(data=>{
        switch(num){
          case 1:
            this.showPosterList = data.data
            this.showPoster = true
            this.qrcode(data.data.url)
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
          size:65,
          colorDark:'red'
        })
        var img = document.createElement( 'img' );
        img.src = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩)
        document.getElementById("qrcode").innerHTML = '',
        document.getElementById("qrcode").appendChild(img)
      })
    }
  },
  mounted(){
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
    .header_img{
      img {
        width: 375px;
        height: 157px;
      }
    }
  }
  .productdetails_process {
    background-color: #fff;
    margin-bottom: 8px;
    .process{
      height: 40px;
      padding: 11px;
      color: #4597FB;
      font-size:14px;
      border-bottom: 1px solid rgba(231,231,231,1);/*no*/
      padding-left: 15px;
      p {
        border-left: 5px solid #4597FB; /*no*/
        padding-left: 8px;
        border-radius:1px;
      }
    }
    .process_img {
      padding: 10px 0px 15px 15px;
      li {
        color: #333333;
        font-size:13px;
        .img_top {
          width: 26px;
          height: 28px;
          margin: 0px 13px 10px 13px;
        }
        .img_bottom{
          img{
            width: 26px;
            height: 9px;
            margin-top: 9px;
            // margin-left: 7px;
          }
        }
      }
    }
    .process_text {
      padding: 10px 0px 7px 15px;
      color: #333333;
      font-size: 13px;
      li {
        margin-bottom: 8px;
      }
    }
  }
  .productdetail_footer {
    position: fixed;
    bottom: 0px;
    width: 375px;
    height: 65px;
    background: url('./imgs/dibutouying.png') no-repeat;
    background-size: 100%;
    padding-top: 13px;
    padding-right: 5px;
    .van_daili{
      padding: 9px 17px 0px 18px;
      text-align: center;
      font-size:12px;
    }
    .button_userc {
      width: 240px;
    }
    button {
      font-size:15px;
      width: 120px;
      height: 44px;
      color: #fff;
      background-color: #F3B13E;
      border-radius:3px;
    }
    .button_user{
      background-color: #4597FB;
      :nth-child(2){
        font-size:11px;
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
    img{
      width: 289px;
      height: 233px;
    }
  }
  .popup_center {
    background-color: #fff;
    text-align: center;
    padding-top: 15px;
    font-size:12px;
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
      font-size:15px;
      color: #333;
      padding-left: 8px;
      line-height: 25px;
    }
    .popuf_logo {
      img{
        width: 38px;
        height: 38px;
        float: right;
        margin-top: 5px;
      }
    }
  }
  .popu_close{
    text-align: center;
    margin-top: 34px;
    img {
      width: 35px;
      height: 36px;
    }
  }
}
</style>
