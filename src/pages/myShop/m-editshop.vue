<template>
  <div class="editshop_common">
    <div class="edishop_fff">
      <header>
        <van-nav-bar
          title="编辑店铺"
          left-arrow
          @click-left="onGomyshop"
        />
      </header>
      <div class="editshop_center">
        <van-row class="center_list">
          <van-col span="12" style="text-align:left;" class="center_geren">个人形象照</van-col>
          <van-col span="12" style="text-align:right">
            <img src="./imgs/topimgf.png" alt="">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">微店招牌</van-col>
          <van-col span="12" class="center_arrow" style="text-align:right">
            <router-link to="mshopsign">未选择 <img src="./imgs/biajidianpu.png" class="biajidianpu" alt=""></router-link>
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">店铺名称</van-col>
          <van-col span="12">
            <input type="text" v-model="shopValue.shopName" placeholder="请填写店铺名称">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">微信号</van-col>
          <van-col span="12">
            <input type="text" v-model="shopValue.wxCode" placeholder="请填写微信号">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">微信二维码</van-col>
          <van-col span="12">
            <input type="text" placeholder="请上传微信二维码图片">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">店铺介绍</van-col>
          <van-col span="12">
            <input type="text" placeholder="">
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
import { Row, Col  } from 'vant';
export default {
  components:{
    [Row.name] : Row,
    [Col.name] : Col
  },
  data(){
    return {
      shopValue:{
        shopName:"",
        wxCode: ""
      }
    }
  },
  methods:{
    onGomyshop(){
      this.$router.push({path:'./myshop'})
    }
  }
}
</script>
<style lang="less" scoped>
  .editshop_common {
    background-color: #F1F1FB;
    height: 100%;
    .edishop_fff {
      background-color: #fff;
    }
    .editshop_center {
      padding: 0px 15px;
      .center_list {
        padding: 15px 0px;
        border-bottom: 1px solid #E7E7E7;/*no*/
        font-size:14px;
        color: #000;
        .center_geren {
          height: 70px;
          line-height:70px;
        }
        .center_arrow ,input::-webkit-input-placeholder , a{
          color: #999999;
        }
        .biajidianpu {
          width: 7px;
          height: 13px;
          margin: 0px 0px 2px 10px;
        }
        img {
          width: 70px;
          height: 70px;
        }
        input {
          text-align: right;
          color: #333;
        }
      }
    }
  }
</style>
