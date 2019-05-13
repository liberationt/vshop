<template>
  <div class="home">
    <div class="van-hairline--top"></div>
    <p class="lala">立即注册</p>
    <van-button class="haah" type="default">默认按钮</van-button>
    <van-button class="haah" loading type="danger" loading-text="加载中..." />

    <van-checkbox v-model="checked" checked-color="#ff4444">复选框</van-checkbox>

    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search" dot>找客户</van-tabbar-item>
        <van-tabbar-item icon="friends-o" info="5">甩单</van-tabbar-item>
        <van-tabbar-item icon="setting-o" info="20">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { Button, Tabbar, TabbarItem,Checkbox, CheckboxGroup } from "vant";
export default {
  name: "home",
  components: {
    HelloWorld,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      active: 0,
      checked: true,
      icon: {
      normal: '//img.yzcdn.cn/icon-normal.png',
      active: '//img.yzcdn.cn/icon-active.png'
    }
    }
  },
  created() {
    // this.request("wisdom.loan.captcha.loanUserSendSmsForRiskH5",{
    //   "captchaId": "",
    //   "phone": '13939466455',
    //   "type": 20000,
    //   "verifyCode": "",
    //   "name":"发热",
    //   "gender":0
    // },data=>{
    //   console.log(data)
    // })
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 375px;
  height: 1000px;
  background-color: aqua;
  .lala {
    color: red;
    font-size: 36px;
  }
  .haah {
    
    font-size: 14px;
  }
}
</style>

