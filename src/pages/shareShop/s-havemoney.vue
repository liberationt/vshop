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
			<div class="laba"><img src="./images/laba.png" alt=""></div>
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
		<div v-show="seal_control" style='margin: 0px auto;' id='captcha_div' class="seal_control"></div>
		<div class="agree">
			<van-checkbox icon-size='15px' v-model="checked">已阅读并同意<span @click="serviceAgreement">《服务协议》</span></van-checkbox>
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
          {"user": "用户 159****1713 成功借款 60000 元"},
          {"user": "用户 182****6911 成功借款 45000 元"},
          {"user": "用户 188****2752 成功借款 20000 元"},
          {"user": "用户 133****9356 成功借款 10000 元"},
          {"user": "用户 182****9553 成功借款 20000 元"},
          {"user": "用户 131****3087 成功借款 80000 元"},
          {"user": "用户 136****1457 成功借款 30000 元"},
          {"user": "用户 159****2201 成功借款 110000 元"},
          {"user": "用户 185****5284 成功借款 120000 元"},
          {"user": "用户 138****3472 成功借款 180000 元"},
          {"user": "用户 136****4273 成功借款 65000 元"},
          {"user": "用户 156****1380 成功借款 22000 元"},
          {"user": "用户 180****3110 成功借款 70000 元"},
          {"user": "用户 132****2118 成功借款 5000 元"},
          {"user": "用户 180****4627 成功借款 100000 元"},
          {"user": "用户 185****5402 成功借款 75000 元"},
          {"user": "用户 189****6317 成功借款 30000 元"},
          {"user": "用户 139****4616 成功借款 45000 元"},
          {"user": "用户 180****7865 成功借款 15000 元"}
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
			this.$router.push('/serviceagreement')
		},
		//清楚定时器
		deleteTime() {
			clearInterval(this.timer);
			this.timer = null;
		},
		//获取验证码
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
					statistics.click("tap", "havemoney","getobtainsnum");
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
			if(!/^1[345678]\d{9}$/.test(this.phonenumber)){
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
				inviterCode:this.$route.query.inviterCode,
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
		window.scrollTo(0,0);
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
			.havemoneymaintop{
				// padding:0 15px 23px;
				line-height: 40px;
				text-align: center;
				font-size:14px;
				border-bottom:1px solid #EfEfEf;
				img{
					width:10px;height:9px;margin:-2px 7px 0;
				}
				span{
					color:#4897FB;
				}
			}
			.phoneinfor{
				padding:0 15px;
				font-size:14px;
				color:#333333;
				p{
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom:1px solid #EfEfEf;
					span{
						padding-top:1px;
						color:#4896FB;
						padding-left:8px;
						border-left:1px solid #4597FB;
						height:14px;
						line-height:16px;
					}
				}
				input{
					line-height: 46px;
					height:48px;
				}
			}
			.agree{
				padding:0 15px;
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
				margin:0 15px;
				height:50px;
				font-size:16px;
				font-weight:500;
				color:#ffffff;
				text-align:center;
				line-height:52px;
				background: #4597FB;
				border-radius:25px;
			}
		}
		.swiper{
			padding-left:15px;
			position: relative;
			.laba{
				height:40px;
				line-height: 40px;
				position: absolute;
				img{
					width:14px;height:12px;
				}
			}
		}
		.seamless-warp {
      		height: 40px;
			font-size:14px;
			padding-left:20px;
			overflow: hidden;
			li{
				line-height:40px;
			}
 		}
</style>