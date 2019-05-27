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
						<span>201804201020120001</span>
					</li>
					<li>
						<label>类型</label>
						<span>提现成功</span>
					</li>
					<li>
						<label>收入</label>
						<span>1123元</span>
					</li>
					<li>
						<label>支付方式</label>
						<span>现金余额</span>
					</li>
					<li>
						<label>时间</label>
						<span>2018-12-21  12:12:21</span>
					</li>
					<li>
						<label>余额</label>
						<span>11.21元</span>
					</li>
					<li>
						<label>备注</label>
						<span>测试的呀</span>
					</li>
				</ul>
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
		}
	}
}
</script>
<style lang="less" scoped>
	.detailsList{
		font-size:14px;
		padding:0 14px;
		color:#333333;
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