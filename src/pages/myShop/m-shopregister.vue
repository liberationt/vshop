<template>
  <div class="shopregister_common" :class="{heightCommon: customerList.length<=3}">
    <header>
      <van-nav-bar
        :title=title
        right-text="导出客户"
        left-arrow
        @click-left="goBack"
        @click-right="ishide"
      />
    </header>
    <div class="shopregister_center">
      <div @click="inquery" class="searchImg">
        <img src="./imgs/sousuo.png" alt="">
      </div>
      <div class="center_search_center">
        <van-search
          v-model="searchValue"
          placeholder="请输入姓名或手机号"
          show-action
          shape="round"
        >
          <div slot="action" @click="screen">
            <img src="./imgs/screening_icon@2x.png" alt="">
            筛选
          </div>
        </van-search>
      </div>
      
      <van-list v-model="loading" finished-text="没有更多了" :finished="finished" @load="onLoad" class="xialashuaxin haha">
        <div class="shopregister_message">
          <div class="shopregister_tips" @click="extension">一键推广店铺链接</div>
            <div class="shopregister_list">
              <ul>
                <li v-for="item in customerList" @click="goregisterdetails(item.userCode)">
                  <div v-if="item.label.length != 0" @click.stop="selectLabels(item.userCode,item.label)" class="pleace_label" >
                    <span v-if="index<3" v-for="(item,index) in item.label">{{item.labelOptionName}}</span>
                    <span v-if="item.label.length >= 3">...</span>
                  </div>
                  <div @click.stop="selectLabels(item.userCode)" class="pleace_label" v-else>
                    <span >请选择标签</span>
                  </div>
                  <div class="shopregister_operation">
                    <p class="one">{{item.dataCreateTime}}</p>
                    <p class="two">
                      <span class="two1">{{item.userName}}</span>
                      <span>{{item.textPhone}}</span>
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
        </div>
      </van-list>
     <footer v-if="isHide" class="shopregister_footer" :class="{  'nav-hide': hideClass }">
        <van-row>
          <van-col class="footer_top" @click.native="exportAll">确认导出（已选{{checkData.length}}）</van-col>
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
    <van-popup v-model="rightShow" position="right" :close-on-click-overlay=false class="rightShow" :overlay="true">
      <div v-for="(item,i) in labeData">
        <div class="rightShow_common">
          <p class="rightShow_one">
            <span class="rightShow_one1"></span>
            <span class="rightShow_one2">{{item.labelTitleName}}</span>
          </p>
          <p class="rightShow_two">
            <ul class="center_list_two">
              <li v-if="item.labelIsRadio == 1 && item.labelTitleKey =='last_flow_time' " :class={checked:labelOptionKey.includes(item1.labelOptionKey)}  v-for="(item1,index) in item.optionResList" @click="singleElection(item1,item.labelTitleName)">
                {{item1.labelOptionName}}
              </li>
              <li v-if="item.labelIsRadio == 1 && item.labelTitleKey =='flow_state' " :class={checked:labelOptionKey1.includes(item1.labelOptionKey)}  v-for="(item1,index) in item.optionResList" @click="singleElection1(item1,item.labelTitleName)">
                {{item1.labelOptionName}}
              </li>
              <li v-if="item.labelIsRadio == 0" :class="{checked:huixianArr.includes(item1.labelOptionKey)}"  v-for="(item1,index) in item.optionResList" @click="materialsChange(item1,item.labelTitleName)">
                {{item1.labelOptionName}}
              </li>
            </ul>
          </p>
        </div>
        <p v-if="i<2" class="pppp"></p>
      </div>
      <van-row class="rightShow_footer">
        <van-col @click.native="quxiao" span="12" class="rightShow_footer_one">取消</van-col>
        <van-col span="12" @click.native="updateTags" class="rightShow_footer_two">{{labelName}}</van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import utils from "../../utils/utils";
