<template>
    <div class="stiflmain">
			<header class="pddingTop">
				<van-nav-bar left-arrow fixed @click-left="onClickLeft" :title='tittle'
				/>
			</header>
			<div class="stiflimg" v-if='$route.query.productType!=3'>
				<img :src=bannerUrl alt="">
			</div>
			<div class="applyinfor">
				<h4><span></span>申请人信息</h4>
				<div>
					<p>
						<span>手机号</span>
						<input type="number" :disabled='disableds' v-model="userPhone" oninput='if(value.length>11)value=value.slice(0,11)'>
					</p>
					<p v-show="isshow">
						<span>验证码</span>
						<input type="number" v-model="verification" style="width:140px;" oninput='if(value.length>6)value=value.slice(0,6)'>
						<i style='color:#4697FB' @click="obtain()&&flag">{{content}}</i>
					</p>
					<p>
						<span>姓名</span>
						<input type="text" v-model="userName">
					</p>
					<p>
						<span>身份证号</span>
						<input type="text" v-model="idCard" oninput='if(value.length>18)value=value.slice(0,18)'>
					</p>
					<p class="productcity" @click="tocity">
						<span>工作城市</span>
						<input type="text" v-model="city" readonly="value">
					</p>
				</div>
			</div>
			<div v-show="seal_control" style='margin: 0px auto;' id='captcha_div' class="seal_control"></div>
			<div class="comform" @click="confim">
				确认资料
			</div>
			<div class="recommender">
				<span><img src="./images/animos.png" alt=""></span>
				<span>推荐人：{{managerPhone}}</span>
			</div>
			<div v-show="flags" class="citystyle">
				<van-area :area-list="areaList" :columns-num="2" title="请选择城市" @confirm="onAddrConfirm" @cancel='displar'/>
			</div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
