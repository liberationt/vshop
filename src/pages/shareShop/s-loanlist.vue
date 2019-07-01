<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin">
  <div class="loanlistmain">
		<div class="loanlisttop">
			<div class="invitnum">邀请码6S89WH</div>
			<div class="dropdown">
				<van-dropdown-menu>
					<van-dropdown-item v-model="value1" @change="adds" :options="option1" />
				</van-dropdown-menu>
			</div>
		</div>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>	
			<div class="listdata" @click="toproductnamedetail" v-for="(item,i) in dataList" :key="i">
				<div class="listdatatop">
					<div>
						<div><img :src=item.productLogo alt=""></div>
					</div>
					<div>
						<h4>{{item.productName}}</h4>
						<p>{{item.subTitle}}</p>
					</div>
				</div>
				<div class="listdatabot">
					<div>
						<p style="font-size:16px;color:#FE951E">{{item.amount}}</p>
						<p>可用额度 (元)</p>
					</div>
					<div>
						<p>期限：<span>{{item.limit}}个月</span></p>
						<p>最快当天到账</p>
					</div>
					<div class="apply" @click="apply(item.productCode)">立即申请</div>
				</div>
			</div>
		</van-list>
  </div>
	</van-pull-refresh>
</template>
<script>
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
import { DropdownMenu, DropdownItem } from 'vant';
export default {
	components:{
		[DropdownMenu.name]:DropdownMenu,
		[DropdownItem.name]:DropdownItem
	},
	data(){
		return{
			isLoading:false,
			value1:'-1',
			option1: [
				{text:'全部',value:'-1'}
			],
			dataList:[],
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			loading: false,//控制上拉加载的加载动画
			pageNum:1,
			pageSize:10,
			inviterCode:'',
		}
	},
	methods:{
		apply(productCode){
			let data = {
					inviterCode:this.$route.query.inviterCode,
					productCode:productCode
				}
				this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("tap", "loanlist","getnumber");
						if(data.data.state==0){
							utils.setCookie('ProductCode',productCode)
							utils.setCookie('InviterCode',this.inviterCode)
							this.$router.push('/productnamedetail')
						}
						if(data.data.state==1){
							this.$router.push('/undershelf?inviterCode='+this.$route.query.inviterCode)
						}
					}
				}).catch(err=>{
					console.log(err)
				})
		},
		adds(i){
			let data = {
				storeCode:utils.getCookie('storeCode'),
				productDetailType:i,
				filter:false
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProductList',data)
				.then(data=>{ 
					if(data.code=='success'){
						let options = data.data.productDetailTypeBean
						this.dataList = data.data.dataList
					}
			})
		},
		toproductnamedetail(){
			this.$router.push('/productnamedetail')
		},
		// 下拉刷新
		onRefresh(){
			setTimeout(() => {
				this.isLoading = false; //关闭下拉刷新效果
			}, 500);
		},
		//页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
		onLoad() {
			// let that = this
			setTimeout(() => {
				let data = {
				storeCode:utils.getCookie('storeCode'),
				productDetailType:this.value1,
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				filter:true
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProductList',data)
				.then(data=>{ 
					if(data.code=='success'){
						let options = data.data.productDetailTypeBean
						let options2=[]
						for(var i=0;i<options.length;i++){
							options2.push(
								{
									text:options[i].label,
									value:options[i].code
								}
							)
						}
						this.option1 =this.option1.concat(options2) 
						this.pageNum++
						this.loading = false
						this.dataList = this.dataList.concat(data.data.dataList)
						if(data.data.dataList.length<=5){
							this.finished = true
						}
					}
				})
			}, 500);
		},
	},
	mounted(){
		statistics.page("loanlist", "shppagenum");
	}
}
</script>
<style lang="less" scoped>
	.loanlistmain{
		background: #f1f1fb;
		min-height: 500px;
		.loanlisttop{
			background: #ffffff;
			.invitnum{
				height:40px;
				font-size:11px;
				line-height: 40px;
				border-bottom:1px solid #E7E7E7 /*no*/;	
				text-align: center;
				color:#999999;
			}
		}
		.dropdown{
			width:100px;
		}
		.listdata{
			margin:15px;
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
					line-height:20px;
					span{
						color:#FE951E;
					}
				}
				.apply{
					background: #4597FB;
					color:#ffffff;
					font-weight: bold;
					border-radius: 15px;
					padding:5px 10px;
				}
			}
		}
	}
</style>