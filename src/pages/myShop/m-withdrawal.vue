<template>
  <div class="mwithdrawal_common pddingTop" :class="{heightCommon: shopPapplyList.length <=3}">
    <header>
      <van-nav-bar
        title="提现记录"
        left-arrow
        @click-left="onGoback"
      />
    </header>
    <!-- <p>刷新次数: {{ count }}</p> -->
    <div class="mshopapply_center">
      <van-tabs class="vantab_center" @click="onvanTabs"  v-model="active">
        <div class="vantTab_center">
          <van-tab title="待审核"></van-tab>
          <van-tab title="已审核"></van-tab>
          <van-tab title="提现失败"></van-tab>
          <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
            <div class="loanFacility_common"> 
              <div class="with_center" @click="goDetails(item.userDetailStatus,item.userCode)" v-for="item in shopPapplyList">
                <van-row class="van-row">
                  <van-col span="8">提现编号</van-col> 
                  <van-col span="16">{{item.customerOrderNo}}</van-col> 
                </van-row  class="van-row">  
                <van-row class="van-row">
                  <van-col span="8">申请时间</van-col> 
                  <van-col span="16">{{item.applyTime}}</van-col> 
                </van-row>  
                <van-row class="van-row">
                  <van-col span="8">提现金额</van-col> 
                  <van-col span="16">{{item.amount}}元</van-col> 
                </van-row>  
                <van-row class="van-row">
                  <van-col span="8">申请状态</van-col> 
                  <van-col span="16" :class="active == 0 ?'He' : active == 1 ?'Lv' : 'wr'">{{item.withdrawDesc}}</van-col> 
                </van-row>  
              </div>
            </div>
          </van-pull-refresh>
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
  Progress
} from "vant";
import loanFacility from "./ordertools/loanFacility.vue";
export default {
  components: {
    loanFacility,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [Progress.name]: Progress
  },
  data() {
    return {
      active: 0,
      count: 0,
      isLoading: false,
      shopPapplyList: []
    };
  },
  mounted() {
    console.log(this.$refs.hahah);
    this.Initialization(1);
  },
  methods: {
    onGoback() {
      this.$router.push({ path: "./myshop" });
    },
    onvanTabs(v) {
      this.Initialization(1);
    },
    onRefresh() {
      setTimeout(() => {
        this.Initialization(1);
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 跳转到详情
    goDetails(code, userCode) {
      if (code == 1) {
        this.$router.push({ path: "./muserdetails?code=" + userCode });
      }
    },
    Initialization(i) {
      this.request("wisdom.vshop.withdraw.getCashRecordListByTab", {
        recordType: this.active,
        pageNum: i,
        pageSize: 10,
      })
        .then(data => {
          this.shopPapplyList = data.data
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.mwithdrawal_common {
  background-color: #f1f1fb;
  .Lv{
    color: #3DD624;
  }
  .Wr{
    color: #FF514C;
  }
  .He {
    color: #333333;
  }
  .van-row{
    line-height: 28px;
  }
  .with_center {
    padding: 10px 0px;
    background-color: #fff;
    margin-top: 8px;
    padding-left: 16px;
    font-size: 14px;
    color: #333;
  }
  display: block;
  .mshopapply_center {
    height: 50px;
    line-height: 50px;
    .vantTab_center {
      background-color: #f1f1fb;
      padding-bottom: 62px;
    }
  }
}
</style>
