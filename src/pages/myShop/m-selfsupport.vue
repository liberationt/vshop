<template>
  <div class="mselfsupport_common pddingTop"  :class="{heightCommon: selfsupportList.length<=5}">
    <header>
      <van-nav-bar
        title="自营产品"
        left-arrow
        @click-left="ongobanck"
      />
    </header>
    <!-- <div class="mselfsupport_center"> -->
      <!-- 下拉加载 -->
      <van-list
        class="xialashuaxin mselfsupport_center"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in selfsupportList" class="mselfsupport_modal" @click="goShopdetails(item.proprietaryProductCode)">
          <van-row>
            <van-col :span="5">
              <img :src=item.productLogo alt="">
            </van-col>
            <van-col class="span_padding" :span="19">
              <p class="modal_text">{{item.productName}}</p>
              <p>综合月利率：<span class="modal_color">{{item.productRate}}</span></p>
              <p>贷款额度：<span class="modal_color">{{item.limitMin+'-'+item.limitMax}}</span></p>
            </van-col>
          </van-row>
        </div>
      </van-list>
    <!-- </div> -->
    <footer class="mselfsupport_footer" @click="addproduct">
      添加自营产品
    </footer>
  </div>
</template>
<script>
import {List} from 'vant'
import { statistics } from "wisdom-h5"
export default {
  components:{
    [List.name]: List
  },
  data() {
    return {
      count: 0,
      selfsupportList:[],
      loading: false,
      finished: false,
      pageNum:1
    };
  },
  methods: {
    ongobanck() {
      this.$router.push({ path: "./myshop" });
    },
    addproduct() {
      statistics.click("mselfsupport","tianjiapproduct")
      this.$router.push({ path: "./maddproduct?isAdd="+'is' });
    },
    goShopdetails(code){
      this.$router.push({ path: "./mselfshopdetails?code="+code });
    },
    // 上拉加载
    onLoad(){
      setTimeout(() => {
        this.Initialization()
      }, 500);
    },
    Initialization(i){
      this.request("wisdom.vshop.proprietaryProduct.queryH5Page",{pageSize:10,pageNum:this.pageNum}).then(data=>{
        let dataList = data.data.dataList
        this.loading = false
        if (Number(dataList.length) <= 0) {
          this.finished = true
          this.loading = false
          return false
        }
        this.selfsupportList = this.selfsupportList.concat(dataList)
        this.pageNum++
        this.total = data.data.total
      }).catch(err=>{console.log(err)})
    },
  },
  created(){
    this.Initialization(1)
  },
  mounted(){
    statistics.page("mselfsupport")
  }
};
</script>
<style lang="less" scoped>
.mselfsupport_common {
  background-color: #f1f1fb;
  padding-bottom: 60px;
  padding-top: 60px;
  .mselfsupport_center{
    /deep/ .mselfsupport_modal {
      font-size:14px;
      font-family:PingFang-SC-Regular;
      color: #999999;
      width: 345px;
      margin: 0 auto;
      background-color: #fff;
      padding: 13px 15px 15px 15px;
      border-radius:5px;
      line-height: 23px;
      margin-bottom: 10px;
      .span_padding {
        padding-left: 12px;
      }
      .modal_text{
        color: #333333;
        font-size:17px;
        font-weight:bold;
        
      }
      .modal_color {
        color: #FE951E;
        font-weight:bold;
      }
      img{
        width: 60px;
        height: 60px;
        margin-right: 15px;
        border-radius: 5px;
      }
    }
  }
  .mselfsupport_footer {
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: bold;
    text-align: center;
    color: #fff;
    width: 375px;
    height: 50px;
    background: rgba(69, 151, 251, 1);
    box-shadow: 0px 0px 5px 0px rgba(69, 151, 251, 0.15);
    line-height: 50px;
    position: fixed;
    bottom: 0px;
  }
}
</style>

