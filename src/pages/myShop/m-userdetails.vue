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
        <span v-for="item in userMessage.label">{{item.labelOptionName}}</span>
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
  </div>
</template>
<script>
export default {
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
    }
  },
  methods:{
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
    }
  },
  created(){
    window.scrollTo(0,0);
    this.Initialization()
  }
}
</script>
<style lang="less" scoped>
.muserdetails_common {
  background-color: #f1f1fb;
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
      border-top: 1px dashed #efefef;/*no*/
      border-bottom: 1px dashed #efefef;/*no*/
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
        border-bottom: 1px solid #efefef;
      }
    }
  }
}
</style>
