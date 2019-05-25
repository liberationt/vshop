<template>
  <div class="shopregister_common">
    <header>
      <van-nav-bar
        title="我的客户"
        right-text="导出客户"
        left-arrow
        @click-left="goBack"
        @click-right="bounceup = true"
      />
    </header>
    <div class="shopregister_center">
      <div class="center_search">
        <van-search
          v-model="searchValue"
          placeholder="请输入姓名或手机号"
          show-action
          @focus="obtain()"
          @blur="Lose()"
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">
            <img src="./imgs/screening_icon@2x.png" alt="">
            筛选
          </div>
        </van-search>
      </div>
      <div class="shopregister_message">
        <van-tabs class="vantab_center" @click="onvanTabs"  v-model="active">
          <div class="shopregister_tips">一键推广店铺链接</div>
          <van-tab class="shopregister_list" title="微店客户">
            <ul>
              <li v-for="item in 10">
                <div class="pleace_label">
                  <span>请选择标签</span>
                  <span>...</span>
                </div>
                <div class="shopregister_operation">
                  <p class="one">2018-03-20 10:20:33</p>
                  <p class="two">
                    <span>黎明演</span>
                    <span>136 **** 1111</span>
                    <span class="message_icon"><img src="./imgs/message_icon@2x.png" alt=""></span>
                    <span class="phone_icon"><img src="./imgs/phone_icon@2x.png" alt=""></span>
                    <span class="biajidianpu"><img src="./imgs/biajidianpu.png" alt=""></span>
                  </p>
                </div>
                <div class="product_choose">
                  <img src="./imgs/choose@2x.png" alt="">
                </div>
              </li>
            </ul>
          </van-tab>
          <van-tab title="导入客户">内容 3</van-tab>
        </van-tabs>
      </div>
     <footer class="shopregister_footer" v-if="bounceup">
        <van-row>
          <van-col class="footer_top">确认导出（已选19）</van-col>
          <van-col class="footer_center">取消导出</van-col>
          <van-col class="footer_bottom"> <img src="./imgs/Not to choose_icon@2x.png" alt=""> 全选</van-col>
        </van-row>
     </footer>
    </div>
  </div>
</template>

<script>
import utils from "../../utils/utils";
import { Search, Tab, Tabs } from "vant";
export default {
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      searchValue: "",
      bounceup :false,
      active:0
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goBack() {
      this.$router.push({ path: "./myshop" });
    },
    //导出
    onSearch() {},
    obtain(){
      this.bounceup = false
    },
    Lose(){
      this.bounceup = true
    },
    // tab事件
    onvanTabs(){}
  }
};
</script>
<style scoped lang="less">
.shopregister_common {
  padding-bottom: 50px;
  padding-top: 100px;
  .van-tabs--line .van-tabs__wrap {
    border: none;
  }
  header{
    .van-nav-bar__text{
      color: #333;
      font-size: 14px;
    }
  }
  .center_search {
    position: fixed;
    top: 46px;
    z-index: 999;
    width: 100%;
    width: 375px;
    font-size: 14px;
    img {
      width: 16px;
      height: 13px;
      margin-bottom: 2px;
    }
  }
  .shopregister_tips {
    text-align: center;
    background-color: #F3B13E;
    margin-top: 10px;
    margin-bottom: 15px;
    height:44px;
    line-height: 44px;
    border-radius:22px;
    font-size:16px;
    color: #fff;
  }
  .shopregister_message {
    .vantab_center {
      background-color: #f1f1fb;
      padding: 0px 15px;
      padding-top: 45px;
    }
  }
  .shopregister_list {
    ul {
      padding-bottom: 15px;
      li {
        background-color: #fff;
        padding: 15px;
        margin-top: 7px;
        border-radius: 5px;
        position: relative;
        .pleace_label {
          padding-bottom: 13px;
          border-bottom: 1px solid #E7E7E7;/*no*/
          span{
            display: inline-block;
            padding: 0px 8px;
            height:23px;
            margin-right: 7px;
            line-height: 23px;
            border-radius: 3px;
            background-color: #E3EFFE;
            color: #4597FB;
            font-size:12px;
          }
        }
        .shopregister_operation {
          padding-top: 10px;
          .one {
            color: #AAAAAA;
            font-size:12px;
          }
          .two {
            margin-top: 10px;
            span{
              font-size:17px;
              color: #333;
            }
            :nth-child(1){
              font-weight:bold;
              margin-right: 15px;
            }
            .message_icon , .phone_icon , .biajidianpu{
              margin-left: 9px;
            }
            .message_icon {
              margin-left: 28px;
              img {
                width: 23px;
                height: 17px;
              }
            }
            .phone_icon {
              img{
                width: 20px;
                height: 20px;
              }
            }
            .biajidianpu {
              img {
                width: 10px;
                height: 18px;
              }
            }
          }
        }
        .product_choose{
          position: absolute;
          top: 0px;
          right: 0px;
          img {
            height: 125px;
            width: 50px;
          }
        }
      }
    }
  }
  .shopregister_footer {
    text-align: center;
    color: #fff;
    width: 375px;
    position: fixed;
    bottom: 0px;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    padding: 8px 15px;
    .footer_top, .footer_center, .footer_bottom {
      height: 44px;
      line-height: 44px;
      border-radius:3px;
      font-size:15px;
    }
    .footer_top {
      width: 147px;
      background-color: #4597FB;
    }
    .footer_center {
      width: 120px;
      background-color: #999999;
      margin-left: 8px;
    }
    .footer_bottom {
      background-color: #fff;
      color: #333;
      img{
        width: 20px;
        height: 20px;
        margin-left: 10px;
        margin-right: 5px;
      }
    }
  }
}
</style>