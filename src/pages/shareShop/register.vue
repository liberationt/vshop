<template>
    <div>
        <div class="register">
            <div class="registerBanner">微店注册</div>
            <div class="infor">
                <p><input type="number" v-model="phonenumber" placeholder="请输入手机号" oninput='if(value.length>11)value=value.slice(0,11)'/></p>
                <p>
                    <input type="number" placeholder="请输入验证码" v-model="verification" oninput='if(value.length>6)value=value.slice(0,6)'/>
                    <span @click="flag && obtain()">{{countext}}</span>
                </p>
                <div v-show="seal_control" style='margin: 0px auto;' id='captcha_div' class="seal_control"></div>
                <div class="rightnow" @click="register">
                    立即注册
                </div>
            </div>
        </div>
        <div class="agree">
			点击立即注册即表示同意<span @click="agree(1)">《用户服务协议》</span>和<span @click="agree(2)">《用户使用规范》</span>
        </div>
    </div>
</template>
<script>
import {Toast,Checkbox} from 'vant'
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
export default {
    components:{
		[Checkbox.name] : Checkbox,
	},
    data(){
        return{
            flag:true,
            countext:'获取验证码',
            phonenumber:'',
            seal_control:false,
            verification:'',
        }
    },
    methods:{
        agree(num){
            this.session()
		    statistics.click("register","readnum");
            if(num==1){
               this.$router.push({path:'./magree'})
            }else{
               this.$router.push({path:'./magree1'})
            }
        },
        session(){
            utils.putlocal('phone',this.phonenumber)
            utils.putlocal('verification',this.verification)
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        register(){
            if(!this.phonenumber){
				Toast({
                    message:'请输入手机号',
                    duration:800
				})
				return false
			}
			if(!/^1[345678]\d{9}$/.test(this.phonenumber)){
				Toast({
					message:'请输入正确格式手机号',
					duration:800
				})
				return false
            }
            if(!this.verification){
                Toast({
					message:'请输入验证码',
					duration:800
				})
				return false
            }
            let data ={
                phone :this.phonenumber,
                captchaCode :this.verification
            }
            this.https('wisdom.vshop.vshopStoreManager.register',data)
            .then(data=>{
                if(data.code=='success'){
		        	statistics.click("register","getnumber");
                    Toast({
                        message:'注册成功',
                        duration:800
                    })
                    utils.setCookie("user", JSON.stringify(data.data));
                    this.$router.push("/myshop");
                }else{
                    Toast({
                        message:data.message,
                        duration:800
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        obtain(v){
            if(!this.phonenumber){
				Toast({
                    message:'请输入手机号',
                    duration:800
				})
				return false
			}
			if(!/^1[345678]\d{9}$/.test(this.phonenumber)){
				Toast({
					message:'请输入正确格式手机号',
					duration:800
				})
				return false
            }
            let data = v?v
			:{
				captchaId: "",
				verifyCode: "",
				phone: this.phonenumber
			};
			this.https('wisdom.vshop.vshopStoreManager.sendRegisterCaptcha',data)
			.then(data=>{
				if(data.code=='success'){
		        	statistics.click("register","getverifyCode");
					Toast({
						message:'短信发送成功',
						duration:800
                    })
                    this.setTimeout()
				}else if (data.code == "110019") {
                   	this.deleteTime();
           			this.seal_control = true;
            		utils.sealControl(data.data.captchaId, (err, ret, captchaId) => {
              			let that = this;
						if (ret != undefined) {
							// 风控关闭
							that.seal_control = false;
							//调用定时器
							that.setTimeout();
							// 接口入参
							let data = {
                                captchaId: captchaId,
                                phone: that.phonenumber,
                                verifyCode: ret.validate
							};
							// console.log(params , '带风控')
							that.obtain(data);
						}
					});
            		this.deleteTime();
				}else{
					Toast({
						message:data.message,
						duration:800
					})
					clearInterval(this.timer)
				}
			}).catch(err=>{
				console.log(err)
				clearInterval(this.timer)
			})
        },
        //清楚定时器
		deleteTime() {
			clearInterval(this.timer);
			this.timer = null;
		},
        setTimeout(){
    	    const TIME_COUNT = 60;
    	    this.flag = false
                 if(!this.timer) {
                    this.count = TIME_COUNT;
                    this.timer = setInterval(() => {
                    if(this.count > 0 && this.count <= TIME_COUNT) {
                      this.count--;
                            this.countext = this.count+' s后获取';
                    } else {
                            this.countext = '获取验证码';
                            this.flag = true;
                        clearInterval(this.timer);
                        this.timer = null;
                     }
                }, 1000)
            }
		},
    },
    mounted(){
		statistics.page("register");
        utils.getlocal('phone')?this.phonenumber=utils.getlocal('phone'):this.phonenumber=""
        utils.getlocal('verification')?this.verification=utils.getlocal('verification'):this.verification=""
        localStorage.removeItem('phone')
        localStorage.removeItem('verification')
    }
}
</script>
<style lang="less" scoped>
.registerBanner{
    height:176px;
    background:url('./images/loginTop.png');
    background-size:100% 100%;
    font-size:17px;
    color:#ffffff;
    text-align: center;
    padding-top:10px;
}
  .infor{
      padding:0 40px;
      margin-top:20px;
      p{
          height:50px;
          border-bottom:1px solid #D3D3D3;
          font-size:15px;
          line-height: 50px;
          position: relative;
          input{
                border: none;
                outline: none;
                line-height: 20px; 
          }
          span{
              color:#4697FB;
              position: absolute;right:0;
          }
      }
      .rightnow{
          height:50px;
          background:#4597FB;
          font-size:18px;
          color:#ffffff;
          line-height:50px;
          text-align:center;
          border-radius: 25px;
          margin-top:30px;
      }
  }  
  .agree{
      text-align: center;
      color:#999999;
      font-size:10px;
      margin-top:18px;
      span{
          color:#4697FB;
      }
  }
</style>