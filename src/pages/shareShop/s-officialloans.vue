<template>
	<div class="officamain">
		<div class='tochiose'>
			<div class="netloan" @click="tonetloan(item.bannerCode)" v-for="(item,i) in bannerProductResList" :key="i">
				<img :src=item.bannerUrl alt="">
			</div>
		</div>
		<div class="tittle">
			<p>申请多个产品，可大幅提高贷款成功率</p>
			<div @click="another"><img src="./images/shuaxin.png" alt="">换一批</div>
		</div>
		<div class="listdata" v-for="(item,i) in productResList" :key="i"  @click="toproductnamedetail(item.productCode)">
			<div class="leftpic"><img :src=item.productLeftTopPic alt=""></div>
			<div class="listdatatop" :class="item.productParamShow===1?'listdatatop':'listdatatops'">
				<div>
					<div class="borderRaduils"><img :src=item.productLogo alt=""></div>
				</div>
				<div>
					<h4>{{item.productName}}</h4>
					<p>{{item.subTitle}}</p>
				</div>
				<div class="productLabel">{{item.productLabel}}</div>
				<div class="apply applys" v-show="item.productParamShow!=1" @click="toproductnamedetail(item.productCode)">立即申请</div>
			</div>
			<div class="listdatabot" v-show="item.productParamShow===1">
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
		//网贷
		tonetloan(bannerCode){
			this.$router.push('/loanlist?productDetailType='+bannerCode)
		},
		//申请
		toproductnamedetail(productCode){
			let data = {
				inviterCode:this.inviterCode,
				productCode:productCode
			}
			this.https('wisdom.vshop.product.queryH5UserProductDetail',data)
			.then(data=>{
				if(data.code=='success'){
					statistics.click("officialloans","todetailsnum");
					if(data.data.state==0){
						this.$router.push('/productnamedetail?inviterCode='+this.inviterCode+'&'+'productCode='+productCode)
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
				storeCode:this.$route.query.storeCode?this.$route.query.storeCode:utils.getCookie('storeCode'),
				head : false , 
				type:0
			}
			this.https('wisdom.vshop.vshopStore.queryStoreProduct',data)
			.then(data=>{ 
				if(data.code=='success'){
					this.productResList = data.data.productResList
					this.bannerProductResList = data.data.bannerProductResList
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
			this.https('wisdom.vshop.vshopStore.queryStoreProduct',data)
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
		statistics.page("officialloans");
    }
}
</script>
<style lang="less" scoped>
.officamain{
	padding-bottom:40px;
}
	.tochiose{
		display: flex;
		justify-content: space-between;
		margin: 14px 0 7px;
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
		border-radius: 4px;
		justify-content: space-between;
		align-items: center;
		padding:0 15px;
		font-size:12px;
		color:#4897FF;
		margin-bottom: 10px;
		p{
			line-height:42px;
		}
		img{
			width:16px;
			height:15px;
			margin-right: 8px;
			margin-top:-2px;
		}
	}
	.listdata{
		position: relative;
		margin-bottom:10px;
		background: #ffffff;
		border-radius: 5px;
		.leftpic{
			position:absolute;
			top:0;
			left:0;
			img{
				width:35px;height:35px;
				z-index: 10;
			}
		}
		
		.listdatatop{
			height:53px;
			border-bottom:1px dashed #f2f2f2 /*no*/;
			padding:0 15px;
			display: flex;
			align-items: center;
			.productLabel{
				position: absolute;
				top:0;
				right:10px;
				font-size: 10px;
				color:#4597FB;
				background:#D9EAFF;
				padding:5px 9px;
				border-radius:  0 0 5px 5px;
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
				margin-bottom:4px;
			}
			p{
				font-size: 11px;
				color:#999999;
			}
		}
		.listdatatops{
			height:93px;
			border:none;
			.borderRaduils{
				border-radius: 5px;
				overflow: hidden;
				width:45px;
				height:45px;
				margin-right: 10px;
			}
			img{
				width:45px;
				height:45px;
				margin-right: 10px;
			}
			p{
				font-size:14px;
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
			
		}
		.apply{
			background: #4597FB;
			color:#ffffff;
			font-weight: bold;
			border-radius: 15px;
			padding:6px 10px 5px;;
			position:absolute;right:10px;
		}
		.applys{
			bottom:20px;
			font-size:12px;

		}
	}
	.viewall{
		height:50px;
		background: #4597FB;
		border-radius: 25px;
		text-align: center;
		line-height:52px;
		font-size: 16px;
		color:#ffffff;
		margin-top: 20px;
	}
</style>