<template>
  <div :class="productList0.length<=4? 'height product_common': 'product_common'"> 
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <div v-for="item in productList0" class="product_center" @click="goDetails(item.productCode,item.agentStatus)">
        <van-row class="clearfix">
          <van-col>
            <img :src=item.productLogo alt="">
          </van-col>
          <van-col>
            <p class="product_title">{{item.productName}}</p>
            <p class="product_money">贷款额度:  <span>{{item.amount}}</span></p>
            <p class="product_label">
              <span>{{item.rebate}}</span>
            </p>
          </van-col>
          <van-col class="right">
            <button :class="item.agentStatus == 0 ?'buttonBlue':'buttonyellow'" @click.stop="makeMoney(item.agentStatus,item.productCode)">{{item.agentStatusName}}</button>
          </van-col>
        </van-row>  
      </div>
    </van-pull-refresh>
    <!-- 下拉刷新 -->
    <van-list
      class="xialashuaxin"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    </van-list>
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
          <button @click="confirm">确定</button>
        </p>
      </div>
    </van-popup>
    <footer v-if="showStatus == 1" class="footer_button" @click="moneyShow = true">
      <button>一键代理推广赚工资</button>
    </footer>
  </div>
</template>
<script>
import { Popup, RadioGroup, Radio, List, Toast } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [List.name]: List
  },
  data() {
    return {
      moneyShow: false,
      radioName: "",
      productList0: [],
      loading:false,
      finished:false,
      isLoading: false,
      count: 0,
      showStatus:"",
      showStatus:"",
      productCode:""
    };
  },
  methods: {
    // 马上赚钱
    makeMoney(num,code) {
      // 0 我要代理 1 马上赚钱
      switch (num) {
        case 1:
          this.$router.push({ path: "./mproductdetails?num=" + num+"&code="+code });
          break;
        case 0:
          this.moneyShow = true;
          this.productCode = code
          break;
      }
    },
    // 跳转到详情
    goDetails(code,num) {
      this.$router.push({ path: "./mproductdetails?code="+code+"&num="+num });
    },
    Initialization(num) {
      this.request("wisdom.vshop.product.queryH5AgentProducts", {
        productType: num,
        pageNum: 1,
        pageSize: 10
      })
        .then(data => {
          console.log(data);
          if(num==0){
            this.showStatus = data.data.showStatus
            this.productList0 = data.data.dataList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确认代理
    confirm(){
      let agentStatusData = []
      if(this.showStatus == 0){ // 不是一键代理
        agentStatusData = [{productCode:this.productCode,productType:0}]
      } else {
        this.productList0.forEach(v=>{
          if(v.agentStatus == 0 ){
            agentStatusData.push({productCode:v.productCode,productType:0})
          }
        })
      }
      this.request('wisdom.vshop.product.batchAgentProducts',{queryH5UserProductDetailReqList:agentStatusData}).then(data=>{
        Toast.success('代理成功');
        this.moneyShow =  false
        this.Initialization(0)
      }).catch(err=>{console.log(err)})
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.Initialization(0);
        Toast.success('刷新成功');
        this.count++;
        this.isLoading = false;
        
      }, 500);
    },
    onLoad(){
       // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.productList0.length <=10) {
          this.finished = true;
        }
      }, 500);
    }
  },
  mounted() {
    this.Initialization(0);
  }
};
</script>
<style lang="less" scoped>
.product_common {
  .van-row {
    background-color: #fff;
    width: 345px;
    height: 110px;
    border-radius: 5px;
    padding: 20px 10px;
    img {
      width: 70px;
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
    .product_money {
      font-size: 14px;
      font-family: "PingFang-SC-Regular";
      color: #333333;
      line-height: 18px;
      margin: 6px 17px 7px 0px;
      span {
        color: #fe951e;
        font-weight: bold;
      }
    }
    .product_label {
      color: #fe951e;
      font-size: 11px;
      line-height: 18px;
      span {
        background-color: #fef1e3;
        padding: 6px 8px;
        border-radius: 2px;
      }
    }
    button {
      width: 70px;
      border-radius: 15px;
      height: 29px;
      line-height: 29px;
      font-size: 12px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-top: 41px;
    }
    .buttonBlue {
      background-color: #4597fb;
    }
    .buttonyellow {
      background-color: #f3b13e;
    }
  }
  .product_center {
    margin-bottom: 10px;
  }
  
}
</style>
