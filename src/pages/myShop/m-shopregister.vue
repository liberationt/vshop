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
            <div slot="action" @click="rightShow = true,labelName = '确认'">
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
                    <div v-if="item.label.length != 0" @click.stop="selectLabels(item.userCode)" class="pleace_label" >
                      <span v-if="index<3" v-for="(item,index) in item.label">{{item.labelOptionName}}</span>
                      <span v-if="item.label.length == 3">...</span>
                    </div>
                    <div @click.stop="selectLabels(item.userCode)" class="pleace_label" v-else>
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
      <div class="rightShow_common" v-for="(item,i) in labeData">
        <p class="rightShow_one">
          <span>{{item.labelTitleName}}</span>
        </p>
        <p class="rightShow_two">
          <ul class="center_list_two">
            <li v-if="item.labelIsRadio == 1 && item.labelTitleKey =='last_flow_time' " :class="{checked:item1 == labelOptionKey}"  v-for="(item1,index) in item.optionResList" @click="singleElection(item1,item.labelTitleName)">
              {{item1.labelOptionName}}
            </li>
            <li v-if="item.labelIsRadio == 1 && item.labelTitleKey =='flow_state' " :class="{checked:item1 == labelOptionKey1}"  v-for="(item1,index) in item.optionResList" @click="singleElection1(item1,item.labelTitleName)">
              {{item1.labelOptionName}}
            </li>
            <li v-if="item.labelIsRadio == 0" :class="{checked:materialsArr.includes(item1)}"  v-for="(item1,index) in item.optionResList" @click="materialsChange(item1,item.labelTitleName)">
              {{item1.labelOptionName}}
            </li>
          </ul>
          <!-- <options :options=item.optionResList :isMultiply=true></options> -->
        </p>
      </div>
      <van-row class="rightShow_footer">
        <van-col @click.native="rightShow = false" span="12" class="rightShow_footer_one">取消</van-col>
        <van-col span="12" @click.native="updateTags" class="rightShow_footer_two">{{labelName}}</van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import utils from "../../utils/utils";
import options from "../../views/options";
import { Search, Tab, Tabs, Popup, Dialog } from "vant";
import { mapState } from "vuex";
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
      labelOptionKey:{},
      labelOptionKey1:{},
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
      customerList: [],
      checkboxImg: require("./imgs/choose_icon@2.png"),
      labeData: [],
      materialsArr: [],
      userCode:"",
      labelTitleName0:"",
      labelTitleName1:"",
      labelTitleName2:[],
      labelName:"",
      labelObj:{},
      labelArr:[]
    };
  },
  computed: {
    ...mapState(["title"])
  },
  created() {
    this.Initialization(1, "",{});
    this.labelist();
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
    inquery() {
      this.Initialization(1, this.searchValue,{});
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
      this.Initialization(1, "",{});
    },
    // 一键推广
    extension() {
      Dialog.confirm({
        title: "",
        message: "您还没有创建店铺，请先去编辑保存店铺信息"
      })
        .then(() => {})
        .catch(() => {
          // on cancel
        });
    },
    // 取消导出
    cancelExport() {
      this.isHide = false;
      this.checkData = [];
      this.checkboxImg = require("./imgs/choose_icon@2.png");
    },
    // 初始化数据
    Initialization(i, user, data1) {
      // console.log('莉莉',)
      this.request("wisdom.vshop.vshopLoanUser.queryVshopLoanUserList", Object.assign({
        searchStr: user,
        type: this.active,
        pageNum: i,
        pageSize: 10
      },data1))
        .then(data => {
          this.customerList = data.data.dataList;
          if(JSON.stringify(data1) != "{}"){this.rightShow = false}
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转到客户详情页
    goregisterdetails(code) {
      if (this.isHide) {
        // 操作全选功能
      } else {
        this.$router.push({ path: "./muserdetails?code=" + code });
      }
    },
    checkAll(e) {
      this.checkboxImg = require("./imgs/quanxuan@2x.png");
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
        this.checkboxImg = require("./imgs/choose_icon@2.png");
        this.checkData = [];
      }
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.Initialization(1);
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 选择标签
    selectLabels(v){
      this.rightShow = true
      this.userCode = v
      this.labelName = '更新标签'
    },
    // 更新标签
    updateTags(){
      let parmise 
      if(this.userCode){
        parmise = {
          followTime : this.labelTitleName0,
          followState : this.labelTitleName1,
          optionUpdateReqList : this.labelTitleName2,
          userCode : this.userCode
        }
        this.request('wisdom.vshop.userLabel.updateUserLabel',).then(data=>{
          this.rightShow = false
          this.Initialization(1,'',{})
        }).catch(err=>{console.log(err)})
      } else {
        this.Initialization(1, this.searchValue,Object.assign(this.labelObj,{goodLabelList:this.labelArr}))
      }
    },
    // 选择标签事件
    materialsChange(code,name) {
      this.changeList(code, this.materialsArr);
      this.labelArr.push(code.labelOptionKey)
      this.labelTitleName2.push(Object.assign(code,{labelTitleName:name}))
    },
    singleElection(v,name){
      this.labelOptionKey = v
      this.labelTitleName0 = Object.assign(v,{labelTitleName:name})
      this.labelObj.followTime = v.labelOptionKey
    },
    singleElection1(v,name){
      this.labelOptionKey1 = v
      this.labelTitleName1 = Object.assign(v,{labelTitleName:name})
      this.labelObj.followState = v.labelOptionKey
    },
    // 选择标签列表
    labelist() {
      this.request("wisdom.vshop.vshopLoanUser.getFilteringOptions", {})
        .then(data => {
          this.labeData = data.data.dataList;
        })
        .catch(err => {
          console.log(err);
        });
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
    }
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
    .rightShow_two {
      .checked {
        background-color: #4597fb;
        color: #fff;
      }
      li {
        width: 88px;
        height: 32px;
        line-height: 32px;
        background-color: #f4f4f4;
        text-align: center;
        border-radius: 2px;
        margin-right: 8px;
      }
      :last-child {
        margin-right: 0px;
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