<template>
  <div class="myshop_common pddingTop">
    <header>
      <van-nav-bar
        title="我的微店"
        left-arrow
        @click-left="onGologo"
      />
    </header>
    <div class="myshop_center clearfix">
      <router-link to="/meditshop">
        <van-row class="center_top">
          <van-col span="4" class="center_topimg">
            <img :src="userMessage.headImage ? userMessage.headImage : topImg" alt="">
          </van-col>
          <van-col span="10" class="center_text">
            <div>
              <van-col span="11" class="center_username">{{userMessage.name}}</van-col>
              <van-col span="13" class="center_identity" v-if="userMessage.name">
                <span><img src="./imgs/shiliang.png" alt=""></span>
                身份认证</van-col>
            </div>
            <div class="center_phone">
              <span><img src="./imgs/phone.png" alt=""></span>
              <span>{{userMessage.phone}}</span>
            </div>
          </van-col>
          <div span="2" class="center_right right">
            <img src="./imgs/right.png" alt="">
          </div>
        </van-row>
      </router-link>
      <van-row class="center_navbar">
        <van-col span="8">
          <router-link to="/mshopregister">
            <p class="navbar_text">{{userMessage.vshopRegister}}</p>
            <p>微店注册</p>
          </router-link>
        </van-col>
        <van-col span="8" class="navbar_center">
          <router-link to="/mshopapply">
            <p class="navbar_text">{{userMessage.vshopApply}}</p>
            <p>微店申请</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/mycommission">
            <p class="navbar_text">{{userMessage.commissionAmount}}</p>
            <p>我的佣金(元)</p>  
          </router-link>
        </van-col>
      </van-row>
      <div class="navbar"></div>
      <van-row class="center_product" @click.native = "centerzidai('magentproduct')">
        <van-col>
          <img src="./imgs/dailichanpin.png" alt="">
        </van-col>
        <van-col class="center_zidai">
          <!-- <router-link to="magentproduct"> -->
            <p class="zidai_blod">代理产品</p>
            <p>多种贷超和信贷工具等你领佣金</p>
            <p class="center_agentproduct">免费代理</p>
          <!-- </router-link> -->
        </van-col>
      </van-row>
      <div class="navbar"></div>
      <van-row class="center_product"  @click.native = "centerzidai('mselfsupport')">
        <!-- <router-link to="mselfsupport"> -->
          <van-col>
            <img src="./imgs/ziyingchanpin.png" alt="">
          </van-col>
          <van-col class="center_zidai">
            <p class="zidai_blod">自营产品</p>
            <p>自定义添加个人或公司的信贷产品</p>
          </van-col>
        <!-- </router-link> -->
      </van-row>
      <div class="navbar"></div>
    </div>
    <footer>
      <van-row class="myshop_footer">
        <van-col span="12">
          <button @click="goLookShop"><img src="./imgs/eye.png" alt="" class="footer_eye"> 预览微店 </button>
        </van-col>
        <van-col span="12">
          <button @click="onShare"> <img src="./imgs/share.png" alt="" class="footer_share"> 分享微店 </button>
        </van-col>
      </van-row>
      <div class="footer_footer">
        <p>每一个微店都是一个</p>
        <p>聚合的信贷产品超市</p>
      </div>
    </footer>
  </div>
