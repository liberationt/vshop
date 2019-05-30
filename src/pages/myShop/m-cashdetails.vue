<template>
    <div>
      <header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="现金明细"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header> 
			<div class="detailsmain">
				<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin">
					<div>
						<van-list
							v-model="loading"
							:finished="finished"
							finished-text="没有更多了"
							@load="onLoad"
						>
							<div class="details" @click="todetails">
								<div>
									<p>佣金结算</p>
									<p class="detailsmoney">余额：2300元</p>
								</div>
								<div class="detailsright">
									<p>+200</p>
									<p class="datailstimer">2018-02-28 10:59:01</p>
								</div>
							</div>
						</van-list>
					</div>
  			</van-pull-refresh>
			</div>
    </div>
</template>
<script>
export default {
	data(){
		return{
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			isLoading: false,//控制下拉刷新的加载动画
			loading: false,//控制上拉加载的加载动画
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		todetails(){
			this.$router.push('/readydetails')
		},
			// 获取数据
		getdataList(){

		},
		//下拉刷新
		onRefresh() {
			setTimeout(() => {
				 this.isLoading = false; //关闭下拉刷新效果
			}, 500);
		},
		//页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {
			setTimeout(() => {
					alert(1)
					this.loading = false
					this.finished = true
			}, 500);
		}
	},
	mounted(){

	}
}
</script>
<style lang="less" scoped>
	.details{
		display: flex;
		justify-content:space-between;
		align-items: center;
		font-size:14px;
		color:#333333;
		margin:0 17px;
		height:62px;
		border-bottom: 1px solid #E7E7E7 /*no*/;
		div{
			line-height:22px;
		}
		.detailsmoney{
			font-size:12px;
		}
		.detailsright{
			text-align: right;
			.datailstimer{
				color:#999999;
				font-size:12px;
			}
		}
	}
</style>