import options from "../../views/options";
import { Search, Tab, Tabs, Popup, Dialog, Toast, List } from "vant";
import { mapState } from "vuex";
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [List.name]: List,
    options
  },
  data() {
    return {
      labelOptionKey:[],
      labelOptionKey1:[],
      searchValue: "",
      count: 0,
      isLoading: false,
      docmHeight: document.documentElement.clientHeight, //一开始的屏幕高度
      showHeight: document.documentElement.clientHeight, //一开始的屏幕高度
      hideClass: false,
      isHide: false,
      rightShow: false,
      InformationState: [],
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
      labelArr:[],
      generalizeStore:{},
      name:"",
      huixianArr:[],
      pageNumber:1,
      finished: true,//控制在页面往下移动到底部时是否调用接口获取数据
			loading: false,//控制上拉加载的加载动画
    };
  },
  computed: {
    ...mapState(["title"])
  },
  created() {
    this.Initialization(1, "",{});
    this.labelist();
    // 一键推广链接
    this.generalizeStoreLink()
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        this.showHeight = window.screenHeight;
      })();
    };
    statistics.page("mshopregister")
  },
  methods: {
    quxiao(){
      this.rightShow = false
      // 数据初始化
      this.Restoration()
    },
    inquery() {
      this.pageNumber = 1
      this.customerList = []
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
    //一键推广店铺链接
    generalizeStoreLink(){
      this.request('wisdom.vshop.vshopStore.generalizeStoreLink',{data:window.location.href}).then(data=>{
        this.generalizeStore = data.data
      }).catch(err=>{console.log(err)})
    },
    // 一键推广
    extension() {
      statistics.click("mshopregister","yjtg")
      let message,generalizeName
      if(this.generalizeStore.hasStore){
        message = this.generalizeStore.text+" "+this.generalizeStore.shortLink
        generalizeName = '去复制内容'
        statistics.click("mshopregister","copy")
      } else {
        message = "您还没有创建店铺，请先编辑保存店铺信息"
        generalizeName = '去编辑'
        statistics.click("mshopregister","bianji")
      }
      Dialog.confirm({
        title: "",
        message: message,
        confirmButtonText:generalizeName
      })
        .then(() => {
          if(this.generalizeStore.hasStore){
            utils.copyContent(this.generalizeStore.text + this.generalizeStore.shortLink)
            Toast('复制成功')
             statistics.click("mshopregister","copy1")
          } else {
            this.$router.push({path:'./meditshop'})
            statistics.click("mshopregister","bianji1")
          }
          
        })
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
    // 确认导出
    exportAll(){
      let arr = []
      this.customerList.forEach(v=>{
        if (this.checkData.indexOf(v.userCode)>-1) {
          arr.push(v.userPhone)
        }
      })
      if(arr.length <= 0){
        this.$toast('请选择用户')
        return false
      }
      utils.copyContent(arr.join(','))
      this.$toast('手机号已复制粘贴板中')
      statistics.click("mshopregister","qrexport")
      // 复制粘贴
    },
    ishide(){
      this.isHide = true
      this.customerList.forEach(v=>{
        this.checkData.push(v.userCode)
      })
      this.checkboxImg = require("./imgs/quanxuan@2x.png");
      statistics.click("mshopregister","export")
    },
    onLoad() {
			setTimeout(() => {
					this.Initialization(2)
			}, 500);
		},
    // 初始化数据
    Initialization(i, user, data1) {
      // console.log('莉莉',)
      this.request("wisdom.vshop.vshopLoanUser.queryVshopLoanUserList", Object.assign({
        searchStr: user,
        type: 0,
        pageNum: this.pageNumber,
        pageSize: 10
      },data1))
        .then(data => {
          let flowList = data.data
          if(JSON.stringify(data1) != "{}"){this.rightShow = false}
          if (Number(flowList.dataList.length) <= 0) {
            this.customerList = []
            this.finished = true
            return false
          }
          if(Number(flowList.total) > 10){
            this.finished = false
            this.loading = false
          }
          this.customerList = this.customerList.concat(flowList.dataList)
          this.pageNumber++
          this.totalPage = flowList.total
          // this.customerList = data.data.dataList;
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
    selectLabels(v,label){
      this.rightShow = true
      this.userCode = v
      this.labelName = '更新标签'
      if(label){ // 数据回显
        this.materialsArr = []
        this.huixianArr = [] // 初始化
        label.forEach(v=>{
          switch(v.labelTitleKey){
            case 'last_flow_time': //最后跟进时间
            this.labelOptionKey = [v.labelOptionKey]
            this.labelTitleName0 = v
            break
            case 'flow_state'://"跟进状态"
            this.labelOptionKey1 = [v.labelOptionKey];
            this.labelTitleName1 = v
            break
            case 'high_quality_label'://"优质标签"
            // 标签数据处理
            this.labeData.forEach(i=>{
              if(i.labelTitleKey == "high_quality_label"){
                i.optionResList.forEach(e=>{
                  if(e.labelOptionKey == v.labelOptionKey){
                    this.materialsArr.push(e) // 更新标签
                    this.huixianArr.push(e.labelOptionKey) //回显数据
                  }
                })
              }
            })
            break
          }
        })
      } else { // 数据
        this.Restoration()
        
      }
    },
    // 筛选确认框
    screen(){
      this.rightShow = true
      this.labelName = '确认'
      // 确保是筛选
      this.userCode = ""
      // 数据初始化
      // this.Restoration()
    },
    // 更新标签
    updateTags(){
      let parmise 
      if(this.userCode){
        console.log(this.materialsArr,"更新标签数据")
        if(this.labelTitleName0 == "" && this.labelTitleName1 == "" && this.materialsArr.length == 0){ // 必须选择一个标签
          this.$toast('请选择标签')
          return false
        }
        this.labelTitleName2 = []
        if(this.materialsArr.length > 0){
          this.materialsArr.forEach(v=>{ // 合并数据
            this.labelTitleName2.push(Object.assign(v,{labelTitleName:this.name}))
          })
        } else {
          this.labelTitleName2 = []
        }
        console.log(this.labelTitleName2)
        parmise = {
          followTime : this.labelTitleName0 == "" ? null : this.labelTitleName0,
          followState : this.labelTitleName1 == "" ? null : this.labelTitleName1,
          optionUpdateReqList : this.labelTitleName2.length > 0 ? this.labelTitleName2 : null,
          userCode : this.userCode
        }
        this.request('wisdom.vshop.userLabel.updateUserLabel',parmise).then(data=>{
          this.rightShow = false
          // 数据初始化
          this.pageNumber = 1
          this.Restoration()
          this.customerList = []
          this.Initialization(1,'',{})
        }).catch(err=>{console.log(err)})
      } else {
        console.log(this.labelArr)
        this.pageNumber = 1
        this.customerList = []
        this.Initialization(1, this.searchValue,Object.assign(this.labelObj,{goodLabelList:this.labelArr}))
      }
    },
    // 选择标签事件
    materialsChange(code,name) {
      console.log(code)
      if(this.huixianArr.includes(code.labelOptionKey)){
        this.materialsArr= this.materialsArr.filter(function (ele){return ele != code;})//回显数据
        this.huixianArr=this.huixianArr.filter(function (ele){return ele != code.labelOptionKey;}); // 更新标签
        this.labelArr = this.labelArr.filter(function (ele){return ele != code.labelOptionKey;}) // 查询条件
			} else {
        this.huixianArr.push(code.labelOptionKey) // 回显数据
        this.materialsArr.push(code) // 更新标签
        this.labelArr.push(code.labelOptionKey) // 查询条件
        this.name = name
      }
      console.log(this.materialsArr)
      // this.changeList(code, this.materialsArr);
      // this.labelTitleName2.push(Object.assign(code,{labelTitleName:name}))
    },
    // 跟进时间
    singleElection(v,name){
      if(this.labelOptionKey.includes(v.labelOptionKey)){
				this.labelOptionKey=this.labelOptionKey.filter(function (ele){return ele != v.labelOptionKey;});
        this.labelTitleName0 = null
        this.labelObj.followTime = ""
			} else {
        this.labelOptionKey = [v.labelOptionKey];
        this.labelTitleName0 = Object.assign(v,{labelTitleName:name}) //更新参数
        this.labelObj.followTime = v.labelOptionKey //查询条件
			}
      // this.labelOptionKey = v
    },
    // 跟进状态
    singleElection1(v,name){
      if(this.labelOptionKey1.includes(v.labelOptionKey)){
				this.labelOptionKey1=this.labelOptionKey1.filter(function (ele){return ele != v.labelOptionKey;});
        this.labelTitleName1 = null
        this.labelObj.followState = ""
			} else {
        this.labelOptionKey1 = [v.labelOptionKey];
        this.labelTitleName1 = Object.assign(v,{labelTitleName:name}) //更新参数
        this.labelObj.followState = v.labelOptionKey // 查询条件
			}
      // this.labelOptionKey1 = v
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
    // 数据还原
    Restoration(){
      // 优质标签
      this.materialsArr = []
      this.labelArr = []
      // 回显数据为空
      this.huixianArr = []
      //跟进时间
      this.labelObj.followTime = ""
      this.labelTitleName0 = ""
      this.labelOptionKey = []
      //跟进状态
      this.labelOptionKey1 =[]
      this.labelTitleName1 = ""
      this.labelObj.followState = ""
      this.labelTitleName2 = []
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
  .searchImg{
    z-index: 9999;
    position: fixed;
    left: 25px;
    top: 66px;
    img {
      width: 16px;
      height: 15px;
    }
  }
  input[type="checkbox"] {
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 114px;
    width: 50px;
  }
  .checkItem[type="checkbox"]:checked {
    background: url("./imgs/choose@2x.png") no-repeat center;
    background-size: 100% 100%;
  }
  .rightShow {
    width: 314px;
    height: 100%;
    padding-bottom: 45px;
    .rightShow_common {
      background-color: #fff;
      padding-left: 13px;
      color: #4597fb;
      font-size: 14px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      // margin-bottom: 8px;
    }
    .pppp{
      display: block;
      height: 8px;
      background-color: #f1f1fb;
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
      border-top: 1px solid #f2f2f2;/*no*/
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
      padding: 20px 0px 12px 0px;
      span{
        display: inline-block;
        vertical-align: middle
      }
      .rightShow_one1{
        width: 3px;
        height: 18px;
        background-color: #4597fb;
        border-radius: 1px;
      }
      .rightShow_one2 {
        padding-left: 8px;
      }
    }
    .rightShow_two {
      .checked {
        background-color: #4597fb;
        color: #fff;
      }
      li {
        font-family:PingFang-SC-Medium;
        width: 88px;
        height: 32px;
        line-height: 34px;
        background-color: #f4f4f4;
        text-align: center;
        border-radius: 2px;
        margin-right: 8px;
        font-weight: 400;
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
  .center_search_center {
    position: fixed;
    top: 46px;
    z-index: 999;
    width: 100%;
    width: 375px;
    font-size: 14px;
    border-top: 1px solid #f2f2f2;/*no*/
    
    .van-cell{
      height: 34px;
      padding-top: 6px;
    }
    .van-search__content{
      background-color: #eee;
    }
    img {
      width: 16px;
      height: 13px;
      margin-bottom: 2px;
    }
  }
  .shopregister_tips {
    text-align: center;
    background-color: #f3b13e;
    height: 44px;
    line-height: 46px;
    border-radius: 22px;
    font-size: 16px;
    color: #fff;
    width: 345px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .shopregister_message {
    .vantab_center {
      background-color: #f1f1fb;
      padding: 0px 15px;
    }
  }
  .shopregister_list {
    ul {
      padding: 0px 15px 15px 15px;
      li {
        background-color: #fff;
        padding: 15px 15px 10px 15px;
        margin-top: 7px;
        border-radius: 5px;
        height: 114px;
        position: relative;
        .pleace_label {
          padding-bottom: 8px;
          border-bottom: 1px solid #f2f2f2; /*no*/
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
          padding-top: 8px;
          .one {
            color: #aaaaaa;
            font-size: 12px;
          }
          .two {
            margin-top: 8px;
            span {
              font-size: 17px;
              color: #333;
              vertical-align: middle
            }
            :nth-child(1) {
              display: inline-block;
              font-weight: bold;
              margin-right: 15px;
              width: 76px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .message_icon,
            .phone_icon,
            .biajidianpu {
              margin-left: 6px;
            }
            .message_icon {
              margin-left: 15px;
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
      line-height: 46px;
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
        margin-bottom: 2px;
      }
    }
  }
}
</style>