</template>
<script>
import utils from "../../utils/utils";
import { Popup, Dialog } from "vant";
import wx from 'weixin-js-sdk'
export default {
  components: {
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      topImg: require("./imgs/topimg.png"),
      userMessage: [],
      inviterCode:""
    };
  },
  methods: {
    //返回登录页
    onGologo() {
      this.$router.push({ path: "./" });
    },
    // 预览微店
    goLookShop(){
      /**
        @ApiModelProperty("店铺是否有效 0无效 1有效")
        private Integer storeStatus;
      **/ 
      if(this.userMessage.storeStatus == 0){
        Dialog.confirm({
          title: '温馨提示',
          message: '请先完善店铺信息'
        }).then(() => {
          
        })
      } else {
        this.$router.push({ path: "./shoppage?inviterCode="+this.inviterCode });
      }
    },
    // 分享
    onShare() {
      if(this.userMessage.storeStatus == 0){
        this.tanchuang()
      } else {
        alert('请点击右上角去分享')
        this.wxShare(this.inviterCode);
      }
    },
    centerzidai(name) {
      if(this.userMessage.storeStatus == 0){
        this.tanchuang()
      } else {
        this.$router.push({ path: "/"+name });
      }
    },
    tanchuang(){
      Dialog.confirm({
          title: '温馨提示',
          message: '请先完善店铺信息'
        }).then(() => {
          
        })
    },
    wxShare(inviterCode) {
      let id = this.$router.query.id
      this.request("wisdom.vshop.wechatOpen.getJsconf", {
        url: id == 1 ? window.location.origin+'/mlogin' : window.location.origin+'/myshop'
      }).then(data => {
          utils.wxShare(data.data)
          setTimeout(() => {
            wx.ready(function(){
              wx.updateAppMessageShareData({
                title: '急用钱？请找我，专业贷款！', // 分享标题
                desc: '*经理向您推荐了自己的微店，提供工资贷、社保贷、消费贷、公积金贷、车贷房贷……规渠正规安全，服务专业周到，快来看看吧！', // 分享描述
                link: window.location.origin + "/shoppage?inviterCode="+inviterCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/ZOfgNPVEofm6wGcqrYFDwxAhllW0k3wUom1HXIlmoeQYPf8YX0FkagGibAvcE9dlyLXIRlbicpjacA9wDDR6yU8g/132', // 分享图标
                success: function () {
                  // 用户点击了分享后执行的回调函数
                  alert('分享成功回调')
                },
                cancel: function(err){
                  alert('分享取消回调')
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
  created() {
    this.request("wisdom.vshop.vshopStoreManager.getVshopStoreDetail", {})
      .then(data => {
        this.userMessage = data.data;
        utils.setCookie("userMessage", JSON.stringify(data.data));
      })
      .catch(err => {
        console.log(err);
      });
    // 获取邀请码
    this.request("wisdom.vshop.vshopStoreManager.getShareRes", {})
    .then(data => {
      this.inviterCode = data.data.inviterCode
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
  .myshop_center {
    .center_top {
      padding: 15px;
      border-bottom: 1px solid #e7e7e7; /*no*/
      .center_topimg {
        img {
          width: 60px;
          height: 60px;
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
      }
      .center_identity {
        background-color: #f3b13e;
        color: #fff;
        font-size: 10px;
        padding: 3px 8px;
        border-radius: 3px;
        img {
          width: 10px;
          height: 12px;
          margin-bottom: 2px;
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
        }
        margin-top: 37px;
        font-size: 13px;
        color: #666;
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
      padding: 18px 0px;
      color: #333333;
      font-size: 13px;
      font-weight: bold;
      .navbar_center {
        border-left: 1px solid #e7e7e7; /*no*/
        border-right: 1px solid #e7e7e7; /*no*/
      }
      .navbar_text {
        font-size: 20px;
        color: #4597fb;
        padding-bottom: 10px;
      }
    }
    .center_product {
      padding: 18px 0px 13px 30px;
      img {
        width: 61px;
        height: 60px;
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
          background-color: #f3b13e;
          color: #fff;
          font-size: 11px;
          padding: 5px 11px;
          border-radius: 0px 0px 5px 5px;
        }
        .zidai_blod {
          font-weight: bold;
          font-size: 16px;
          padding-bottom: 9px;
        }
      }
    }
  }
  .myshop_footer {
    button {
      a {
        color: #ffffff;
      }
      background-color: #4597fb;
      width: 155px;
      height: 45px;
      border: 0px;
      border-radius: 23px;
      font-size: 16px;
      color: #ffffff;
      margin-top: 22px;
    }
    img {
      margin-right: 10px;
      vertical-align: middle;
    }
    .footer_eye {
      width: 22px;
      height: 15px;
    }
    .footer_share {
      width: 19px;
      height: 19px;
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
  }
}
</style>
