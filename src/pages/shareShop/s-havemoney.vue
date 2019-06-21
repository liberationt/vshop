<template>
    <div>
			<header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="有钱花"
					left-arrow
					@click-left="returngo"
				/> 
			</header> 
			<div class="havemoneybanner"><img src="./images/havebanner.png" alt=""></div>
			<!-- 轮播图 -->
			<div class="swiper">
				<vue-seamless-scroll :data="listData" :class-option="classOption1" class="seamless-warp">
					<ul class="item">
						<li v-for="(item,i) in listData" :key="i">
							<span class="title" v-text="item.user"></span>
						</li>
					</ul>
				</vue-seamless-scroll>
			</div>
			<div class="backgroundcolor"></div>
			<div class="havemoneymain">
				<p class="havemoneymaintop"><img src='./images/circle.png'/>已经帮助 <span>2,789,233</span> 用户成功申请贷款<img src="./images/circle.png" alt=""></p>
				<div class="phoneinfor" v-show="isshow">
					<p>
						<input type="number"  pattern='[0-9]*' placeholder="请输入手机号码" v-model="phonenumber" oninput='if(value.length>11)value=value.slice(0,11)'>
					</p>
       		<p>
						<input type="number"  pattern='[0-9]*' placeholder="请输入短信验证码" v-model='verification' oninput='if(value.length>6)value=value.slice(0,6)'>
						<span class="get_number" @click="flag && obtain()">{{countext}}</span>
        	</p>
				</div>
				<div class="agree">
					<van-checkbox icon-size='15px' v-model="checked">已阅读并同意<span @click="serviceAgreement">《服务协议》</span>和<span @click="privacyAgreement">《隐私协议》</span></van-checkbox>
				</div>
				<div class="rightapply" @click='immediately'>立即申请贷款</div>
			</div>
    </div>
