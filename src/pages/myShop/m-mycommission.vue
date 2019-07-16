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
			<div class="mycommis1">
				<span>可提现金额</span>
				<p class="amont">{{mycommission.cashAmountAsFormat}}<span>元</span></p>
			</div>
			<div>
				<span>冻结金额 <span class='frozen'>{{mycommission.frozenAmountAsFormat}}元</span></span>
				<p class="cashmoney" @click='frozenmoney'>提现</p>
			</div>
		</div>
		<div>
			<div class="cashdetail" @click="goMingxi"> 
				<div>
					<img src="./imgs/xianjinming.png" alt="">
					<span>现金明细</span>
				</div>
				<div>
					<van-icon name="arrow" class="cashdetailArrow" color='#4597FB' />
				</div>
			</div>
			<div class='cumulative'>
				<div class='cimulativebor'>
					<span>累计奖励(元)</span>
					<p>{{mycommission.commissionAmountAsFormat}}</p>
				</div>
				<div>
					<span>已提现(元)</span>
					<p>{{mycommission.withdrawAmountAsFormat}}</p>
				</div>
			</div>
			<div class="cashdetail lookall">
				<div>
					<img src="./imgs/yongjinmingxi.png" alt="">
					<span>佣金明细</span>
				</div>
				<div>
					<span @click="lookMingxi">查看全部数据</span><van-icon class="cashdetailArrow" name="arrow" color='#4597FB' />
				</div>
			</div>
		</div>
		<div class="details">
			<ul>
				<li v-for="(item,index) in mycommission.productOrderList">
					<div class='detailstop'>
						<h4><span class="detailstop1">{{item.userName}}</span> &nbsp{{item.userPhone}}</h4>
						<span class="detailstop2">{{item.settleDate}}</span>
					</div>
					<div class="datailslist">
						<div class="div1">
							<h5>贷款产品</h5>
							<p>{{item.productName}}</p>
						</div>
						<div>
							<h5> 贷款金额(元)</h5>
							<p>{{item.loanRealityAmount}}</p>
						</div>
						<div class="div2">
							<h5> 返佣金额(元)</h5>
							<p>{{item.commission}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Icon, Dialog } from 'vant';
import { statistics } from "wisdom-h5"
export default {
	components:{
		[Icon.name]:Icon,
		[Dialog.name]:Dialog,
	},
	data(){
		return{
			mycommission:{},
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		frozenmoney(){
			if(this.mycommission.bindBankcardStatus == 0 ){	
				Dialog.alert({
					message: '提现请先去绑定银行卡',
					confirmButtonText:'请去绑定'
				}).then(() => {
					this.$router.push({path:'./bankcard'}) // 绑卡
				});
			} else {
				statistics.click('mycommission','withdrawal')
				this.$router.push({path:'./commissionwithdrawal'})  //提现
			}
			
		},
		goMingxi(){
			statistics.click('mycommission','goMingxi')
			this.$router.push({path:'./cashdetails'})
		},
		lookMingxi(){
			statistics.click('mycommission','lookMingxi')
			this.$router.push({path:'./commissiondetails'})
		},
		// 数据初始化
		Initialization(){
      this.request("wisdom.vshop.account.detail",{}).then(data=>{
				console.log(data)
				this.mycommission = data.data
      }).catch(err=>{console.log(err)})
    }
	},
	mounted(){
		this.Initialization()
		statistics.page('mycommission')
	}
}
</script>
<style lang="less" scoped>
.mycommissmain{
	background: #f1f1fb;
	// height:100%;
	padding-bottom: 2px;
}
.cashdetailArrow {
	font-size: 18px;
	margin-bottom: 2px;
}
	.mycommis{
		height:113px;
		background: url(./imgs/wodeyongjin-di@2x.png) no-repeat;
		padding:0 15px 0 18px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color:#ffffff;
		font-size:14px;
		background-size: 100%;
		margin-bottom: 7px;
		p{
			margin-top: 15px;
			
		}
		.frozen{
			margin-left:15px;
		}
		.cashmoney{
			height:32px;
			line-height: 34px;
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
	.mycommis1{
		margin-top: 6px;
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
			width:20px;
			height:20px;
			margin-right: 8px;
			margin-bottom: 4px;
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
			font-size:17px;
			color:#999999;
			p{
				font-size:20px;
				color:#4597FB;
				font-weight: bold;
				margin-top: 7px;
			}
		}
		.cimulativebor{
			border-right:1px solid #f1f1fb /*no*/;
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
			margin-bottom: 8px;
			border-radius: 5px;
			padding: 0px 15px;
			.detailstop{
				// height:40px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 15px 0px 6px;
				border-bottom:1px solid #f2f2f2;
				.detailstop1{
					color: #333;
					font-weight: bold;
					font-size: 14px;
				}
				.detailstop2{
					margin-top: 6px;
				}
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
			padding:10px 0px 10px;
			text-align: center;
			.div1{
				text-align: left;
			}
			.div2{
				text-align: right;
			}
			h5{
				font-size:11px;
				color:#999999;
			}
			p{
				font-size:14px;
				color:#4597FB;
				line-height:26px;
				font-weight:bold;
				width: 80px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>