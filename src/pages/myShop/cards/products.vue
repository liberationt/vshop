<template>
  <div :class="productList0.length<=4? 'height product_common1': 'product_common1'"> 
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <div v-for="item in productList0" class="product_center" @click="goDetails(item.productCode,item.agentStatus,item.productType)">
        <van-row class="clearfix">
          <div class="left common_img">
            <img :src=item.productLogo alt="">
          </div>
          <div class="left common_left">
            <p class="product_top">{{item.agencyLabel}}</p>
            <p class="product_top_img">
              <img :src=item.productLeftTopPic alt="">
            </p>
            <p class="product_title" :class="item.productType == 2 || (item.productParamShow == 1 && item.productType == 0)? '' :  'product_title1'">{{item.productName}}</p>
            <p class="product_money" v-if="item.productParamShow == 1 && item.productType == 0">贷款额度：  <span>{{item.amount}}</span></p>
            <p class="product_money product_money_width"  v-if="item.productType == 2">{{item.productIntroduction}}</p>
            <p class="product_label" :class="item.productType == 2 || (item.productParamShow == 1 && item.productType == 0)? '' : 'product_label1'">
              <span>{{item.rebate}}</span>
              <span>{{item.settle}}</span>
            </p>
          </div>
          <div class="left">
            <button :class="item.agentStatus == 0 ?'buttonBlue':'buttonyellow'" @click.stop="makeMoney(item.agentStatus,item.productCode,item.productType)">{{item.agentStatusName}}</button>
          </div>
        </van-row>  
      </div>
    </van-pull-refresh>
    <van-popup class="van_popup_text" v-model="moneyShow" :close-on-click-overlay=false>
      <div>
        <p class="product_message">确认代理后您将获得该产品 专属推广链接，是否确认？</p>
        <p class="product_radio">
          <van-radio-group v-model="radioName">
            <van-radio name="1">已阅读并同意<router-link to="/Proxyagreement"><span style="color:#4597FB;">《微店代理协议》</span></router-link></van-radio>
          </van-radio-group>
        </p>
        <p class="product_button">
          <button @click="moneyShow = false">取消</button>
          <button @click="confirm">确定</button>
        </p>
      </div>
    </van-popup>
    <footer v-if="showStatus == 1" class="footer_button" @click="yidl">
      <button>一键代理推广赚工资</button>
    </footer>
    <!-- 弹出层 -->
    <van-popup v-model="showPoster" id="aaa" :close-on-click-overlay=false>
      <div v-if="logoUrl == ''" ref="imageWrapper" id="posterdom">
        <div class="popup_img_op">
          <img :src="'data:image/png;base64,'+showPosterList.bannerUrl" alt="">
        </div>
        <div class="popup_center">
          <div id="qrcode" ></div>
          <!-- <img :src=showPosterList.productLogo alt=""> -->
          <p>长按识别二维码马上申请</p>
        </div>
        <div class="popu_footer">
          <van-row class="van-row1">
            <van-col>
              <van-col class="popuf_img">
                <img :src="showPosterList.personImg?'data:image/png;base64,'+showPosterList.personImg : require('../imgs/topimg.png')" alt="">
              </van-col>
              <van-col class="popuf_text">
                <p>欢迎咨询</p>
                <p>{{showPosterList.phone}}</p>
              </van-col>
            </van-col>
            <van-col class="popuf_logo clearfix">
              <img src="../imgs/logo@2x.png" alt="">
            </van-col>
          </van-row>
        </div>
      </div>
      <div v-if="logoUrl != ''" class="haibaoIMg">
        <img :src=logoUrl alt="">
      </div>
      <div class="popu_caozuo">
        <button class="btn1" @click="downimg">下载图片</button>
        <button class="btn2" @click="coplink">复制链接</button>
      </div>
      <div class="popu_close" @click="showPoster = false">
        <img src="../imgs/turn_off@2x.png" alt="">
      </div>
    </van-popup>
  </div>