</template>
<script>
import { NavBar,Field ,Toast, Checkbox } from 'vant';
import { statistics } from "wisdom-h5";
import utils from '../../utils/utils'
export default {
		components:{
			[NavBar.name] : NavBar,
			[Field.name] : Field,
			[Toast.name] : Toast,
			[Checkbox.name] : Checkbox,
		},
    data(){
			return{
				phonenumber:'',
				verification:'',
				flag:true,
				countext:'获取验证码',
				countNumber:1,
				checked:true,
				seal_control:false,
				isshow:false,
				listData: [
          {"user": "用户159****1713邀请5位用户，已赚取265赞豆"},
          {"user": "用户182****6911邀请1位用户，已赚取35赞豆"},
          {"user": "用户188****2752邀请6位用户，已赚取245赞豆"},
          {"user": "用户133****9356邀请5位用户，已赚取265赞豆"},
          {"user": "用户182****9553邀请6位用户，已赚取810赞豆"},
          // {"user": "用户131****3087邀请4位用户，已赚取185赞豆"},
          // {"user": "用户136****1457邀请3位用户，已赚取135赞豆"},
          // {"user": "用户159****2201邀请2位用户，已赚取70赞豆"},
          // {"user": "用户185****5284邀请1位用户，已赚取65赞豆"},
          // {"user": "用户138****3472邀请6位用户，已赚取245赞豆"},
          // {"user": "用户136****4273邀请1位用户，已赚取35赞豆"},
          // {"user": "用户156****1380邀请6位用户，已赚取510赞豆"},
          // {"user": "用户180****3110邀请2位用户，已赚取70赞豆"},
          // {"user": "用户132****2118邀请8位用户，已赚取810赞豆"},
          // {"user": "用户180****4627邀请1位用户，已赚取65赞豆"},
          // {"user": "用户185****5402邀请7位用户，已赚取305赞豆"},
          // {"user": "用户189****6317邀请5位用户，已赚取1075赞豆"},
          // {"user": "用户139****4616邀请3位用户，已赚取135赞豆"},
          // {"user": "用户180****7865邀请1位用户，已赚取35赞豆"},
          // {"user": "用户185****6312邀请5位用户，已赚取1075赞豆"},
          // {"user": "用户136****5445邀请5位用户，已赚取1075赞豆"},
          // {"user": "用户138****0153邀请6位用户，已赚取810赞豆"},
          // {"user": "用户185****3844邀请2位用户，已赚取70赞豆"},
          // {"user": "用户150****6360邀请7位用户，已赚取305赞豆"},
          // {"user": "用户182****7197邀请5位用户，已赚取1075赞豆"},
          // {"user": "用户177****8395邀请11位用户，已赚取1435赞豆"},
          // {"user": "用户185****5284邀请7位用户，已赚取305赞豆"},
          // {"user": "用户159****8689邀请6位用户，已赚取510赞豆"},
          // {"user": "用户189****9837邀请6位用户，已赚取510赞豆"}
        ],
			}
		},
		computed: {
      // 轮播图
      classOption1() {
        return {
         	step: 0.2,
          	limitMoveNum: 3,
			openTouch: false ,
					
        };
      }
    },
	methods:{
		returngo(){
			this.$router.go(-1)
		},
		//同意服务协议
		serviceAgreement(){
			this.$router.push('/')
		},
		privacyAgreement(){
			this.$router.push('/')
		},
		//清楚定时器
		deleteTime() {
			clearInterval(this.timer);
			this.timer = null;
		},
		//获取验证码
		obtain(v){
			statistics.click("tap", "havemoney","getobtainsnum");
			if(!this.phonenumber){
				Toast({
						message:'请输入手机号',
						duration:800
					})
				return false
			}
			if(!/^1[34578]\d{9}$/.test(this.phonenumber)){
				Toast({
					message:'请输入正确格式手机号',
					duration:800
				})
				return false
			}
			this.setTimeout()
			let data = v?v
			:{
				captchaId: "",
				verifyCode: "",
				phone: this.phonenumber
			};
			this.request('wisdom.vshop.vshopLoanUser.sendCaptcha',data)
			.then(data=>{
				if(data.code=='success'){
					Toast({
						message:'短信发送成功',
						duration:800
					})
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
                  phone: that.userPhone,
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
		//立即领取
		immediately(){
			if(utils.getCookie('user')){
				statistics.click("tap", "havemoney","todetails");
				this.$router.push('/applicationloan')
			}else{
			if(!this.phonenumber){
				Toast({
						message:'请输入手机号',
						duration:800
					})
				return false
			}
			if(!/^1[34578]\d{9}$/.test(this.phonenumber)){
				Toast({
					message:'请输入正确格式手机号',
					duration:800
				})
				return false
			}
			if(!this.verification){
				Toast({
						message:'请获取验证码',
						duration:800
				})
				return false
			}
			if (!/^[0-9]*$/.test(this.verification) || this.verification.length < 6) {
				Toast("验证码有误，请重新输入！");
				return false;
			}
			let data={
				captchaCode:this.verification,
				phone:this.phonenumber
			}
			this.request('wisdom.vshop.vshopLoanUser.captchaLogin',data)
			.then(data=>{
				if(data.code=='success'){
					statistics.click("tap", "havemoney","todetails");
					if(!utils.getCookie('user')){
							let str = {
								token:data.data.token,
								userId:data.data.userId
							}
							utils.setCookie('user',JSON.stringify(str))
						}
					this.$router.push('/applicationloan')
				}
			})
		}
		}
	},
	mounted(){
		if(utils.getCookie('user')){
			this.isshow = false
		}else{
			this.isshow=true
		}
		statistics.page("havemoney", "getnumber");
	}
}
</script>
<style lang="less" scoped>
    .havemoneybanner{
			height:180px;
		}
		.backgroundcolor{
			height:10px;
			background: #f1f1fb;
		}
		.havemoneymain{
			padding:0 15px 23px;
			.havemoneymaintop{
				line-height: 40px;
				text-align: center;
				font-size:14px;
				img{
					width:10px;height:10px;margin:-2px 7px 0;
				}
				span{
					color:#4897FB;
				}
			}
			.phoneinfor{
				font-size:14px;
				color:#333333;
				p{
					display: flex;
					justify-content: space-between;
					align-items: center;
					span{
						color:#4896FB;
					}
				}
				input{
					line-height: 46px;
					height:48px;
				}
			}
			.agree{
				height:55px;
				line-height: 55px;
				font-size:12px;
				.van-checkbox{
					height:55px;
				}
				span{
					color:#4896FB;
				}
			}
			.rightapply{
				height:50px;
				font-size:14px;
				color:#ffffff;
				text-align:center;
				line-height:50px;
				background: #4597FB;
				border-radius:25px;
			}
		}
		.seamless-warp {
        height: 40px;
        overflow: hidden;
				font-size:14px;
				padding-left:15px;
				li{
					line-height:40px;
				}
    }
</style>