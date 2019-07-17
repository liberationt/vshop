<template>
  <div :class="productList2.length<3? 'height product_common': 'product_common'" > 
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <div v-for="item in productList2" class="product_center" @click="makeMoney(item.agentStatus,item.productCode)">
        <van-row class="clearfix">
          <div>
            <div class="left">
              <img :src=item.productLogo  alt="">
            </div>
            <div class="left common_left">
              <p class="product_title">{{item.productName}}</p>
              <p class="product_money">{{item.productIntroduction}}</p>
            </div>
          </div>
          <div class=" product_label_common left">
            <p class="product_label">
              <span>{{item.rebate}}</span>
              <span>{{item.settle}}</span>
            </p>
            <button class="buttonleft right" :class="item.agentStatus == 0 ?'buttonBlue':'buttonyellow'">{{item.agentStatusName}}</button>
          </div>
        </van-row>  
       
      </div>
    </van-pull-refresh>
    <!-- 弹窗 -->
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
    <van-popup v-model="showPoster" :close-on-click-overlay=false>
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
      <div  v-if="logoUrl != ''" class="haibaoIMg">
        <img :src=logoUrl alt="">
      </div>
      <div class="popu_close" @click="showPoster = false">
        <img src="../imgs/turn_off@2x.png" alt="">
      </div>
    </van-popup>
  </div>
