<template>
    <div class="mingxin_common">
      <header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="现金明细"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header> 
			<div class="detailsmain">
				<van-list v-model="loading" finished-text="没有更多了" :finished="finished" @load="onLoad" class="xialashuaxin haha">
					<!-- 加载的内容-->
					<div>
						<div v-for="item in cashdetailsList" class="details" @click="todetails(item.flowCode)">
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
				</van-list>
			</div>
    </div>
</template>
<script>
import { Toast,List } from 'vant';
export default {
	data(){
		return{
			finished: true,//控制在页面往下移动到底部时是否调用接口获取数据
			loading: false,//控制上拉加载的加载动画
			cashdetailsList:[],
			pageNumber:1,
			totalPage:""
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		todetails(code){
			this.$router.push('/readydetails?code='+code)
		},
		//页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {
			setTimeout(() => {
					this.Initialization(2)
			}, 500);
		},
		// 数据初始化
		Initialization(){
			let that = this
      this.request("wisdom.vshop.account.flowList",{pageNum :this.pageNumber,pageSize: 10}).then(data=>{
				let flowList = data.data.flowList
				if (Number(flowList.dataList.length) <= 0) {
					this.finished = true
					return false
				}
				if(Number(flowList.total) > 10){
					this.finished = false
					this.loading = false
				}
				this.cashdetailsList = this.cashdetailsList.concat(flowList.dataList)
				this.pageNumber++
				this.totalPage = flowList.total
      }).catch(err=>{console.log(err)})
    }
	},
	mounted(){
		this.Initialization()
	}
}
</script>
<style lang="less" scoped>
		.mingxin_common{
			padding-bottom: 30px;
		}
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
		border-bottom: 1px solid #efefef /*no*/;
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