<template>
  <div class="mshopapply_common pddingTop">
    <header>
      <van-nav-bar
        title="微店订单"
        left-arrow
        @click-left="onGoback"
      />
    </header>
    <van-pull-refresh class="xilashuaxin" v-model="isLoading" @refresh="onRefresh">
      <!-- <p>刷新次数: {{ count }}</p> -->
      <div class="mshopapply_center">
        <van-tabs class="vantab_center" @click="onvanTabs"  v-model="active">
          <div class="search">
            <van-row>
              <van-col span="18" class="inputserch">
                <input type="text" placeholder="请输入姓名或手机号">
							  <div @click="search"><img src="./imgs/sousuo.png" alt=""></div>
              </van-col>
              <van-dropdown-menu>
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
              <!-- <van-col span="6" class="inputserch_img">所有状态 <img src="./imgs/pull-down@2x.png" alt=""> </van-col> -->
            </van-row>
					</div>
          <div class="Recommend">
            <img src="./imgs/Recommend.png" alt="">
            {{RecommendText}}
          </div>
          <div class="vantTab_center">
            <van-tab @click="parentMethod" title="贷款申请">
              <loanFacility ref="loanFacility"></loanFacility>
            </van-tab>
            <van-tab title="信用卡申请">
              <loanFacility></loanFacility>
            </van-tab>
            <van-tab title="实用工具">
              <loanFacility></loanFacility>
            </van-tab>
          </div>
        </van-tabs>
      </div>
    </van-pull-refresh>
    <footer class="footer_button">
      <button>一键代理推广赚工资</button>
    </footer>
  </div>
</template>
<script>
import { Tab, Tabs, Search, DropdownMenu, DropdownItem } from "vant";
import loanFacility from "./ordertools/loanFacility.vue";
export default {
  components: {
    loanFacility,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },
  data() {
    return {
      active: 0,
      RecommendText: "请尽快协助客户完成整个申领流程",
      count: 0,
      isLoading: false,
      value1: 0,
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ]
    };
  },
  mounted() {
    console.log(this.$refs.hahah);
  },
  methods: {
    parentMethod() {
      this.$refs.loanFacility.makeMoney(); //过this.$refs.ref.method调用
    },
    onGoback() {
      this.$router.push({ path: "./myshop" });
    },
    onvanTabs(v) {
      console.log(v);
    },
    search() {},
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>
<style lang="less" scoped>
.mshopapply_common {
  display: block;
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
  .footer_button {
    button {
      width: 375px;
      height: 52px;
      line-height: 52px;
      background-color: #4597fb;
      font-size: 16px;
      font-weight: bold;
      position: fixed;
      bottom: 0px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
