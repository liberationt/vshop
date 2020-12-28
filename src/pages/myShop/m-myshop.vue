<template>
  <div class="myshop_common pddingTop">
    <header>
      <van-nav-bar
        :title=title
        :left-text=leftText
        right-text="退出登录"
        left-arrow
        @click-left="onGologo"
        @click-right="onClickRight"
      />
    </header>
    <div class="myshop_center clearfix">
      <router-link to="/meditshop">
        <van-row class="center_top">
          <van-col span="4" class="center_topimg">
            <img :src="userMessage.headImage ? userMessage.headImage : topImg" alt="">
          </van-col>
          <van-col span="10" class="center_text">
            <div v-if="businessKey == 1">
              <van-col span="11" class="center_username">{{userMessage.name}}</van-col>
              <van-col span="13" class="center_identity" v-if="userMessage.name">
                <span><img src="./imgs/shiliang.png" alt=""></span>
                身份认证</van-col>
            </div>
            <div class="center_phone" v-if="businessKey == 1">
              <span><img src="./imgs/phone.png" alt=""></span>
              <span>{{userMessage.phone}}</span>
            </div>
            <div class="center_phone_xj" v-if="businessKey == 3">
              <span><img src="./imgs/phone.png" alt=""></span>
              <span>{{userMessage.phone}}</span>
            </div>
          </van-col>
          <div span="2" class="center_right right">
            <img src="./imgs/right.png" alt="">
          </div>
        </van-row>
      </router-link>
      <div class="center_navbar clearfix">
        <div  class="clearfix goto" @click="goto2">
            <p class="navbar_text">{{userMessage.vshopRegister}}</p>
            <p>微店注册</p>
        </div>
        <div class="clearfix goto goto1" @click="goto1">
            <p class="navbar_text">{{userMessage.vshopApply}}</p>
            <p>微店申请</p>
        </div>
        <div class="clearfix goto" @click="goto">
            <p class="navbar_text">{{userMessage.commissionAmount}}</p>
            <p>我的佣金(元)</p>
        </div>
      </div>
      <div class="navbar"></div>
      <div class="center_product center_product1 clearfix"  @click="centerzidai('magentproduct',0)">
        <van-col>
          <img src="./imgs/dailichanpin.png" alt="">
        </van-col>
        <van-col class="center_zidai">
            <p class="zidai_blod">代理赚钱</p>
            <p class="zidai_text">门槛低  产品多  奖励高  自动返佣</p>
            <p class="center_agentproduct">免费代理</p>
        </van-col>
      </div>
      <div class="center_product center_product3 clearfix" @click="centerzidai('mselfsupport',1)">
        <van-col>
          <img src="./imgs/ziyingchanpin.png" alt="">
        </van-col>
        <van-col class="center_zidai center_zidai1">
          <p class="zidai_blod">自营产品</p>
          <p class="zidai_text">自定义添加个人或公司的信贷产品</p>
        </van-col>
      </div>
      <div class="center_product center_product2 clearfix" @click="centerzidai('mopening',2)">
        <van-col>
          <img src="./imgs/kaidianxuzhi@2x.png" alt="">
        </van-col>
        <van-col class="center_zidai center_zidai2">
          <p class="zidai_blod">开店须知</p>
          <p class="zidai_text">个人店铺编辑教程</p>
        </van-col>
      </div>
      <div class="navbar"></div>
    </div>
    <footer>
      <div class="footer_footer">
        <p>每一个微店都是一个</p>
        <p>聚合的信贷产品超市</p>
      </div>
      <div class="myshop_footer clearfix" v-if="wxShareContent == 'success'">
        <van-col span="12">
          <button @click="goLookShop"> 预览微店 </button>
        </van-col>
        <van-col span="12">
          <button @click="onShare" class="btn_color"> 分享微店 </button>
        </van-col>
      </div>
      <div class="myshop_footer clearfix" v-if="wxShareContent != 'success'">
        <van-col span="9">
          <button @click="goLookShop"> 预览微店 </button>
        </van-col>
        <van-col span="9">
          <button @click="onShare" class="btn_color"> 分享微店 </button>
        </van-col>
        <van-col span="6" class="footer_weixin">
          <div @click="ontanchuang">
            <p> <img src="./imgs/weixin@2x.png" alt=""> </p>
            <p> 关注公众号 </p>
          </div>
        </van-col>
      </div>
    </footer>
    <!-- 风险弹窗 -->
    <van-popup class="yindaoshow" v-model="yindaoshow">
      <img src="./imgs/yindao.png" alt="">
    </van-popup>
    <!-- 分享复制弹框 -->
    <van-popup class="conpyImg" v-model="conpyImg">
      <img src="./imgs/png@2x.png" alt="">
    </van-popup>
  </div>
