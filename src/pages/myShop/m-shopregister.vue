<template>
  <div class="shopregister_common">
    <header>
      <van-nav-bar
        :title=title
        right-text="导出客户"
        left-arrow
        @click-left="goBack"
        @click-right="isHide = true"
      />
    </header>
    <div class="shopregister_center">
      <van-pull-refresh v-model="isLoading" class="xialashuaxin" @refresh="onRefresh">
        <!-- <p>刷新次数: {{ count }}</p> -->
        <div class="center_search">
          <van-search
            v-model="searchValue"
            placeholder="请输入姓名或手机号"
            show-action
            shape="round"
            @click="inquery"
          >
            <div slot="action" @click="rightShow = true">
              <img src="./imgs/screening_icon@2x.png" alt="">
              筛选
            </div>
          </van-search>
        </div>
        <div class="shopregister_message">
          <van-tabs class="vantab_center" @click="onvanTabs"  v-model="active">
            <div class="shopregister_tips" @click="extension">一键推广店铺链接</div>
            <van-tab class="shopregister_list" title="微店客户">
              
            </van-tab>
            <van-tab class="shopregister_list" title="导入客户">
              <!-- <ul>
                <li v-for="item in 10" @click="goregisterdetails">
                  <div class="pleace_label">
                    <span>请选择标签</span>
                    <span v-if="">...</span>
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
                </li>
              </ul> -->
            </van-tab>
            <div class="shopregister_list">
                <ul>
                  <li v-for="item in customerList" @click="goregisterdetails(item.userCode)">
                    <div v-if="item.label.length != 0" class="pleace_label" >
                      <span v-for="item in item.label">{{item.labelOptionName}}</span>
                      <span v-if="item.label.length == 3">...</span>
                    </div>
                    <div class="pleace_label" v-else>
                      <span >请选择标签</span>
                    </div>
                    <div class="shopregister_operation">
                      <p class="one">{{item.dataCreateTime}}</p>
                      <p class="two">
                        <span>{{item.userName}}</span>
                        <span>{{item.userPhone}}</span>
                        <span class="message_icon" @click.stop="goMessage(item.userPhone)"><img src="./imgs/message_icon@2x.png" alt=""></span>
                        <span class="phone_icon" @click.stop="goPhone(item.userPhone)"><img src="./imgs/phone_icon@2x.png" alt=""></span>
                        <span class="biajidianpu"><img src="./imgs/biajidianpu.png" alt=""></span>
                      </p>
                    </div>
                    <label>        
                        <!-- v-model 双向数据绑定命令 -->
                        <input class="checkItem" type="checkbox" :value="item.userCode" v-model="checkData">
                    </label>
                  </li>
                </ul>
              </div>
          </van-tabs>
        </div>
      </van-pull-refresh>
     <footer v-if="isHide" class="shopregister_footer" :class="{  'nav-hide': hideClass }">
        <van-row>
          <van-col class="footer_top">确认导出（已选{{checkData.length}}）</van-col>
          <van-col class="footer_center" >
            <span @click="cancelExport">取消导出</span>
          </van-col>
          <van-col class="footer_bottom" @click="checkAll($event)">
            <input id="quan" class="footer_bottom_icon" type="checkbox" @click="checkAll($event)">
             <img :src=checkboxImg alt=""> 全选</van-col>
        </van-row>
     </footer>
    </div>
    <!-- 右侧弹出框 -->
    <van-popup v-model="rightShow" position="right" class="rightShow" :overlay="true">
      <div class="rightShow_common" v-for="item in InformationState">
        <p class="rightShow_one">
          <span>{{item.title}}</span>
        </p>
        <p class="rightShow_two">
          <options :options=item.child :isMultiply=true></options>
        </p>
      </div>
      <van-row class="rightShow_footer">
        <van-col @click.native="rightShow = false" span="12" class="rightShow_footer_one">取消</van-col>
        <van-col span="12" class="rightShow_footer_two">确定</van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import utils from "../../utils/utils";