</template>
<script>
import { qrcanvas } from 'qrcanvas';
import html2canvas from 'html2canvas'
import { Popup, RadioGroup, Radio, Toast, Dialog  } from 'vant';
import { statistics } from "wisdom-h5"
export default {
  components:{
    [Popup.name] : Popup,
    [RadioGroup.name] : RadioGroup,
    [Radio.name] : Radio,
    [Dialog.name]: Dialog
  },
  data(){
    return {
      moneyShow:false,
      radioName:"1",
      productList2:[],
      showStatus:"",
      isLoading:false,
      productCode:"",
      loading:false,
      finished:false,
      agentStatus:1,
      showPoster:false,
      showPosterList:{},
      logoUrl:"",
      storeStatus:""
    }
  },
  methods:{
    // 一键代理
    yidl(){
      if(!this.tanchuang()){
        return false
      }
      this.moneyShow = true
      this.agentStatus=1
    },
    // 马上赚钱
    makeMoney(num,code){
      if(!this.tanchuang()){
        return false
      }
      // 0 我要代理 1 马上赚钱
      switch (num) {
        case 1:
          this.goDetails(code,num)
          statistics.click("magentproduct2",'mashangzq2')
          break;
        case 0:
          this.moneyShow = true;
          this.agentStatus = 6
          this.productCode = code
          statistics.click("magentproduct1",'woyaodl2')
          break;
      }
    },
    goDetails(code,num) {
      this.request("wisdom.vshop.product.queryH5ProductMarketDetail",{productCode:code}).then(data=>{
        this.operationType(code)
      }).catch(err=>{console.log(err)})
    },
    operationType(code){
      this.request("wisdom.vshop.product.createProductPoster",{productCode:code,operationType:1,url:window.location.origin+'/stiflingborrow'}).then(data=>{
        this.showPosterList = data.data
        this.showPoster = true
        this.qrcode(data.data.url)
        setTimeout(() => {
              this.rrrr()
　　　　     }, 500)
      }).catch(err=>{this.showPoster = false})
    },
    // 确认代理
    confirm(){
      let agentStatusData = []
      if(this.agentStatus == 6){
        agentStatusData = [{productCode:this.productCode,productType:2}]
      } else {
        this.productList2.forEach(v=>{
          if(v.agentStatus == 0 ){
            agentStatusData.push({productCode:v.productCode,productType:2})
          }
        })
      }
      this.request('wisdom.vshop.product.batchAgentProducts',{queryH5UserProductDetailReqList:agentStatusData}).then(data=>{
        Toast.success('代理成功');
        this.moneyShow =  false
        this.Initialization(2)
      }).catch(err=>{console.log(err)})
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.Initialization(2,1);
        this.count++;
        this.isLoading = false;
      }, 500);
    },
    Initialization(num,i){
      this.request("wisdom.vshop.product.queryH5AgentProducts",{productType:num,pageNum: 1,
        pageSize: 50}).then(data=>{
        if(num==2){
          this.showStatus = data.data.showStatus
          this.productList2 = data.data.dataList
          this.storeStatus = data.data.storeStatus
          this.total = data.total
        }
        if(i == 1){
          Toast.success('刷新成功');
        }
      }).catch(err=>{console.log(err)})
    },
    qrcode(url){
      this.logoUrl = ""
       this.$nextTick(()=>{
        var canvas = qrcanvas({
          data:url,
          size:100,
          colorDark:'red'
        })
        console.log(url)
        var img = document.createElement( 'img' );
        img.src = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩)
        document.getElementById("qrcode").innerHTML = '',
        document.getElementById("qrcode").appendChild(img)
      })
    },
    rrrr () {
      var scale = 2;//放大倍数
      var canvas = document.createElement('canvas');
      var content = canvas.getContext("2d");
      content.scale(scale,scale);
      var rect = document.getElementById('posterdom').getBoundingClientRect();//获取元素相对于视察的偏移量
      content.translate(-rect.left,-rect.top);//设置context位置，值为相对于视窗的偏移量负值，让图片复位
      html2canvas(this.$refs.imageWrapper,{
        backgroundColor: null, // 解决生成的图片有白边
        dpi: window.devicePixelRatio*2,
        scale:scale,
        y:1,
        scrollY:-rect.top
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"); // 获取生成的图片的url
          this.logoUrl = dataURL
          console.log(dataURL)
        })
    },
    // 弹窗
    tanchuang(){
      if(this.storeStatus == 0){
        Dialog.confirm({
          title: '温馨提示',
          message: '您还没有创建店铺，请先编辑保存店铺信息',
          confirmButtonText:"去编辑"
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
  created(){
    this.Initialization(2)
  }
};
</script>
<style lang="less" scoped>
.product_common {
  .van-popup {
    border-radius: 5px 5px 0px 0px;
    width: 289px;
    background-color: transparent;
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
      line-height: 40px;
    }
  }
  .popu_footer {
    background-color: #fff;
    padding: 0px 15px 0px 16px;
    border-radius: 0px 0px 5px 5px;
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
    margin-top: 34px;
    img {
      width: 35px;
      height: 36px;
    }
  }
  .product_center {
    .van-row {
      padding-right: 10px;
    }
  }
  .van-row {
    background-color: #fff;
    border-radius:5px;
    padding: 20px 0px 20px 10px;
    img {
      width: 70px;
      height: 70px;
      margin: 0px 15px 0px 5px;
    }
    .product_title{
      font-size:17px;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:18px;
      width: 80%;
    }
    .product_money {
      font-size: 14px;
      font-family: 'PingFang-SC-Regular';
      color: #333333;
      line-height:18px;
      margin: 6px 17px 7px 0px;
      width: 80%;
      span {
        color: #FE951E;
        font-weight: bold;
      }
    }
    
    .buttonBlue{
      background-color: #4597FB;
    }
    .buttonyellow{
      background-color: #F3B13E;
    }
  }
  .van-row1{
    padding-left:0px;
  }
  .product_label_common{
    margin-top: 12px;
    width: 100%;
  }
  .product_label {
      color: #FE951E;
      font-size:11px;
      line-height:18px;
      margin-left: 4px;
      span {
        background-color: #FEF1E3;
        padding: 5px 8px 4px;
        border-radius: 2px;
        margin-right: 5px;
      }
    }
    .buttonleft{
      width: 70px;
      border-radius:15px;
      height: 29px;
      line-height: 31px;
      font-size:12px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      margin-top: -24px;
    }
  .product_center {
    margin-bottom: 10px;
    .common_left{
      width: 66%;
    }
  }
}
</style>
