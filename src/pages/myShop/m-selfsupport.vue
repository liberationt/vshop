<template>
  <div class="mselfsupport_common pddingTop">
    <header>
      <van-nav-bar
        title="自营产品"
        left-arrow
        @click-left="ongobanck"
      />
    </header>
    <div class="mselfsupport_center">
      <van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh">
        <div class="mselfsupport_modal" v-for="item in selfsupportList" @click="goShopdetails(item.proprietaryProductCode)">
          <van-row>
            <van-col>
              <img :src=item.productLogo alt="">
            </van-col>
            <van-col>
              <p class="modal_text">{{item.productName}}</p>
              <p>综合月利率：<span class="modal_color">{{item.productRate}}</span></p>
              <p>贷款额度：<span class="modal_color">{{item.limitMax+'元'+'-'+item.limitMin+'元'}}</span></p>
            </van-col>
          </van-row>
        </div>
      </van-pull-refresh>
      
    </div>
    <footer class="mselfsupport_footer" @click="addproduct">
      添加自营产品
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      selfsupportList:[]
    };
  },
  methods: {
    ongobanck() {
      this.$router.push({ path: "./myshop" });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    addproduct() {
      this.$router.push({ path: "./maddproduct?isAdd="+'is' });
    },
    goShopdetails(code){
      this.$router.push({ path: "./mselfshopdetails?code="+code });
    },
    Initialization(i){
      this.request("wisdom.vshop.proprietaryProduct.queryH5Page",{pageSize:10,pageNum:i}).then(data=>{
        console.log(data)
        this.selfsupportList = data.data.dataList
      }).catch(err=>{console.log(err)})
    },
  },
  created(){
    this.Initialization(1)
  }
};
</script>
<style lang="less" scoped>
.mselfsupport_common {
  background-color: #f1f1fb;
  padding-bottom: 60px;
  padding-top: 60px;
  .mselfsupport_center{
    .mselfsupport_modal {
      font-size:14px;
      font-family:PingFang-SC-Regular;
      font-weight:bold;
      color: #999999;
      width: 345px;
      margin: 0 auto;
      background-color: #fff;
      padding: 13px 0px 15px 15px;
      border-radius:5px;
      line-height: 23px;
      margin-bottom: 10px;
      .modal_text{
        color: #333333;
        font-size:17px;
        margin-top: -5px;
      }
      .modal_color {
        color: #FE951E;
      }
      img{
        width: 60px;
        height: 60px;
        margin-right: 15px;
      }
    }
  }
  .mselfsupport_footer {
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: bold;
    text-align: center;
    color: #fff;
    width: 375px;
    height: 50px;
    background: rgba(69, 151, 251, 1);
    box-shadow: 0px 0px 5px 0px rgba(69, 151, 251, 0.15);
    line-height: 50px;
    position: fixed;
    bottom: 0px;
  }
}
</style>

