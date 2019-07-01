<template>
  <div :class="productList2.length<=4? 'height product_common': 'product_common'" > 
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <div v-for="item in productList2" class="product_center" @click="goDetails(item.productCode,item.agentStatus)">
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
            <button class="buttonleft right" :class="item.agentStatus == 0 ?'buttonBlue':'buttonyellow'" @click.stop="makeMoney(item.agentStatus,item.productCode)">{{item.agentStatusName}}</button>
          </div>
        </van-row>  
       
      </div>
    </van-pull-refresh>
    <!-- 下拉刷新 -->
    <van-list
      v-if="productList2.length>=5"
      class="xialashuaxin"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    </van-list>
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
    <footer v-if="showStatus == 1" class="footer_button" @click="moneyShow = true">
      <button>一键代理推广赚工资</button>
    </footer>
    <!-- 弹出层 -->
    <van-popup v-model="showPoster" :close-on-click-overlay=false>
      <div class="popup_img_op">
        <img :src=showPosterList.bannerUrl alt="">
      </div>
      <div class="popup_center">
        <div id="qrcode" ></div>
        <!-- <img :src=showPosterList.productLogo alt=""> -->
        <p>长按识别二维码马上申请</p>
      </div>
      <div class="popu_footer">
        <van-row >
          <van-col span="16">
            <van-col class="popuf_img">
              <img :src="showPosterList.personImg?showPosterList.personImg:'./imgs/topimg.png'" alt="">
            </van-col>
            <van-col class="popuf_text">
              <p>欢迎咨询</p>
              <p>{{showPosterList.phone}}</p>
            </van-col>
          </van-col>
          <van-col class="popuf_logo clearfix" span="8">
            <img src="../imgs/logo@2x.png" alt="">
          </van-col>
        </van-row>
      </div>
      <div class="popu_close" @click="showPoster = false">
        <img src="../imgs/turn_off@2x.png" alt="">
      </div>
    </van-popup>
  </div>
</template>
<script>
import { qrcanvas } from 'qrcanvas';
import { Popup, RadioGroup, Radio, Toast, List  } from 'vant';
export default {
  components:{
    [Popup.name] : Popup,
    [RadioGroup.name] : RadioGroup,
    [Radio.name] : Radio,
    [List.name]: List
  },
  data(){
    return {
      moneyShow:false,
      radioName:"1",
      productList2:[],
      showStatus:"",
      isLoading:false,
      showStatus:"",
      productCode:"",
      loading:false,
      finished:false,
      agentStatus:"",
      showPoster:false,
      showPosterList:{}
    }
  },
  methods:{
    // 马上赚钱
    makeMoney(num,code){
      // 0 我要代理 1 马上赚钱
      switch (num) {
        case 1:
          this.goDetails(code,num)
          break;
        case 0:
          this.moneyShow = true;
          this.agentStatus = 6
          this.productCode = code
          break;
      }
    },
     goDetails(code,num) {
      
      this.operationType(code)
      // this.$router.push({ path: "./mproductdetails?code="+code+"&num="+num+"&type="+1 });
    },
    operationType(code){
      this.request("wisdom.vshop.product.createProductPoster",{productCode:code,operationType:1,url:window.location.href}).then(data=>{
        this.showPosterList = data.data
        this.showPoster = true
        this.qrcode(data.data.url)
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
        this.Initialization(2);
        Toast.success('刷新成功');
        this.count++;
        this.isLoading = false;
      }, 500);
    },
    onLoad(){
       // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < this.total; i++) {
          this.Initialization(2,i)
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.productList2.length <=10) {
          this.finished = true;
        }
      }, 500);
    },
    Initialization(num,i){
      this.request("wisdom.vshop.product.queryH5AgentProducts",{productType:num,pageNum: i,
        pageSize: 10}).then(data=>{
        if(num==2){
          this.showStatus = data.data.showStatus
          this.productList2 = data.data.dataList
          this.total = data.total
        }
      }).catch(err=>{console.log(err)})
    },
    qrcode(url){
       this.$nextTick(()=>{
        var canvas = qrcanvas({
          data:url,
          size:65,
          colorDark:'red'
        })
        var img = document.createElement( 'img' );
        img.src = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩)
        document.getElementById("qrcode").innerHTML = '',
        document.getElementById("qrcode").appendChild(img)
      })
    }
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
    #qrcode {
      margin-bottom: 10px;
    }
  }
  .popu_footer {
    background-color: #fff;
    padding: 18px 15px 20px 16px;
    border-radius: 0px 0px 5px 5px;
    .popuf_img {
      width: 48px;
      height: 48px;
    }
    .popuf_text {
      font-size:15px;
      color: #333;
      padding-left: 8px;
      line-height: 25px;
    }
    .popuf_logo {
      img{
        width: 38px;
        height: 38px;
        float: right;
        margin-top: 5px;
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
  .van-row {
    background-color: #fff;
    width: 345px;
    border-radius:5px;
    padding: 20px 10px;
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
  .product_label_common{
    margin-top: 12px;
    width: 100%;
  }
  .product_label {
      color: #FE951E;
      font-size:11px;
      line-height:18px;
      span {
        background-color: #FEF1E3;
        padding: 6px 8px;
        border-radius: 2px;
        margin-right: 5px;
      }
    }
    .buttonleft{
      width: 70px;
      border-radius:15px;
      height: 29px;
      line-height: 29px;
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
