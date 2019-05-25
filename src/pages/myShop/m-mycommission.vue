<template>
	<div class="mycommissmain">
		<header class="pddingTop navbarrighttext">
			<van-nav-bar
				title="我的佣金"
				left-arrow
				@click-left="onClickLeft"
			/> 
		</header>
		<div class="mycommis">
			<div>
				<span>可提现金额</span>
				<p class="amont">1500.0<span>元</span></p>
			</div>
			<div>
				<span>冻结金额 <span class='frozen'>2000元</span></span>
				<p class="cashmoney" @click='frozenmoney'>提现</p>
			</div>
		</div>
		<div>
			<div class="cashdetail">
				<div>
					<img src="./imgs/xianjinming.png" alt="">
					<span>现金明细</span>
				</div>
				<div>
					<van-icon name="arrow" color='#4597FB' />
				</div>
			</div>
			<div class='cumulative'>
				<div class='cimulativebor'>
					<span>累计奖励(元)</span>
					<p>500.7</p>
				</div>
				<div>
					<span>已提现(元)</span>
					<p>980.65</p>
				</div>
			</div>
			<div class="cashdetail lookall">
				<div>
					<img src="./imgs/xianjinming.png" alt="">
					<span>佣金明细</span>
				</div>
				<div>
					<span>查看全部数据</span><van-icon name="arrow" color='#4597FB' />
				</div>
			</div>
		</div>
		<div class="details">
			<ul>
				<li>
					<div class='detailstop'>
						<h4>李光宇138****7897</h4>
						<span>2019-05-08  12:12:50</span>
					</div>
					<div class="datailslist">
						<div>
							<h5>贷款产品</h5>
							<p>人人贷</p>
						</div>
						<div>
							<h5>贷款金额(元）</h5>
							<p>500000.00</p>
						</div>
						<div>
							<h5>返佣金额(元）</h5>
							<p>200.00</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Icon } from 'vant';

export default {
	components:{
		[Icon.name]:Icon
	},
	data(){
		return{
			
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		frozenmoney(){

		}
	}
}
</script>
<style lang="less" scoped>
.mycommissmain{
	background: #f1f1fb;
	height:100%;
}
	.mycommis{
		height:113px;
		background: url(./imgs/mycommission.png);
		padding:0 15px 0 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color:#ffffff;
		font-size:14px;
		p{
			margin-top: 15px;
			
		}
		.frozen{
			margin-left:15px;
		}
		.cashmoney{
			height:32px;
			line-height: 32px;
			width:98px;
			background: #F8A547;
			font-size:18px;
			text-align:center;
			border-radius:15px;
		}
		.amont{
			font-size:35px;
			span{
				font-size:14px;
				margin-left: 5px;
			}
		}
	}
	.cashdetail{
		display: flex;
		justify-content: space-between;
		padding:0 15px;
		background: #ffffff;
		height:50px;
		align-items: center;
		font-size:14px;
		color:#333333;
		margin-bottom: 1px;
		img{
			width:16px;
			height:16px;
			margin-right: 21px;
		}
	}
	.cumulative{
		padding:21px 0;
		background: #ffffff;
		width:100%;
		display: flex;
		div{
			width:50%;
			text-align: center;
			font-size:15px;
			color:#999999;
			p{
				font-size:18px;
				color:#4597FB;
				font-weight: bold;
			}
		}
		.cimulativebor{
			border-right:1px solid #f1f1fb;
		}
	}
	.lookall{
		margin:8px 0;
		div{
			display: flex;
			align-items: center;
			line-height: 20px;
		}
	}
	.details{
		padding:0 15px;
		li{
			background: #ffffff;
			.detailstop{
				height:40px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:0 15px;
				border-bottom:1px solid #D6D6D6;
				h4{
					font-size:14px;
					color:#333333;
				}
				span{
					font-size:10px;
					color:#999999;
				}
			}
		}
		.datailslist{
			display: flex;
			justify-content: space-between;
			padding:10px 15px 10px;
			text-align: center;
			h5{
				font-size:11px;
				color:#999999;
			}
			p{
				font-size:14px;
				color:#4597FB;
				line-height:26px;
			}
		}
	}
</style>