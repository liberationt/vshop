<template>
  <div class="home">
    <div class="van-hairline--top"></div>
    <p class="lala">立即注册</p>
    <van-button class="haah" type="default" @click="show = true">默认按钮</van-button>
    <van-button class="haah" loading type="danger" loading-text="加载中..." />

    <van-checkbox v-model="checked" checked-color="#ff4444">复选框</van-checkbox>

    <div>
      <van-tabbar v-model="active" @change="storedValue">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">找客户</van-tabbar-item>
        <van-tabbar-item icon="friends-o">甩单</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
    <input type="text">
    <div>
      <van-popup v-model="show" position="bottom" :overlay="false">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          @cancel="show = false"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { Button, Tabbar, TabbarItem,Checkbox, CheckboxGroup,DatetimePicker,Area,Popup    } from "vant";
import utils from "../utils/utils";
export default {
  name: "home",
  components: {
    HelloWorld,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [DatetimePicker.name]:DatetimePicker,
    [Area.name]:Area,
    [Popup.name]:Popup 
  },
  data() {
    return {
      active: 0,
      checked: true,
      icons:[
        {title:'首页',icon:"home-o"},
        {title:'找客户',icon:"search"},
        {title:'甩单',icon:"friends-o"},
        {title:'我的',icon:"setting-o"},
      ],
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      show:false
    }
  },
  created() {
    utils.setCookie('name','2222')
//     this.request("wisdom.loan.captcha.loanUserSendSmsForRiskH5",{
//       "captchaId": "",
//       "phone": '13939466455',
//       "type": 20000,
//       "verifyCode": "",
//       "name":"发热",
//       "gender":0
//     }).then((data)=>{
// console.log('111====>data:   ',data)
//     }).catch((err)=>{
      
// console.log('111====>err:   ',err)
//     })
  },
  mounted(){
    this.active = utils.getlocal('storedValue')-1
  },
  methods:{
    storedValue(v){
      console.log(v)
      utils.putlocal('storedValue',v+1)
    }
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

