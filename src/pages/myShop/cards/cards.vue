<template>
  <div :class="productList1.length<=3? 'height productCard_common': 'productCard_common'"> 
    <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
      <div class="productCard_center" v-for="item in productList1" @click="makeMoney(item.agentStatus,item.productCode)">
        <div>
          <van-row>
            <van-col>
              <img :src=item.productLogo alt="">
            </van-col>
            <van-col>
              <p class="product_title">{{item.productName}}</p>
              <p class="product_people">申请人数: <span>{{item.applyNum}}</span></p>
              <p class="product_people" >批卡率: <span>{{item.batchRate}}</span>
                <van-progress
                  color="#F3B13E"
                  :percentage='item.batchRateIcon? item.batchRateIcon : 0'
                />
              </p>
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
    <!-- 下拉刷新 -->
    <van-list
      v-if="productList1.length>=5"
      class="xialashuaxin"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    </van-list>
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
    <footer v-if="showStatus == 1" class="footer_button" @click="moneyShow = true">
      <button>一键代理推广赚工资</button>
    </footer>
    <!-- 弹出层 -->
    <van-popup v-model="showPoster" :close-on-click-overlay=false>
      <div v-if="logoUrl == ''" ref="imageWrapper">
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
                <img :src="showPosterList.personImg?showPosterList.personImg : require('../imgs/topimg.png')" alt="">
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
import { qrcanvas } from "qrcanvas";
import html2canvas from "html2canvas";
import { Popup, RadioGroup, Radio, Progress, Toast, List } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Progress.name]: Progress,
    [List.name]: List
  },
  data() {
    return {
      moneyShow: false,
      radioName: "1",
      productList1: [],
      isLoading: false,
      showStatus: "",
      productCode: "",
      showStatus: "",
      loading: false,
      finished: false,
      agentStatus: "",
      showPoster: false,
      showPosterList: {},
      logoUrl: ""
    };
  },
  methods: {
    // 马上赚钱
    makeMoney(num, code) {
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
          setTimeout(() => {
            this.rrrr();
          }, 500);
          this.qrcode(data.data.url);
        })
        .catch(err => {
          this.showPoster = false;
        });
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.Initialization(1);
        Toast.success("刷新成功");
        this.count++;
        this.isLoading = false;
      }, 500);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < this.total; i++) {
          this.Initialization(2, i);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.productList1.length <= 10) {
          this.finished = true;
        }
      }, 500);
    },
    Initialization(num, i) {
      this.request("wisdom.vshop.product.queryH5AgentProducts", {
        productType: num,
        pageNum: i,
        pageSize: 10
      })
        .then(data => {
          if (num == 1) {
            this.showStatus = data.data.showStatus;
            this.productList1 = data.data.dataList;
            this.total = data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    qrcode(url) {
      this.$nextTick(() => {
        var canvas = qrcanvas({
          data: url,
          size: 100,
          colorDark: "red"
        });
        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/png", 1); //1表示质量(无损压缩)
        (document.getElementById("qrcode").innerHTML = ""),
          document.getElementById("qrcode").appendChild(img);
      });
    },
    rrrr() {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null // 解决生成的图片有白边
        // useCORS:true,
        // allowTaint:true,
        // width:180,
        // height:200
        // WINDOWWIDTH: Window.innerWidth
      }).then(canvas => {
        // canvas.width=500
        let dataURL = canvas
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream"); // 获取生成的图片的url
        this.logoUrl = dataURL;
        console.log(dataURL);
      });
    }
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
    overflow: hidden;
    background-color: #fff;
    width: 345px;
    border-radius: 5px;
    padding: 22px 11px 22px 15px;
    .van-row {
      img {
        width: 110px;
        height: 70px;
        margin: 0px 15px 0px 5px;
      }
      .product_title {
        font-size: 17px;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
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
