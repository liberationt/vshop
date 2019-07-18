<template>
  <div class="mselfshopdetails_common pddingTop">
    <header class="mselfshopdetails_header">
      <van-nav-bar
        title="产品详情"
        left-arrow
        @click-left="onGoback"
      />
      <div class="header_message">
        <van-row>
          <van-col>
            <img :src=shopdetailsData.productLogo alt="">
          </van-col>
          <van-col class="message_text">
            <p class="message_blod">{{shopdetailsData.productName}}</p>
            <p>综合月利率：<span class="modal_color">{{shopdetailsData.productRate}}</span></p>
            <p>贷款额度：<span class="modal_color">{{shopdetailsData.amount}}</span></p>
          </van-col>
          <van-col class="message_img" v-if="!inviterCode">
            <span @click="goEdit"> <img src="./imgs/edit_icon@2x.png" alt=""> </span>
            <span @click="deleteProduct"> <img src="./imgs/delete_icon@2x.png" alt=""> </span>
          </van-col>
        </van-row>
      </div>
    </header>
    <div class="mselfshopdetails_center">
      <div class="mselfshopdetails_process">
        <div class="process">
          <span class="process_span"></span>
          <span class="process_span2">申请流程</span>
        </div>
        <ul class="process_img clearfix">
          <li class="left" v-for="(item,index) in shopdetailsData.applicationProcedureList">
            <div class="left">
              <img :src=item.productParamIcon class="img_top" alt="">
              <p>{{item.productParamName}}</p>
            </div>
            <p v-if="index != shopdetailsData.applicationProcedureList.length-1" class="left img_bottom"><img src="./imgs/arrows_icon@2x.png" alt=""></p>
          </li>
        </ul>
      </div>
      <div class="mselfshopdetails_process">
        <div class="process">
          <span class="process_span"></span>
          <span class="process_span2">申请资料</span>
        </div>
        <ul class="process_text">
          <li v-for="(item,index) in shopdetailsData.applicationMaterialList">{{index+1+'、'+item.productParamName}}</li>
        </ul>
      </div>
      <div class="mselfshopdetails_process">
        <div class="process">
          <span class="process_span"></span>
          <span class="process_span2">申请条件</span>
        </div>
        <ul class="process_text">
          <li>{{shopdetailsData.productDetail}}</li>
        </ul>
      </div>
    </div>
    <footer class="productdetail_footer">
      <button @click="iwantagent" class="button_user button_userc">
        {{inviterCode?'立即申请':'立即分享'}}
      </button>
    </footer>
    <!-- 确认删除框 -->
    <!-- 分享提示框 -->
    <van-popup class="yindaoshow" v-model="yindaoshow">
      <img src="./imgs/yindao.png" alt="">
    </van-popup>
  </div>
