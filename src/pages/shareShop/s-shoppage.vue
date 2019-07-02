<template>
	<div class="shoppagemain">
		<div class="personalinfor" :style="{backgroundImage:'url('+bannerimg+')'}">
			<header>
				<div class="headerlift">
					<div class="personal"><img :src=personImg alt=""></div>
					<p>邀请码{{dataList.inviterCode}}</p>
				</div>
				<div class="headerright">
					<h4>{{dataList.storeName}}</h4>
					<div>
						<span>{{dataList.adNameSecond}}</span>
						<span>{{dataList.name}}</span>
						<span class="identity" v-show="dataList.realStatus==1"><img src="./images/shenfenrenzheng.png"/>身份认证</span>
					</div>
					<span class="headerbot">{{dataList.storeDesc}}</span>
				</div>
			</header>
			<div class="contact">
				<div class="contactleft" @click='gophone(dataList.phone)'><img src="./images/dianhua.png" alt="">电话联系</div>
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
			<div v-for="(item,i) in dataList.exhibitionContentList" :key="i" @click="todetails(item.exhibitionContentCode)">
				<div><img :src=item.photoPath alt=""></div>
				<div class="listright">
					<p>{{item.contentTitle}}</p>
					<span>{{item.dataCreateTime}}</span>
				</div>
			</div>
		</div>
		<div class="dialog">
			<van-dialog
				v-model="show"
				show-cancel-button
				cancel-button-text='关闭'
				confirm-button-text='复制微信'
				confirmButtonColor=""
				confirmButtonBackground='red'
				:beforeClose="beforeClose"
				@confirm = confirm(dataList.weixinNumber)
			>
			<div class="dialogbanner"><img :src=dataList.weixinImg alt=""></div>
			<div class="dialogtitle">
				<p>长按识别二维码图片</p>
				<p>或复制微信ID搜索添加</p>
			</div>
			</van-dialog>
		</div>
	</div>
</template>
<script>
import { statistics } from "wisdom-h5";
import utils from '../../utils/utils'
import { Toast } from 'vant';
export default {
	component:{
		[Toast.name]:Toast
	},
	data(){
		return{
			show:false,
			dataList:{},
			tittle:'',
			inviterCode:'',
			personImg:require('./images/touxiangban.png'),
			searchOptionBeanList:[],
			bannerimg:require('./images/s-shoppageban.png')
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		getDatas(){
			let data ={
				inviterCode:this.$route.query.inviterCode?this.$route.query.inviterCode:utils.getCookie('inviterCode'),
				storeCode:''
			}
			this.request('wisdom.vshop.vshopStore.getStoreIndex',data).then(data=>{
				if(data.code=='success'){
					this.dataList = data.data
					this.tittle = data.data.storeName
					this.personImg = (data.data.personImg==""?this.personImg:data.data.personImg)
					this.bannerimg = (data.data.backgroundImg.bannerUrl==""?this.bannerimg:data.data.backgroundImg.bannerUrl)
					this.searchOptionBeanList = data.data.searchOptionBeanList
					utils.setCookie('storeCode',data.data.storeCode)
					this.$emit('toparent',this.tittle,1)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		gophone(item){
			statistics.click("tap", "shappage","phonenum");
			window.location.href = "tel://" + item;
		},
		copywx(content){
			const copyToClipboard = str => {
				const el = document.createElement('textarea'); // Create a <textarea> element
				el.value = str; // Set its value to the string that you want copied
				el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
				el.style.position = 'absolute'; 
				el.style.left = '-9999px'; // Move outside the screen to make it invisible
				document.body.appendChild(el); // Append the <textarea> element to the HTML document
				const selected = 
				document.getSelection().rangeCount > 0 // Check if there is any content selected previously
				? document.getSelection().getRangeAt(0) // Store selection if found
				: false; // Mark as false to know no selection existed before
				el.select(); // Select the <textarea> content
				var a = document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
				if (!a){
					el.select();
					el.setSelectionRange(0, el.value.length), document.execCommand('Copy');// 执行浏览器复制命令
				}
				// document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
				document.body.removeChild(el); // Remove the <textarea> element
				if (selected) { // If a selection existed before copying
				document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
				document.getSelection().addRange(selected); // Restore the original selection
				}
			};
			copyToClipboard(content)
		},
		loan(){
			statistics.click('tap','shappage','loan')
			let index 
			for(var i=0;i<this.searchOptionBeanList.length;i++){
				if(this.searchOptionBeanList[i].value=='loan'){
					index = this.searchOptionBeanList[i].order-1
				}
			}
			this.$router.push('/relatedproducts?disbaled='+encodeURI('贷款')+'&'+'index='+index)
		},
		card(){
			statistics.click('tap','shappage','card')
			let index 
			for(var i=0;i<this.searchOptionBeanList.length;i++){
				if(this.searchOptionBeanList[i].value=='card'){
					index = this.searchOptionBeanList[i].order-1
				}
			}
			this.$router.push('/relatedproducts?index='+index)
		},
		tool(){
			statistics.click('tap','shappage','tool')
			this.$router.push('/utilities')
		},
		todetails(exhibitionContentCode){
			statistics.click('tap','shappage','todetails')
			this.$router.push('/tweetsdetails?exhibitionContentCode='+exhibitionContentCode)
		},
		weixin(){
			this.show=true
			statistics.click("tap","shappage","weixinnum")
		},
		beforeClose(action,down){
			if(action==='confirm'){
				down()
			}else{
				this.show= false
				down()
			}
		},
		confirm(content){
			this.copywx(content)
			statistics.click('tap','shappage','copywx')
			Toast({
				message:'微信ID已复制',
				duration:800
			});
			this.show= false
		},
		wxShare() {
			this.request("wisdom.vshop.wechatOpen.getJsconf", {url: window.location.origin + "/shoppage?storeCode="+this.dataList.storeCode})
			.then(data => {
				utils.wxShare(data.data)
				wx.ready(function(){
					wx.updateAppMessageShareData({
					title: '急用钱？请找我，专业贷款！', // 分享标题
					desc: '*经理向您推荐了自己的微店，提供工资贷、社保贷、消费贷、公积金贷、车贷房贷……规渠正规安全，服务专业周到，快来看看吧！', // 分享描述
					link: window.location.origin + "/#/shoppage?inviterCode="+this.dataList.inviterCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://wisdom-loan.oss-cn-shanghai.aliyuncs.com/productParam/1cba619b-6b5d-4e18-8545-ef0c64e1981e.png', // 分享图标
					success: function () {
						// 用户点击了分享后执行的回调函数
						alert('分享成功回调')
					},
					cancel: function(err){
						alert('分享取消回调')
					}
					});
				})
			})
			.catch(err => {
				console.log(err);
			});
		}
	},
	created(){
		if(this.$route.query.inviterCode){
			utils.setCookie('inviterCode',this.$route.query.inviterCode)
		}
		this.getDatas()
	},
	mounted(){
		this.wxShare();
		statistics.page("shoppage", "shppagenum");
	}
}
</script>
<style lang="less" scoped>
   .shoppagemain{
		background: #f1f1fb;
		height:100%;
		margin-top:-4px;
		// padding-bottom:25px;
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
					border-radius: 50%;
					margin:0 auto;
					overflow: hidden;
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
					position: relative;
					z-index: 10;
					
				}
			}
			.headerright{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				color:#ffffff;
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
						img{
							width:10px;
							height:12px;
							margin-right: 5px;
							margin-top: -1px;
						}
					}
				}
				.headerbot{
					color:#ffffff;
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
			padding-bottom:15px;
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
				img{
					width:100%;
					height:166px;
				}
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