<template>
  <div class="maddproduct_common pddingTop">
    <header>
      <van-nav-bar
        title="添加/编辑自营产品"
        left-arrow
        @click-left="ongobanck"
      />
    </header>
    <div class="editshop_center clearfix">
      <van-row class="center_list">
        <van-col span="12" style="text-align:left;" class="center_geren">公司LOGO</van-col>
        <van-col span="12" style="text-align:right">
          <van-uploader :after-read="onReadTop" class="right">
            <img :src=topImgUrl alt="">
          </van-uploader>
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="12" style="text-align:left">产品名称</van-col>
        <van-col span="12">
          <input type="text" v-model="shopValue.productName" placeholder="请填写产品名称">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="10" style="text-align:left">月利率范围</van-col>
        <van-col span="14">
          <input type="text" v-model="shopValue.productRate" placeholder="请填写月利率如:0.3%-0.5%">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="12" style="text-align:left">最小额度</van-col>
        <van-col span="12">
          <input type="text" v-model="shopValue.limitMin" placeholder="请填写产品最小额度">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <van-col span="12" style="text-align:left">最大额度</van-col>
        <van-col span="12">
          <input type="text" v-model="shopValue.maxAmount" placeholder="请填写产品最大额度">
        </van-col>
      </van-row>
      <van-row class="center_list">
        <p class="center_list_one">
          <span>申请流程</span>
        </p>
        <ul class="center_list_two">
          <li class="left" :class="{checked:processArr.includes(item.productParamCode)}" v-for="(item,index) in processList" @click="processChange(item.productParamCode)"> {{item.productParamName}}</li>
        </ul>
      </van-row>
      <van-row class="center_list">
        <p class="center_list_one">
          <span>申请资料</span>
        </p>
        <ul class="center_list_two">
          <li class="left" :class="{checked:materialsArr.includes(item.productParamCode)}" v-for="(item,index) in materialsList" @click="materialsChange(item.productParamCode)"> {{item.productParamName}}</li>
        </ul>
      </van-row>
      <van-row class="center_list">
        <p class="center_list_one">
          <span>申请条件</span>
        </p>
        <div class="left">
          <textarea class="shop_tarea" v-model="shopValue.productDetail" placeholder="请填写申请条件"></textarea>
        </div>
      </van-row>
    </div>
    <footer>
      <button @click="addProduct">保存</button>
    </footer>
  </div>
</template>
<script>
import { Uploader } from "vant";
export default {
  components: {
    [Uploader.name]: Uploader
  },
  data() {
    return {
      shopValue: {
        productName: "",
        productRate: "",
        limitMin: "",
        maxAmount: "",
        productDetail: ""
      },
      processList: [],
      materialsList: [],
      materialsArr: [],
      processArr: [],
      topImgUrl: require("./imgs/topimgf.png"),
      productLogo:"",
      arr: []
    };
  },
  methods: {
    ongobanck() {
      this.$router.push({ path: "./mselfsupport" });
    },
    onReadTop(file) {
      this.upload(file.file)
        .then(data => {
          this.topImgUrl = data.url;
          this.productLogo = data.url;
        })
        .catch(err => {});
    },
    // 确认提交
    editSubmit() {
      
      // 提交成功后跳转到首页
      // this.$router.push({ path: "./myshop" });
    },
    processChange(code) {
      this.changeList(code, this.processArr);
    },
    materialsChange(code){
      this.changeList(code, this.materialsArr);
    },
    changeList(code, arr) {
      if (arr.includes(code)) {
        //includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        //filter()方法用于把Array的某些元素过滤掉，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素：生成新的数组
        // arr=arr.filter(function (ele){return ele != i;});
        arr.forEach((e, index) => {
          if (e == code) {
            arr.splice(index, 1);
          }
        });
      } else {
        arr.push(code);
      }
    },
    // 保存或编辑
    addProduct() {
      let apiKey, dataList;
      if (this.$route.query.isAdd == "is") {
        // 添加
        dataList = Object.assign(this.shopValue, {
          proprietaryProductSelectReqList:this.arrList(),
          productLogo : this.productLogo
        })
        apiKey = "wisdom.vshop.proprietaryProduct.h5Save";
      } else {
        // 编辑
      }
      this.request(apiKey,dataList).then(data=>{
        this.$router.push({ path: "./mselfsupport" });
      }).catch(err=>{
        console.log(err)
      })
    },
    arrList(){
      let arrList=[]
      this.processArr.forEach(v=>{
        arrList.push({productParamCode:v,productParamType:0})
      })
      this.materialsArr.forEach(v=>{
        arrList.push({productParamCode:v,productParamType:1})
      })
      return arrList
    }
  },
  mounted() {
    // 基础参数
    this.request(
      "wisdom.vshop.proprietaryProductParam.getProprietaryProductParamBaseData",
      {}
    )
      .then(data => {
        const { applicationMaterialList, applicationProcedureList } = data.data;
        this.processList = applicationProcedureList;
        this.materialsList = applicationMaterialList;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.maddproduct_common {
  padding-bottom: 10px;
  .editshop_center {
    padding: 0px 15px;
    .center_list {
      padding: 15px 0px;
      border-bottom: 1px solid #e7e7e7; /*no*/
      font-size: 14px;
      color: #000;
      .center_geren {
        height: 70px;
        line-height: 70px;
      }
      .center_list_one {
        color: #4597fb;
        font-size: 14px;
        span {
          border-left: 5px solid #4597fb; /*no*/
          padding-left: 8px;
        }
      }
      .center_list_two {
        padding-top: 14px;
        .checked {
          background-color: #4597fb;
          color: #fff;
        }
        li {
          width: 80px;
          height: 35px;
          line-height: 35px;
          background-color: #f4f4f4;
          text-align: center;
          border-radius: 2px;
          margin-right: 8px;
        }
        :last-child {
          margin-right: 0px;
        }
      }
      .center_arrow,
      input::-webkit-input-placeholder,
      a {
        color: #999999;
      }
      img {
        width: 70px;
        height: 70px;
      }
      input {
        text-align: right;
        color: #333;
        float: right;
      }
      .shop_tarea {
        border: none;
        margin-top: 10px;
        font-size: 14px;
        color: #999;
        width: 340px;
        height: 78px;
      }
    }
  }
  footer {
    button {
      background: rgba(69, 151, 251, 1);
      box-shadow: 0px 0px 5px 0px rgba(69, 151, 251, 0.15);
      width: 375px;
      height: 50px;
      font-size: 16px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      position: fixed;
      bottom: 0px;
    }
  }
}
</style>
