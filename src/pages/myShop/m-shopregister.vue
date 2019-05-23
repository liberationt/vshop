<template>
  <div class="shopregister_common">
    <header>
      <van-nav-bar
        title="我的客户"
        right-text="导出"
        left-arrow
        @click-left="goBack"
        @click-right="bounceup = true"
      />
    </header>
    <div class="shopregister_center">
      <div class="center_search">
        <van-search
          v-model="searchValue"
          placeholder="请输入姓名或手机号"
          show-action
          @focus="obtain()"
          @blur="Lose()"
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">筛选</div>
        </van-search>
      </div>
      <div class="shopregister_message">
        <van-tabs type="card">
          <div class="shopregister_tips">一键推广店铺链接</div>
          <van-tab class="shopregister_list" title="微店客户">
            <ul>
              <li v-for="item in 10">
                <div>
                  <span>请选择标签</span>
                </div>
                <div>
                  <p>2018-03-20 10:20:33</p>
                  <p>
                    <span>黎明演 136 **** 1111</span>
                    <span>短信</span>
                    <span>电话</span>
                  </p>
                </div>
              </li>
            </ul>
          </van-tab>
          <van-tab title="导入客户">内容 3</van-tab>
        </van-tabs>
      </div>
     <footer class="shopregister_footer" v-if="bounceup">
        <van-row>
          <van-col span="12" class="footer_top">确认导出（已选19）</van-col>
          <van-col span="6" class="footer_center">取消导出</van-col>
          <van-col span="6" class="footer_bottom">全选</van-col>
        </van-row>

     </footer>
    </div>
  </div>
</template>

<script>
import utils from "../../utils/utils";
import { Search, Tab, Tabs } from "vant";
export default {
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      searchValue: "",
      bounceup :false
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goBack() {
      this.$router.push({ path: "./myshop" });
    },
    //导出
    onSearch() {},
    obtain(){
      this.bounceup = false
    },
    Lose(){
      this.bounceup = true
    },
  }
};
</script>
<style scoped lang="less">
.shopregister_common {
  padding-bottom: 50px;
  padding-top: 110px;
  .center_search {
    position: fixed;
    top: 46px;
    z-index: 999;
    width: 100%;
    width: 375px;
  }
  .shopregister_tips {
    text-align: center;
    background-color: red;
    padding: 5px 0px;
    margin-top: 10px;
    border-radius: 10px;
  }
  .shopregister_message {
    padding: 0px 10px;
  }
  .shopregister_list {
    ul {
      li {
        background-color: #ccc;
        padding: 10px;
        margin-top: 10px;
      }
    }
  }
  .shopregister_footer {
    text-align: center;
    color: #fff;
    width: 375px;
    position: fixed;
    bottom: 0px;
    height: 40px;
    line-height: 40px;
    .footer_top {
      background-color: violet;
    }
    .footer_center {
      border-left: 1px solid #333;
      border-right: 1px solid #333;
      background-color: burlywood;
    }
    .footer_bottom {
      background-color: #fff;
      color: #333;
    }
  }
}
</style>