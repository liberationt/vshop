<template>
  <div class="login_common">
    <div class="login_top">
      <header>登录微店</header>
    </div>
    <div class="login_text">
      <van-tabs class="login_tab" @click="onClick">
        <van-tab title="动态获取验证码">
          <div class="login_dynamic clearfix">
            <p>
              <input type="text" placeholder="请输入手机号">
            </p>
            <p>
              <input type="text" placeholder="请输入验证码">
              <span class="login_getcode right">获取验证码</span>
            </p>
          </div>
        </van-tab>
        <van-tab title="普通登录">
          <div class="login_dynamic">
            <p>
              <input type="text" placeholder="请输入手机号">
            </p>
            <p>
              <input type="text" placeholder="请输入6-18位登录密码">
            </p>
          </div>
        </van-tab>
      </van-tabs>
      <div class="login_login">
        登录
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs } from 'vant';
export default {
  components:{
    [Tabs.name] : Tabs,
    [Tab.name] : Tab
  },
  data(){
    return {
      active: 2
    };
  }
}
</script>
<style lang="less" scoped>
.login_common {
  width: 100%;
  .login_top {
    height: 176px;
    background: url('./imgs/loginTop.png') no-repeat;
    background-size: 100%;
    header {
      font-family:'PingFang-SC-Medium';
      padding-top: 17px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      font-size:17px;
    }
  }
  .login_dynamic {
    width: 100%;
    background-color: #fff;
    padding: 0px 40px;
    text-align: left;
    padding-top: 20px;
    input {
      color: #B2B2B2;
      font-size:15px;
      font-family:'PingFang-SC-Medium';
    }
    p {
      border-bottom: 1px solid #D3D3D3; /*no*/
      padding: 19px 0px;
    }
    .login_getcode {
      color: #4697FB;
      font-size:13px;
      padding-left: 10px;
      border-left: 1px solid #D3D3D3;/*no*/
    }
  }
  .login_login {
    color: #FFFFFF;
    font-size: 18px;
    background-color: #4597FB;
    width:295px;
    height:50px;
    border-radius:25px;
    line-height: 50px;
    margin: 30px auto 0px auto;
  }
}
</style>
