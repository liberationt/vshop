<template>
  <div class="login_common">
    <div class="login_top">
      <header>登录微店</header>
    </div>
    <div class="login_text">
      <van-tabs class="login_tab" v-model="tabactive" @click="onClick">
        <van-tab title="动态获取验证码">
          <div class="login_dynamic clearfix">
            <p>
              <input type="number" v-model="phoneNum" @input="onInput" oninput='if(value.length>11)value=value.slice(0,11)' placeholder="请输入手机号">
            </p>
            <p>
              <input type="number" v-model="phoneCode" @input="onInput" oninput='if(value.length>6)value=value.slice(0,6)' placeholder="请输入验证码">
              <span v-show="show" class="login_getcode right" @click="getcode()">获取验证码</span>
				      <span v-show="!show" class="login_getcode right">{{count}} s后获取</span>	
            </p>
          </div>
        </van-tab>
        <van-tab title="普通登录">
          <div class="login_dynamic">
            <p>
              <input type="number" class="inputD" v-model="phoneNum" @input="onInputM" oninput='if(value.length>11)value=value.slice(0,11)' placeholder="请输入手机号">
            </p>
            <p>
              <input :type=typeText v-model="phonePwd" class="phonePwd" @input="onInputM" oninput='if(value.length>6)value=value.slice(0,18)' placeholder="请输入6-18位登录密码">
              <span class="login_img right" @click="onLookImg"> <img :src= " look == 1? nolookImg : lookImg " alt=""> </span>
            </p>
          </div>
        </van-tab>
      </van-tabs>
      <div v-show="seal_control" style='margin: 0px auto;' id='captcha_div' class="seal_control"></div>
      <div class="login_login" :class="!flag ? 'login_w' : 'login_b'" @click="flag && goLogin()">
        登录
      </div>
      <div class="login_footer">
        点击“登录”代表您已经同意hahha <span style="color:#4697FB; z-index:9" @click="goAgree">《抢单侠用户协议》</span>
      </div>
    </div>
    
  </div>
