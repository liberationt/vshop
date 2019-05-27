<template>
  <div class="maddproduct_common pddingTop">
    <header>
      <van-nav-bar
        title="添加/编辑自营产品"
        left-arrow
        @click-left="ongobanck"
      />
    </header>
    <div class="editshop_center clearfix">
      <van-row class="center_list">
        <van-col span="12" style="text-align:left;" class="center_geren">公司LOGO</van-col>
        <van-col span="12" style="text-align:right">
          <van-uploader :after-read="onReadTop" class="right">
            <img :src=topImgUrl alt="">
          </van-uploader>
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="12" style="text-align:left">产品名称</van-col>
        <van-col span="12">
          <input type="text" v-model="shopValue.productName" placeholder="请填写产品名称">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="12" style="text-align:left">月利率范围</van-col>
        <van-col span="12">
          <input type="text" v-model="shopValue.MonthlyInterest" placeholder="请填写月利率 如：0.3%-0.5%">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="12" style="text-align:left">最小额度</van-col>
        <van-col span="12">
          <input type="text" v-model="shopValue.minimumAmount" placeholder="请填写产品最小额度">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="12" style="text-align:left">最大额度</van-col>
        <van-col span="12">
          <input type="text" v-model="shopValue.maxAmount" placeholder="请填写产品最大额度">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <p class="center_list_one">
          <span>申请流程</span>
        </p>
        <ul class="center_list_two">
          <li class="left" v-for="item in processList"> {{item}}</li>
        </ul>
      </van-row>
      <van-row class="center_list">
        <p class="center_list_one">
          <span>申请资料</span>
        </p>
        <ul class="center_list_two">
          <li class="left" v-for="item in materialsList"> {{item}}</li>
        </ul>
      </van-row>
      <van-row class="center_list">
        <p class="center_list_one">
          <span>申请条件</span>
        </p>
        <div class="left">
          <textarea class="shop_tarea" v-model="shopValue.shopIntroduce" placeholder="请填写申请条件"></textarea>
        </div>
      </van-row>
    </div>
    <footer>
      <button>保存</button>
    </footer>
  </div>
</template>
<script>
import {  Uploader  } from 'vant';
export default {
  components:{
    [Uploader.name] : Uploader 
  },
  data() {
    return {
      shopValue:{
        productName:"",
        MonthlyInterest: "",
        minimumAmount:"",
        maxAmount:"",
        shopIntroduce:""
      },
      processList:[
        "提交申请",
        "身份认证",
        "手机认证",
        "成功放款"
      ],
      materialsList:[
        "身份证",
        "银行卡",
        "手机实名",
        "芝麻授信"
      ],
      topImgUrl: require("./imgs/topimgf.png")
    };
  },
  methods: {
    ongobanck() {
      this.$router.push({ path: "./mselfsupport" });
    },
    onReadTop(file){
      this.upload(file.file).then((data)=>{
        this.topImgUrl = data.url
      }).catch(err=>{})
      
    },
    // 确认提交
    editSubmit(){
      // 提交成功后跳转到首页
      this.$router.push({path:'./myshop'})
    }
  }
};
</script>
<style lang="less" scoped>
.maddproduct_common {
  padding-bottom: 10px;
  .editshop_center {
    padding: 0px 15px;
    .center_list {
      padding: 15px 0px;
      border-bottom: 1px solid #e7e7e7; /*no*/
      font-size: 14px;
      color: #000;
      .center_geren {
        height: 70px;
        line-height:70px;
      }
      .center_list_one{
        color: #4597FB;
        font-size:14px;
        span{
          border-left: 5px solid #4597FB;/*no*/
          padding-left: 8px;
        }
      }
      .center_list_two {
        padding-top: 14px;
        li{
          width: 80px;
          height: 35px;
          line-height: 35px;
          background-color: #F4F4F4;
          text-align: center;
          border-radius:2px;
          margin-right: 8px;
        }
        :last-child{
          margin-right: 0px;
        }
      }
      .center_arrow,
      input::-webkit-input-placeholder,
      a {
        color: #999999;
      }
      img {
        width: 70px;
        height: 70px;
      }
      input {
        text-align: right;
        color: #333;
        float: right;
      }
      .shop_tarea {
        border: none;
        margin-top: 10px;
        font-size: 14px;
        color: #999;
        width: 340px;
        height: 78px;
      }
    }
  }
  footer{
    button{
      background:rgba(69,151,251,1);
      box-shadow:0px 0px 5px 0px rgba(69,151,251,0.15);
      width: 375px;
      height: 50px;
      font-size:16px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      position: fixed;
      bottom: 0px;
    }
  }
}
</style>