</template>
<script>
import utils,{ getCookie } from "../../utils/utils";
import { Popup, Dialog } from "vant";
import wx from 'weixin-js-sdk'
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      topImg: require("./imgs/topimg.png"),
      userMessage: [],
      inviterCode:"",
      yindaoshow:false,
      name:"",
      conpyImg:false,
      wxShareContent:"",
      title:"我的微店",
      leftText:"关注【抢单侠创业平台】免费体验完整功能",
      businessKey:""
    };
  },
  methods: {
    goto2(){
      this.$router.push({path:'/mshopregister?inviterCode='+this.inviterCode})
    },
    goto(){
      this.$router.push({path:'/mycommission'})
    },
    goto1(){
      this.$router.push({path:'/mshopapply'})
    },
    // 弹窗
    onGologo() {
      if(this.wxShareContent == 'error'){
        this.ontanchuang()
      }
      
    },
    // 弹窗
    ontanchuang(){
      statistics.click("myshop","gzwxh")
      this.conpyImg = true
      utils.copyContent("抢单侠创业平台")
    },
    // t退出
    onClickRight(){
      this.request("wisdom.vshop.vshopStoreManager.loginOut",{}).then(data=>{
        utils.delCookie("user");
        this.$router.push({path:'./'})
      }).catch(err=>{console.log(err)})
    },
    // 预览微店
    goLookShop(){
      /**
        @ApiModelProperty("店铺是否有效 0无效 1有效")
        private Integer storeStatus;
      **/ 
      if(this.userMessage.storeStatus == 0){
        this.tanchuang()
      } else {
        this.$router.push({ path: "./shoppage?inviterCode="+this.inviterCode });
      }
      statistics.click("myshop",'yulan')
      
    },
    // 分享
    onShare() {
      statistics.click("myshop",'share')
      if(this.userMessage.storeStatus == 0){
        this.tanchuang()
      } else {
        if(this.wxShareContent != 'success'){
          this.ontanchuang()
        } else {
          this.yindaoshow = true;
        }
      }
    },
    centerzidai(name,num) {
      if(this.userMessage.storeStatus == 0 && num == 1){
        this.tanchuang()
      } else {
        this.$router.push({ path: "/"+name });
      }
    },
    tanchuang(){
      Dialog.confirm({
          ttitle: '温馨提示',
          message: '您还没有创建店铺，请先编辑保存店铺信息',
          confirmButtonText:"去编辑"
        }).then(() => {
          this.$router.push({path:'./meditshop'})
        }).catch(() => {
        });
    },
    wxShare(inviterCode) {
      let url
      if( !utils.isAndroid1() ){//ios
        url = decodeURIComponent(this.$store.state.iosUrl) || decodeURIComponent(window.location.href)
      } else {
        url = window.location.href
      }
      let that = this
      this.request("wisdom.vshop.wechatOpen.getJsconf", {
        url: url
      }).then(data => {
          utils.wxShare(data.data)
          setTimeout(() => {
            wx.ready(function(){
              wx.updateAppMessageShareData({
                title: '急用钱？请找我，专业贷款！', // 分享标题
                desc: that.name + '向您推荐了自己的微店，提供工资贷、社保贷、消费贷、公积金贷、车贷房贷……规渠正规安全，服务专业周到，快来看看吧！', // 分享描述
                link: window.location.origin + "/shoppage?inviterCode="+inviterCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
　　　　  }, 500)
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted(){
    statistics.page("myshop")
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    if (ua.match(/MicroMessenger/i) != "micromessenger") {
      this.wxShareContent = 'error'
      this.title = ""
      this.leftText = "关注【抢单侠创业平台】免费体验完整功能"
    }else{
      this.wxShareContent = 'success'
      this.title = "我的微店"
      this.leftText = ""
    }
    this.businessKey = JSON.parse(getCookie("user")).businessKey
  },
  created() {
    this.request("wisdom.vshop.vshopStoreManager.getVshopStoreDetail", {})
      .then(data => {
        this.userMessage = data.data;
        this.inviterCode = data.data.inviterCode
        this.name =  data.data.name
        if(data.data.storeStatus != 0){
          this.wxShare(data.data.inviterCode)
        }
        utils.setCookie("userMessage", JSON.stringify(data.data));
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.myshop_common {
  text-align: center;
  padding-bottom: 60px;
  .myshop_center {
    .center_top {
      padding: 15px;
      border-bottom: 1px solid #f2f2f2; /*no*/
      .center_topimg {
        img {
          width: 60px;
          height: 60px;
          border-radius: 30px;
        }
      }
      .center_text {
        margin-left: 15px;
      }
      .center_username {
        text-align: left;
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        font-family: "PingFang-SC-Bold";
        margin-top: 1px;
      }
      .center_identity {
        background-color: #f3b13e;
        color: #fff;
        font-size: 10px;
        padding: 2px 8px 1px 8px;
        height: 17px;
        border-radius: 3px;
        font-weight: bold;
        margin-top: 4px;
        img {
          width: 10px;
          height: 12px;
          margin-bottom: 3px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .center_phone {
        text-align: left;
        img {
          width: 10px;
          height: 16px;
          margin-right: 7px;
          vertical-align: sub;
          margin-bottom: 2px;
          margin-left: 1px;
        }
        margin-top: 37px;
        font-size: 13px;
        color: #666;
      }
      .center_phone_xj{
        font-size:16px;
        font-family:'PingFang SC';
        font-weight:500;
        color: #333333;
        margin-top: 20px;
        img{
          width: 10px;
          height: 16px;
          margin-bottom: 5px;
          margin-right: 8px;
        }
      }
      .center_right {
        margin-top: 18px;
        img {
          width: 12px;
          height: 21px;
        }
      }
    }
    .center_navbar {
      padding: 14px 0px;
      color: #333333;
      font-size: 13px;
      font-weight: bold;
      .goto{
        float: left;
        width: 33.33%;
        text-align: center;
      }
      .goto1 {
        border-left: 1px solid #f2f2f2; /*no*/
        border-right: 1px solid #f2f2f2; /*no*/
      }
      .navbar_text {
        font-size: 22px;
        color: #4597fb;
        padding-bottom: 5px;
      }
    }
    .center_product {
      padding: 16px 0px 16px 35px;
      img {
        width: 50px;
        height: 50px;
        margin-top: 2px;
      }
      .center_zidai {
        font-size: 15px;
        color: #333333;
        font-family: "PingFang-SC-Regular";
        text-align: left;
        padding-left: 19px;
        position: relative;
        .center_agentproduct {
          position: absolute;
          top: -18px;
          right: -42px;
          background-color: #D9EAFF;
          color: #4597FB;
          font-size: 11px;
          padding: 5px 11px;
          border-radius: 0px 0px 5px 5px;
        }
        .zidai_blod {
          font-weight: bold;
          font-size: 16px;
          padding-bottom: 3px;
        }
        .zidai_text{
          color: #999;
        }
      }
      .center_zidai1 , .center_zidai2{
        padding-left: 17px;
      }
      .center_zidai1{
        padding-left: 12px;
      }
    }
    .center_product3 {
      border-top: 1px solid #EFEFEF;/*no*/
      border-bottom: 1px solid #EFEFEF;/*no*/
    }
    .center_product1{
      padding: 17px 0px 14px 36px;
      img{
        width: 44px;
        height: 49px;
        margin-top: 2px;
      }
    }
    .center_product2{
      padding: 11px 0px 13px 37px;
      img{
        width: 44px;
        height: 55px;
        margin-top: 0px;
      }
    }
  }
  .myshop_footer {
    padding: 8px 8px;
    box-shadow:0px -1px 10px 0px rgba(0, 0, 0, 0.15);
    position: fixed;
    bottom: 0px;
    width: 375px;
    background-color: #fff;
    // height: 120px;
    button {
      a {
        color: #ffffff;
      }
      width: 95%;
      background-color: #4597fb;
      height: 45px;
      line-height: 43px;
      border: 0px;
      font-size: 16px;
      color: #ffffff;
      border-radius: 3px;
    }
    .btn_color{
      background-color: #F3B13E;
    }
    img {
      margin-right: 10px;
      vertical-align: middle;
    }
    .footer_weixin{
      padding-left: 5px;
      img{
        width: 24px;
        height: 24px;
        margin: 1px 0px 4px 1px;
      }
    }
  }
  .footer_footer {
    background: url("./imgs/footer.png") no-repeat;
    background-size: 100%;
    background-position-y: 12px;
    width: 100%;
    margin-top: 32px;
    font-size: 11px;
    color: #999999;
    height: 134px;
  }
}
</style>
