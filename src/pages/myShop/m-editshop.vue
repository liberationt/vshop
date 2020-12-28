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
        <van-row class="center_list"  v-if="businessKey == 1">
          <van-col span="12" style="text-align:left;" class="center_geren">个人形象照</van-col>
          <van-col span="12" style="text-align:right">
              <img :src="shopValue.personImage? shopValue.personImage:topImgUrl" alt="">
          </van-col>
        </van-row>
        <van-row class="center_list">
          <van-col span="12" style="text-align:left">微店招牌</van-col>
          <van-col span="12" class="center_arrow" @click.native="Firma" style="text-align:right">
            {{imgData.bannerName? '修改店铺招牌' : '请选择'}} <img src='./imgs/biajidianpu.png' class="biajidianpu" alt="">
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
          <van-col span="12" style="text-align:left" class="center_geren center_geren2">微信二维码 <br> <span>{{shopValue.checkState== 0 ? "待审核" : shopValue.checkState== 1 ? "审核通过" : shopValue.checkState== 2 ? "审核拒绝" : "二维码图片保存或修改后需要审核通过前台方可正常展示"}}</span> </van-col>
          <van-col span="12">
            <img :src=wxImgurl class="right" id="img" alt="">
            <input type="file" class="fileImg" accept="image/png,image/jpg,image/jpeg" @change="change($event)">
          </van-col>
        </van-row>
        <van-row class="center_list" v-if="businessKey == 1">
          <van-col span="19" style="text-align:left" class="center_geren1">微信二维码替换 <br> 抢单侠展业海报中的二维码 </van-col>
          <van-col span="5" class="replace">
            <van-dropdown-menu>
              <van-dropdown-item v-model="isTihuan" @change="onenquiries" :options="option1" />
            </van-dropdown-menu>
            <span> <img src='./imgs/biajidianpu.png' class="replace_img" alt=""> </span>
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
    <footer v-if="zindex == 2">
      <button class="editSubmit" :class="flag? 'editSubmitB' : 'editSubmitW'" @click=" flag && editSubmit()">确认提交</button>
    </footer>
  </div>
