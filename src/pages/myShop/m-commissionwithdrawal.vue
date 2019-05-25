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
			<div class="commissbanner">
				<img src="" alt="">
			</div>
			<div class="withdrawal">
				<p>
					<span></span>
					提现金额
				</p>
				<div class="withdrawalmoney">
					<span>￥</span>
					<input type="text" v-model="money">
					<span>元</span>
				</div>
				<div class="deduction">扣除提现手续费2%，实际到账 498元</div>
			</div>
			<div class="config">确认提现</div>
			<div class="txsm">
				<p>提现说明</p>
				<p>1. 提现时会验证交易密码，<span>设置或修改交易密码</span></p>
				<p>2. 单笔最小提现金额10元，单笔最大提现金额500元</p>
				<p>3. 每月提现上限5000元</p>
				<p>4. 提现每笔手续费2元，实际到账金额是提现金额减2元</p>
				<p>5. 提交提现申请后，通常1~3个工作日内到账</p>
			</div>
    </div>
</template>
<script>
export default {
		data(){
			return{
				money:600
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			onClickRight(){

			}
		}
}
</script>
<style lang="less">
  .commissbanner{
		height:120px;background: #000;
		margin:10px 15px;
	}  
	.withdrawal{
		padding:15px 0;
		margin:0 15px;
		font-size:14px;
		color:#333333;
		p{
			display: flex;
			align-items: center;
			span{
				display: inline-block;
				height:18px;width:3px;
				background: #4597FB;
				border-radius: 1px;
				margin-right: 8px;
			}
		}
		.withdrawalmoney{
			padding:15px 0;
			display: flex;
			justify-content: space-between;
			font-size:17px;
			color:#999999;
			align-items: center;
			border-bottom:1px solid #F1F1FB;
			input{
				font-size:24px;
				color:#0C85FE;
				width:85%;
			}
		}
		.deduction{
			text-align: right;
			font-size:12px;
			color:#333333;
			padding:14px 0;
		}
	}
	.config{
		height:45px;
		background: #4597FB;
		margin:30px 15px 35px;
		line-height:45px;
		text-align:center;
		color:#ffffff;
		font-size:15px;
		border-radius: 25px;
	}
	.txsm{
		margin:0 15px;
		font-size:12px;
		color:#999999;
		p{
			margin-bottom: 5px;
		}
	}
</style>