<template>
  <div class="mshopapply_common pddingTop" :class="{heightCommon: !shopPapplyList || shopPapplyList.length<=3}" >
    <header>
      <van-nav-bar
        title="微店订单"
        left-arrow
        @click-left="onGoback"
      />
    </header>
    <!-- <p>刷新次数: {{ count }}</p> -->
    <div class="mshopapply_center">
      <van-tabs class="vantab_center" @click="onvanTabs"  v-model="active">
        <div class="search">
          <van-row>
            <van-col span="18" class="inputserch">
              <input type="text" v-model="nameOphone" placeholder="请输入姓名或手机号">
              <div @click="search"><img src="./imgs/sousuo.png" alt=""></div>
            </van-col>
            <van-dropdown-menu>
              <van-dropdown-item @change="changeMenu" v-model="orderStatus" :options="option1" />
            </van-dropdown-menu>
          </van-row>
        </div>
        <div class="Recommend">
          <img src="./imgs/Recommend.png" alt="">
          {{RecommendText}}
        </div>
        <div class="vantTab_center">
          <van-tab title="贷款申请"></van-tab>
          <van-tab title="信用卡申请"></van-tab>
          <van-tab title="实用工具"></van-tab>
          <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
            <div class="loanFacility_common"> 
              <div class="loanFacility_center" @click="goDetails(item.userDetailStatus,item.userCode)" v-for="item in shopPapplyList">
                <div>
                  <van-row>
                    <van-col>
                      <img :src=item.productLogo alt="">
                    </van-col>
                    <van-col>
                      <p class="product_one">{{item.productName}}</p>
                      <p class="product_two"> <span>{{item.userName}}</span> &nbsp&nbsp&nbsp <span>{{item.userPhoneEncrypt}}</span></p>
                      <p class="product_three" v-if="item.orderStatus == 2">结算金额：{{item.commission}}</p>
                      <p class="product_three">申请时间：{{item.dataCreateTime}}</p>
                      <p class="product_three" v-if="item.orderStatus == 2">结算时间：{{item.settleDate}}</p>
                    </van-col>
                    <van-col class="right  van-col_right" :class="item.orderStatus ==2 ?'buttonAsh' : item.orderStatus ==0 ? 'buttonBlue' : 'buttonYellow'" >
                      {{item.orderStatusDesc}}
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
                      <van-radio name="1">已阅读并同意<router-link to="/Proxyagreement"><span style="color:#4597FB;">《微店代理协议》</span></router-link></van-radio>
                    </van-radio-group>
                  </p>
                  <p class="product_button">
                    <button @click="moneyShow = false">取消</button>
                    <button @click="">确定</button>
                  </p>
                </div>
              </van-popup>
            </div>
          </van-pull-refresh>
        </div>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs, Search, DropdownMenu, DropdownItem, Popup, RadioGroup, Radio, Progress  } from "vant";
import loanFacility from "./ordertools/loanFacility.vue";
export default {
  components: {
    loanFacility,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Progress.name]: Progress,
  },
  data() {
    return {
      active: 0,
      RecommendText: "请尽快协助客户完成整个申领流程",
      count: 0,
      isLoading: false,
      orderStatus: "''",
      option1: [
        { text: "所有状态", value: "''" },
        { text: "未结算", value: 0 },
        { text: "已结算", value: 2 },
        { text: "已失效", value: 3 }
      ],
      moneyShow: false,
      radioName: "",
      shopPapplyList:{},
      nameOphone:""
    };
  },
  mounted() {
    this.Initialization(1)
  },
  methods: {
    changeMenu(){
      this.Initialization(1)
    },
    parentMethod() {
      // this.$refs.loanFacility.makeMoney(); //过this.$refs.ref.method调用
    },
    onGoback() {
      this.$router.push({ path: "./myshop" });
    },
    onvanTabs(v) {
      this.Initialization(1)
    },
    search() { this.Initialization(1) },
    onRefresh() {
      setTimeout(() => {
        this.Initialization(1)
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 跳转到详情
    goDetails(code,userCode) {
      if(code == 1){
        this.$router.push({ path: "./muserdetails?code="+userCode });
      }
    },
    Initialization(i){
      this.request("wisdom.vshop.productOrder.queryPageListByType",{queryStr :this.nameOphone,productType:this.active, pageNum:i,pageSize:10,orderStatus:this.orderStatus == "''"?"":this.orderStatus}).then(data=>{
        console.log(data)
        this.shopPapplyList = data.data.dataList
      }).catch(err=>{console.log(err)})
    }
  }
};
</script>
<style lang="less" scoped>
.mshopapply_common {
  display: block;
  background-color: #f1f1fb;
  .search {
    background: #ffffff;
    padding: 8px 15px;
    .inputserch {
      background: #eeeeee;
      height: 34px;
      font-size: 12px;
      color: #aaaaaa;
      line-height: 34px;
      border-radius: 17px;
      position: relative;
      input {
        background: #eeeeee;
        border-radius: 17px;
        text-indent: 20px;
        width: 90%;
      }
      img {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 15px;
        bottom: 9px;
      }
    }
    .inputserch_img {
      font-size: 14px;
      color: #333;
      line-height: 34px;
      padding-left: 10px;
      img {
        width: 11px;
        height: 6px;
        margin-left: 4px;
        margin-bottom: 2px;
      }
    }
  }
  .mshopapply_center {
    .Recommend {
      width: 375px;
      height: 40px;
      background: rgba(254, 241, 227, 1);
      line-height: 40px;
      font-size: 13px;
      color: rgba(254, 149, 30, 1);
      margin-top: 5px;
      img {
        width: 15px;
        height: 15px;
        vertical-align: middle;
        margin: 0px 10px 2px 15px;
      }
    }
    height: 50px;
    line-height: 50px;
    .vantTab_center {
      background-color: #f1f1fb;
      padding: 15px 15px;
      padding-bottom: 62px;
    }
  }
}
.loanFacility_common {
    .van-col_right{
      height: 22px;
      width: 60px;
      border-radius:3px;
      line-height: 22px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      position: absolute;
      right: 15px;
      // top: 15px;
    }
  .buttonBlue {
    border: 1px solid #4597FB;/*no*/
    color: #4897FF;
    background-color: #E3EFFE;
  }
  .buttonAsh {
    border: 1px solid #CFCFCF;/*no*/
    color: #999999;
    background-color: #EEEEEE;
  }
  .buttonYellow {
    border: 1px solid #FE951E;/*no*/
    color: #FE951E;
    background-color: #FEF1E3;
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
        line-height: 18px;
      }
      .buttonyellow {
        background-color: #f3b13e;
      }
    }
    margin-bottom: 10px;
  }
}
</style>
