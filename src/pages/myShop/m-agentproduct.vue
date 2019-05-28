<template>
  <div class="agentproduct_common pddingTop">
    <header>
      <van-nav-bar
        title="代理产品"
        left-arrow
        @click-left="onGoback"
      />
    </header>
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <!-- <p>刷新次数: {{ count }}</p> -->
      <div class="agentproduct_center">
        <van-tabs class="vantab_center" @click="onvanTabs"  v-model="active">
          <!-- <div style="height:5px;background-color:#fff;"></div> -->
          <div class="Recommend">
            <img src="./imgs/Recommend.png" alt="">
            {{RecommendText}}
          </div>
          <div class="vantTab_center">
            <van-tab title="相关产品">
              <products></products>
            </van-tab>
            <van-tab title="信用卡">
              <cards></cards>
            </van-tab>
            <van-tab title="信贷产品">
              <instruments></instruments>
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
import { Tab, Tabs } from 'vant';
import products from './cards/products.vue'
import cards from './cards/cards.vue'
import instruments from './cards/instruments.vue'
import { Toast } from 'vant';
export default {
  components:{
    products,
    cards,
    instruments,
    [Tab.name] : Tab,
    [Tabs.name] : Tabs
    
  },
  data(){
    return{
      active:0,
      RecommendText:'推荐他人贷款申请成功，更多佣金等你拿',
      count: 0,
      isLoading: false
    }
  },
  methods:{
    onGoback(){
      this.$router.push({path:'./myshop'})
    },
    onvanTabs(v){
      console.log(v)
      switch(v){
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
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        Toast.success('刷新成功');
        this.count++;
        this.isLoading = false;
        
      }, 500);
    }
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
  .footer_button{
    button {
      width: 375px;
      height: 52px;
      line-height: 52px;
      background-color: #4597fb;
      font-size:16px;
      font-weight:bold;
      position: fixed;
      bottom: 0px;
      color:rgba(255,255,255,1);
    }
  }
}
</style>
