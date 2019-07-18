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
            <div class="loanFacility_common"> 
              <!-- 下拉加载 -->
              <van-list
                class="xialashuaxin"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div @click="goDetails(item.userDetailStatus,item.userCode)" v-for="item in shopPapplyList" class="loanFacility_center">
                  <van-row>
                    <van-col>
                      <img :src=item.productLogo alt="">
                    </van-col>
                    <van-col>
                      <p class="product_one">{{item.productName}}</p>
                      <p class="product_two"> <span class="product_two_span">{{item.userName}}</span>  <span>{{item.userPhoneEncrypt}}</span> <span @click="gopone(item.userPhone)"><img src="./imgs/phone _icon2@2x.png" alt=""></span></p>
                      <p class="product_three" v-if="item.orderStatus == 2">结算金额：<span class="product_three1">{{item.commission}}</span></p>
                      <p class="product_three">申请时间：<span class="product_three1">{{item.dataCreateTime}}</span></p>
                      <p class="product_three" v-if="item.orderStatus == 2">结算时间：<span class="product_three1">{{item.settleDate}}</span></p>
                    </van-col>
                    <van-col class="right  van-col_right" :class="item.orderStatus ==2 ?'buttonAsh' : item.orderStatus ==0 ? 'buttonBlue' : 'buttonYellow'" >
                      {{item.orderStatusDesc}}
                    </van-col>  
                  </van-row>  
                </div>
              </van-list>
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
        </div>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import {
  Tab,
  Tabs,
  Search,
  DropdownMenu,
  DropdownItem,
  Popup,
  RadioGroup,
  Radio,
  Progress,
  List
} from "vant";
import loanFacility from "./ordertools/loanFacility.vue";
import { statistics } from "wisdom-h5"
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
    [List.name]: List
  },
  data() {
    return {
      active: 0,
      RecommendText: "请尽快协助客户完成整个申领流程",
      count: 0,
      orderStatus: "''",
      option1: [
        { text: "所有状态", value: "''" },
        { text: "未结算", value: 0 },
        { text: "已结算", value: 2 },
        { text: "已失效", value: 3 }
      ],
      moneyShow: false,
      radioName: "",
      shopPapplyList: [],
      nameOphone: "",
      loading: false,
      finished: false,
      total:"",
      pageNum:1
    };
  },
  mounted() {
    // this.Initialization();
    statistics.page("mshopapply0")
  },
  methods: {
    gopone(phone){
      window.location.href = "tel://" + phone;
    },
    changeMenu() {
      this.pageNum = 1
      this.shopPapplyList = [] // 数据初始化
      this.Initialization(1);
    },
    parentMethod() {
      // this.$refs.loanFacility.makeMoney(); //过this.$refs.ref.method调用
    },
    onGoback() {
      this.$router.push({ path: "./myshop" });
    },
    onvanTabs(v) {
      this.pageNum = 1
      this.shopPapplyList = [] // 数据初始化
      this.Initialization(1);
      statistics.page("mshopapply"+v)
    },
    search() {
      this.pageNum = 1
      this.shopPapplyList = []
      this.Initialization(1);
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.Initialization(1)
      }, 500);
    },
    // 跳转到详情
    goDetails(code, userCode) {
      if (code == 1) {
        this.$router.push({ path: "./muserdetails?code=" + userCode });
      }
    },
    Initialization(i) {
      this.request("wisdom.vshop.productOrder.queryPageListByType", {
        queryStr: this.nameOphone,
        productType: this.active,
        pageNum: this.pageNum,
        pageSize: 10,
        orderStatus: this.orderStatus == "''" ? "" : this.orderStatus
      })
        .then(data => {
          let dataList = data.data.dataList
          this.loading = false
          if (Number(dataList.length) <= 0) {
            this.finished = true
            this.loading = false
            return false
          }
          if(i == 1){
            this.shopPapplyList = [] // 数据初始化
          }
          // if(data.data.total > 10){
          //   this.finished = false
          //   this.loading = false
          // }
          this.shopPapplyList = this.shopPapplyList.concat(dataList)
          this.pageNum++
          this.total = data.data.total
          this.finished = false
          
          console.log(this.shopPapplyList)
        })
        .catch(err => {
          console.log(err);
        });
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
      // color: #aaaaaa;
      line-height: 34px;
      border-radius: 17px;
      position: relative;
      input {
        background: #eeeeee;
        border-radius: 17px;
        text-indent: 20px;
        width: 90%;
        padding-left: 10px;
      }
      img {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 10px;
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
      line-height: 44px;
      font-size: 13px;
      color: rgba(254, 149, 30, 1);
      // margin-top: 5px;
      img {
        width: 15px;
        height: 16px;
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
  .van-col_right {
    height: 22px;
    width: 60px;
    border-radius: 3px;
    line-height: 22px;
    font-size: 12px;
    // font-weight: bold;
    text-align: center;
    position: absolute;
    right: 25px;
    // top: 15px;
  }
  .buttonBlue {
    border: 1px solid #4597fb; /*no*/
    color: #4897ff;
    background-color: #e3effe;
  }
  .buttonAsh {
    border: 1px solid #cfcfcf; /*no*/
    color: #999999;
    background-color: #eeeeee;
  }
  .buttonYellow {
    border: 1px solid #fe951e; /*no*/
    color: #fe951e;
    background-color: #fef1e3;
  }
  /deep/ .loanFacility_center {
    background-color: #fff;
    width: 345px;
    border-radius: 5px;
    padding: 19px 15px;
    .van-row {
      img {
        width: 70px;
        height: 70px;
        margin-right: 15px;
        border-radius: 4px;
      }
      line-height: 26px;
      .product_one {
        width: 160px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-top: -2px;
      }
      .product_two {
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        span{
          display: inline-block;
          vertical-align: middle;
        }
        img{
          width: 15px;
          height: 15px;
          margin-bottom: 4px;
          margin-left: 5px;
        }
        .product_two_span{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 60px;
        }
      }
      .product_three {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        color: rgba(153, 153, 153, 1);
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