</template>
<script>
import { Tab, Tabs, Toast } from "vant"
import utils from "../../utils/utils"
import MD5 from "js-md5";
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Toast.name]: Toast
  },
  data() {
    return {
      tabactive: 0,
      lookImg: require("./imgs/eye-xianshi@2x.png"),
      nolookImg: require("./imgs/eye-yincang@2x.png"),
      look: 1,
      phoneNum: "",
      phoneCode: "",
      phonePwd: "",
      typeText: "password",
      count: "",
      show: true,
      flag: false,
      seal_control: false,
    };
  },
  mounted(){
    statistics.page("mlogin")
  },
  methods: {
    onClick(v) {
      this.isCheck(v)
    },
    onLookImg() {
      if (this.look == 1) {
        this.look = 2;
        this.typeText = "text";
      } else {
        this.look = 1;
        this.typeText = "password";
      }
    },
    // 获取验证码
    getcode(v) {
      if (this.phoneNum == "") {
        Toast("请输入手机号！");
        return false;
      } else if (!/(1([3-9])[0-9]{9})/.test(this.phoneNum)) {
        Toast("手机号有误，请重新输入！");
        return false;
      }
      
      this.setTimeout();
      let params = v
        ? v
        : {
            captchaId: "",
            verifyCode: "",
            phone: this.phoneNum
          };
      this.request("wisdom.vshop.vshopStoreManager.sendCaptcha", params)
        .then(data => {
          if (data.code == "success") {
            Toast("短信发送成功");
            statistics.click("mlogin","getcode")
          } else if (data.code == "110019") {
            this.deleteTime();
            this.seal_control = true;
            utils.sealControl(data.data.captchaId, (err, ret, captchaId) => {
              let that = this;
              if (ret != undefined) {
                // 风控关闭
                that.seal_control = false;
                //调用定时器
                that.setTimeout();
                that.show = false;
                // 接口入参
                let data = {
                  captchaId: captchaId,
                  phone: that.phoneNum,
                  verifyCode: ret.validate
                };
                // console.log(params , '带风控')
                that.getcode(data);
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
    // 登录
    goLogin() {
      // if (!this.isCheck(1)) {
      //   return false;
      // }
      this.flag = false
      if (this.tabactive == 0) {
        this.request("wisdom.vshop.vshopStoreManager.captchaLogin", {
          captchaCode: this.phoneCode,
          phone: this.phoneNum
        })
          .then(data => {
            utils.setCookie("user", JSON.stringify(data.data));
            this.flag = true
            this.$router.push({ path: "./myshop?id="+'1' });
            utils.putlocal('mlogoid','1' ) //判断从哪个页面进入
          })
          .catch(err => {
            this.flag = true
            console.log("111====>err:   ", err);
          });
      } else {
        this.request("wisdom.vshop.vshopStoreManager.login", {
          phone: this.phoneNum,
          password : MD5(this.phonePwd)
        })
          .then(data => {
            utils.setCookie("user", JSON.stringify(data.data));
            this.flag = true  
            this.$router.push({ path: "./myshop?id="+'1' });
            utils.putlocal('mlogoid','1' ) //判断从哪个页面进入
            statistics.click("mlogin","login")
            localStorage.removeItem("shopValue")
            localStorage.removeItem("weixinImg")
            localStorage.removeItem("bannerData")
          })
          .catch(err => {
            this.flag = true
          });
      }

      // this.$router.push({ path: "./myshop" });
    },
    goAgree() {
      window.location.href = "http://qdx.zanfin.com/promotion/#/agreement";
    },
    onInput(){
      this.isCheck(0)
    },
    onInputM(){
      this.isCheck(3)
    },
    isCheck(num) {
      // 手机号校验
      if (this.phoneNum == "") {
        this.flag =false;
        // Toast("请输入手机号！");
        // return false;
      } else if (!/(1([3-9])[0-9]{9})/.test(this.phoneNum)) {
        this.flag =false;
        // Toast("手机号有误，请重新输入！");
        // return false;
      } else if (this.tabactive == 0 && num == 0) {
        if (this.phoneCode == "") {
          // Toast("验证码不能为空，请重新输入！");
          // return false;
        } else if (!/^[0-9]*$/.test(this.phoneCode) || this.phoneCode.length < 6) {
          this.flag =false;
          // Toast("验证码有误，请重新输入！");
          // return false;
        } else {
          this.flag = true
        }
      } else if (this.tabactive == 1) {
        if (this.phonePwd == "") {
          this.flag =false;
          // Toast("密码不能为空，请重新输入！");
          // return false;
        } else if (this.phonePwd.length < 6) {
          this.flag =false;
          // Toast("密码输入有误，请重新输入！");
          // return false;
        } else {
          this.flag = true
        }
      } else {
        this.flag = true
      }
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
    //清楚定时器
    deleteTime() {
      this.show = true;
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>
<style lang="less" scoped>
.login_common {
  text-align: center;
  height: 100%;
  width: 100%;
  .login_top {
    height: 176px;
    background: url("./imgs/loginTop.png") no-repeat;
    background-size: 100% 100%;
    header {
      font-family: "PingFang-SC-Medium";
      padding-top: 17px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      font-size: 17px;
    }
  }
  .login_dynamic {
    width: 100%;
    background-color: #fff;
    padding: 0px 40px;
    text-align: left;
    padding-top: 20px;
    .inputD{
      width: 80%;
    }
    .phonePwd{
      width: 85%;
    }
    input {
      color: #333;
      font-size: 15px;
      font-family: "PingFang-SC-Medium";
    }
    p {
      border-bottom: 1px solid #d3d3d3; /*no*/
      padding: 19px 0px;
    }
    .login_getcode {
      color: #4697fb;
      font-size: 13px;
      padding-left: 10px;
      border-left: 1px solid #d3d3d3; /*no*/
    }
    .login_img {
      img {
        width: 18px;
        height: 8px;
        margin-top: 4px;
      }
    }
  }
  .login_login {
    color: #ffffff;
    font-size: 18px;
    width: 295px;
    height: 50px;
    border-radius: 25px;
    line-height: 53px;
    margin: 30px auto 0px auto;
  }
  .login_b{
    background-color: #4597fb;
  }
  .login_w{
    background-color: #c4c6c9;
  }
  .login_footer {
    width: 100%;
    height: 20px;
    width: 100%;
    text-align: center;
    font-size: 10px;
    color: #999;
    margin-top: 15px;
  }
}
</style>
