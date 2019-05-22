<template>
  <div class="shopsign_common">
    <header>
      <van-nav-bar
        title="微店招牌"
        left-arrow
        @click-left="onGoeditshop"
      />
    </header>
    <div class="shopsign_center clearfix">
      <van-radio-group v-model="radio">
        <div class="center_radio left"  @click="radio = '1'">
          <img src="./imgs/biajidianpu.png" alt="">
          <van-radio class="radio" name="1" />
          <p>图片名称1</p>
        </div>
        <div class="center_radio left" @click="radio = '2'">
          <img src="./imgs/topimgf.png" alt="">
          <van-radio class="radio" name="2" />
          <p>图片名称2</p>
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
      radio:""
    }
  },
  methods:{
    // 返回到店铺页
    onGoeditshop(){
      this.$router.push({path:'./meditshop'})
    },
    //确认框
    shopsignConfirm(){

    }
  }
}
</script>
<style lang="less" scoped>
.shopsign_common {
  .center_radio {
    position: relative;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    .radio {
      position: absolute;
      right: 0px;
      bottom: 20px;
    }
  }
  .shopsignConfirm{
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0px;
  }
}
</style>
