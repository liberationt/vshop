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
export default {
	data(){
		return{

		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		returngo(){
			this.$router.go(-1)
		},
	},
	mounted(){

	}
}
</script>
<style lang="less" scoped>
	.successmain{
		text-align: center;
		padding:70px 15px 0;;
		font-size: 15px;
		color:#333333;
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