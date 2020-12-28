<template>
  <div class="agentproduct_common pddingTop">
    <header>
      <van-nav-bar
        title="代理产品"
        left-arrow
        @click-left="onGoback"
      />
    </header>
      <div class="agentproduct_center">
        <van-tabs class="vantab_center" @click="onvanTabs"  v-model="active">
          <div class="Recommend">
            <img src="./imgs/Recommend.png" alt="">
            {{RecommendText}}
          </div>
          <div class="vantTab_center">
            <van-tab title="更多产品">
              <products ref="mychild"></products>
            </van-tab>
            <van-tab title="贷款产品">
              <mackmoney ref="mychild"></mackmoney>
            </van-tab>
            <van-tab title="信贷工具">
              <instruments ref="mychild"></instruments>
            </van-tab>
          </div>
        </van-tabs>
      </div>
  </div>
</template>
<script>
import { Tab, Tabs } from 'vant';
import products from './cards/products.vue'
import mackmoney from './cards/mackmoney.vue'
import instruments from './cards/instruments.vue'
import { statistics } from "wisdom-h5"
export default {
  components:{
    products,
    mackmoney,
    instruments,
    [Tab.name] : Tab,
    [Tabs.name] : Tabs,
  },
  data(){
    return{
      active:0,
      RecommendText:'多种产品任你选，推荐好友加入，赚取更多佣金分红',
    }
  },
  methods:{
    onGoback(){
      this.$router.push({path:'./myshop'})
    },
    onvanTabs(v){
      this.switch(v)
      statistics.page("magentproduct"+v)
    },
    switch (key) {
      switch(key){
        case 0:
          this.RecommendText='多种产品任你选，推荐好友加入，赚取更多佣金分红'
        break;
        case 1:
          this.RecommendText='多种产品任你选，推荐好友加入，赚取更多佣金分红'
        break;
        case 2:
          this.RecommendText='推荐他人使用查询工具，轻松拿返佣'
        break;
      }
    },
    
  },
  mounted(){
    statistics.page("magentproduct0")
  }
}
</script>
<style lang="less" scoped>
.agentproduct_common {
  display: block;
  .agentproduct_center {
    .Recommend {
      width:375px;
      height:40px;
      background:rgba(254,241,227,1);
      line-height: 46px;
      font-size:13px;
      color:rgba(254,149,30,1);
      margin-top: 5px;
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
      background-color: #F1F1FB;
      padding: 15px 15px;
      padding-bottom: 62px;
    }
  }
  
}
</style>
