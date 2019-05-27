<template>
    <div class="commissdetailmain">
      <header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="佣金明细"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header>
			<div class="commissdetailmaincenter">
				<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功'>
					<div class="search">
						<div class="inputserch">
							<input type="text" placeholder="请输入姓名或手机号">
							<div @click="search"><img src="./imgs/sousuo.png" alt=""></div>
						</div>
					</div>
					<div>
						<van-list
							v-model="loading"
							:finished="finished"
							finished-text="没有更多了"
							@load="onLoad"
						>
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
						</van-list>
					</div>
  			</van-pull-refresh>
			</div>
    </div>
</template>
<script>
import { PullRefresh,List } from 'vant';
export default {
	components:{
		[PullRefresh.name]:PullRefresh,
		[List.name]:List

	},
	data(){
		return{
			loading: false,//控制上拉加载的加载动画
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			isLoading: false,//控制下拉刷新的加载动画
			loading: false,//控制上拉加载的加载动画
      finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		search(){
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
.commissdetailmain{
	background: #f1f1fb;
	height:100%;
	.search{
		background: #ffffff;
		padding:8px 15px;;
	}
}
	.inputserch{
		background: #EEEEEE;
		height:34px;
		font-size:12px;
		color:#aaaaaa;
		line-height: 34px;
		border-radius: 17px;
		position: relative;
		input{
			background:#eeeeee;
			border-radius: 17px;
			text-indent: 20px;
			width:90%;
		}
		img{
			width:16px;height:16px;
			position: absolute;
			right:15px;
			bottom:9px;
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