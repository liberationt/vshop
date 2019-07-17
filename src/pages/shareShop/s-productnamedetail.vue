<template>
    <div class="maincontent pddingTop">
			<header>
				<van-nav-bar
					:title='tittle'
					left-arrow
					@click-left="onClickLeft"
				/>
			</header>
      		<div class="productbannerimg">
				<div><div><img :src=dataobject.productLogo alt=""></div></div>
				<p>{{tittle}}</p>
			</div>
			<!-- 信息 -->
			<div class="productinfor">
				<div>
					<h3><span></span>产品权益</h3>
					<p v-for="(item,i) in dataobject.productDescribe" :key="i">{{item}}</p>
				</div>
				<div>
					<h3><span></span>申请条件</h3>
					<p v-for="(item,i) in dataobject.applyCondition" :key="i">{{item}}</p>
				</div>
				<div class="rightapply" @click="apply">立即申请</div>
			</div>
			<div class="guesslike">
				<h3><span></span>猜你喜欢</h3>
				<div class="guesslikecont">
					<div v-for="(item,i) in dataobject.vshopProductResList" :key='i' @click="todetails(item.productCode)">
						<div class="guessimgs"><img :src=item.productLogo alt=""></div>
						<p>{{item.productName}}</p>
					</div>
				</div>
			</div>
			<div class="recommend">
				<h3><span></span>推荐阅读</h3>
				<ul>
					<li v-for="(item,i) in dataobject.exhibitionContentList" :key="i" @click='totweets(item.exhibitionContentCode)'>
						<div class="borderradus">
							<img :src=item.photoPath alt="">
						</div>
						<div class="recommendright">
							<h4>{{item.contentTitle}}</h4>
							<p>{{item.dataCreateTime}}</p>
						</div>
					</li>
				</ul>
			</div>
    </div>
</template>
<script>
import { statistics } from "wisdom-h5";
import utils from '../../utils/utils'
export default {
    data(){
			return{
				city:'',
				dataobject:{},
				inviterCode:'',
				tittle:'',
				productCode:'',
				storeCode:''
			}
		},
		methods:{
			totweets(exhibitionContentCode){
				this.$router.push('/tweetsdetails?exhibitionContentCode='+exhibitionContentCode+'&storeCode='+this.storeCode)
			},
			onClickLeft(){
				if(this.$route.query.id){
					this.$router.push('/shoppage?inviterCode='+this.$route.query.inviterCode)
				}else{
					this.$router.go(-1)
				}
			},
			//立即申请
			apply(){
				let data = {
					productType:0,
					inviterCode:this.$route.query.inviterCode,
					productCode:this.productCode
				}	
				this.https('wisdom.vshop.product.h5BeforeJumpDetail',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("prodectnamedetail","getapplynumber");
						this.$router.push('/stiflingborrow?inviterCode='+this.$route.query.inviterCode+'&'+'productCode='+this.productCode)
					}
				})
			},
			//猜你喜欢
			todetails(productCode){
				statistics.click("prodectnamedetail","getlovenumber");
				this.productCode = productCode
				this.getdatas()
				// this.reload()
			},
			getdatas(){
				let data = {
					inviterCode:this.$route.query.inviterCode,
					productCode:this.productCode
				}
				this.https('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						if(data.data.state==1){
							this.$router.push('/undershelf?inviterCode='+this.$route.query.inviterCode)
						}else{
							this.dataobject = data.data
							this.inviterCode = data.data.inviterCode
							this.tittle = data.data.productName
							this.storeCode = data.data.storeCode
						}
					}
				})
			}
		},
		mounted(){
			statistics.page("productnamedetail");
			this.productCode=this.$route.query.productCode
			this.getdatas()
		}
}
</script>
<style lang="less">
.maincontent{
	background: #f1f1fb;
}
    .productbannerimg{
			padding-top:6px;
			height:126px;
			background: #ffffff;
			text-align: center;
			>div{
				margin:0 auto;
				text-align: center;
				width:80px;
				height:80px;
				border-radius: 50%;
				padding:3px 3px 0;
				border:1px solid #f2f2f2;
				div{
					width:72px;height:72px;border-radius: 50%;overflow: hidden;
				}
				img{
					width:72px;
					height:72px;
				}
			}
			p{
				font-size:18px;
				color:#4597fb;
				font-weight: bold;
				margin-top: 2px;
			}
		}
		.productinfor{
			margin:8px 8px 20px;
			div{
				margin-bottom:8px;
				background:#ffffff;
				border-radius: 4px;
				padding:0 19px 12px 15px;
				h3{
					color:#4597FB;
					font-size:14px;
					height:44px;
					align-items: center;
					display: flex;
					border-bottom:1px solid #f2f2f2 /*no*/;
					span{
						display: inline-block;
						width:3px; height:18px;
						background: #4597FB;
						border-radius:1px;
						margin-right: 10px;
					}
				}
				p{
					font-size:15px;
					color:#333333;
					margin-top:7px;
				}
			}
			.productcity{
				display: flex;
				justify-content: space-between;
				height:45px;
				font-size:14px;
				color:#333333;
				img{
					width:12px;
					height:16px;
					margin-right: 8px;
				}
				label{
					padding-top:10px;
				}
				input{
					text-align: right;
					border:none /*no*/;
					padding-top:10px;
					margin-right: 20px;
				}
			}
			.rightapply{
				height:50px;
				background: #4597FB;
				border-radius: 25px;
				text-align: center;
				line-height:54px;
				font-size:16px;
				color:#ffffff;
				margin:20px 0;
			}
		}
		.guesslike,.recommend{
			background: #ffffff;
			h3{
				color:#4597FB;
				font-size:17px;
				line-height: 30px;
				height:44px;
				align-items: center;
				display: flex;
				padding-left:15px;
				border-bottom:1px solid #f2f2f2 /*no*/;
				span{
					display: inline-block;
					width:3px; height:18px;
					background: #4597FB;
					border-radius:1px;
					margin-right: 10px;
				}
			}
			.guesslikecont{
				height:95px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				>div{
					display: flex;
					align-items: center;
					width:50%;
					padding:0 15px;
					// justify-content: center;
					.guessimgs{
						width:48px;
						height:48px;
						border-radius: 5px;
						overflow: hidden;
						margin-right: 10px;
						margin-left:23px;
						img{
							width:100%;
							height:100%;
						}

					}
					p{
						font-size:14px;
					}
				}
			}
		}
		.recommend{
			ul{
				padding-left:15px;
				li{
					border-bottom:1px solid #f2f2f2 /*no*/;
					display: flex;
					padding:15px 0;
					
					.borderradus{
						width:106px;height:65px;
						border-radius: 4px;
						overflow: hidden;
						margin-right: 8px;
						img{
							width:106px;
							height:65px;
						}
					}
					.recommendright{
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						h4{
							font-size:15px;;
							color:#333333
						}
						p{
							font-size:12px;
							color:#666666;
						}
					}
				}
			}
		}
</style>