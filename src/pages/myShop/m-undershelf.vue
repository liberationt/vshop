<template>
	<div class="shopmain pddingTop">
		<header>
			<van-nav-bar left-arrow title='抢单侠微店' @click-left="onClickLeft" fixed></van-nav-bar>
		</header>
		<div class="bannerlogo">
				<div>
					<img src="./imgs/xiajia.png" alt="">
				</div>
				<p>该产品已下架</p>
			</div>
		<div class="undershelf">
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
				<div class="listrightleft">
					<p style="font-size:16px;font-weight:bold;color:#FE951E">{{item.amount}}</p>
					<p>可借额度 (元)</p>
				</div>
				<div>
					<p>期限：<span style="font-weight:bold;font-size:12px;">{{item.limit}}</span></p>
					<p>{{item.desc}}</p>
				</div>
				<div class="apply" @click="toproductnamedetail(item.productCode)">立即申请</div>
			</div>
		</div>
		<div class="viewall" v-if="productResList.length>1" @click="viewall">查看更多</div>
		</div>
	</div>
</template>
<script>
import { statistics } from "wisdom-h5";
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
			productResList:[],
			jumpUrl:''
		}
	},
	methods:{
		tohavemoney(){
			if(this.jumpUrl){
				window.location.href = this.jumpUrl+'?inviterCode='+this.inviterCode
			}
			// this.$router.push('/havemoney?inviterCode='+this.inviterCode)
		},
		onClickLeft(){
			this.$router.push('/shoppage?inviterCode='+this.inviterCode)
		},
		getdatalist(){
			let data = {
				inviterCode:this.$route.query.inviterCode
			}
			this.request('wisdom.vshop.product.queryH5RemovedDetail',data)
			.then(data=>{
				if(data.code=='success'){
					this.productResList = data.data.productStoreListResList
					this.havemoneyImg = data.data.bannerResList[0].bannerUrl
					this.jumpUrl = data.data.bannerResList[0].jumpUrl
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
			statistics.click("undershelf","getviewall");
			this.$router.push('/loanlist')
		},
		toproductnamedetail(productCode){
			let data = {
					inviterCode:this.inviterCode,
					productCode:productCode
				}
				this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("undershelf","getdetailsnumber");
						if(data.data.state==0){
							this.$router.push('/productnamedetail?productCode='+productCode+'&inviterCode='+this.inviterCode)
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
		statistics.page("undershelf");
		window.scrollTo(0,0);
		if(utils.getCookie('users')){
			this.isshow = true
		}else{
			this.isshow = false
		}
		this.getdatalist()
	}
}
</script>
<style lang="less" scoped>
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
	.undershelf{
		background: #f1f1fb;
		padding:2px 15px 30px;
		
	}
	.havemoneytop{
			height:103px;
			margin:12px 0;
			position: relative;
			.havamoneyImg{
				height:103px;
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
			padding:0 15px;
			font-size:12px;
			border-radius: 4px;
			color:#4897FF;
			margin-bottom: 5px;
			line-height: 42px;
		}
		.listdata{
		margin-bottom:10px;
		background: #ffffff;
		border-radius: 4px;
		.listdatatop{
			display: flex;
			padding:0 15px;
			position: relative;
			align-items: center;
			border-bottom: 1px dashed #f2f2f2;
			height:58px;
			font-size:12px;
			color:#333333;
			.listrightleft{
				width:100px;
				margin-right: 20px;
			}
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
			}
		}
		.listdatabot{
			display: flex;
			padding:0 15px;
			position: relative;
			align-items: center;
			height:58px;
			font-size:12px;
			color:#333333;
			.listrightleft{
				width:100px;
				border-right:1px solid #f2f2f2;
				margin-right: 20px;
			}
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
				padding:6px 10px 5px;
				position:absolute;right:10px;
			}
		}
	}
	.viewall{
		height:50px;
		background: #4597FB;
		border-radius: 25px;
		text-align: center;
		line-height:54px;
		font-size: 16px;
		color:#ffffff;
		margin:20px 15px 0;
	}
</style>