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
        <van-col span="8">
          <button @click="productposter">产品海报</button>
        </van-col>
        <van-col span="8">
          <button @click="recommenduser" class="button_user">
            <p>推荐用户</p>
            <p>推荐后会隐藏佣金</p>
          </button>
        </van-col>
      </van-row>
    </footer>
  </div>
</template>
<script>
export default {
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
    }
  },
  created(){
  },
  methods:{
    onGoback(){
      this.$router.push({path:'./magentproduct'})
    },
    productposter(){
      alert('产品海报')
    },
    recommenduser(){
       alert('推荐用户')
    }
  }
}
</script>
<style lang="less" scoped>
.productdetails_common {
  height: 100%;
  background-color: #f1f1fb;
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
    position: absolute;
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
}
</style>
