<template>
    <div class="maincontent">
			<header class="pddingTop">
				<van-nav-bar
					title="产品名称"
					left-arrow
					@click-left="onClickLeft"
				/>
			</header>
      <div class="productbannerimg">
				<img :src=dataobject.productLogo alt="">
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
				<div class="productcity" @click="tocity">
					<label><img src="./images/positioncity.png" alt=""><span>工作城市</span></label>
					<input type="text" placeholder="请选择城市" v-model="city">
				</div>
				<div class="rightapply" @click="apply">立即申请</div>
			</div>
			<div class="guesslike">
				<h3><span></span>猜你喜欢</h3>
				<div class="guesslikecont">
					<div v-for="(item,i) in dataobject.vshopProductResList" :key='i'>
						<div class="guessimgs"><img :src=item.productLogo alt=""></div>
						<p>{{item.productName}}</p>
					</div>
				</div>
			</div>
			<div class="recommend">
				<h3><span></span>推荐阅读</h3>
				<ul>
					<li v-for="(item,i) in dataobject.exhibitionContentList" :key="i">
						<div>
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
import utils from '../../utils/utils'
export default {
    data(){
			return{
				city:'上海',
				dataobject:{}
			}
		},
		methods:{
			tocity(){
				this.$router.push('/city')
			},
			onClickLeft(){
				this.$router.go(-1)
			},
			//立即申请
			apply(){
				let data = {
					productType:0,
					inviterCode:utils.getCookie('InviterCode'),
					productCode:utils.getCookie('ProductCode')
				}	
				this.request('wisdom.vshop.product.h5BeforeJumpDetail',data)
				.then(data=>{
					if(data.code=='success'){
						this.$router.push('/stiflingborrow')
					}
				})
			},
			getdatas(){
				let data = {
					inviterCode:utils.getCookie('InviterCode'),
					productCode:utils.getCookie('ProductCode')
				}
				this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						this.dataobject = data.data
					}
				})
			}
		},
		mounted(){
			if(this.$route.query.city){
				this.city=this.$route.query.city
			}
			this.getdatas()
		}
}
</script>
<style lang="less">
.maincontent{
	background: #f1f1fb
}
    .productbannerimg{
			height:126px;
			img{
				width:100%;
				height:100%;
			}
		}
		.productinfor{
			margin:8px 8px 20px;
			div{
				margin-bottom:8px;
				background:#ffffff;
				padding:0 19px 12px 15px;
				h3{
					color:#4597FB;
					font-size:14px;
					line-height: 30px;
					height:44px;
					align-items: center;
					display: flex;
					border-bottom:1px solid #E7E7E7 /*no*/;
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
				line-height:50px;
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
				border-bottom:1px solid #E7E7E7 /*no*/;
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
				div{
					display: flex;
					align-items: center;
					.guessimgs{
						width:48px;
						height:48px;
						border-radius: 5px;
						background: red;
						overflow: hidden;
						margin-right: 10px;
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
					border-bottom:1px solid #E7E7E7 /*no*/;
					display: flex;
					padding:15px 0;
					img{
						width:106px;
						height:65px;
						margin-right: 8px;
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