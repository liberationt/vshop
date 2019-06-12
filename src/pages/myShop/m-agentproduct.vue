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
            <van-tab title="相关产品">
              <products ref="mychild"></products>
            </van-tab>
            <van-tab title="信用卡">
              <cards ref="mychild"></cards>
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
import cards from './cards/cards.vue'
import instruments from './cards/instruments.vue'
export default {
  components:{
    products,
    cards,
    instruments,
    [Tab.name] : Tab,
    [Tabs.name] : Tabs,
  },
  data(){
    return{
      active:0,
      RecommendText:'推荐他人贷款申请成功，更多佣金等你拿',
    }
  },
  methods:{
    onGoback(){
      this.$router.push({path:'./myshop'})
    },
    onvanTabs(v){
      this.switch(v)
    },
    switch (key) {
      switch(key){
        case 0:
          this.RecommendText='推荐他人贷款申请成功，更多佣金等你拿'
        break;
        case 1:
          this.RecommendText='推荐办卡核卡成功后最高可返100元'
        break;
        case 2:
          this.RecommendText='推荐他人使用查询工具，轻松拿返佣'
        break;
      }
    },
    
  },
  mounted(){
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
      line-height: 40px;
      font-size:13px;
      color:rgba(254,149,30,1);
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
      background-color: #F1F1FB;
      padding: 15px 15px;
      padding-bottom: 62px;
    }
  }
  
}
</style>
