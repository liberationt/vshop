<template>
    <div class="credcart">
		<div class="credtittle">多种产品任你选，推荐好友加入，赚取更多佣金分红</div>
		<div>
			<div class="listdata" @click="tostiflingborrow(item.productCode,item.productType)" v-for="(item,i) in cardList" :key="i">
				<div class="leftpic"><img :src=item.productLeftTopPic alt=""></div>
				<div class="listdatatop" :class="item.productParamShow===1?'listdatatop':'listdatatops'">
					<div>
						<div class="borderRaduils"><img :src=item.productLogo alt=""></div>
					</div>
					<div>
						<h4>{{item.productName}}</h4>
						<p v-if="item.productType==2">{{item.desc}}</p>
						<p v-else>{{item.subTitle}}</p>
					</div>
					<div class="productLabel">{{item.productLabel}}</div>
					<div class="apply applys" v-show="item.productParamShow!=1">立即申请</div>
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
					<div class="apply">立即申请</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
export default {
    data(){
			return{
				cardList:[],
				inviterCode:''
			}
		},
		methods:{
			tostiflingborrow(productCode,productType){
				let data = {
					inviterCode:this.inviterCode,
					productCode:productCode
				}
				this.https('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("creditcard","getnumbers");
						if(data.data.state==0){
							if(productType==2){
								this.$router.push('/stiflingborrow?inviterCode='+this.inviterCode+'&'+'productCode='+productCode)
							}else{
								this.$router.push('/productnamedetail?inviterCode='+this.inviterCode+'&'+'productCode='+productCode)
							}
						}
						if(data.data.state==1){
							this.$router.push('/undershelf?inviterCode='+this.inviterCode)
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			getdatas(){
				let data = {
				storeCode:this.$route.query.storeCode?this.$route.query.storeCode:utils.getCookie('storeCode'),
				head : true , 
				type:-1
			}
			this.https('wisdom.vshop.vshopStore.queryStoreProduct',data)
				.then(data=>{ 
					if(data.code=='success'){
						this.cardList = data.data.productResList
						this.inviterCode = data.data.inviterCode
					}
				})
			},
		},
		mounted(){
			this.getdatas()
			statistics.page("creditcard");
		}
}
</script>
<style lang="less" scoped>
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
		.leftpics{
			position:absolute;
			top:0;
			left:0;
			img{
				width:45px;height:45px;
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
				font-size:10px;
				right:10px;
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
			padding:6px 10px 5px;
			position:absolute;right:10px;
		}
		.applys{
			bottom:20px;
			font-size:12px;
		}
	}
.credcart{
	padding-bottom:20px;
}
   .credtittle{
		 height:40px;
		 line-height: 40px;
		 background: #ffffff;
		 font-size:12px;
		 color:#4897FB;
		 padding-left:15px;
		 margin-bottom: 10px;
		 border-radius: 4px;
		 margin-top:12px;
	 }
	 .credlist{
		 display: flex;
		 height:100px;
		//  align-items: center;
		padding-top:15px;
		 background: #ffffff;
		 padding-left:15px;
		 font-size:14px;
		 color:#999999;
		 margin-bottom:10px;
		 border-radius: 4px;
		 .credlistbanner{
			 width:100px;
			 height:70px;
			 margin-right: 10px;
			 border-radius: 5px;
			 overflow: hidden;
			 img{
				 width:100px;
				 height:70px;
			 }
		 }
		 .credlistright{
			 margin-top:-4px;
			h4{
				font-size:16px;
				color:#333333;
				font-weight: bold;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				width:200px;
				margin-bottom: 4px;
			}
			p{
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			width:200px;
			}
		 }
	 }
</style>