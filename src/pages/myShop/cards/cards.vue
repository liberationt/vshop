<template>
  <div :class="productList1.length<3? 'height productCard_common': 'productCard_common'"> 
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <div class="productCard_center" v-for="item in productList1" @click="makeMoney(item.agentStatus,item.productCode)">
        <div>
          <van-row>
            <van-col :span="10">
              <img :src=item.productLogo alt="">
            </van-col>
            <van-col :span="14">
              <p class="product_title">{{item.productName}}</p>
              <p class="product_people">申请人数: <span>{{item.applyNum}}</span></p>
              <p class="product_people" >批卡率: <span>{{item.batchRate}}</span></p>
            </van-col>
          </van-row>  
        </div>
        <div class="productCard_footer">
          <van-row class="clearfix">
            <van-col>
              <p class="product_label">
                <span>{{item.rebate}}</span>
                <span>{{item.settle}}</span>
              </p>
            </van-col>
            <van-col :class="item.agentStatus == 0 ?'buttonBlue right van-col_right':'buttonyellow right van-col_right'">
              <span>{{item.agentStatusName}}</span>
            </van-col>  
          </van-row>
        </div>
      </div>
    </van-pull-refresh>
    <!-- 弹窗 -->
    <van-popup class="ziying van_popup_text" v-model="moneyShow" :close-on-click-overlay=false>
      <div>
        <p class="product_message">确认代理后您将获得该产品 专属推广链接，是否确认？</p>
        <p class="product_radio">
          <van-radio-group v-model="radioName">
            <van-radio name="1">已阅读并同意<router-link to="/Proxyagreement"><span style="color:#4597FB;">《微店代理协议》</span></router-link> </van-radio>
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

      <div v-show="logoUrl == ''" ref="imageWrapper" id="posterdom">
        <div class="popup_img_op">
          <img :src="'data:image/png;base64,'+showPosterList.bannerUrl" alt="">
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
                <img :src="showPosterList.personImg?'data:image/png;base64,'+showPosterList.personImg : require('../imgs/topimg.png')" alt="">
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
      </div>

      <div  v-show="logoUrl != ''" class="haibaoIMg">
        <img :src=logoUrl alt="">
      </div>

      <div class="popu_close" @click="showPoster = false;logoUrl = ''">
        <img src="../imgs/turn_off@2x.png" alt="">
      </div>
    </van-popup>
  </div>
