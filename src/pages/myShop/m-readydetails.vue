<template>
    <div>
      <header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="流水详情"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header>
			<div class="detailsList">
				<ul>
					<li>
						<label>流水号</label>
						<span>{{readyList.flowCode}}</span>
					</li>
					<li>
						<label>类型</label>
						<span>{{readyList.bizDesc}}</span>
					</li>
					<li>
						<label>{{readyList.type == 0 ? "收入" : "支出"}}</label>
						<span :class="readyList.type == 0? 'jiedong' : 'success' ">{{readyList.amount}}{{readyList.unit}}</span>
					</li>
					<!-- <li>
						<label>支付方式</label>
						<span>现金余额</span>
					</li> -->
					<li>
						<label>时间</label>
						<span>{{readyList.time}}</span>
					</li>
					<li>
						<label>余额</label>
						<span>{{readyList.balanceAsFormat}}{{readyList.unit}}</span>
					</li>
					<li>
						<label>备注</label>
						<span>{{readyList.bizRemark}}</span>
					</li>
				</ul>
			</div>
    </div>
</template>
<script>
import { statistics } from "wisdom-h5"
export default {
	data(){
		return{
			readyList:{}
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		// 数据初始化
		Initialization(){
      this.request("wisdom.vshop.account.flowDetail",{flowCode :this.$route.query.code}).then(data=>{
				console.log(data)
				this.readyList = data.data
      }).catch(err=>{console.log(err)})
    }
	},
	mounted(){
		this.Initialization()
		statistics.page("readydetails")
	}
}
</script>
<style lang="less" scoped>
	.detailsList{
		font-size:14px;
		padding:0 14px;
		color:#333333;
		.success{
			color: #FF514C;
		}
		.jiedong{
			color: #3DD624;
		}
		li{
			display: flex;
			justify-content: space-between;
			margin-top: 13px;
			label{
				color:#999999;
			}
		}
	}
</style>