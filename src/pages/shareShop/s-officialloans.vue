<template>
	<div class="officamain">
		<div class='tochiose'>
			<div class="netloan" @click="tonetloan" v-for="(item,i) in bannerProductResList" :key="i">
				<img :src=item.bannerUrl alt="">
			</div>
		</div>
		<div class="tittle">
			<p>申请多个产品，可大幅提高贷款成功率</p>
			<div @click="another"><img src="./images/shuaxin.png" alt="">换一批</div>
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
</template>
<script>
import { statistics } from "wisdom-h5";
import utils from '../../utils/utils'
export default {
    data(){
		return{
			productResList:[],
			bannerProductResList:[],
			inviterCode:''
		}
    },
    methods:{
		todolist(){
		},
		//网贷
		tonetloan(){
			this.$router.push('/loanlist')
		},
		//申请
		toproductnamedetail(productCode){
			let data = {
				inviterCode:this.inviterCode,
				productCode:productCode
			}
			this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
			.then(data=>{
				if(data.code=='success'){
					statistics.click("tap", "officialloans","todetailsnum");
					if(data.data.state==0){
						utils.setCookie('ProductCode',productCode)
						utils.setCookie('InviterCode',this.inviterCode)
						this.$router.push('/productnamedetail')
					}
					if(data.data.state==1){
						this.$router.push('/undershelf?inviterCode='+this.inviterCode)
					}
				}
			}).catch(err=>{
				console.log(err)
			})
		},
	
		//换一批
		another(){
			let data = {
				storeCode:utils.getCookie('storeCode'),
				head : false , 
				type:0
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProduct',data)
			.then(data=>{ 
				if(data.code=='success'){
					this.productResList = data.data.productResList
					this.bannerProductResList = data.data.bannerProductResList
					this.inviterCode = data.data.inviterCode
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		viewall(){
			this.$router.push('/loanlist?inviterCode='+this.inviterCode)
		},
		getdatas(){
			let data = {
				storeCode:utils.getCookie('storeCode'),
				head : true , 
				type:0
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProduct',data)
			.then(data=>{ 
				if(data.code=='success'){
					this.productResList = data.data.productResList
					this.bannerProductResList = data.data.bannerProductResList
					this.inviterCode = data.data.inviterCode
				}
			})
		},
    },
    mounted(){
		this.getdatas()
		statistics.page("officialloans", "getnumber");
    }
}
</script>
<style lang="less" scoped>
.officamain{
	padding-bottom:20px;
}
	.tochiose{
		display: flex;
		justify-content: space-between;
		margin-bottom: 14px;
		flex-wrap: wrap;
		div{
			width:166px;height:51px;
			font-size:20px;
			margin-bottom:10px;
			line-height: 51px;
			color:#ffffff;
			font-weight:bold;
			position: relative;
			img{
				width:100%;
				height:100%;
				position: absolute;
			}
			p{
				width:100%;
				position: absolute;
				z-index:2;
				text-align: center;
			}
		}
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