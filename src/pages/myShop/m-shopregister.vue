<template>
  <div class="shopregister_common">
    <header>
      <van-nav-bar
        title="我的客户"
        right-text="导出"
        left-arrow
        @click-left="goBack"
        @click-right="exportPhoneNum"
      />
    </header>
    <div class="shopregister_center">
      <div class="center_search">
        <van-search
          v-model="searchValue"
          placeholder="请输入姓名或手机号"
          show-action
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
              <li>
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
     
    </div>
  </div>
</template>

<script>
import { Search, Tab, Tabs } from 'vant';
export default {
  components:{
    [Search.name] : Search,
    [Tab.name] : Tab,
    [Tabs.name] : Tabs,
  },
  data() {
    return {
      searchValue: ""
    };
  },
  methods: {
    goBack(){this.$router.push({path:'./myshop'})},
    //导出
    exportPhoneNum(){},
    onSearch(){}
  }
};
</script>
<style scoped lang="less">
.shopregister_common {
  .shopregister_tips{
    text-align: center;
    background-color: red;
    padding: 5px 0px;
    margin-top: 10px;
  }
  .shopregister_message {
    padding:  0px 10px;
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
}

</style>