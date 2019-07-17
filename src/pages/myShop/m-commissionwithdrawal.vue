<template >
    <div class="commissmain">
			<header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="提现"
					right-text="提现记录"
					left-arrow
					@click-left="onClickLeft"
					@click-right="onClickRight"
				/> 
			</header>
			<div class="commissbanner" :style="{backgroundImage: 'url(' + withdrawalList.bankBackground + ')', backgroundSize:'contain'}">
				<van-row>
					<van-col> <img :src=withdrawalList.bankLogo alt=""> </van-col>
					<van-col>
						<p>
							<span class="p_top">招商银行</span>
							<span>{{withdrawalList.bankcardNo}}</span>
						</p>
						<p>可提现金额：{{withdrawalList.balanceAmountAsFormat}}元</p>
					</van-col>
				</van-row>
			</div>
			<div class="withdrawal">
				<p>
					<span></span>
					提现金额
				</p>
				<div class="withdrawalmoney">
					<span>￥</span>
					<input type="number" @input="inputC" placeholder="请输入提现金额" v-model="money">
					<span>元</span>
				</div>
				<div class="deduction">{{contentT}}元</div>
			</div>
			<div class="config" @click="flag && withdrawal()">确认提现</div>
			<div class="txsm">
				<p>提现说明</p>
				<p>1. 提现时会验证交易密码，<span class="setUp" @click="setUp">设置或修改交易密码</span></p>
				<p>2. 单笔最小提现金额{{withdrawalList.singleMinAmountAsFormat}}元，单笔最大提现金额{{withdrawalList.singleMaxAmountAsFormat}}元</p>
				<p>3. 每月提现上限{{withdrawalList.monthMaxAmountAsFormat}}元</p>
				<p v-if="withdrawalList.chargeType == 1">4. 提现每笔手续费{{withdrawalList.feeAsFormat}}元，实际到账金额是提现金额减{{withdrawalList.feeAsFormat}}元</p>
				<p v-if="withdrawalList.chargeType != 1">4. 提现每笔手续费为提现金额的{{withdrawalList.feeRate}}%，实际到账金额是提现金额减去提现手续费</p>
				<p>5. 提交提现申请后，通常1~3个工作日内到账</p>
			</div>
			<!-- 设置密码框 -->
			<van-popup v-model="psdshow" :close-on-click-overlay=false class="password">
				<div v-if="stepNum ==1">
					<p class="pwdTitle">设置交易密码</p>
					<p class="pwdText">发送至{{withdrawalList.phone}}</p>
					<div class="getCode">
						<p class="pwdInput">
							<span @click="transactionPwd(0)"> <input type="number" disabled v-model="codeNum" oninput='if(value.length>6)value=value.slice(0,6)' placeholder="请输入验证码"> </span>
							<span class="ongetCode" v-show="getCodeshow" @click="flag && getCode()">获取验证码</span>
				      <span class="ongetCode" v-show="!getCodeshow" >{{count}} s后获取</span>	
						</p>
						<div v-show="seal_control" style='margin: 0px auto;' id='captcha_div' class="seal_control"></div>
					</div>
					<p class="getCoodeCaozuo"><span @click="getCancel">取消</span> <span @click="nextStep">下一步</span></p>
				</div>
				<div v-if="stepNum ==2">
					<p class="pwdTitle">请输入交易密码</p>
					<p>
						<van-password-input
							:value="passwordo"
							info=""
							@focus="transactionPwd(1)"
						/>
					</p>
					<p class="getCoodeCaozuo"><span @click="getCancel">取消</span> <span @click="nextStep1">确认</span></p>
				</div>
				<div v-if="stepNum ==3">
					<p class="pwdTitle">请再次输入交易密码</p>
					<p>
						<van-password-input
							:value="passwordT"
							info=""
							@focus="transactionPwd(2)"
						/>
					</p>
					<p class="getCoodeCaozuo"><span @click="getCancel">取消</span> <span @click="nextStep2">完成</span></p>
				</div>
				
			</van-popup>
			<!-- 自定义键盘 -->
			<van-number-keyboard
				:show="showKeyboard"
				extra-key="."
				close-button-text="完成"
				@blur="showKeyboard = false"
				@input="onInput"
				@delete="onDelete"
			/>
    </div>
