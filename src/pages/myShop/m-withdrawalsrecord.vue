<template>
	<div class="srecordmain">
		<header class="pddingTop navbarrighttext">
			<van-nav-bar
				title="提现记录"
				left-arrow
				@click-left="onClickLeft"
			/> 
		</header>
		<div>
			<van-tabs @click="onClick">
				<van-tab title="待审核"></van-tab>
				<van-tab title="已通过"></van-tab>
				<van-tab title="提现失败"></van-tab>
			</van-tabs>
		</div>
		<div class='detailsList'>
			<ul>
				<li>
					<p>
						<label>提取编号</label>
						<span>TX23333333E0303</span>
					</p>
					<p>
						<label>申请时间</label>
						<span>2018-04-10 19:20:44</span>
					</p>
					<p>
						<label>提现金额</label>
						<span>50.00元</span>
					</p>
					<p>
						<label>申请状态</label>
						<span>审核通过</span>
					</p>
				</li>
				<li>
					<p>
						<label>提取编号</label>
						<span>TX23333333E0303</span>
					</p>
					<p>
						<label>申请时间</label>
						<span>2018-04-10 19:20:44</span>
					</p>
					<p>
						<label>提现金额</label>
						<span>50.00元</span>
					</p>
					<p>
						<label>申请状态</label>
						<span>审核通过</span>
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { Tab, Tabs } from 'vant';
export default {
	components:{
		[Tab.name]:Tab,
		[Tabs.name]:Tabs
	},
	data(){
		return{
			
		}
	
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		onClick(i,t){
			console.log(i,1,t)
		}
	},
	mounted(){
		
	}
}
</script>	
<style lang="less" scoped>
.srecordmain{
	background: #f1f1fb;
	height:100%;
	.detailsList{
		li{
			margin-top: 8px;
			padding:12px 15px 5px;
			background: #ffffff;
			font-size:14px;
			p{
				margin-bottom: 12px;
			}
			label{
				width:110px;
				display: inline-block;
			}
		}
	}
}
	
</style>