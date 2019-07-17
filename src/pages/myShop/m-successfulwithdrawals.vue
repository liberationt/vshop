<template>
    <div>
			<header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="提现成功"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header>
			<div class="successmain">
				<div class="banner_img">
					<img :src=bannerUrl alt="">
				</div>
				<div>
					<img src="./imgs/success.png" alt="">
				</div>
				<div>
					<p>您的提现申请已成功提交</p>
					<p>预计1-3个工作日内到账</p>
				</div>
				<div class="returngo" @click="returngo">
					返回
				</div>
			</div>
    </div>
</template>
<script>
import { statistics } from "wisdom-h5"
export default {
	data(){
		return{
			bannerUrl:""
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		returngo(){
			this.$router.push({path:'./mycommission'})
		},

	},
	mounted(){
		 this.request(
      "wisdom.vshop.withdrawSuccess.getBanner",
      {}
    ).then(data => {
        this.bannerUrl = data.data.banner.bannerUrl
      })
      .catch(err => {
        console.log(err);
			});
		statistics.page("successfulwithdrawals")
	}
}
</script>
<style lang="less" scoped>
	.successmain{
		text-align: center;
		padding:0px 15px 0;
		font-size: 15px;
		color:#333333;
		.banner_img{
			width: 345px;
			margin: 0 auto;
			>img{
				width: 345px;
				height: 175px;
				border-radius: 10px;
				margin-top: 10px;
				margin-bottom: 33px;
			}
		}
		img{
			width:45px;
			height:45px;
			margin-bottom: 20px;
		}
		.returngo{
			height:45px;
			background:rgba(69,151,251,1);
			border-radius:23px;
			margin-top: 70px;
			line-height: 45px;
			color:#ffffff;
		}
	}
</style>