import options from "../../views/options";
import { Search, Tab, Tabs, Popup, Dialog } from "vant";
import {mapState} from 'vuex'
export default {
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    options
  },
  data() {
    return {
      searchValue: "",
      active: 0,
      count: 0,
      isLoading: false,
      docmHeight: document.documentElement.clientHeight, //一开始的屏幕高度
      showHeight: document.documentElement.clientHeight, //一开始的屏幕高度
      hideClass: false,
      isHide: false,
      rightShow: false,
      InformationState: [
        {
          title: "最后跟进时间",
          child: [
            { label: "1个月内", value: 1 },
            { label: "1~2个月内", value: 2 },
            { label: "2~3个月内", value: 3 },
            { label: "3~6个月内", value: 4 },
            { label: "6~12个月内", value: 5 },
            { label: "超过一年", value: 6 }
          ]
        },
        {
          title: "跟进状态",
          child: [
            { label: "无跟进记录", value: 1 },
            { label: "紧急借款", value: 2 },
            { label: "明确有意向", value: 3 },
            { label: "微信已加", value: 4 },
            { label: "联系中", value: 5 },
            { label: "后期可回访", value: 6 },
            { label: "资料已递交", value: 7 },
            { label: "无人接听", value: 8 },
            { label: "资质不够", value: 9 },
            { label: "客户不需要", value: 10 },
            { label: "已归档", value: 11 },
            { label: "已放款", value: 12 }
          ]
        },
        {
          title: "优质标签",
          child: [
            { label: "社保满3个月", value: 1 },
            { label: "社保满6个月", value: 2 },
            { label: "有公积金", value: 3 },
            { label: "有微粒贷", value: 4 },
            { label: "有车", value: 5 },
            { label: "有房", value: 6 },
            { label: "有信用卡", value: 7 },
            { label: "有借呗", value: 8 },
            { label: "芝麻分650+", value: 9 },
            { label: "有保单", value: 10 },
            { label: "已归档", value: 11 },
            { label: "本地客户", value: 12 }
          ]
        }
      ],
      changeRed: "",
      checkData: [],
      customerList:[],
      checkboxImg:require('./imgs/choose_icon@2.png'),
    };
  },
  computed: {
    ...mapState(['title'])
  },
  created() {
    this.Initialization(1)
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        this.showHeight = window.screenHeight;
      })();
    };
  },
  methods: {
    inquery(){
      this.Initialization(1,this.searchValue)
    },
    // 发信息
    goMessage(phone) {
      window.location.href = "sms:" + phone;
    },
    // 拨打电话
    goPhone(phone) {
      window.location.href = "tel://" + phone;
    },
    goBack() {
      this.$router.push({ path: "./myshop" });
    },
    // tab事件
    onvanTabs() {
      this.Initialization(1,'')
    },
    // 一键推广
    extension (){
      Dialog.confirm({
        title: '',
        message: '您还没有创建店铺，请先去编辑保存店铺信息'
      }).then(() => {

      }).catch(() => {
        // on cancel
      });
    },
    // 取消导出
    cancelExport(){
      this.isHide = false
      this.checkData = []
      this.checkboxImg =require('./imgs/choose_icon@2.png')
    },
    // 初始化数据
    Initialization(i,user){
      this.request("wisdom.vshop.vshopLoanUser.queryVshopLoanUserList",{searchStr : user,type :this.active,pageNum:i,pageSize:10}).then(data=>{
        console.log('莉莉',data)
        this.customerList = data.data.dataList
      }).catch(err=>{console.log(err)})
    },
    //跳转到客户详情页
    goregisterdetails(code) {

      if (this.isHide) {
        // 操作全选功能
      } else {
        this.$router.push({ path: "./muserdetails?code="+code });
      }
    },
    checkAll(e) {
      this.checkboxImg =require('./imgs/quanxuan@2x.png')
      console.log(e)
      console.log(this.checkData)
      // 点击全选事件函数
      var checkObj = document.querySelectorAll(".checkItem"); // 获取所有checkbox项
      if (e.target.checked) {
        // 判定全选checkbox的勾选状态
        for (var i = 0; i < checkObj.length; i++) {
          if (!checkObj[i].checked) {
            // 将未勾选的checkbox选项push到绑定数组中
            this.checkData.push(checkObj[i].value);
          }
        }
      } else {
        // 如果是去掉全选则清空checkbox选项绑定数组
        this.checkboxImg =require('./imgs/choose_icon@2.png')
        this.checkData = [];
      }
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.Initialization(1)
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 检测屏幕高度变化
    inputType() {
      if (!this.timer) {
        this.timer = true;
        let that = this;
        setTimeout(() => {
          if (that.docmHeight > that.showHeight) {
            //显示class
            this.hideClass = true;
          } else if (that.docmHeight <= that.showHeight) {
            //显示隐藏
            this.hideClass = false;
          }
          that.timer = false;
        }, 20);
      }
    },
  },
  watch: {
    showHeight: "inputType"
  }
};
</script>
<style scoped lang="less">
.shopregister_common {
  padding-bottom: 50px;
  padding-top: 100px;
  background-color: #f1f1fb;
  input[type="checkbox"] {
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 125px;
    width: 50px;
  }
  .checkItem[type="checkbox"]:checked {
    background: url("./imgs/choose@2x.png") no-repeat center;
    background-size: 100% 100%; 
  }
  .rightShow {
    width: 314px;
    height: 100%;
    background-color: #f1f1fb;
    padding-bottom: 45px;
    .rightShow_common {
      background-color: #fff;
      padding-left: 13px;
      color: #4597fb;
      font-size: 14px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .rightShow_footer {
      line-height: 45px;
      text-align: center;
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      position: fixed;
      bottom: 0px;
      width: 314px;
      .rightShow_footer_one {
        height: 45px;
        background-color: #fff;
        color: #4597fb;
      }
      .rightShow_footer_two {
        height: 45px;
        background-color: #4597fb;
        color: #fff;
      }
    }
    .rightShow_one {
      padding: 27px 0px 12px 0px;
      span {
        border-left: 3px solid #4597fb; /*none*/
        padding-left: 8px;
      }
    }
  }
  .van-tabs--line .van-tabs__wrap {
    border: none;
  }
  header {
    .van-nav-bar__text {
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
    background-color: #f3b13e;
    margin-top: 10px;
    margin-bottom: 15px;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    font-size: 16px;
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
        height: 125px;
        position: relative;
        .pleace_label {
          padding-bottom: 13px;
          border-bottom: 1px solid #e7e7e7; /*no*/
          span {
            display: inline-block;
            padding: 0px 8px;
            height: 23px;
            margin-right: 7px;
            line-height: 23px;
            border-radius: 3px;
            background-color: #e3effe;
            color: #4597fb;
            font-size: 12px;
          }
        }
        .shopregister_operation {
          padding-top: 10px;
          .one {
            color: #aaaaaa;
            font-size: 12px;
          }
          .two {
            margin-top: 10px;
            span {
              font-size: 17px;
              color: #333;
            }
            :nth-child(1) {
              font-weight: bold;
              margin-right: 15px;
            }
            .message_icon,
            .phone_icon,
            .biajidianpu {
              margin-left: 10px;
            }
            .message_icon {
              margin-left: 22px;
              img {
                width: 23px;
                height: 17px;
              }
            }
            .phone_icon {
              img {
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
      }
    }
  }
  .nav-hide {
    position: static !important;
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
    .footer_top,
    .footer_center,
    .footer_bottom {
      height: 44px;
      line-height: 44px;
      border-radius: 3px;
      font-size: 15px;
    }
    .footer_top {
      width: 147px;
      background-color: #4597fb;
    }
    .footer_center {
      width: 120px;
      background-color: #999999;
      margin-left: 8px;
    }
    .footer_bottom {
      background-color: #fff;
      color: #333;
      img {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        margin-right: 5px;
      }
    }
  }
}
</style>