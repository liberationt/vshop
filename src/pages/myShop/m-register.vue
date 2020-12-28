<template>
  <div class="mregister">
    <div class="regiater_header"></div>
    <div class="register_center">
      <p class="input_number">
        <input type="number" v-model="phoneNum" oninput='if(value.length>11)value=value.slice(0,11)' placeholder="请输入手机号">
        <span> <img src="./imgs/shouji@2x.png" alt=""> </span>
      </p>
      <p class="input_code"> 
        <input type="number" v-model="phoneCode" oninput='if(value.length>6)value=value.slice(0,6)' placeholder="请输入验证码"> 
        <span> <img src="./imgs/yanzhengma@2x.png" alt=""> </span>
        <span class="input_click" @click="flag && getnum()">{{show ? '获取验证码' : count + 's后获取'}}</span>
        <!-- <span v-show="!show" class="buttoncardimg">{{count}} s后获取</span> -->
      </p>
      <div v-show="seal_control" style='margin: 0px auto;' id='captcha_div' class="seal_control"></div>
      <button class="input_button" @click="registration">
        立即注册
      </button>
      <div class="login_footer">
       <!-- <span @click="xuanzhong"> <img :src=xyImg alt=""> </span>  -->
       点击登录即表示同意<span style="color:#4697FB; z-index:9" @click="goAgree(1)">《用户服务协议》</span>和<span style="color:#4697FB; z-index:9" @click="goAgree(2)">《用户使用规范》</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import utils from "../../utils/utils"
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      flag: true,
      show: true,
      phoneNum: "",
      phoneCode: "",
      count: "",
      seal_control: false
    };
  },
  methods: {
    // 获取验证码
    getnum(v) {
      if (this.phoneNum == "") {
        Toast("请输入手机号！");
        return false;
      } else if (!/(1([3-9])[0-9]{9})/.test(this.phoneNum)) {
        Toast("手机号有误，请重新输入！");
        return false;
      }
      statistics.click("mregister","getCode")
      this.setTimeout();
      this.show = false;
      let params = v
        ? v
        : {
            captchaId: "",
            verifyCode: "",
            phone: this.phoneNum,
            channel:this.$route.query.qd
          };
      this.request("wisdom.vshop.vshopStoreManager.sendRegisterCaptcha", params)
        .then(data => {
          if (data.code == "success") {
            Toast("短信发送成功");
            // statistics.click("mlogin", "getcode");
          } else if (data.code == "110019") {
            this.deleteTime();
            this.seal_control = true;
            this.flag = false;
            utils.sealControl(data.data.captchaId, (err, ret, captchaId) => {
              let that = this;
              if (ret != undefined) {
                // 风控关闭
                that.seal_control = false;
                //调用定时器
                that.setTimeout();
                that.show = false;
                this.flag = true;
                // 接口入参
                let data = {
                  captchaId: captchaId,
                  phone: that.phoneNum,
                  verifyCode: ret.validate,
                  channel:that.$route.query.qd
                };
                // console.log(params , '带风控')
                that.getnum(data);
              }
            });
            this.deleteTime();
          } else {
            this.deleteTime();
          }
        })
        .catch(err => {
          this.deleteTime();
          console.log("111====>err:   ", err);
        });
    },
    // 立即注册
    registration() {
      if (this.phoneNum == "") {
        Toast("请输入手机号！");
        return false;
      } else if (!/(1([3-9])[0-9]{9})/.test(this.phoneNum)) {
        Toast("手机号有误，请重新输入！");
        return false;
      }
      if (this.phoneCode == "") {
        Toast("验证码不能为空，请重新输入！");
        return false;
      } else if (
        !/^[0-9]*$/.test(this.phoneCode) ||
        this.phoneCode.length < 6
      ) {
        Toast("验证码有误，请重新输入！");
        return false;
      }
      statistics.click("mregister","ljzc")
      this.request("wisdom.vshop.vshopStoreManager.registerH5", {
        phone: this.phoneNum,
        channel: this.$route.query.qd,
        captchaCode: this.phoneCode
      })
        .then(data => {
          this.$router.push({ path: "/"})
        })
        .catch(err => {
          console.log(err);
        });
    },
    //清楚定时器
    deleteTime() {
      this.show = true;
      clearInterval(this.timer);
      this.timer = null;
    },
    // 定时器
    setTimeout() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    goAgree(num) {
      if(num==1){
        this.$router.push({path:'./magree'})
      } else {
        this.$router.push({path:'./magree1'})
      }
    },
    // 跳转到用户新协议
    golink() {
      statistics.click("mregister","ydxy")
      window.location.href = "http://qdx.zanfin.com/promotion/#/agreement";
    }
  },
  mounted(){
    statistics.page("mregister")
  }
};
</script>
<style lang="less" scoped>
.mregister {
  background: url("./imgs/bg@2x.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  .regiater_header {
    height: 315px;
  }
  .seal_control{
    margin-top: 10px;
  }
  .register_center {
    background: url("./imgs/di@2x.png") no-repeat;
    background-size: 100%;
    width: 375px;
    height: 266px;
    text-align: center;
    .input_number {
      padding-top: 30px;
      input {
        width: 309px;
      }
      img {
        width: 12px;
        height: 19px;
        position: absolute;
        left: 57px;
        margin-top: 12px;
      }
    }
    .input_code {
      margin: 0 auto;
      width: 309px;
      text-align: left;
      padding-top: 14px;
      input {
        width: 196px;
      }
      img {
        width: 16px;
        height: 18px;
        position: absolute;
        left: 54px;
        margin-top: 13px;
      }
    }
    input {
      height: 42px;
      background-color: #f5f5f5;
      padding: 13px 0px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: 500;
      border-radius: 21px;
      padding-left: 53px;
      position: relative;
    }
    .input_click {
      display: inline-block;
      width: 97px;
      height: 42px;
      background: linear-gradient(
        180deg,
        rgba(255, 134, 117, 1) 0%,
        rgba(250, 92, 93, 1) 100%
      );
      border-radius: 21px;
      font-size: 14px;
      font-family: "PingFang SC";
      font-weight: 500;
      line-height: 42px;
      text-align: center;
      color: #fff;
      margin-left: 16px;
    }
    .input_button {
      width: 309px;
      height: 49px;
      background: linear-gradient(
        180deg,
        rgba(255, 134, 117, 1) 0%,
        rgba(250, 92, 93, 1) 100%
      );
      border-radius: 24px;
      margin-top: 30px;
      font-size: 16px;
      font-family: "PingFang SC";
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
  .login_footer {
    width: 100%;
    height: 20px;
    width: 100%;
    text-align: center;
    font-size: 10px;
    color: #999;
    margin-top: 15px;
    img{
      width: 11px;
      height: 11px;
      margin-bottom: 3px;
      margin-right: 8px;
    }
  }
}
</style>
