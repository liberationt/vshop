<template>
    <div class="backmain">
			<header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="添加银行卡"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header>
			<div class='backcardinfor'>
				<div>
					<h4><span></span>持卡人姓名</h4>
					<div class="backcardname">
						<p>
							<label>姓名</label>
							<input type="text" :disabled = 'falg1' @input="inputC" v-model="bankCardList.realName" placeholder="请输入姓名">
						</p>
						<p>
							<label>身份证</label>
							<input type="text" :disabled = 'falg1' @input="inputC" v-model="bankCardList.idCard" placeholder="请输入身份证">
						</p>
					</div>
				</div>
				<div>
					<h4><span></span>银行卡信息</h4>
					<div class="backcardname">
						<p>
							<label>银行卡号</label>
							<input type="number" class="bankCard" @input="inputC" oninput='if(value.length>19)value=value.slice(0,19)' v-model="bankCardList.bankCardNo" placeholder="请输入银行卡号">
						</p>
						<p>
							<label>预留手机</label>
							<input type="number" @input="inputC" oninput='if(value.length>11)value=value.slice(0,11)' v-model="bankCardList.mobile" placeholder="请输入预留手机号">
						</p>
						<p>
							<label>验证码</label>
							<input type="number" @input="inputC" oninput='if(value.length>6)value=value.slice(0,6)' placeholder="请输入验证码" v-model="bankCardList.vCode">
							<span v-show="show" @click="getCode()">获取</span>
				      <span v-show="!show" >{{count}} s后获取</span>	
						</p>
					</div>
				</div>
				<div v-show="seal_control" style='margin: 0px auto;' id='captcha_div' class="seal_control"></div>
				<div class=backcardtot>
					均加密保存，仅用于银行验证
				</div>
				<div class="addback" :class="{Wr: !flag}" @click="flag && addback()">
					添加
				</div>
			</div>
    </div>
</template>
<script>
import utils from "../../utils/utils";
import { Toast } from "vant";
import { statistics } from "wisdom-h5"
export default {
  components: {
    [Toast.name]: Toast
  },
  data() {
    return {
      bankCardList: {
        realName: "",
        idCard: "",
        bankCardNo: "",
        mobile: "",
        vCode: ""
      },
      seal_control: false,
      flag: false,
      show: true,
      count: "",
      falg1:false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    addback() {
      if(!/^[\u4E00-\u9FA5]{2,20}$/.test(this.bankCardList.realName)){
        this.$toast('姓名输入有误，请重新输入')
        return false;
      }
      if(!/^(\d{17}([0-9]|X|x))$/.test(this.bankCardList.idCard)){
        this.$toast('身份证号输入有误，请重新输入')
        return false;
      }
      if(this.bankCardList.mobile == ""){
        this.$toast('手机号不能为空')
        return false;
      }
      if(!/(1([3-9])[0-9]{9})/.test(this.bankCardList.mobile)){
        this.$toast('手机号输入有误，请重新输入')
        return false;
      }
      statistics.click("bankcard","addbankCard")
			this.request('wisdom.vshop.bankcard.bind',this.bankCardList).then(data=>{
				this.$router.push({path:'./commissionwithdrawal'})
			}).catch(err=>{console.log(err)})
    },
    // 数据初始化
    Initialization() {
      this.request("wisdom.vshop.bankcard.realInfo", {})
        .then(data => {
          if(data.data.realName == null){
            this.falg1 = false
          } else {
            this.bankCardList.realName = data.data.realName
            this.bankCardList.idCard = data.data.idCard
            this.falg1 = true
          }
          this.bankCardList.mobile = data.data.mobile
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取验证码
    getCode(v) {
      if(this.bankCardList.mobile == ""){
        this.$toast('手机号不能为空')
        return false;
      }
      if(!/(1([3-9])[0-9]{9})/.test(this.bankCardList.mobile)){
        this.$toast('手机号输入有误，请重新输入')
        return false;
      }
      let params = v
        ? v
        : {
            captchaId: "",
            verifyCode: "",
            phone: this.bankCardList.mobile,
            type: 3
          };
      this.setTimeout();
      statistics.click("bankcard","getCode")
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
                that.show = false;
                // 接口入参
                let data = {
                  captchaId: captchaId,
                  phone: that.bankCardList.mobile,
                  verifyCode: ret.validate,
                  type: 3
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
    // 定时器
    setTimeout() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    inputC(){
      this.isCheck()
    },
    isCheck(){
      for(var i in this.bankCardList){
        // console.log(i)    //输出属性
        // console.log(this.bankCardList[i])    //输出属性对应的值
        console.log(this.bankCardList[i],i)
        if(this.bankCardList[i] == ""){
          this.flag = false
        } else {
          this.flag = true
        }
        console.log(this.flag)
      }
    },
    //清除定时器
    deleteTime() {
      this.show = true;
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  mounted() {
    this.Initialization();
    statistics.page("bankcard")
  }
};
</script>
<style lang="less">
.backmain {
  background: #f1f1fb;
  height: 100%;
  .backcardinfor {
    .bankCard{
      width: 75%;
    }
    font-size: 14px;
    .backcardname {
      background: #ffffff;
      padding: 0 15px;
      color: #333333;
      p {
        height: 40px;
        border-bottom: 1px solid #f1f1fb /*no*/;
        display: flex;
        align-items: center;
        position: relative;
        label {
          width: 77px;
        }
        input {
          font-size: 16px;
          background-color: #fff;
        }
        span {
          display: inline-block;
          background: #0c85fe;
          padding: 5px 12px;
          border-radius: 2px;
          font-size: 12px;
          color: #ffffff;
          position: absolute;
          right: 0;
          top: 5px;
        }
      }
      p:last-child {
        border: none; /*no*/
      }
    }
    h4 {
      display: flex;
      align-items: center;
      padding: 0 15px;
      height: 43px;
      span {
        display: inline-block;
        width: 3px;
        height: 18px;
        background: #4597fb;
        margin-right: 8px;
        border-radius: 1px;
      }
    }
    .backcardtot {
      text-align: center;
      color: #999999;
      margin: 10px 0 36px;
    }
    .addback {
      height: 45px;
      background: rgba(69, 151, 251, 1);
      border-radius: 23px;
      margin: 0 15px;
      text-align: center;
      line-height: 47px;
      color: #ffffff;
    }
    .Wr{
      background-color: #c2bebe;
    }
  }
}
</style>
