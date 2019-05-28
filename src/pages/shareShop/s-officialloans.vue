<template>
	<div>
		<div class='tochiose'>
			<div class="netloan" @click="tonetloan">网贷</div>
			<div class="amount " @click="toamount">大额</div>
		</div>
		<div class="tittle">
			<p>申请多个产品，可大幅提高贷款成功率</p>
			<div><img src="./images/shuaxin.png" alt="">换一批</div>
		</div>
		<div class="listdata">
			<div class="listdatatop">
				<div>
					<div><img src="" alt=""></div>
				</div>
				<div>
					<h4>大王贷款</h4>
					<p>“门槛低 额度大 放款快 费率低”</p>
				</div>
			</div>
			<div class="listdatabot">
				<div>
					<p style="font-size:16px;color:#FE951E">1万-20万</p>
					<p>可用额度 (元)</p>
				</div>
				<div>
					<p>期限：<span>12个月-36个月</span></p>
					<p>最快当天到账</p>
				</div>
				<div>立即申请</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
    data(){
        return{
					officialdataList:[1]
        }
    },
    methods:{
			todolist(){
				alert(1)
			},
			//网贷
			tonetloan(){

			},
			//大额
			toamount(){

			}
    },
    mounted(){

    }
}
</script>
<style lang="less">
	.tochiose{
		display: flex;
		justify-content: space-between;
		margin-bottom: 14px;
		div{
			width:166px;height:51px;
			font-size:20px;
			line-height: 51px;
			color:#ffffff;
			text-indent: 87px;
			font-weight:bold;
		}
		.netloan{
			background:url(./images/netloan.png);
			background-size:100%;
		}
		.amount{
			background:url(./images/amount.png);
			background-size:100%;
		}
	} 
	.tittle{
		height:40px;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 15px;
		font-size:12px;
		color:#4897FF;
		margin-bottom: 5px;
		img{
			width:16px;
			height:14px;
			margin-right: 8px;
		}
	}
	.listdata{
		margin-bottom:10px;
		background: #ffffff;
		.listdatatop{
			height:53px;
			border-bottom:1px solid #E7E7E7 /*no*/;
			padding:0 15px;
			display: flex;
			align-items: center;
			img{
				width:33px;
				height:33px;
				margin-right: 10px;
			}
			h4{
				font-size:16px;
				color:#333333;
				font-weight: bold;
			}
			p{
				font-size: 11px;
				color:#999999;
				margin-top: 3px;
			}
		}
		.listdatabot{
			display: flex;
			padding:0 15px;
			justify-content: space-between;
			align-items: center;
			height:58px;
			font-size:12px;
			color:#333333;
			div{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
</style>