import { Toast,Area } from 'vant';
import areaList from '../../static/area'
export default {
	components:{
		[Area.name]:Area
	},
	data(){
		return{
			tittle:'',
			bannerUrl:'',
			userPhone:'',
			verification:'',
			userName:'',
			idCard:'',
			content:'获取验证码',
			managerPhone:'',
			flag:true,
			seal_control:false,
			isshow:false,
			disableds:false,
			city:'',
			flags:false,
			areaList:areaList
		}
	},
	methods:{
		//跳转城市
		onClickLeft(){
			this.$router.go(-1)
		},
		tocity(){
			this.flags = true
		},
		onAddrConfirm(item){
				this.city = item[1].name
				this.flags = false
			},
			displar(){
				this.flags = false
			},
		//提交
		confim(){
			let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			if(!this.userPhone){
				Toast({
						message:'请输入手机号',
						duration:800
					})
				return false
			}
			if(!/^1[34578]\d{9}$/.test(this.userPhone)){
				Toast({
					message:'请输入正确格式手机号',
					duration:800
				})
				return false
			}
			if(!utils.getCookie('user')){
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
			}
			if(!this.userName){
				Toast({
					message:'请输入姓名',
					duration:800
				})
				return false
			}
			if(!/^[\u4e00-\u9fa5]{1,10}$/.test(this.userName)){
				Toast({
					message:'请输入正确姓名',
					duration:800
				})
				return false
			}
			/^[\u4e00-\u9fa5]{1,50}$/
			if(!this.idCard){
				Toast({
					message:'请输入身份证号',
					duration:800
				})
				return false
			}
			if(!reg.test(this.idCard)){
				Toast({
					message:'请输入正确格式证件号',
					duration:800
				})
				return false
			}
			if(!this.city){
				Toast({
					message:'请选择城市',
					duration:800
				})
				return false
			}
			let ={
				inviterCode:this.$route.query.inviterCode,
				productCode:this.$route.query.productCode,
				useparamsrPhone:this.userPhone,
				verifyCode:this.verification,
				userName :this.userName,
				idCard:this.idCard,
				adNameSecond:this.city
			}
			if(this.$route.query.productType){
				params.productType = this.$route.query.productType
			}
			this.request('wisdom.vshop.product.h5BeforeJumpconfirmData',params)
			.then(data=>{
				if(data.code=='success'){
					utils.setCookie('adNameSecond',this.city)
					if(!utils.getCookie('user')){
						let str = {
							token:data.data.token,
							userId:data.data.userId
						}
						utils.setCookie('user',JSON.stringify(str))
					}
					if(data.data.productType===3){
						Toast({
							message:'提交申请成功',
							duration:800
						})
						this.$router.push('/relatedproducts?index='+2+'&desabled='+'自营')
					}else{
						window.location.href = data.data.jumpUrl
					}
					
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
			if(!this.userPhone){
				Toast({
						message:'请输入手机号',
						duration:800
					})
				return false
			}
			if(!/^1[34578]\d{9}$/.test(this.userPhone)){
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
				phone: this.userPhone
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
				this.content = this.count+' s后获取';
	        } else {
				this.content = '获取验证码';
				this.flag = true;
		        clearInterval(this.timer);
		        this.timer = null;
	         }
         }, 1000)
       }
		},
		//清楚定时器
		deleteTime() {
		clearInterval(this.timer);
		this.timer = null;
		},
		getdata(){
			let data = {
				inviterCode:this.$route.query.inviterCode,
				productCode:this.$route.query.productCode
			}
			if(this.$route.query.productType){
				data.productType = this.$route.query.productType
			}
			this.request('wisdom.vshop.product.h5BeforeJumpDetail',data)
			.then(data=>{
				if(data.code=='success'){
					this.userPhone=data.data.userPhone
					this.userName = data.data.userName
					this.idCard = data.data.idCard
					this.managerPhone = data.data.managerPhone
					this.bannerUrl = data.data.bannerUrl
					this.tittle = data.data.productName
					this.city = data.data.adNameSecond
				}
			})
		}
	},
	mounted(){
		if(utils.getCookie('user')){
			this.isshow = false
			this.disableds = true
		}else{
			this.isshow=true
			this.disableds = false
		}
		this.getdata()
		utils.ip(e=>{
			this.city = e
		},data=>{
			if(utils.getCookie('adNameSecond')){
				this.city = utils.getCookie('adNameSecond')?utils.getCookie('adNameSecond'):this.city 
			}
		})
	}
}
</script>
<style lang="less">
	.stiflmain{
		background: #f1f1fb;
		// height:100%;
		padding-bottom:25px;
	}
	.stiflimg{
		height:157px;
		img{
			width:100%;
			height:100%;
		}
	}
	.applyinfor{
		padding:0 15px;
		background: #ffffff;
		h4{
			line-height: 44px;
			font-size:14px;
			color:#4597FB;
			span{
				display: inline-block;
				height:18px;
				width:3px;
				background: #4597FB;
				border-radius: 1px;
				margin-right: 8px;
			}
		}
		div{
			p{
				height:48px;
				font-size:14px;
				color:#333333;
				line-height: 48px;
				border-bottom:1px solid #E7E7E7;
				span{
					display:inline-block;
					width:118px;
				}
				input{
					height:40px;
					border:none;
				}
				input:disabled {
					background: #ffffff;
					color:#999999
				}
			}
			:last-of-type{
				border:none;
			}
		}
	}
	.comform{
		height:50px;
		background: #4597FB;
		margin:30px 15px 60px;
		border-radius: 25px;
		text-align: center;
		line-height: 50px;
		font-size:16px;
		color:#ffffff;
	}
	.recommender{
		margin:0 97px;
		height:35px;
		// background: #E7F7FD;
		border-radius:0px  18px   18px  0px;
		line-height:35px;
		color:#4597FB;
		font-size:12px;
		img{
			width:35px;height:35px;border-radius: 50%;margin-right: 10px;
		}
	}
	.citystyle{
			position:absolute;
			bottom:0;
			width:100%;
		}
</style>