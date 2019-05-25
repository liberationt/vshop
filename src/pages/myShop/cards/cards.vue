<template>
  <div class="productCard_common"> 
    <div class="productCard_center" v-for="item in 10" @click="goDetails">
      <div>
        <van-row>
          <van-col>
            <img src="../imgs/products.png" alt="">
          </van-col>
          <van-col>
            <p class="product_title">招商王者荣耀卡</p>
            <p class="product_people">申请人数: <span>9964</span></p>
            <p class="product_people">批卡率: <span>99%</span>
              <van-progress
                color="#F3B13E"
                :percentage="99"
              />
            </p>
          </van-col>
        </van-row>  
      </div>
      <div class="productCard_footer">
        <van-row class="clearfix">
          <van-col>
            <p class="product_label">
              <span>返佣5%</span>
            </p>
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
.productCard_common {
  .product_label {
      color: #fe951e;
      font-size: 11px;
      line-height: 18px;
      margin-top: 6px;
      span {
        background-color: #fef1e3;
        padding: 6px 8px;
        border-radius: 2px;
      }
    }
    .van-col_right{
      height: 29px;
      width: 70px;
      border-radius: 15px;
      height: 29px;
      line-height: 29px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      color: rgba(255, 255, 255, 1);
    }
  .productCard_center {
      background-color: #fff;
      width: 345px;
      border-radius: 5px;
      padding: 22px 11px 22px 15px;
    .van-row {
      img {
        width: 110px;
        height: 70px;
        margin: 0px 15px 0px 5px;
      }
      .product_title {
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
      }
      .product_people {
        font-size: 14px;
        font-family: "PingFang-SC-Regular";
        color: #333333;
        line-height: 18px;
        margin: 6px 17px 7px 0px;
        .van-progress__pivot {
          display: none;
        }
        span {
          color: #fe951e;
          font-weight: bold;
        }
      }
      .buttonBlue {
        background-color: #4597fb;
      }
      .buttonyellow {
        background-color: #f3b13e;
      }
    }
    .productCard_footer{
      margin-top: 5px;
    }
    margin-bottom: 10px;
  }
}
</style>
