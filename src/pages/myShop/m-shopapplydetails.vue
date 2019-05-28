<template>
  <div class="mshopapplydetails_common pddingTop">
    <header>
      <van-nav-bar
        title="订单详情"
        left-arrow
        @click-left="onGoback"
      />
    </header>
    <van-row class="mshopapplydetails_center">
      <van-col class="mshopapplydetails_one">李明艳</van-col>
      <van-col class="mshopapplydetails_two">
        <span><img src="./imgs/phone _icon@2x.png" alt=""></span>
        <span>13*****2899</span>
      </van-col>
      <van-col class="mshopapplydetails_three"><img src="./imgs/advance_icon@2x.png" alt=""></van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return{

    }
  },
  methods:{
    onGoback(){
      this.$router.push({ path: "./mshopapply" });
    }
  }
};
</script>

<style lang="less" scoped>
.mshopapplydetails_common {
  background-color: #f1f1fb;
  height: 100%;
  .mshopapplydetails_center{
    height: 44px;
    line-height: 44px;
    font-size:15px;
    color: #333333;
    background-color: #fff;
    .mshopapplydetails_one{
      font-size:15px;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      margin: 0px 66px 0px 15px;
    }
    .mshopapplydetails_two{
      font-family:PingFang-SC-Medium;
      font-weight:bold;
      img{
        width: 22px;
        height: 22px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .mshopapplydetails_three{
      margin-left: 99px;
      img{
        width: 12px;
        height: 21px;
      }
    }
  }
}
</style>