</template>
<script>
import { Popup, Dialog } from "vant"
import utils from '../../utils/utils'
import wx from 'weixin-js-sdk'
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      inviterCode:this.$route.query.inviterCode,
      id: this.$route.query.id,
      code:this.$route.query.code,
      shopdetailsData:{},
      yindaoshow:false
    };
  },
  methods: {
    onGoback() {
      if(this.id == 1){
        this.$router.push({ path: "/shoppage?inviterCode="+this.inviterCode });
      } else {  
        this.$router.push({ path: "./mselfsupport" });
      }
    },
    // 分享授权
    wxShare() {
      let url
      if( !utils.isAndroid1() ){
        url = decodeURIComponent(this.$store.state.iosUrl) || decodeURIComponent(window.location.href)
      } else {
        url = window.location.href
      }
      this.request("wisdom.vshop.wechatOpen.getJsconf", {
        url: url
      }).then(data => {
        utils.wxShare(data.data)
      })
      .catch(err => {
        console.log(err);
      });
    },
    iwantagentwx(){
      this.wxShare()
        this.request("wisdom.vshop.proprietaryProduct.shareProprietaryProductH5",{proprietaryProductCode: this.$route.query.code,url:window.location.origin+'/mselfshopdetails'}).then(data=>{
          let dataList = data.data
          wx.ready(function(){
            wx.updateAppMessageShareData({
              title: dataList.title, // 分享标题
              desc: dataList.shareContent, // 分享描述
              link: dataList.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://wisdom-loan.oss-cn-shanghai.aliyuncs.com/productParam/60938f68-1fa0-4620-a90a-7a4d7a7c7117.png', // 分享图标
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
    iwantagent() {
      if(!this.inviterCode){ // 立即分享
        this.yindaoshow = true
        statistics.click("mselfshopdetails","wxShare")
      } else { // 立即申请
        this.$router.push({path:'./stiflingborrow?productType='+3+"&inviterCode="+ this.inviterCode +"&productCode="+this.code})
        utils.setCookie('InviterCode',this.InviterCode)
        utils.setCookie('ProductCode',this.code)
        statistics.click("mselfshopdetails","lijishenqing")
      }
    },
    goEdit(){
      // 调到编辑页
      this.$router.push({ path: "./maddproduct?code="+this.code });
    },
    // 删除
    deleteProduct(){
      Dialog.confirm({
        title: '温馨提示',
        message: '确认删除此产品吗？',
        className:"delect"
      }).then(() => {
        this.request("wisdom.vshop.proprietaryProduct.deleteByCode",{proprietaryProductCode: this.$route.query.code}).then(data=>{
          this.$router.push({ path: "./mselfsupport" });
        }).catch(err=>{console.log(err)})
      }).catch(() => {
        // on cancel
      });
    },
    Initialization(){
      this.request("wisdom.vshop.proprietaryProduct.getH5ProprietaryProductByCode",{proprietaryProductCode: this.$route.query.code}).then(data=>{
        console.log(data)
        if(data.data.state == 1){
          this.$router.push({ path: "./undershelf?inviterCode="+this.inviterCode });
        }
        this.shopdetailsData = data.data
      }).catch(err=>{console.log(err)})
    }
  },
  created(){
    this.Initialization()
  },
  mounted(){
    statistics.page("mselfshopdetails")
    if(this.id != 1){ // 立即分享
      this.iwantagentwx()
    }
    
  }
};
</script>
<style lang="less" scoped>
.mselfshopdetails_common {
  background-color: #f1f1fb;
  padding-bottom: 86px;
  height: 100%;
  .mselfshopdetails_header {
    .header_message {
      background-color: #fff;
      padding: 20px 0px 20px 15px;
      margin-bottom: 10px;
      img {
        width: 70px;
        height: 70px;
        margin-right: 10px;
        border-radius: 5px;
      }
      .message_text {
        font-size:14px;
        font-family:PingFang-SC-Regular;
        color:rgba(153,153,153,1);
        line-height: 25px;
        color: #999999;
        .modal_color {
          color: #FE951E;
          font-weight: bold;
        }
      }
      .message_blod{
        font-weight: bold;
        width: 200px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      :nth-child(1){
        font-size:17px;
        font-family:PingFang-SC-Bold;
        color: #333;
      }
      .message_img{
        margin-left: 14px;
        img{
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .mselfshopdetails_process {
    background-color: #fff;
    margin-top: 8px;
    .process {
      height: 40px;
      padding: 11px;
      color: #4597fb;
      font-size: 14px;
      border-bottom: 1px solid #f2f2f2; /*no*/
      padding-left: 15px;
      position: relative;
      .process_span{
        display: inline-block;
        height: 18px;
        width: 3px;
        background-color: #4597fb;
        border-radius: 1px;
        margin-right: 8px;
      }
      .process_span2{
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
            margin-left: 7px;
          }
        }
      }
    }
    .process_text {
      padding: 10px 0px 7px 15px;
      color: #333333;
      font-size: 13px;
      li {
        margin-bottom: 6px;
      }
    }
  }
  .productdetail_footer {
    position: fixed;
    bottom: 0px;
    button {
      font-size: 16px;
      width: 375px;
      height: 50px;
      color: #fff;
      background-color: #fff;
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
