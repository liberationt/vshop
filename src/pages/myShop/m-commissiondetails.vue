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
				<div class="search">
					<div class="inputserch">
						<input type="text" v-model="phoneOname" placeholder="请输入姓名或手机号">
						<div @click="search"><img src="./imgs/sousuo.png" alt=""></div>
					</div>
					<van-dropdown-menu>
						<van-dropdown-item v-model="value1" @change="onenquiries" :options="option1" />
					</van-dropdown-menu>
				</div>
				<div>
					<van-pull-refresh class="xialashuaxin" v-model="isLoading" @refresh="onRefresh" success-text='刷新成功'>
						<div class="details">
							<ul>
								<li v-for="item in commissiondList">
									<div class='detailstop'>
										<h4>{{item.userName}}{{item.userPhone}}</h4>
										<span>{{item.settleDate}}</span>
									</div>
									<div class="datailslist">
										<div>
											<h5>贷款产品</h5>
											<p>{{item.productName}}</p>
										</div>
										<div>
											<h5>贷款金额（元）</h5>
											<p>{{item.loanRealityAmount}}</p>
										</div>
										<div>
											<h5>返佣金额（元）</h5>
											<p>{{item.commission}}</p>
										</div>
									</div>
								</li>
							</ul>
						 </div>
						</van-pull-refresh>
				</div>
			</div>
    </div>
</template>
<script>
import { PullRefresh,DropdownMenu,DropdownItem } from 'vant';
export default {
	components:{
		[PullRefresh.name]:PullRefresh,
		[DropdownMenu.name]:DropdownMenu,
		[DropdownItem.name]:DropdownItem,

	},
	data(){
		return{
			loading: false,//控制上拉加载的加载动画
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			isLoading: false,//控制下拉刷新的加载动画
			loading: false,//控制上拉加载的加载动画
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			option1: [
        { text: '贷款', value: 0 },
        { text: '信用卡', value: 1 },
        { text: '信贷工具', value: 2 }
			],
			value1:0,
			phoneOname:"",
			commissiondList:{}
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		search(){
			this.Initialization(1)
		},
		// 获取数据
		getdataList(){

		},
		onenquiries(){
			this.Initialization(1)
		},
		//下拉刷新
		onRefresh() {
			setTimeout(() => {
					this.Initialization()
					this.$toast('刷新成功')
				 this.isLoading = false; //关闭下拉刷新效果
			}, 500);
		},
		Initialization(i) {
      this.request("wisdom.vshop.productOrder.queryCommissonOrderForH5", {
        queryStr : this.phoneOname,
				productType: this.value1,
        pageNum: i,
        pageSize: 10,
      })
        .then(data => {
          console.log(data);
					this.commissiondList = data.data.dataList
        })
        .catch(err => {
          console.log(err);
        });
    }
	},
	mounted(){
		this.Initialization(1)
	}
}
</script>
<style lang="less" scoped>
.commissdetailmain{
	background: #f1f1fb;
	height:100%;
	.search{
		background: #ffffff;
		
		padding-top: 8px;
		border-top: 1px solid #F1F1FB;/*no*/
		margin-top: 1px;
	}
}
	.inputserch{
		background: #EEEEEE;
		width: 345px;
		margin: 0 auto;
		height:34px;
		font-size:12px;
		color:#aaaaaa;
		line-height: 34px;
		border-radius: 17px;
		position: relative;
		margin-bottom: 8px;
		
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
			margin-top: 10px;
			border-radius: 5px;
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