</template>
<script>
import { qrcanvas } from "qrcanvas";
import html2canvas from "html2canvas";
import { Popup, RadioGroup, Radio, Toast, Dialog } from "vant";
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
      productList1: [],
      isLoading: false,
      showStatus: "",
      productCode: "",
      loading: false,
      finished: false,
      agentStatus: 1,
      showPoster: false,
      showPosterList: {},
      logoUrl: "",
      storeStatus:""
    };
  },
  methods: {
    // 一键代理
    yidl(){
      if(!this.tanchuang()){
        return false
      }
      this.moneyShow = true
      this.agentStatus=1
    },
    // 马上赚钱
    makeMoney(num, code) {
      if(!this.tanchuang()){
        return false
      }
      // 0 我要代理 1 马上赚钱
      console.log(num);
      switch (num) {
        case 1:
          this.goDetails(code, num);
          break;
        case 0:
          this.moneyShow = true;
          this.productCode = code;
          this.agentStatus = 0;
          break;
      }
    },
    // 跳转到详情
    goDetails(code, num) {
      if(!this.tanchuang()){
        return false
      }
      this.request("wisdom.vshop.product.queryH5ProductMarketDetail", {
        productCode: code
      })
        .then(data => {
          this.operationType(code);
        })
        .catch(err => {
          console.log(err);
        });
      // this.$router.push({ path: "./mproductdetails?code="+code+"&num="+num+"&type="+1 });
    },
    // 确认代理
    confirm() {
      let agentStatusData = [];
      if (this.agentStatus == 0) {
        agentStatusData = [{ productCode: this.productCode, productType: 1 }];
      } else {
        this.productList1.forEach(v => {
          if (v.agentStatus == 0) {
            agentStatusData.push({
              productCode: v.productCode,
              productType: 1
            });
          }
        });
      }
      this.request("wisdom.vshop.product.batchAgentProducts", {
        queryH5UserProductDetailReqList: agentStatusData
      })
        .then(data => {
          Toast.success("代理成功");
          this.moneyShow = false;
          this.Initialization(1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    productposter() {
      // this.showPoster = true
      this.operationType(1);
    },
    operationType(code) {
      this.request("wisdom.vshop.product.createProductPoster", {
        productCode: code,
        operationType: 1,
        url: window.location.origin + "/stiflingborrow"
      })
        .then(data => {
          this.showPosterList = data.data;
          this.showPoster = true;
          this.qrcode(data.data.url);
          setTimeout(() => {
            this.rrrr();
          }, 500);
          
        })
        .catch(err => {
          this.showPoster = false;
        });
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.Initialization(1,1);
        this.count++;
        this.isLoading = false;
      }, 500);
    },
    Initialization(num, i) {
      this.request("wisdom.vshop.product.queryH5AgentProducts", {
        productType: num,
        pageNum: 1,
        pageSize: 50
      })
        .then(data => {
          if (num == 1) {
            this.showStatus = data.data.showStatus;
            this.productList1 = data.data.dataList;
            this.storeStatus = data.data.storeStatus;
            this.total = data.total;
          }
          if(i ==1){
            Toast.success("刷新成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    qrcode(url) {
      this.logoUrl = ''
      this.$nextTick(() => {
        //document.getElementById("qrcode").innerHTML = "";
        var canvas = qrcanvas({
          data: url,
          size: 100,
          colorDark: "red"
        });
        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/png", 1); //1表示质量(无损压缩)
        document.getElementById("qrcode").innerHTML = "";
        document.getElementById("qrcode").appendChild(img);
      });
    },
    rrrr() {
      var scale = 2;//放大倍数
      var canvas = document.createElement('canvas');
      var content = canvas.getContext("2d");
      content.scale(scale,scale);
      var rect = document.getElementById('posterdom').getBoundingClientRect();//获取元素相对于视察的偏移量
      content.translate(-rect.left,-rect.top);//设置context位置，值为相对于视窗的偏移量负值，让图片复位
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null, // 解决生成的图片有白边
        dpi: window.devicePixelRatio*2,
        scale:scale,
        y:1,
        scrollY:-rect.top
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream") // 获取生成的图片的url
        this.logoUrl = dataURL;
        console.log(dataURL);
      });
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
  mounted() {
    this.Initialization(1);
  }
};
</script>
<style lang="less" scoped>
.productCard_common {
  .van-popup {
    border-radius: 5px 5px 0px 0px;
    width: 289px;
    background-color: transparent;
    overflow-y: hidden;
  }
  .popup_img_op {
    background-color: #fff;
    img {
      width: 289px;
      height: 233px;
    }
  }
  .popup_center {
    background-color: #fff;
    text-align: center;
    padding-top: 15px;
    font-size: 12px;
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
      font-size: 15px;
      color: #333;
      padding-left: 8px;
      line-height: 25px;
    }
    .popuf_logo {
      img {
        width: 38px;
        height: 38px;
        float: right;
        margin-top: 5px;
      }
    }
  }
  .popu_close {
    text-align: center;
    margin-top: 34px;
    img {
      width: 35px;
      height: 36px;
    }
  }
  .product_label {
    color: #fe951e;
    font-size: 11px;
    line-height: 18px;
    margin-top: 6px;
    span {
      background-color: #fef1e3;
      padding: 6px 8px;
      border-radius: 2px;
      margin-right: 5px;
    }
  }
  .van-col_right {
    height: 29px;
    width: 70px;
    border-radius: 15px;
    height: 29px;
    line-height: 29px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    color: rgba(255, 255, 255, 1);
  }
  .productCard_center {
    background-color: #fff;
    width: 345px;
    border-radius: 5px;
    padding: 22px 11px 22px 15px;
    .van-row {
      img {
        width: 110px;
        height: 70px;
        margin: 0px 15px 0px 5px;
        border-radius: 5px;
      }
      .product_title {
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 25px;
      }
      .product_people {
        font-size: 14px;
        font-family: "PingFang-SC-Regular";
        color: #333333;
        line-height: 18px;
        margin: 6px 17px 7px 0px;
        .van-progress__pivot {
          display: none;
        }
        span {
          color: #fe951e;
          font-weight: bold;
        }
      }
      .buttonBlue {
        background-color: #4597fb;
      }
      .buttonyellow {
        background-color: #f3b13e;
      }
    }
    .productCard_footer {
      margin-top: 5px;
    }
    margin-bottom: 10px;
  }
}
</style>
