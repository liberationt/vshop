<template>
  <div class="shopsign_common pddingTop" :class="{heightCommon: imgList.length<4}">
    <header>
      <van-nav-bar
        title="微店招牌"
        left-arrow
        @click-left="onGoeditshop"
      />
    </header>
    <div class="shopsign_center clearfix">
      <van-radio-group v-model="radio">
        <div class="center_radio left" v-for="(item,index) in imgList"  @click="imgChange(index,item)">
          <img :src=item.bannerUrl alt="">
          <van-radio class="radio" :name=index />
          <p class="img_name">{{item.bannerName}}</p>
        </div>
      </van-radio-group>
    </div>
    <footer>
      <button @click="shopsignConfirm" class="shopsignConfirm">确认</button>
    </footer>
  </div>
</template>
<script>
import { RadioGroup, Radio, } from 'vant'
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5"
export default {
  components:{
    [RadioGroup.name] : RadioGroup,
    [Radio.name] : Radio,

  },
  data(){
    return {
      radio:"",
      imgList:[],
      bannerName:''
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
      this.$router.push({path:'./meditshop?id='+1})
      statistics.click("mshopsign","shopsignConfirm")
    },
    imgChange(i,data){
      this.radio = i
      this.bannerNmae = name
      utils.putlocal('bannerData',data)
      statistics.click("mshopsign","bannerData",{bannerData:data})
    },
    //页面初始化参数
    Initialize(){
      this.request('wisdom.vshop.vshopStoreManager.queryStoreBanner',{}).then(data=>{
        console.log(data)
        this.imgList = data.data.dataList
        this.imgList.forEach((v,i)=>{
          if(v.select == 1){
            this.radio = i
          }
        })
      }).catch(err=>{console.log(err)})
    }
  },
  created(){
    this.Initialize()
  },
  mounted(){
    statistics.page("mshopsign")
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
      width: 155px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
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
