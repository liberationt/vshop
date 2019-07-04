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
						<div v-for="item in cashdetailsList.dataList" class="details" @click="todetails(item.flowCode)">
							<div>
								<p>{{item.bizDesc}}</p>
								<p class="detailsmoney">余额：{{item.balanceAsFormat}}{{item.unit}}
								</p>
							</div>
							<div class="detailsright">
								<p :class="item.type == 0? 'jiedong' : 'success' ">{{item.type==0?'+' : '-'}}{{item.amountAsFormat}}</p>
								<p class="datailstimer">{{item.time}}</p>
							</div>
						</div>
					</div>
  			</van-pull-refresh>
			</div>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
	data(){
		return{
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			isLoading: false,//控制下拉刷新的加载动画
			loading: false,//控制上拉加载的加载动画
			cashdetailsList:{},
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		todetails(code){
			this.$router.push('/readydetails?code='+code)
		},
			// 获取数据
		getdataList(){

		},
		//下拉刷新
		onRefresh() {
			setTimeout(() => {
					this.Initialization(1)
					this.$toast("刷新成功");
				 this.isLoading = false; //关闭下拉刷新效果
			}, 500);
		},
		//页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {
			setTimeout(() => {
					this.loading = false
					this.finished = true
			}, 500);
		},
		// 数据初始化
		Initialization(i){
      this.request("wisdom.vshop.account.flowList",{pageNum :i,pageSize: 10}).then(data=>{
				console.log(data)
				this.cashdetailsList = data.data.flowList
      }).catch(err=>{console.log(err)})
    }
	},
	mounted(){
		this.Initialization(1)
	}
}
</script>
<style lang="less" scoped>
		.success{
			color: #FF514C;
		}
		.jiedong{
			color: #3DD624;
		}
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