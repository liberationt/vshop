<template>
  <div class="editshop_common pddingTop">
    <div class="edishop_fff">
      <header>
        <van-nav-bar
          title="添加/编辑自营产品"
          left-arrow
          @click-left="onGomyshop"
        />
      </header>
      <div class="editshop_center clearfix">
        <van-row class="center_list">
          <van-col span="12" style="text-align:left;" class="center_geren">个人形象照</van-col>
          <van-col span="12" style="text-align:right">
              <img :src=topImgUrl alt="">
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
          <van-col span="12" style="text-align:left" class="center_geren">微信二维码</van-col>
          <van-col span="12">
            <van-uploader :after-read="onRead" class="right">
              <img :src=wxImgurl class="right" alt="">
            </van-uploader>
          </van-col>
        </van-row>
        <van-row class="center_list">
          <div span="12" style="text-align:left">店铺介绍</div>
          <div class="left">
            <textarea class="shop_tarea" v-model="shopValue.shopIntroduce" placeholder="请填写一句话店铺介绍 ，30字内"></textarea>
          </div>
        </van-row>
      </div>
    </div>
    <footer>
      <button class="editSubmit" @click="editSubmit">确认提交</button>
    </footer>
  </div>
</template>
<script>
import {  Uploader  } from 'vant';
import utils from '../../utils/utils'
export default {
  components:{
    [Uploader.name] : Uploader 
  },
  data(){
    return {
      shopValue:{
        shopName:"",
        wxCode: "",
        shopIntroduce:"",
      },
      wxImgurl: require("./imgs/erwei ma@2x.png"),
      topImgUrl: require("./imgs/topimgf.png")
    }
  },
  methods:{
    onGomyshop(){
      this.$router.push({path:'./myshop'})
    },
    onRead(file) {
      if(file){
        this.upload(file.file).then((data)=>{
          this.wxImgurl = data.url
        }).catch(err=>{})
      }
    },
    // 确认提交
    editSubmit(){
      // 提交成功后跳转到首页
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
          float: right;
        }
      }
    }
    .shop_tarea {
      border: none;
      margin-top: 10px;
      font-size: 14px;
      color: #999;
      width: 340px;
      height: 78px;
    }
    .editSubmit {
      width: 100%;
      height: 55px;
      background-color: #4597fb;
      font-size:16px;
      color: #fff;
      position: absolute;
      bottom: 0px;
    }
  }
</style>
