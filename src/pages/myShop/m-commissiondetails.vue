<template>
    <div :class="commissiondList.length <=4 ? 'height1 commissdetailmain' : 'commissdetailmain'">
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
					<van-list v-model="loading" finished-text="没有更多了" :finished="finished" @load="onLoad" class="xialashuaxin haha">
						<div class="details">
							<ul>
								<li v-for="item in commissiondList">
									<div class='detailstop'>
										<h4><span class='username'>{{item.userName}}</span>{{item.userPhone}}</h4>
										<span class="userTime">{{item.settleDate}}</span>
									</div>
									<div class="datailslist">
										<div class="div1">
											<h5>贷款产品</h5>
											<p class="datailslistD">{{item.productName}}</p>
										</div>
										<div>
											<h5>贷款金额(元)</h5>
											<p>{{item.loanRealityAmount}}</p>
										</div>
										<div class="div2">
											<h5>返佣金额(元)</h5>
											<p>{{item.commission}}</p>
										</div>
									</div>
								</li>
							</ul>
						 </div>
						</van-list>
				</div>
			</div>
    </div>
</template>
<script>
import { DropdownMenu,DropdownItem,List } from 'vant';
export default {
	components:{
		[DropdownMenu.name]:DropdownMenu,
		[DropdownItem.name]:DropdownItem,

	},
	data(){
		return{
			loading: false,//控制上拉加载的加载动画
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			option1: [
				{ text: '全部类型', value: "" },
        { text: '贷款', value: 0 },
        { text: '信用卡', value: 1 },
        { text: '信贷工具', value: 2 }
			],
			value1:"",
			phoneOname:"",
			commissiondList:[],
			pageNumber:1
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
		// 上拉加载
		onLoad(){
			setTimeout(() => {
				this.Initialization()
			}, 500);
		},
		Initialization(i) {
      this.request("wisdom.vshop.productOrder.queryCommissonOrderForH5", {
        queryStr : this.phoneOname,
				productType: this.value1,
        pageNum: this.pageNumber,
        pageSize: 10,
      })
        .then(data => {
					let commissiondList1 = data.data.dataList
					if (Number(commissiondList1.length) <= 0) {
						this.finished = true
						return false
					}
					if(Number(data.data.total) > 10){
						this.finished = false
						this.loading = false
					}
					this.commissiondList = this.commissiondList.concat(commissiondList1)
					this.pageNumber++
					console.log(this.commissiondList,1111)
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
	// height:100%;
	padding-bottom: 10px;
	.search{
		background: #ffffff;
		padding-top: 8px;
		border-top: 1px solid #F1F1F1;/*no*/
	}
	.van-dropdown-menu{
		border-top: 1px solid #f2f2f2;/*no*/
	}
}
	.inputserch{
		background: #EEEEEE;
		width: 345px;
		margin: 0 auto;
		height:36px;
		font-size:12px;
		color:#333;
		line-height: 36px;
		border-radius: 17px;
		position: relative;
		margin-bottom: 8px;
		input{
			background:#eeeeee;
			border-radius: 17px;
			text-indent: 20px;
			width:90%;
			padding-left: 15px;
		}
		img{
			width:16px;height:16px;
			position: absolute;
			left:12px;
			bottom:9px;
		}
	}
	.details{
		padding:0 15px;
		li{
			background: #ffffff;
			margin-top: 10px;
			border-radius: 5px;
			padding: 0px 15px;
			.detailstop{
				// height:40px;
				padding: 18px 0px 6px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// padding:0 15px;
				border-bottom:1px solid #f2f2f2;
				.username{
						font-weight: bold;
						color:#333;
						font-size: 14px;
						margin-right: 5px;
					}
				.userTime{
					margin-top: 7px;
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
			.datailslistD{
				width: 65px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				padding-top: 2px;
			}
			h5{
				font-size:11px;
				color:#999999;
			}
			p{
				font-size:14px;
				color:#4597FB;
				line-height:26px;
				font-weight: bold;
			}
		}
	}
	
</style>