<template>
  <div class="mselfshopdetails_common pddingTop">
    <header class="mselfshopdetails_header">
      <van-nav-bar
        title="产品详情"
        left-arrow
        @click-left="onGoback"
      />
      <div class="header_message">
        <van-row>
          <van-col>
            <img src="./imgs/dai.png" alt="">
          </van-col>
          <van-col class="message_text">
            <p>人人贷借款</p>
            <p>综合月利率：<span class="modal_color">0.78% - 0.85%</span></p>
            <p>贷款额度：<span class="modal_color">1000 - 20000元</span></p>
          </van-col>
          <van-col class="message_img">
            <span @click="goEdit"> <img src="./imgs/edit_icon@2x.png" alt=""> </span>
            <span @click="deleteProduct"> <img src="./imgs/delete_icon@2x.png" alt=""> </span>
          </van-col>
        </van-row>
      </div>
    </header>
    <div class="mselfshopdetails_center">
      <div class="mselfshopdetails_process">
        <div class="process">
          <p>申请流程</p>
        </div>
        <ul class="process_img clearfix">
          <li class="left" v-for="(item,index) in processimg">
            <div class="left">
              <img :src=item.img class="img_top" alt="">
              <p>{{item.title}}</p>
            </div>
            <p v-if="index != processimg.length-1" class="left img_bottom"><img src="./imgs/arrows_icon@2x.png" alt=""></p>
          </li>
        </ul>
      </div>
      <div class="mselfshopdetails_process">
        <div class="process">
          <p>申请资料</p>
        </div>
        <ul class="process_text">
          <li v-for="item in processimg">{{item.process_text}}</li>
        </ul>
      </div>
      <div class="mselfshopdetails_process">
        <div class="process">
          <p>申请条件</p>
        </div>
        <ul class="process_text">
          <li>1、手机运营商、身份证、基本资料、征信报告、银行卡</li>
        </ul>
      </div>
    </div>
    <footer class="productdetail_footer">
      <button @click="iwantagent" class="button_user button_userc">
        立即申请
      </button>
    </footer>
    <!-- 确认删除框 -->

  </div>
</template>
<script>
import { Popup, Dialog } from "vant";
export default {
  components: {
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      processimg: [
        {
          img: require("./imgs/submit applications_icon@2x.png"),
          title: "提交申请",
          process_text: "1、身份证"
        },
        {
          img: require("./imgs/submit applications_icon@2x.png"),
          title: "身份认证",
          process_text: "2、银行卡"
        },
        {
          img: require("./imgs/submit applications_icon@2x.png"),
          title: "手机认证",
          process_text: "3、手机实名制"
        }
      ],
    };
  },
  created() {},
  methods: {
    onGoback() {
      this.$router.push({ path: "./mselfsupport" });
    },
    recommenduser() {
      alert("推荐用户");
    },
    iwantagent() {
      alert("我要代理");
    },
    goEdit(){
      // 调到编辑页
      this.$router.push({ path: "./maddproduct" });
    },
    // 删除
    deleteProduct(){
      Dialog.confirm({
        title: '温馨提示',
        message: '确认删除此产品吗？'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    Initialization(){
      this.request("wisdom.vshop.proprietaryProduct.getH5ProprietaryProductByCode",{proprietaryProductCode: this.$route.query.code,inviterCode:'111'}).then(data=>{
        console.log(data)
      }).catch(err=>{console.log(err)})
    },
  },
  created(){
    this.Initialization()
  }
};
</script>
<style lang="less" scoped>
.mselfshopdetails_common {
  background-color: #f1f1fb;
  padding-bottom: 76px;
  height: 100%;
  .mselfshopdetails_header {
    .header_message {
      background-color: #fff;
      padding: 20px 0px 20px 15px;
      img {
        width: 70px;
        height: 70px;
        margin-right: 10px;
      }
      .message_text {
        font-size:14px;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(153,153,153,1);
        line-height: 25px;
        color: #999999;
        .modal_color {
          color: #FE951E;
        }
      }
      :nth-child(1){
        font-size:17px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color: #333;
      }
      .message_img{
        margin-left: 14px;
        img{
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .mselfshopdetails_process {
    background-color: #fff;
    margin-top: 8px;
    .process {
      height: 40px;
      padding: 11px;
      color: #4597fb;
      font-size: 14px;
      border-bottom: 1px solid rgba(231, 231, 231, 1); /*no*/
      padding-left: 15px;
      p {
        border-left: 5px solid #4597fb; /*no*/
        padding-left: 8px;
        border-radius: 1px;
      }
    }
    .process_img {
      padding: 10px 0px 15px 15px;
      li {
        color: #333333;
        font-size: 13px;

        .img_top {
          width: 26px;
          height: 28px;
          margin: 0px 13px 10px 13px;
        }
        .img_bottom {
          img {
            width: 26px;
            height: 9px;
            margin-top: 9px;
            margin-left: 7px;
          }
        }
      }
    }
    .process_text {
      padding: 10px 0px 7px 15px;
      color: #333333;
      font-size: 13px;
      li {
        margin-bottom: 8px;
      }
    }
  }
  .productdetail_footer {
    position: fixed;
    bottom: 0px;
    button {
      font-size: 16px;
      width: 375px;
      height: 50px;
      color: #fff;
      background-color: #fff;
    }
    .button_user {
      background-color: #4597fb;
      :nth-child(2) {
        font-size: 11px;
      }
    }
  }
  .van-popup {
    border-radius: 5px 5px 0px 0px;
    width: 289px;
    background-color: transparent;
  }
  .popu_close {
    text-align: center;
    margin-top: 34px;
    img {
      width: 35px;
      height: 36px;
    }
  }
}
</style>
