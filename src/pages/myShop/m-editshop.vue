<template>
  <div class="editshop_common pddingTop">
    <div class="edishop_fff">
      <header>
        <van-nav-bar
          title="编辑店铺"
          left-arrow
          @click-left="onGomyshop"
        />
      </header>
      <div class="editshop_center clearfix">
        <van-row class="center_list">
          <van-col span="12" style="text-align:left;" class="center_geren">个人形象照</van-col>
          <van-col span="12" style="text-align:right">
              <img :src="shopValue.personImage? shopValue.personImage:topImgUrl" alt="">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">微店微店招牌</van-col>
          <van-col span="12" class="center_arrow" style="text-align:right">
            <router-link to="mshopsign">{{shopValue.storeLogoName? '修改店铺招牌' : '请选择'}} <img src='./imgs/biajidianpu.png' class="biajidianpu" alt=""></router-link>
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">店铺名称</van-col>
          <van-col span="12">
            <input type="text" @input="onInput" v-model="shopValue.storeName" placeholder="请填写店铺名称">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">微信号</van-col>
          <van-col span="12">
            <input type="text" @input="onInput" v-model="shopValue.weixinNumber" placeholder="请填写微信号">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left" class="center_geren">微信二维码</van-col>
          <van-col span="12">
            <van-uploader :after-read="onRead" class="right">
              <img :src="weixinImg ===''? wxImgurl : weixinImg" class="right" alt="">
            </van-uploader>
          </van-col>
        </van-row>
        <van-row class="center_list">
          <div span="12" style="text-align:left">店铺介绍</div>
          <div class="left">
            <textarea class="shop_tarea" @input="onInput" v-model="shopValue.storeDesc" placeholder="请填写一句话店铺介绍 ，30字内"></textarea>
          </div>
        </van-row>
      </div>
    </div>
    <footer>
      <button class="editSubmit" :class="flag? 'editSubmitB' : 'editSubmitW'" @click=" flag && editSubmit()">确认提交</button>
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
        storeName:"",
        weixinNumber: "",
        storeDesc :"",
      },
      wxImgurl: require("./imgs/erwei ma@2x.png"),
      topImgUrl: require("./imgs/topimgf.png"),
      userMessage: utils.getCookie('userMeaasge'),
      imgData:utils.getlocal('bannerData'),
      weixinImg:'',
      flag:true,
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
          this.weixinImg = data.url
          this.isCheck()// 校验
        }).catch(err=>{})
      }
    },
    // 确认提交
    editSubmit(){
      // 提交成功后跳转到首页
      if (!/^[\u4E00-\u9FA5]{2,20}$/.test(this.shopValue.storeName)) {
        this.$toast('店铺名称输入有误，请重新输入')
        return false;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(this.shopValue.weixinNumber)) {
        this.$toast('微信号输入有误，请重新输入')
        return false;
      }
      console.log(this.shopValue.storeDesc.length)
      if (this.shopValue.storeDesc.length > 30 || this.shopValue.storeDesc.length <=1) {
        this.$toast('请输入1-30个字的店铺介绍')
        return false;
      }
      this.flag = false
      let parameter =  Object.assign(
        this.shopValue,{
          storeLogo: this.imgData.bannerUrl,
          weixinImg : this.weixinImg,
          storeLogoCode : this.imgData.bannerCode
        }
      )
      console.log()
      this.request('wisdom.vshop.vshopStoreManager.updateStoreByManager',parameter).then(data=>{
        this.flag = true
        this.$router.push({path:'./myshop'})
      }).catch(err=>{console.log(err)})

    },
    // 数据初始化
    Initialization(){
      this.request('wisdom.vshop.vshopStoreManager.getVshopStore',{}).then(data=>{
        this.shopValue = data.data
        this.weixinImg = data.data.weixinImg
        if(this.$route.query.id != 1){
          utils.putlocal('bannerData',data.data.storeBannerRes)
        }
        this.isCheck()
      }).catch(err=>{console.log(err)})
    },
    // input监听
    onInput(){
      this.isCheck()
    },
    isCheck(){
      if(!this.imgData || this.shopValue.storeName == "" || this.shopValue.weixinNumber == "" ||this.weixinImg == "" || this.shopValue.storeDesc == ""){
        this.flag = false
      } else {
        this.flag = true
      }
      console.log(this.flag,this.weixinImg,'====')
    }
  },
  mounted(){
    this.Initialization()
    
    console.log(this.weixinImg)
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
      font-size:16px;
      color: #fff;
      position: absolute;
      bottom: 0px;
    }
    .editSubmitB{
      background-color: #4597fb;
    }
    .editSubmitW{
      background-color: #bdbfc2;
    }
  }
</style>
