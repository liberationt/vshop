<template>
  <div class="muserdetails_common">
    <header class="muserdetails_header" :class="userMessage.loanAmount ? 'muserdetails_header1' : 'muserdetails_header2'">
      <van-nav-bar
        title="客户详情"
      />
    </header>
    <div class="muserdetails_center">
      <div class="muserdetails_message">
        <ul>
          <li class="message_top">
            <p>
              <span class="message_one">{{userMessage.userName}}</span>
              <span class="message_two">{{userMessage.gender}}</span>
              <span>{{userMessage.adNameSecond}}{{userMessage.age}}</span>
            </p>
            <p>
              <span>注册时间：</span>
              <span>{{userMessage.dataCreateTime}}</span>
            </p>
            <p>申请记录：<span class="message_color1">{{userMessage.applyOrderCount}}笔</span> &nbsp  返佣成功：<span class="message_color1">{{userMessage.settleCount}}笔</span></p>
          </li>
          <li class="message_center" v-if="userMessage.loanAmount">
            <p>
              <span class="message_center_one">贷款金额：<span class="message_color">{{userMessage.loanAmount}}</span> </span>
              <span>贷款用途：<span class="message_color">{{userMessage.loanUse}}</span> </span>
            </p>
            <p class="message_center_two">
              <span>贷款期限：<span class="message_color">{{userMessage.loanTimeLimit}}</span> </span>
            </p>
          </li>
          <li class="message_footer clearfix">
            <span class="message_text">{{userMessage.userPhone}}</span>
            <span class="right" @click="goPhone(userMessage.userPhone)"><img src="./imgs/phone_iconyuan@2x.png" alt=""></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="muserdetails_bottom">
      <div class="muserdetails_bottom_one white" v-if="userMessage.label">
        <span v-for="item in userMessage.label" @click="labelOptionNameUpdate(userMessage.label)">{{item.labelOptionName}}</span>
      </div>
      <div v-if="messgaeList00 == 0" class="muserdetails_bottom_two white">
        <p  class="muserdetails_one">
          <span class="muserdetails_one1"></span>
          <span class="muserdetails_one2">基本信息</span>
        </p>
        <div v-for="(v,index) in messgaeList[0].clhild">
          <p v-if="v.text != ''"  :class="index != messgaeList[0].clhild.length-1? 'borderB muserdetails_two' : 'muserdetails_two'">
            <span>{{v.title}}</span>
            <span class="right fontc">{{v.text}}</span>
          </p>
        </div>
      </div>
      <div v-if="messgaeList11 == 0" class="muserdetails_bottom_two white">
        <p  class="muserdetails_one">
          <span class="muserdetails_one1"></span>
          <span class="muserdetails_one2">工作信息</span>
        </p>
        <div v-for="(v,index) in messgaeList[1].clhild">
          <p v-if="v.text != ''"  :class="index != messgaeList[1].clhild.length-1? 'borderB muserdetails_two' : 'muserdetails_two'">
            <span>{{v.title}}</span>
            <span class="right fontc">{{v.text}}</span>
          </p>
        </div>
      </div>
      <div v-if="messgaeList22 == 0" class="muserdetails_bottom_two white">
        <p  class="muserdetails_one">
          <span class="muserdetails_one1"></span>
          <span class="muserdetails_one2">补充信息</span>
        </p>
        <div v-for="(v,index) in messgaeList[2].clhild">
          <p v-if="v.text != ''"  :class="index != messgaeList[2].clhild.length-1? 'borderB muserdetails_two' : 'muserdetails_two'">
            <span>{{v.title}}</span>
            <span class="right fontc">{{v.text}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 右侧弹出框 -->
    <van-popup v-model="rightShow" position="right" class="rightShow" :overlay="true">
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
        <van-col span="12" @click.native="updateTags" class="rightShow_footer_two">更新标签</van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import { Popup, Toast } from "vant";
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Popup.name]: Popup,
  },
  data(){
    return {
      userMessage:{},
      messgaeList:[
        {title:'基本信息',clhild:[]},
        {title:'工作信息',clhild:[]},
        {title:'补充信息',clhild:[]},
      ],
      messgaeList11:1,
      messgaeList22:1,
      messgaeList00:1,
      rightShow:false,
      labeData: [],
      huixianArr:[],
      labelOptionKey:[],
      labelOptionKey1:[],
      userCode:this.$route.query.code,
      labelObj:{},
      materialsArr:[],
      huixianArr:[],
      labelArr:[],
      labelTitleName0:"",
      labelTitleName1:""
    }
  },
  methods:{
    quxiao(){
      this.rightShow = false
      // 数据初始化
      this.Restoration()
    },
    // 初始化数据
    Initialization(){
      this.request("wisdom.vshop.vshopLoanUser.queryVshopLoanUserInfo",{data:this.$route.query.code}).then(data=>{
        this.userMessage = data.data
        let dataList = data.data
        this.messgaeList[0].clhild = [
          {title:'学历',text:dataList.baseInfoRes.educationBackground},
          {title:'婚姻状况',text:dataList.baseInfoRes.marriageStatus}
        ] 
        this.messgaeList[1].clhild = [
          {title:'职业类型',text:dataList.workInfoRes.jobType},
          {title:'工资发放方式',text:dataList.workInfoRes.salaryType},
          {title:'月收入',text:dataList.workInfoRes.monthlyIncome},
          {title:'公司代缴社保',text:dataList.workInfoRes.socialSecurity},
          {title:'公司代缴公积金',text:dataList.workInfoRes.accumulationFund},
        ]//baseInfoRes
        this.messgaeList[2].clhild = [
          {title:'个人信用情况',text:dataList.additionalInfoRes.personalCredit},
          {title:'信用状况',text:dataList.additionalInfoRes.creditStatus},
          {title:'信用卡额度',text:dataList.additionalInfoRes.creditLimit},
          {title:'寿险缴纳情况',text:dataList.additionalInfoRes.guaranteeSlip},
          {title:'微粒贷使用情况',text:dataList.additionalInfoRes.weilidaiStatus},
          {title:'微粒贷额度',text:dataList.additionalInfoRes.weilidaiLimit},
          {title:'芝麻信用分',text:dataList.additionalInfoRes.creditScore},
          {title:'房产情况',text:dataList.additionalInfoRes.ownHouseStatus},
          {title:'所在地区',text:dataList.additionalInfoRes.houseAdNameSecond},
          {title:'产权人',text:dataList.additionalInfoRes.ownerHouse},
          {title:'房产状态',text:dataList.additionalInfoRes.houseStatus},
          {title:'是否抵押',text:dataList.additionalInfoRes.houseIsPledge},
          {title:'车产情况',text:dataList.additionalInfoRes.ownCarStatus},
          {title:'车产状态',text:dataList.additionalInfoRes.carStatus},
          {title:'购车时间',text:dataList.additionalInfoRes.carTime},
          {title:'是否抵押',text:dataList.additionalInfoRes.carIsPledge},
        ]//baseInfoRes
        this.messgaeList[2].clhild.forEach(v=>{
          if(v.text != ""){
            this.messgaeList22 = 0
          }
        })
        this.messgaeList[0].clhild.forEach(v=>{
          if(v.text != ""){
            this.messgaeList00 = 0
          }
        })
        this.messgaeList[1].clhild.forEach(v=>{
          if(v.text != ""){
            this.messgaeList11 = 0
          }
        })
      }).catch(err=>{console.log(err)})
    },
    goPhone(phone){
       window.location.href = "tel://" + phone;
    },
    //选择标签
    labelist() {
      this.request("wisdom.vshop.vshopLoanUser.getFilteringOptions", {})
        .then(data => {
          this.labeData = data.data.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    labelOptionNameUpdate(label){
      // let label = [list]
      this.rightShow = true
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
      }
    },
    // 选择标签事件
    materialsChange(code,name) {
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
    },
    // 更新标签
    updateTags(){
      let parmise 
      if(this.userCode){
        if(this.labelTitleName0 == "" && this.labelTitleName1 == "" && this.materialsArr.length == 0){ // 必须选择一个标签
          this.$toast('请选择标签')
          return false
        }
        this.labelTitleName2 = []
        if(this.materialsArr.length > 0){
          this.materialsArr.forEach(v=>{ // 合并数据
            this.labelTitleName2.push(Object.assign(v,{labelTitleName:""}))
          })
        } else {
          this.labelTitleName2 = []
        }
        parmise = {
          followTime : this.labelTitleName0 == "" ? null : this.labelTitleName0,
          followState : this.labelTitleName1 == "" ? null : this.labelTitleName1,
          optionUpdateReqList : this.labelTitleName2.length > 0 ? this.labelTitleName2 : null,
          userCode : this.userCode
        }
        this.request('wisdom.vshop.userLabel.updateUserLabel',parmise).then(data=>{
          this.rightShow = false
          this.Initialization(1,'',{})
        }).catch(err=>{console.log(err)})
      } else {
        console.log(this.labelArr)
        this.Initialization(1, this.searchValue,Object.assign(this.labelObj,{goodLabelList:this.labelArr}))
      }
    },
  },
  created(){
    window.scrollTo(0,0);
    this.Initialization()
    this.labelist()
  },
  mounted(){
    statistics.page('dateils')
  }
}
</script>
<style lang="less" scoped>
.muserdetails_common {
  background-color: #f1f1fb;
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
        display: inline-block;
        width: 88px;
        height: 32px;
        line-height: 32px;
        background-color: #f4f4f4;
        font-size: 13px;
        color: #333;
        text-align: center;
        border-radius: 2px;
        margin: 0px 10px 10px 0px;
        border: none;
      }
      :last-child {
        margin-right: 0px;
      }
    }
  }
  .fontc{
    color: #333;
  }
  .van-nav-bar{
    background-color: #4597fb;
  }
  .van-nav-bar__title{
    font-size:17px;
    color: #fff;
  }
  .van-hairline--bottom::after{
    border: none;
  }
  .muserdetails_header {
    background:url('./imgs/usertop.png') no-repeat;
    background-size: 100%;
  }
  .muserdetails_header1{
    height: 309px;
  }
  .muserdetails_header2{
    height: 230px;
  }
  .muserdetails_center{
    .muserdetails_message {
      padding: 15px 10px;
      background-color: #fff;
      position: absolute;
      top: 46px;
      left: 15px;
      width: 345px;
      box-shadow:0px 3px 5px 0px rgba(70, 151, 251, 0.35);
      border-radius: 6px;
    }
    .message_top{
      color: #666;
      font-size:14px;
      p{
        margin-bottom: 10px;
      }
      .message_one{
        font-size:17px;
        font-weight:bold;
        color: #333;
        margin-right: 9px;
      }
      .message_two{
        margin-right: 25px
      }
    }
    .message_color1{
      color: #4697FB;
    }
    .message_color{
      color: #4697FB;
      font-weight: bold;
    }
    .message_center{
      color: #333333;
      font-size:15px;
      padding: 15px 0px;
      border-top: 1px dashed #f2f2f2;/*no*/
      border-bottom: 1px dashed #f2f2f2;/*no*/
      .message_center_one{
        margin-right: 58px;
      }
    }
    .message_center_two{
      margin-top: 8px;
    }
    .message_footer{
      padding-top: 11px;
      font-size:14px;
      color: #333333;
      .message_text {
        display: inline-block;
        margin-top: 10px;
      }
      img {
        width: 28px;
        height: 28px;
        vertical-align: center;
      }
    }
  }
  .muserdetails_bottom{
    margin-top: -18px;
    .muserdetails_bottom_one{
      padding: 15px 0px 10px 15px;
      margin-top: 15px;
      span {
        display: inline-block;
        color: #4597FB;
        background-color: #E3EFFE;
        border:1px solid rgba(69,151,251,1);/*no*/
        font-size:12px;
        padding: 7px 0px;
        width: 83px;
        text-align: center;
        border-radius:3px;
        margin-right: 5px;
        margin-bottom: 8px;
      }
    }
    .muserdetails_bottom_two{
      margin-top: 8px;
      padding: 18px 15px 0px 15px;
      color: #999999;
      font-size:14px;
      .muserdetails_one {
        font-size:14px;
        .muserdetails_one1{
          width: 3px;
          height: 18px;
          border-radius: 1px;
          background-color: #4597FB;
        }
        .muserdetails_one2{
          padding-left: 8px;
        }
        span {
          color: #4597FB;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .muserdetails_two{
        padding: 18px 0px;
      }
      .borderB{
        border-bottom: 1px solid #f2f2f2;
      }
    }
  }
}
</style>
