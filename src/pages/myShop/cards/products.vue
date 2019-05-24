<template>
  <div class="product_common"> 
    <div v-for="item in 10" class="product_center" @click="goDetails">
      <van-row class="clearfix">
        <van-col>
          <img src="../imgs/products.png" alt="">
        </van-col>
        <van-col>
          <p class="product_title">人人贷借款</p>
          <p class="product_money">贷款额度:  <span>1万-20万元</span></p>
          <p class="product_label">
            <span>返佣5%</span>
          </p>
        </van-col>
        <van-col class="right">
          <button class="buttonBlue" @click="makeMoney ">{{!moneyShow ? "我要代理" : "马上赚钱"}}</button>
        </van-col>
      </van-row>  
    </div>
    <!-- 弹窗 -->
    <van-popup class="van_popup_text" v-model="moneyShow" :close-on-click-overlay=false>
      <div>
        <p class="product_message">确认代理后您将获得该产品 专属推广链接，是否确认？</p>
        <p class="product_radio">
          <van-radio-group v-model="radioName">
            <van-radio name="1">已阅读并同意<span style="color:#4597FB;">《XX代理协议》</span></van-radio>
          </van-radio-group>
        </p>
        <p class="product_button">
          <button @click="moneyShow = false">取消</button>
          <button @click="">确定</button>
        </p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup, RadioGroup, Radio  } from 'vant';
export default {
  components:{
    [Popup.name] : Popup,
    [RadioGroup.name] : RadioGroup,
    [Radio.name] : Radio,
  },
  data(){
    return {
      moneyShow:false,
      radioName:""
    }
  },
  methods:{
    // 马上赚钱
    makeMoney(){this.moneyShow = true},
    // 跳转到详情
    goDetails(){
      this.$router.push({path:'./mproductdetails'})
    }
  }
};
</script>
<style lang="less" scoped>
.product_common {
  .van-row {
    background-color: #fff;
    width: 345px;
    height: 110px;
    border-radius:5px;
    padding: 20px 10px;
    img {
      width: 70px;
      height: 70px;
      margin: 0px 15px 0px 5px;
    }
    .product_title{
      font-size:17px;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:18px;
    }
    .product_money {
      font-size: 14px;
      font-family: 'PingFang-SC-Regular';
      color: #333333;
      line-height:18px;
      margin: 6px 17px 7px 0px;
      span {
        color: #FE951E;
        font-weight: bold;
      }
    }
    .product_label {
      color: #FE951E;
      font-size:11px;
      line-height:18px;
      span {
        background-color: #FEF1E3;
        padding: 6px 8px;
        border-radius: 2px;
      }
    }
    button{
      width: 70px;
      border-radius:15px;
      height: 29px;
      line-height: 29px;
      font-size:12px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      margin-top: 41px;
    }
    .buttonBlue{
      background-color: #4597FB;
    }
    .buttonyellow{
      background-color: #F3B13E;
    }
  }
  .product_center {
    margin-bottom: 10px;
  }
}
</style>
