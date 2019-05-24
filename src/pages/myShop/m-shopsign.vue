<template>
  <div class="shopsign_common pddingTop">
    <header>
      <van-nav-bar
        title="微店招牌"
        left-arrow
        @click-left="onGoeditshop"
      />
    </header>
    <div class="shopsign_center clearfix">
      <van-radio-group v-model="radio">
        <div class="center_radio left" @click="radio = '1'">
          <img src="./imgs/biajidianpu.png" alt="">
          <van-radio class="radio" name="1" />
          <p class="img_name">图片名称1</p>
        </div>
        <div class="center_radio left" @click="radio = '2'">
          <img src="./imgs/topimgf.png" alt="">
          <van-radio class="radio" name="2" />
          <p class="img_name">图片名称2</p>
        </div>
      </van-radio-group>
    </div>
    <footer>
      <button @click="shopsignConfirm" class="shopsignConfirm">确认</button>
    </footer>
  </div>
</template>
<script>
import { RadioGroup, Radio, } from 'vant';
export default {
  components:{
    [RadioGroup.name] : RadioGroup,
    [Radio.name] : Radio,

  },
  data(){
    return {
      radio:"",
    }
  },
  methods:{
    // 返回到店铺页
    onGoeditshop(){
      this.$router.push({path:'./meditshop'})
    },
    //确认框
    shopsignConfirm(){
      //成功后跳转
      this.$router.push({path:'./meditshop'})
    }
  }
}
</script>
<style lang="less" scoped>
.shopsign_common {
  background-color: #f1f1fb;
  padding-bottom: 50px;
  .shopsign_center {
    padding-top: 15px;
  }
  .center_radio {
    position: relative;
    text-align: center;
    img {
      width: 165px;
      height: 190px;
      border-radius:5px;
      margin-left: 15px;
    }
    .radio {
      position: absolute;
      right: 0px;
      bottom: 43px;
    }
    .img_name {
      font-size:16px;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:44px;
      text-align: left;
      padding-left: 15px;
    }
  }
  .shopsignConfirm{
    width: 375px;
    height: 50px;
    background-color: #4597FB;
    font-size:16px;
    color: #fff;
    position: fixed;
    bottom: 0px;
  }
  
}
</style>