</template>
<script>
import { statistics } from "wisdom-h5"
import { qrcanvas } from 'qrcanvas';
import { Popup, RadioGroup, Radio, Toast, Dialog } from "vant";
import utils from "../../../utils/utils"
export default {
  components: {
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      moneyShow: false,
      radioName: "1",
      productList0: [],
      isLoading: false,
      count: 0,
      showStatus:"",
      productCode:"",
      agentStatus:1,//我要代理
      storeStatus:"",
      showPoster:false,
      logoUrl:"",
      showPosterList:{},
      qrcodeUrl:"",
      logoUrl11:""
    };
  },
  methods: {
    yidl(){
      if(!this.tanchuang()){
        return false
      }
      this.moneyShow = true
      this.agentStatus=1
    },
    // 马上赚钱
    makeMoney(num,code,productType) {
      this.productCode = code
      if(!this.tanchuang()){
        return false
      }
      // 0 我要代理 1 马上赚钱
      switch (num) {
        case 1:
          this.goDetails(code,num,productType)
          statistics.click("magentproduct","makeMoney",{code:code})
          break;
        case 0:
          this.moneyShow = true;
          this.agentStatus = 0
          statistics.click("magentproduct","woyaodaili",{code:code})
          break;
      }
    },
    // 跳转到详情
    goDetails(code,num,productType) {
      if(!this.tanchuang()){
        return false
      }
      this.request("wisdom.vshop.product.queryH5ProductMarketDetail",{productCode:code,checkStatus:1}).then(data=>{
        this.productCode = code
        if(productType == 2){
          if(num == 0){//我要代理
            this.moneyShow = true;
            this.agentStatus = 0
          }else{
            this.operationType(code)
          }
        } else {
          this.$router.push({ path: "./mproductdetails?code="+code+"&num="+num+"&type="+0 });
        }
      }).catch(err=>{console.log(err)})
    },
    Initialization(num,i) {
      this.request("wisdom.vshop.product.queryH5AgentProducts", {
        productType: "",
        pageNum: 1,
        pageSize: 50
      })
        .then(data => {
          this.showStatus = data.data.showStatus
          this.productList0 = data.data.dataList;
          this.storeStatus = data.data.storeStatus
          this.total = data.total
          if(i==1){
            Toast.success('刷新成功');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确认代理
    confirm(){
      let agentStatusData = []
      if(this.agentStatus == 0){ // 我要代理
        agentStatusData = [{productCode:this.productCode,productType:0}]
      } else {
        this.productList0.forEach(v=>{ // 一键代理
          if(v.agentStatus == 0 ){
            agentStatusData.push({productCode:v.productCode,productType:0})
          }
        })
      }
      statistics.click("magentproduct","woyaodailiqueren")
      this.request('wisdom.vshop.product.batchAgentProducts',{queryH5UserProductDetailReqList:agentStatusData}).then(data=>{
        Toast.success('代理成功');
        this.moneyShow =  false
        this.Initialization(0)
      }).catch(err=>{this.moneyShow =  false})
    },
    // 下载海报
    downimg() {
      var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
      if(ua.match(/MicroMessenger/i) == "micromessenger"){
        this.$toast("请长按保存图片")
      } else {
        let that = this
        const toast = Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '图片生成中...'
        });
        setTimeout(() => {
          if(that.logoUrl11 == ""){
            this.$toast('网络延时，稍后再试！');Toast.clear();
          } else {
            that.upload(utils.dataURLtoFile(that.logoUrl11,'haibao.png'))
              .then(data => {
                Toast.clear();
                const a = document.createElement('a'); // 创建a标签
                a.setAttribute('download', 'img');// download属性
                a.setAttribute('href', data.url);// href链接
                a.click();
            })
            .catch(err=>{this.$toast('网络延时，稍后再试！');Toast.clear();});
          }
        },1000)
      }
    },
    // 复制
    coplink(){
      utils.copyContent(this.qrcodeUrl)
      this.$toast('已复制粘贴板中')
    },
    operationType(code){
      this.request("wisdom.vshop.product.createProductPoster",{productCode:code,operationType:1,url:window.location.origin+'/stiflingborrow'}).then(data=>{
        this.showPosterList = data.data
        this.qrcodeUrl = data.data.url 
        this.showPoster = true
        this.qrcode(data.data.url)
      }).catch(err=>{this.showPoster = false})
    },
    qrcode(url){
      this.logoUrl = ""
       this.$nextTick(()=>{
        var canvas = qrcanvas({
          data:url,
          size:100,
          colorDark:'red'
        })
        var img = document.createElement( 'img' );
        img.src = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩)
        document.getElementById("qrcode").innerHTML = '',
        document.getElementById("qrcode").appendChild(img)
        setTimeout(() => {
          this.rrrr()
        }, 500)
      })
    },
    rrrr (num) {
      var rect = document.getElementById('posterdom').getBoundingClientRect();//获取元素相对于视察的偏移量
      var offsetY = document.getElementById('aaa').clientHeight/2-document.getElementById('aaa').offsetTop
      utils.generatePosters(rect,offsetY,this.$refs.imageWrapper,v=>{console.log(
        this.logoUrl = v
      )},a=>{console.log(
        this.logoUrl11 = a
      )})
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.Initialization(0,1);
        this.isLoading = false;
      },      
      );
    },
    tanchuang(){
      if(this.storeStatus == 0){
        Dialog.confirm({
          className: 'hahahtext',
          title: '温馨提示',
          message: '您还没有创建店铺，请先编辑保存店铺信息',
          confirmButtonText:"去编辑",
        }).then(() => {
          this.$router.push({path:'./meditshop'})
        }).catch(() => {
          // on cancel
        });
        return false
      }
      return true
    },
  },
  mounted() {
    this.Initialization(0);
  }
};
</script>
<style lang="less" scoped>
.product_common1 {
  .van-row {
    background-color: #fff;
    width: 345px;
    height: 110px;
    border-radius: 5px;
    padding: 21px 0px 12px 8px;
    img {
      width: 70px;
      height: 70px;
      margin: 0px 10px 0px 5px;
    }
    .product_title {
      font-size: 17px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 18px;
      width: 50%;
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      white-space: nowrap; /*规定段落中的文本不进行换行 */
    }
    .product_title1{
      margin-top: 11px;
    }
    .product_money {
      font-size: 14px;
      font-family: "PingFang-SC-Regular";
      color: #999;
      line-height: 18px;
      margin: 9px 17px 0px 0px;
      span {
        color: #fe951e;
        font-weight: bold;
      }
    }
    .product_money_width{
      width: 80%;
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      white-space: nowrap; /*规定段落中的文本不进行换行 */
    }
    .product_label {
      color: #fe951e;
      font-size: 11px;
      line-height: 18px;
      margin-top: 8px;
      span {
        background-color: #fef1e3;
        padding: 5px 8px 4px;
        border-radius: 2px;
        margin-right: 5px;
      }
    }
    .product_label1{
      margin-top: 18px;
    }
    button {
      position: absolute;
      right: 10px;
      width: 70px;
      border-radius: 15px;
      height: 29px;
      line-height: 31px;
      font-size: 12px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-top: 41px;
    }
    .buttonBlue {
      background-color: #4597fb;
    }
    .buttonyellow {
      background-color: #f3b13e;
    }
  }
  .van-popup {
    border-radius: 5px 5px 0px 0px;
    width: 289px;
    background-color: transparent;
  }
  .van-popup::-webkit-scrollbar{
    display: none;
  }
  .popup_img_op {
    background-color: #fff;
    img{
      width: 289px;
      height: 233px;
    }
  }
  .popup_center {
    background-color: #fff;
    text-align: center;
    padding-top: 15px;
    font-size:12px;
    color: #333333;
    p{
      line-height: 35px;
    }
  }
  .popu_footer {
    background-color: #fff;
    padding: 0px 15px 0px 0px;
    border-radius: 0px 0px 5px 5px;
    .van-row1{
      width: 260px;
      padding: 10px 0px 0px 10px;
      height: 80px;
    }
    .popuf_img {
      width: 48px;
      height: 48px;
      img{
        width: 48px;
        height: 48px;
      }
    }
    .popuf_text {
      font-size:15px;
      color: #333;
      padding-left: 8px;
      line-height: 25px;
    }
    .popuf_logo {
      width: 38px;
      height: 38px;
      margin-left: 58px;
      img{
        width: 38px;
        height: 38px;
      }
    }
  }
  .popu_close{
    text-align: center;
    margin-top: 4px;
    img {
      width: 35px;
      height: 36px;
    }
  }
  .popu_caozuo {
    button {
      width: 135px;
      height: 40px;
      line-height: 35px;
      font-size: 17px;
      font-family: "PingFang SC";
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      border-radius: 20px;
      background-color: #4597fb;
    }
    .btn1 {
      background-color: #f3b13e;
      margin-right: 15px;
      margin-top: 15px;
    }
  }
  .product_center {
    margin-bottom: 10px;
    position: relative;
    .common_left {
      width: 66%;
    }
    .product_top{
      position: absolute;
      top: 0px;
      right: 12px;
      background:#D9EAFF;
      border-radius:0px 0px 5px 5px;
      font-size:10px;
      font-family:'PingFang SC';
      font-weight:500;
      color: #4597FB;
      text-align: center;
      padding: 0px 10px;
      line-height: 22px;
      padding-top: 4px;
    }
    .product_top_img{
      position: absolute;
      top: -8px;
      left: -6px;
      img{
        width: 35px;
        height: 35px;
      }
    }
  }
  
}
</style>
