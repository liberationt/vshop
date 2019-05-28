<template>
	<div class="shoppagemain">
		<div class="personalinfor">
			<header>
				<div class="headerlift">
					<div class="personal"> <img src="" alt=""></div>
					<p>邀请码6S89WH</p>
				</div>
				<div class="headerright">
					<h4>店铺名称您的信贷专家</h4>
					<div>
						<span>成都</span>
						<span>郑经理</span>
						<span class="identity">身份认证</span>
					</div>
					<span class="headerbot">这里是店铺介绍欢迎来电咨询</span>
				</div>
			</header>
			<div class="contact">
				<div class="contactleft"><img src="./images/dianhua.png" alt="">电话联系</div>
				<div class="contactright" @click="weixin"><img src="./images/weixin.png" alt="">微信联系</div>
			</div>
			<div class="entrance">
				<div @click="loan">
					<div class="daikuan"><img src="./images/daikuan.png" alt=""></div>
					<div>
						<h4>我要贷款</h4>
						<p>利率低 额度高 下款快</p>
						<p>多种产品任你选</p>
					</div>
				</div>
				<div @click="card">
					<div class="banka"><img src="./images/banka.png" alt=""></div>
					<div>
						<h4>我要办卡</h4>
						<p>各种热门信用卡</p>
						<p>额度高批卡率99%</p>
					</div>
				</div>
				<div @click="tool">
					<div class="gongju"><img src="./images/gongju.png" alt=""></div>
					<div>
						<h4>实用小工具</h4>
						<p>查征信 查网贷黑名单</p>
						<p>在线实时查询%</p>
					</div>
				</div>
			</div>
		</div>
		<div class="tweetsList">
			<h4><span></span>推荐阅读</h4>
			<div v-for="(item,i) in dataList" :key="i" @click="todetails">
				<div><img src="./images/people.png" alt=""></div>
				<div class="listright">
					<p>信贷经理教你如何高效贷款</p>
					<span>2019-05-10</span>
				</div>
			</div>
		</div>
		<div class="dialog">
			<van-dialog
				v-model="show"
				show-cancel-button
				cancel-button-text='关闭'
				confirm-button-text='复制微信ID'
				confirmButtonColor=""
				confirmButtonBackground='red'
				:beforeClose="beforeClose"
			>
			<div class="dialogbanner"></div>
			<div class="dialogtitle">
				<p>长按识别二维码图片</p>
				<p>或复制微信ID搜索添加</p>
			</div>
			</van-dialog>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			show:true,
			dataList:[1]
		}
	},
	methods:{
		getDatas(){
			this.request('',{}).then((data)=>{
					this.data = data.data
			})
		},
		loan(){
			this.$router.push('')
		},
		card(){
			this.$router.push('')
		},
		tool(){
			this.$router.push('')
		},
		todetails(){
			this.$router.push('')
		},
		weixin(){
			this.show=true
		},
		beforeClose(action,down){
				if(action==='confirm'){
					this.confirm()
					down()
				}else{
					this.show= false
					down()
				}
		},
		confirm(){
			alert(1)
			this.show= false
		
		}
	},
	mounted(){
			this.$emit('toparent','店铺首页',1)
	}
}
</script>
<style lang="less" scoped>
   .shoppagemain{
		background: #f1f1fb;
		height:100%;
		.personalinfor{
			padding:15px;
			header{
				display: flex;
			}
			.headerlift{
				margin-right: 11px;
				text-align:center;
				.personal{
					width:80px;
					height:80px;
					background: #000;
					border-radius: 50%;
					margin:0 auto;
					img{
						width:100%;
						height:100%;
					}
				}
				p{
					width:85px;
					height:19px;
					background:rgba(254,241,227,1);
					border:1px solid rgba(243,177,62,1) /*no*/;
					border-radius:9px;
					font-size:10px;
					color:#F3B13E;
					line-height: 19px;
					margin-top: -10px;
				}
			}
			.headerright{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				color:#333333;
				h4{
					font-size:14px;
					font-weight:bold;
				}
				div{
					font-size:16px;
					display: flex;
					align-items: center;
					>span{
						margin-right: 10px;
					}
					.identity{
						display: block;
						background: #F3B13E;
						font-size:10px;
						color:#ffffff;
						padding:0 8px;
						height:17px;
						line-height: 17px !important;
						border-radius: 3px;
						// margin-top: 2px;
						// line-height: 17px;
					}
				}
				.headerbot{
					color:#666666;
					font-size:14px;
				}
			}
			.contact{
				margin: 20px 0 15px;
				display: flex;
				justify-content: space-between;
				font-size:16px;
				color:#ffffff;
				.contactleft{
					width:139px;
					height:45px;
					background: #4597FB;
					text-align: center;
					line-height: 45px;
					border-radius: 10px;
					img{
						width:25px;
						height:25px;
						margin-right: 10px;
					}
				}
				.contactright{
					width:150px;
					height:45px;
					background: #62D62D;
					text-align: center;
					line-height: 45px;
					border-radius: 10px;
					img{
						width:32px;
						height:26px;
						margin-right: 10px;
					}
				}
			}
			.entrance{
				>div{
					height:105px;
					background: #ffffff;
					margin-bottom:10px;
					display: flex;
					align-items: center;
					padding-left:34px;
					color:#333333;
					h4{
						font-size:16px;
						font-weight: bold;
					}
					p{
						font-size:15px;
					}
					.daikuan{
						width:57px;height:75px;
						margin-right: 22px;
					}
					.banka{
						width:66px;
						height:65px;
						margin-right: 15px;
					}
					.gongju{
						width:64px;
						height:80px;
						margin-right: 19px;
					}
				}
			}
		}
		.tweetsList{
			background: #ffffff;
			padding-left:15px;
			>div{
				height:95px;
				display: flex;
				align-items: center;
				font-size:12px;
				color:#666666;
				img{
					width:106px;
					height:65px;
					margin-right: 8px;
				}
				p{
					margin-bottom:18px;
					font-size:15px;
					color:#333333;
				}
			}
			h4{
				display: flex;
				align-items: center;
				height:44px;
				line-height:44px;
				font-size:17px;
				color:#4597FB;
				span{
					display: inline-block;
					height:18px;
					width:3px;
					border-radius: 2px;
					background: #4597FB;
					margin-right: 8px;
					margin-top: -2px;
				}
			}
		}
		.dialog{
			.dialogbanner{
				height:166px;
				background: red;
			}
			p{
				text-align: center;

			}
		}
		.dialogtitle{
			margin:15px auto 20px;
			font-size:14px;
		}

		
	}
</style>