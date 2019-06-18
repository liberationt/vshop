<template>
	<div class="shopmain pddingTop">
		<header>
			<van-nav-bar title='抢单侠微店' fixed></van-nav-bar>
		</header>
		<div class="undershelf">
			<div class="bannerlogo">
				<div>
					<img src="./imgs/xiajia.png" alt="">
				</div>
				<p>该产品已下架</p>
			</div>
			<div class="havemoneytop" v-show="showUMoney">
				<div @click="tohavemoney" class="havamoneyImg"><img :src=havemoneyImg alt=""></div>
				<div class="close" @click="closeTost" v-show="isshow"><img src="../shareShop/images/close.png" alt=""></div>
			</div>
			<div class="tittle">
			<p>申请多个产品，可大幅提高贷款成功率</p>
		</div>
		<div class="listdata" v-for="(item,i) in productResList" :key="i">
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
				<div class="apply" @click="toproductnamedetail(item.productCode)">立即申请</div>
			</div>
		</div>
		<div class="viewall" v-if="productResList.length>1" @click="viewall">查看全部</div>
		</div>
	</div>
</template>
<script>
import { Tab, Tabs ,Dialog} from 'vant'
import utils from '../../utils/utils'
export default {
	inject:['reload'],
	components:{
		[Tab.name]:Tab,
		[Tabs.name]:Tabs,
		[Dialog.name]:Dialog,
	},
	data(){
		return{
			dayUMoney:'',
			showUMoney:false,
			isshow:false,
			havemoneyImg:'',
			inviterCode:'',
			productResList:[]
		}
	},
	methods:{
		tohavemoney(){
			this.$router.push('/havemoney')
		},
		getdatalist(){
			let data = {
				inviterCode:'FFFFF'
			}
			this.request('wisdom.vshop.product.queryH5RemovedDetail',data)
			.then(data=>{
				if(data.code=='success'){
					this.productResList = data.data.productStoreListResList
					this.havemoneyImg = data.data.bannerResList[0].bannerUrl
					this.dayUMoney = data.data.dayUMoney
					this.showUMoney = data.data.showUMoney
					this.inviterCode = data.data.inviterCode
				}
			})
		},
		closeTost(){
			Dialog.confirm({
				confirmButtonText:this.dayUMoney+"天内不再提示",
				cancelButtonText:'永不提示',
				message: '确认关闭此提示框吗？'
			}).then(() => {
				this.closehaveMoney(0)
			}).catch(() => {
				this.closehaveMoney(1)
			});
		},
		//关闭
		closehaveMoney(v){
			let data = {
				data:v==0?false:true
			}
			this.request('wisdom.vshop.vshopStore.closeUMoneyTip',data)
			.then(data=>{
				if(data.code=='success'){
					this.getdatalist()
				}
			})
		},
		viewall(){

		},
		toproductnamedetail(productCode){
			let data = {
					inviterCode:this.inviterCode,
					productCode:productCode
				}
				this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						if(data.data.state==0){
							utils.setCookie('ProductCode',productCode)
							utils.setCookie('InviterCode',this.inviterCode)
							this.$router.push('/productnamedetail')
						}
						if(data.data.state==1){
							this.reload()
						}
					}
				}).catch(err=>{
					console.log(err)
				})
		}
	},
	mounted(){
		if(utils.getCookie('user')){
			this.isshow = true
		}else{
			this.isshow = false
		}
		this.getdatalist()
	}
}
</script>
<style lang="less" scoped>
	.undershelf{
		background: #f1f1fb;
		min-height: 500px;
		.bannerlogo{
			text-align: center;
			padding-top:15px;
			height:138px;
			background: #ffffff;
			font-size:15px;
			color:#333333;
			img{
				width:131px;
				height:79px;
			}
			p{
				margin-top: 15px;
			}
		}
	}
	.havemoneytop{
			height:95px;
			margin-bottom: 15px;
			background: red;
			position: relative;
			.havamoneyImg{
				height:95px;
				img{
					width:100%;
					height:100%;
				}
			}
		}
		.close{
			height:16px;
			width:16px;
			position:absolute;
			top:11px;
			right:11px;
			z-index: 100;
		}
		.tittle{
			height:40px;
			background: #ffffff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:0 15px;
			font-size:12px;
			color:#4897FF;
			margin-bottom: 5px;
			img{
				width:16px;
				height:14px;
				margin-right: 8px;
			}
		}
			.listdata{
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
	.viewall{
		height:50px;
		background: #4597FB;
		border-radius: 25px;
		text-align: center;
		line-height:50px;
		font-size: 16px;
		color:#ffffff;
		margin-top: 20px;
	}
</style>