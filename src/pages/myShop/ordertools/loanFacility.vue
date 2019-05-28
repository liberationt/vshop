<template>
  <div class="loanFacility_common"> 
    <div class="loanFacility_center" v-for="item in 10" @click="goDetails">
      <div>
        <van-row>
          <van-col>
            <img src="../imgs/products.png" alt="">
          </van-col>
          <van-col>
            <p class="product_one">招商王者荣耀卡</p>
            <p class="product_two"> <span>李明艳</span> &nbsp&nbsp&nbsp <span>13*****2899</span></p>
            <p class="product_three">申请时间：2019-03-20 10:20:33</p>
          </van-col>
          <van-col class="right  van-col_right buttonBlue" @click="makeMoney ">
            {{!moneyShow ? "我要代理" : "马上赚钱"}}
          </van-col>  
        </van-row>  
      </div>
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
import { Popup, RadioGroup, Radio, Progress  } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Progress.name]: Progress,
  },
  data() {
    return {
      moneyShow: false,
      radioName: ""
    };
  },
  methods: {
    // 马上赚钱
    makeMoney() {
      this.moneyShow = true;
    },
    // 跳转到详情
    goDetails() {
      this.$router.push({ path: "./mproductdetails" });
    }
  }
};
</script>
<style lang="less" scoped>
.loanFacility_common {
    .van-col_right{
      height: 22px;
      width: 60px;
      border-radius:3px;
      line-height: 22px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      color: #4897FF;
      background-color: #E3EFFE;
      border: 1px solid #4597FB;/*no*/
      position: absolute;
      right: 32px;
    }
  .loanFacility_center {
      background-color: #fff;
      width: 345px;
      border-radius: 5px;
      padding: 19px 15px;
    .van-row {
      img {
        width: 70px;
        height: 70px;
        margin-right: 15px;
      }
      line-height: 26px;
      .product_one {
       font-size:17px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        margin-top: -8px;
      }
      .product_two {
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .product_three{
        font-size:12px;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(153,153,153,1);
      }
      .buttonyellow {
        background-color: #f3b13e;
      }
    }
    margin-bottom: 10px;
  }
}
</style>
