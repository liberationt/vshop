<template>
  <div class="productdetails_common pddingTop">
    <header class="productdetails_header">
      <van-nav-bar
        title="代理推广"
        left-arrow
        @click-left="onGoback"
      />
      <div class="header_img">
        <img src="./imgs/dailituiguang.png" alt="">
      </div>
    </header>
    <div class="productdetails_center">
      <div class="productdetails_process">
        <div class="process">
          <p>申请流程</p>
        </div>
        <ul class="process_img clearfix">
          <li class="left" v-for="(item,index) in processimg">
            <div class="left">
              <img :src=item.img class="img_top" alt="">
              <p>{{item.title}}</p>
            </div>
            <p v-if="index != processimg.length-1" class="left img_bottom"><img src="./imgs/arrows_icon@2x.png" alt=""></p>
          </li>
        </ul>
      </div>
      <div class="productdetails_process">
        <div class="process">
          <p>申请资料</p>
        </div>
        <ul class="process_text">
          <li v-for="item in processimg">{{item.process_text}}</li>
        </ul>
      </div>
      <div class="productdetails_process">
        <div class="process">
          <p>申请条件</p>
        </div>
        <ul class="process_text">
          <li>1、手机运营商、身份证、基本资料、征信报告、银行卡</li>
        </ul>
      </div>
    </div>
    <footer class="productdetail_footer">
      <van-row>
        <van-col class="van_daili" span="8">
          代理后推荐用户 赚 <span style="color:#FE951E">2.6%</span> 佣金
        </van-col>
        <div v-if="false">
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
            <button @click="iwantagent" class="button_user button_userc">
              我要代理
            </button>
          </van-col> 
        </div>
      </van-row>
    </footer>
    <!-- 弹出层 -->
    <van-popup v-model="showPoster" :close-on-click-overlay=false>
      <div class="popup_img_op">
        <img src="./imgs/dailichanpin.png" alt="">
      </div>
      <div class="popup_center">
        <img src="./imgs/dailichanpin.png" alt="">
        <p>长按识别二维码马上申请</p>
      </div>
      <div class="popu_footer">
        <van-row >
          <van-col span="16">
            <van-col class="popuf_img">
              <img src="./imgs/topimg.png" alt="">
            </van-col>
            <van-col class="popuf_text">
              <p>欢迎咨询</p>
              <p>13189775677</p>
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
  </div>
</template>
<script>
import { Popup } from 'vant';
export default {
  components: {
    [Popup.name] : Popup
  },
  data(){
    return{
      processimg:[
        {
          img:require('./imgs/submit applications_icon@2x.png'),
          title:'提交申请',
          process_text: '1、身份证'
        },
        {
          img:require('./imgs/submit applications_icon@2x.png'),
          title:'身份认证',
          process_text: '2、银行卡'
        },
        {
          img:require('./imgs/submit applications_icon@2x.png'),
          title:'手机认证',
          process_text: '3、手机实名制'
        }
      ],
      showPoster: false
    }
  },
  created(){
  },
  methods:{
    onGoback(){
      this.$router.push({path:'./magentproduct'})
    },
    productposter(){
      this.showPoster = true
    },
    recommenduser(){
       alert('推荐用户')
    },
    iwantagent(){
      alert('我要代理')
    }
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
    img {
      width: 65px;
      height: 65px;
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