</template>
<script>
import utils from "../../utils/utils"
import { PasswordInput, NumberKeyboard, Popup, Toast } from "vant"
import { statistics } from "wisdom-h5"
export default {
  components: {
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  data() {
    return {
      money: "",
      withdrawalList: {},
      actualAmount: "",
      flag: true,
      psdshow: false,
      codeNum: "",
      passwordo: "",
      passwordT: "",
      showKeyboard: false,
      transactionNum: "",
      stepNum: 1,
      getCodeshow: true,
      count: 0,
      seal_control: false,
      pwdNum: 0,
      contentT:"",
      tixian:0,
    };
  },
  methods: {
    // 提现金额监听
    inputC(){
      //chargeType 1 元 2百分比 calculateExpress 100.00
      // fee 元
      if(this.withdrawalList.chargeType ==1){
        this.contentT = this.withdrawalList.promptExplain.replace("${amount}",this.money-this.withdrawalList.calculateExpress)
      } else {
        let number = this.money - Math.round(eval(this.withdrawalList.calculateExpress.replace("${x}",Number(this.money))) * 100) / 100
        this.contentT = this.withdrawalList.promptExplain.replace("${amount}",number)
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({path:'./mwithdrawal'})
    },
    // 确认提现
    withdrawal() {
       this.tixian = 0 // 提现
      if(Number(this.money) < this.withdrawalList.singleMinAmount || Number(this.money) > this.withdrawalList.singleMaxAmount){
        this.$toast("提现金额范围为"+this.withdrawalList.singleMinAmount+"-"+this.withdrawalList.singleMaxAmount)
        return false
      }
      if(Number(this.money) > this.withdrawalList.balanceAmountAsFormat){
        this.$toast("提现金额不能大于可提现金额")
        return false
      }
      statistics.click("commissionwithdrawal","tixian")
      window.screenTop(0,0)
      if (this.withdrawalList.havePayPassword == 0) {
        //havePayPassword 0未设置，1已设置
        this.psdshow = true;
        this.pwdNum = 0;
        this.tixian = 0 // 提现
      } else {
        this.psdshow = true;
        this.stepNum = 2;
        this.pwdNum = 2;
        this.passwordo = ""
        this.passwordT = ""
        statistics.click("commissionwithdrawal","password")
      }
    },
    // 设置密码
    setUp() {
      this.psdshow = true
      this.stepNum = 1 // 设置交易密码
      this.tixian = 1 // 设置交易密码
      this.pwdNum = 1 // 判断从哪进
    },
    // 取消
    getCancel() {
      this.psdshow = false;
      this.passwordo = ""
      this.passwordT = ""
      this.codeNum = ""
      this.flag = true
    },
    // 交易密码弹框
    transactionPwd(v) {
      this.showKeyboard = true;
      this.transactionNum = v;
    },
    // 获取验证码
    getCode(v) {
      let params = v
        ? v
        : {
            captchaId: "",
            verifyCode: "",
            phone: this.withdrawalList.phone,
            type: 1
          };
      this.setTimeout();
      statistics.click("commissionwithdrawal","huoCode")
      this.request("wisdom.vshop.sms.sendSmsForRisk", params)
        .then(data => {
          if (data.code == "success") {
            Toast("短信发送成功");
          } else if (data.code == "110019") {
            this.deleteTime();
            this.seal_control = true;
            utils.sealControl(data.data.captchaId, (err, ret, captchaId) => {
              let that = this;
              if (ret != undefined) {
                // 风控关闭
                that.seal_control = false;
                //调用定时器
                that.setTimeout();
                that.getCodeshow = false;
                // 接口入参
                let data = {
                  captchaId: captchaId,
                  phone: that.withdrawalList.phone,
                  verifyCode: ret.validate,
                  type: 1
                };
                // console.log(params , '带风控')
                that.getCode(data);
              }
            });
            this.deleteTime();
          } else {
            this.deleteTime();
          }
        })
        .catch(err => {
          this.deleteTime(), console.log(err);
        });
    },
    //下一步
    nextStep() {
      if (this.codeNum == "") {
        Toast("请输入验证码");
      } else {
        this.request("wisdom.vshop.password.judgeSms", {
          verifyCode: this.codeNum,
          phone: this.withdrawalList.phone,
          smsType: 1
        })
          .then(data => {
            this.stepNum = 2;
            this.deleteTime();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    nextStep1() {
      if (this.passwordo == "" || this.passwordo.length < 6) {
        console.log(this.passwordo)
        Toast("交易密码有误！请重新输入");
      } else {
        if( this.withdrawalList.havePayPassword == 1 && this.tixian == 0){ // 设置交易密码，提现
          this.nextStep2()
        } else {
          this.stepNum = 3;
        }
        
      }
    },
    nextStep2() {
      if (this.passwordT == "" && this.withdrawalList.havePayPassword != 1) {
        Toast("交易密码不能为空");
      } else if (this.passwordT.length < 6 && this.withdrawalList.havePayPassword != 1) {
        Toast("交易密码有误！请重新输入");
      } else if (this.passwordT != this.passwordo && this.withdrawalList.havePayPassword != 1) {
        Toast("两次密码不一致！请重新输入");
      } else {
        if (this.pwdNum == 2 || this.tixian == 0) { // 设置过密码 提现
          this.flag = false;
          this.request("wisdom.vshop.withdraw.apply", {amount : this.money , password :this.passwordo})
            .then(data => {
              console.log(data);
              statistics.click("commissionwithdrawal","txqueren")
							this.$router.push({path:'./successfulwithdrawals'})
            })
            .catch(err => {
              console.log(err);
            });
        } else { // 设置交易密码
          this.request("wisdom.vshop.password.save", {
            password: this.passwordT,
            phone: this.withdrawalList.phone,
            verifyCode: this.codeNum
          })
            .then(data => {
              console.log(data);
              this.stepNum = 1
              this.tixian == 0 // 设置交易密码
              this.psdshow = false
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    onInput(key) {
      if(this.transactionNum == 0){
        this.codeNum = (this.codeNum + key).slice(0, 6);
      } else if (this.transactionNum == 1) {
        this.passwordo = (this.passwordo + key).slice(0, 6);
      } else {
        this.passwordT = (this.passwordT + key).slice(0, 6);
      }
    },
    onDelete() {
      if(this.transactionNum == 0){
        this.codeNum = this.codeNum.slice(0, this.codeNum.length - 1);
      } else if (this.transactionNum == 1) {
        this.passwordo = this.passwordo.slice(0, this.passwordo.length - 1);
      } else {
        this.passwordT = this.passwordT.slice(0, this.passwordT.length - 1);
      }
    },
    // 数据初始化
    Initialization() {
      this.request("wisdom.vshop.withdraw.show", {})
        .then(data => {
          console.log(data);
          this.withdrawalList = data.data;
           this.contentT = this.withdrawalList.promptExplain.replace("${amount}",0)
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 定时器
    setTimeout() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.getCodeshow = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.getCodeshow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //清除定时器
    deleteTime() {
      this.getCodeshow = true;
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  mounted() {
    this.Initialization();
    statistics.page("commissionwithdrawal")
  }
};
</script>
<style lang="less">
.commissbanner {
  height: 120px;
  margin: 10px 15px;
  padding: 35px 0px 0px 21px;
  border-radius: 10px;
  .p_top {
    font-weight: bold;
    font-size: 17px;
    margin-right: 15px;
  }
  p {
    color: #fff;
    font-size: 15px;
    margin-bottom: 13px;
  }
  img {
    width: 55px;
    height: 55px;
    margin-right: 11px;
  }
}
.setUp {
  color: #4597fb;
  border-bottom: 1px solid #4597fb; /*no*/
}
.password {
  width: 289px;
  border-radius: 5px;
  text-align: center;
  padding: 25px 17px;
  font-size: 14px;
  z-index: 1000 !important;
  .pwdTitle {
    margin-bottom: 6px;
    font-size: 17px;
    color: #333333;
  }
  .pwdText {
    color: #4597fb;
    font-size: 11px;
    margin-bottom: 9px;
  }
  .pwdInput {
    width: 256px;
    border: 1px solid #e5e5e5; /*no*/
    padding: 5px 0px 5px 10px;
    text-align: left;
    color: #333;
    input[disabled]{
      background-color: #fff;
      color: black !important;
      -webkit-text-fill-color: #333;
    }
  }
  
  .ongetCode {
    color: #4597fb;
    border-left: 1px solid #c0c0c0; /*no*/
    padding-left: 10px;
  }
  input {
    width: 60%;
    margin-right: 10px;
    color: #333;
    height: 30px;
  }
  .getCoodeCaozuo {
    margin-top: 25px;
    span {
      display: inline-block;
      width: 118px;
      height: 40px;
      line-height: 40px;
      font-size: 17px;
      border-radius: 20px;
      border: 1px solid #4597fb; /*no*/
      color: #4597fb;
    }
    span:nth-last-child(1) {
      background-color: #4597fb;
      color: #fff;
      margin-left: 10px;
    }
  }
}
.withdrawal {
  padding: 15px 0;
  margin: 0 15px;
  font-size: 14px;
  color: #333333;
  p {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      height: 18px;
      width: 3px;
      background: #4597fb;
      border-radius: 1px;
      margin-right: 8px;
    }
  }
  .withdrawalmoney {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    color: #999999;
    align-items: center;
    border-bottom: 1px solid #f1f1fb; /*no*/
    input {
      font-size: 24px;
      color: #0c85fe;
      width: 85%;
      color: #333;
    }
  }
  .deduction {
    text-align: right;
    font-size: 12px;
    color: #333333;
    padding: 14px 0;
  }
}
.config {
  height: 45px;
  background: #4597fb;
  margin: 30px 15px 35px;
  line-height: 45px;
  text-align: center;
  color: #ffffff;
  font-size: 15px;
  border-radius: 25px;
}
.txsm {
  margin: 0 15px;
  font-size: 12px;
  color: #999999;
  p {
    margin-bottom: 5px;
  }
}
</style>