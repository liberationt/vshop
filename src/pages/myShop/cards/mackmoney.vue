<template>
  <div :class="productList0.length<=4? 'height product_common': 'product_common'"> 
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <div v-for="item in productList0" class="product_center" @click="goDetails(item.productCode,item.agentStatus)">
        <van-row class="clearfix">
          <van-col class="common_img">
            <img :src=item.productLogo alt="">
          </van-col>
          <van-col>
            <p class="product_top">{{item.agencyLabel}}</p>
            <p class="product_top_img">
              <img :src=item.productLeftTopPic alt="">
            </p>
            <p class="product_title">{{item.productName}}</p>
            <p class="product_money"  v-if="item.productParamShow != 0">贷款额度：  <span>{{item.amount}}</span></p>
            <p class="product_label">
              <span>{{item.rebate}}</span>
              <span>{{item.settle}}</span>
            </p>
          </van-col>
          <van-col>
            <button :class="item.agentStatus == 0 ?'buttonBlue':'buttonyellow'" @click.stop="makeMoney(item.agentStatus,item.productCode)">{{item.agentStatusName}}</button>
          </van-col>
        </van-row>  
      </div>
    </van-pull-refresh>
    <van-popup class="van_popup_text" v-model="moneyShow" :close-on-click-overlay=false>
      <div>
        <p class="product_message">确认代理后您将获得该产品 专属推广链接，是否确认？</p>
        <p class="product_radio">
          <van-radio-group v-model="radioName">
            <van-radio name="1">已阅读并同意<router-link to="/Proxyagreement"><span style="color:#4597FB;">《微店代理协议》</span></router-link></van-radio>
          </van-radio-group>
        </p>
        <p class="product_button">
          <button @click="moneyShow = false">取消</button>
          <button @click="confirm">确定</button>
        </p>
      </div>
    </van-popup>
    <footer v-if="showStatus == 1" class="footer_button" @click="yidl">
      <button>一键代理推广赚工资</button>
    </footer>
  </div>
</template>
<script>
import { statistics } from "wisdom-h5"
import { Popup, RadioGroup, Radio, Toast, Dialog } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      moneyShow: false,
      radioName: "1",
      productList0: [],
      isLoading: false,
      count: 0,
      showStatus:"",
      productCode:"",
      agentStatus:1,//我要代理
      storeStatus:""
    };
  },
  methods: {
    yidl(){
      if(!this.tanchuang()){
        return false
      }
      this.moneyShow = true
      this.agentStatus=1
    },
    // 马上赚钱
    makeMoney(num,code) {
      if(!this.tanchuang()){
        return false
      }
      // 0 我要代理 1 马上赚钱
      switch (num) {
        case 1:
          this.goDetails(code,num)
          statistics.click("magentproduct","makeMoney",{code:code})
          break;
        case 0:
          this.moneyShow = true;
          this.productCode = code
          this.agentStatus = 0
          statistics.click("magentproduct","woyaodaili",{code:code})
          break;
      }
    },
    // 跳转到详情
    goDetails(code,num) {
      if(!this.tanchuang()){
        return false
      }
      this.request("wisdom.vshop.product.queryH5ProductMarketDetail",{productCode:code,checkStatus:1}).then(data=>{
        this.$router.push({ path: "./mproductdetails?code="+code+"&num="+num+"&type="+0 });
      }).catch(err=>{console.log(err)})
    },
    Initialization(num,i) {
      this.request("wisdom.vshop.product.queryH5AgentProducts", {
        productType: num,
        pageNum: 1,
        pageSize: 50
      })
        .then(data => {
          this.showStatus = data.data.showStatus
          this.productList0 = data.data.dataList;
          this.storeStatus = data.data.storeStatus

          this.total = data.total
          if(i==1){
            Toast.success('刷新成功');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确认代理
    confirm(){
      let agentStatusData = []
      if(this.agentStatus == 0){ // 我要代理
        agentStatusData = [{productCode:this.productCode,productType:0}]
      } else {
        this.productList0.forEach(v=>{ // 一键代理
          if(v.agentStatus == 0 ){
            agentStatusData.push({productCode:v.productCode,productType:0})
          }
        })
      }
      statistics.click("magentproduct","woyaodailiqueren")
      this.request('wisdom.vshop.product.batchAgentProducts',{queryH5UserProductDetailReqList:agentStatusData}).then(data=>{
        Toast.success('代理成功');
        this.moneyShow =  false
        this.Initialization(0)
      }).catch(err=>{this.moneyShow =  false})
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.Initialization(0,1);
        this.isLoading = false;
        
      }, 500);
    },
    tanchuang(){
      if(this.storeStatus == 0){
        Dialog.confirm({
          className: 'hahahtext',
          title: '温馨提示',
          message: '您还没有创建店铺，请先编辑保存店铺信息',
          confirmButtonText:"去编辑",
        }).then(() => {
          this.$router.push({path:'./meditshop'})
        }).catch(() => {
          // on cancel
        });
        return false
      }
      return true
    },
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
    padding: 20px 8px;
    img {
      width: 70px;
      height: 70px;
      margin: 0px 10px 0px 5px;
    }
    .product_title {
      font-size: 17px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      margin-top: 11px;
    }
    .product_money {
      font-size: 14px;
      font-family: "PingFang-SC-Regular";
      color: #333333;
      line-height: 18px;
      margin: 9px 17px 0px 0px;
      span {
        color: #fe951e;
        font-weight: bold;
      }
    }
    .product_label {
      color: #fe951e;
      font-size: 11px;
      line-height: 18px;
      margin-top: 17px;
      span {
        background-color: #fef1e3;
        padding: 5px 8px 4px;
        border-radius: 2px;
        margin-right: 5px;
      }
    }
    button {
      position: absolute;
      right: 10px;
      width: 70px;
      border-radius: 15px;
      height: 29px;
      line-height: 31px;
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
    position: relative;
    .product_top{
      position: absolute;
      top: 0px;
      right: 12px;
      background:#D9EAFF;
      border-radius:0px 0px 5px 5px;
      font-size:10px;
      font-family:'PingFang SC';
      font-weight:500;
      color: #4597FB;
      text-align: center;
      padding: 0px 10px;
      line-height: 22px;
      padding-top: 4px;
    }
    .product_top_img{
      position: absolute;
      top: -8px;
      left: -6px;
      img{
        width: 35px;
        height: 35px;
      }
    }
  }
  
}
</style>