</template>
<script>
import {  Uploader, DropdownMenu, DropdownItem  } from 'vant'
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5"
export default {
  components:{
    [Uploader.name] : Uploader,
    [DropdownMenu.name]:DropdownMenu,
		[DropdownItem.name]:DropdownItem,
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
      imgData:{},
      flag:true,
      zindex:2,
      documentHeight: document.documentElement.clientHeight,
      isTihuan:1,
      option1: [
				{ text: '替换', value: 1 },
        { text: '不替换', value: 0 },
      ],
      businessKey:""
    }
  },
  methods:{
    onGomyshop(){
      this.$router.push({path:'./myshop'})
    },
    // 招牌
    Firma(){
      utils.putlocal('shopValue',this.shopValue)
      this.isCheck()
      this.$router.push({path:'/mshopsign'})
    },
    change(event) {
      let image = document.getElementById('img'); //预览对象
      this.clip(event , {
        resultObj : image,
        aspectRatio : 1
      })
    },
    // 替换选项
    onenquiries(v){
      // console.log(v)
    },
    // 确认提交
    editSubmit(){
      if (this.shopValue.storeName.length > 20 || this.shopValue.storeName.length <=1) {
        this.$toast('请输入1-20个字的店铺名称')
        return false;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(this.shopValue.weixinNumber)) {
        this.$toast('微信号输入有误，请重新输入')
        return false;
      }
      if(utils.getlocal('weixinImg') == null){
        this.$toast('图片过大，请先处理一下！')
        return false;
      }
      if (this.shopValue.storeDesc.length > 30 || this.shopValue.storeDesc.length <=1) {
        this.$toast('请输入1-30个字的店铺介绍')
        return false;
      }
      this.flag = false
      statistics.click("meditshop","addSubmit")
      let parameter =  Object.assign(
        this.shopValue,{
          storeLogo: this.imgData.bannerUrl,
          weixinImg : utils.getlocal('weixinImg'),
          storeLogoCode : this.imgData.bannerCode,
          replaceExhibition: this.isTihuan
        }
      )
      this.request('wisdom.vshop.vshopStoreManager.updateStoreByManager',parameter).then(data=>{
        if(data.code == 'success'){
          this.flag = true
          this.$router.push({path:'./myshop'})
          localStorage.removeItem("shopValue")
          localStorage.removeItem("weixinImg")
          localStorage.removeItem("bannerData")
        } else {
          this.flag = true
        }
      }).catch(err=>{this.flag = true})

    },
    // 数据初始化
    Initialization(){
      this.request('wisdom.vshop.vshopStoreManager.getVshopStore',{}).then(data=>{
        utils.putlocal('shopValue',data.data)
        utils.putlocal('weixinImg',data.data.weixinImg)
        utils.putlocal('bannerData',data.data.storeBannerRes)
        this.fuzhi()
        this.isCheck()
      }).catch(err=>{console.log(err)})
    },
    // input监听
    onInput(){
      this.isCheck()
    },
    isCheck(){
      if(!this.imgData || this.shopValue.storeName == "" || this.shopValue.weixinNumber == "" || !this.shopValue.storeDesc){
        this.flag = false
      } else {
        this.flag = true
      }
    },
    fuzhi(){
      this.shopValue = !utils.getlocal('shopValue') ? {} : utils.getlocal('shopValue')
      this.isTihuan  = utils.getlocal('shopValue') == null ? 1 : utils.getlocal('shopValue').replaceExhibition == null  ? 1 : utils.getlocal('shopValue').replaceExhibition
      this.wxImgurl = !utils.getlocal('weixinImg') ? require("./imgs/erwei ma@2x.png") : utils.getlocal('weixinImg')
      this.imgData = !utils.getlocal('bannerData') ? {} : utils.getlocal('bannerData')
    }
  },
  mounted(){
    if(this.$route.query.id != 1){
      this.Initialization()
    }
    statistics.page("meditshop")
    this.isCheck()
    window.onresize = () => {
      return (() => {
        if(this.documentHeight>document.documentElement.clientHeight){
          this.zindex =1
        }else{
          this.zindex =2
        }
      })()
    }
    // 判断是否是信贷员
    this.businessKey = JSON.parse(utils.getCookie('user')).businessKey
  },
  created(){
    if(this.$route.query.id != 1){
      localStorage.removeItem("weixinImg")
    }
    this.fuzhi()
  }
}
</script>
<style lang="less" scoped>
  .editshop_common {
    width: 375px;
    padding-bottom: 60px;
    position: absolute;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
    .van-popup--top {
      left: 50%;
    }
    background-color: #F1F1FB;
    height: 100%;
    .edishop_fff {
      background-color: #fff;
    }
    .editshop_center {
      padding: 0px 15px;
      .center_list {
        padding: 15px 0px;
        border-bottom: 1px solid #f2f2f2;/*no*/
        font-size:14px;
        color: #000;
        .center_geren {
          height: 70px;
          line-height:70px;
        }
        .center_geren1, .center_geren2 {
          line-height: 15px;
        }
        .center_geren1 {
          line-height: 25px;
        }
        .center_geren2 {
          padding-top: 15px;
          span{
            display: inline-block;
            width: 160px;
            margin-top: 10px;
            color: #ccc;
            font-size: 11px;
          }
        }
        .replace{
          position: relative;
          font-size:14px;
          font-family:'PingFang SC';
          font-weight:500;
          color: #999;
          .replace_img{
            position: absolute;
            top: 19px;
            right: 0px;
            width: 7px;
            height: 13px;
          }
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
          margin-top: 4px;
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
      color: #333;
      width: 340px;
      height: 78px;
      margin-left: 0px;
    }
    .editSubmit {
      width: 100%;
      height: 55px;
      font-size:16px;
      color: #fff;
      position: fixed;
      bottom: 0px;
    }
    .editSubmitB{
      background-color: #4597fb;
    }
    .editSubmitW{
      background-color: #bdbfc2;
    }
    .fileImg{
      width: 70px;
      height: 70px;
      margin: 0px !important;
      position: absolute;
      right: 14px;
      opacity: 0;
    }
  }
</style>
