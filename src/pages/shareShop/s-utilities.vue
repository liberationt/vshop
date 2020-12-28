<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin">
		<div class="utilitmain">
			<div class="utilitop">
				<div class="utilitopbanner"><img :src=personImg alt=""></div>
				<div class="utiliright">
					<span>{{adNameSecond}}</span>
					<span>{{name}}</span>
					<p v-show='realStatus==1'><img src="./images/shenfenrenzheng.png"/>身份认证</p>
				</div>
			</div>
			<div class="utilitslist">
				<div class="havemoney" v-show="showUMoney">
					<div class="havamoneyImg" @click="tohavemoney"><img :src=havemoneyImg alt=""></div>
					<div class="close" @click="closeTost" v-show="isshow"><img src="./images/close.png" alt=""></div>
				</div>
				<div class="utilistittle">申请多个产品，可大幅度提高贷款成功率</div>
				<div class="utilisdatalist" @click="tostiflingborrow(item.productCode)" v-for="(item,i) in dataList" :key='i'>
					<div class="leftpic"><img :src=item.productLeftTopPic alt=""></div>
					<div class="datalistbanner"><img :src=item.productLogo alt=""></div>
					<div class="productLabel">{{item.productLabel}}</div>
					<div class="detailstittle">
						<h4>{{item.productName}}</h4>
						<p>{{item.desc}}</p>
					</div>
				</div>
			</div>
		</div>
	</van-pull-refresh>
</template>
<script>
import { statistics } from "wisdom-h5";
import { Tab, Tabs ,Dialog} from 'vant'
import utils from '../../utils/utils'
export default {
	components:{
		[Dialog.name]:Dialog
	},
	data(){
		return{
			isLoading:false,
			showUMoney:false,
			inviterCode:'',
			dataList:[],
			personImg:require('./images/touxiangban.png'),
			name:'',
			adNameSecond:'',
			havemoneyImg:'',
			realStatus:0,
			isshow:false,
			jumpUrl:'',
		}
	},
	methods:{
		onRefresh(){
			setTimeout(() => {
				// 加载状态结束
				this.getdatas()
				this.isLoading = false;
			}, 500);
		},
		getdatas(){
			let data = {
				storeCode:utils.getCookie('storeCode'),
				head : true , 
				type:2
			}
			this.https('wisdom.vshop.vshopStore.queryStoreProduct',data)
				.then(data=>{ 
					if(data.code=='success'){
						this.dataList = data.data.productResList
						this.inviterCode = data.data.inviterCode
						this.personImg=(data.data.personImg==""?this.personImg:data.data.personImg)
						this.name = data.data.name
						this.adNameSecond = data.data.adNameSecond
						if(data.data.bannerResList!=null){
							this.havemoneyImg = data.data.bannerResList[0].bannerUrl
							this.jumpUrl = data.data.bannerResList[0].jumpUrl
						}
						this.realStatus = data.data.realStatus
						this.showUMoney = data.data.showUMoney
						this.$emit('toparent',data.data.storeName,2,data.data.inviterCode,data.data.name)
					}
				})
			},
		tohavemoney(){
			if(this.jumpUrl){
				window.location.href = this.jumpUrl+'?inviterCode='+this.inviterCode
			}
		},
		tostiflingborrow(productCode){
				statistics.click("utilities","getnumber");
				this.$router.push('/stiflingborrow?inviterCode='+this.inviterCode+'&'+'productCode='+productCode)
		},
		closeTost(){
			Dialog.confirm({
				confirmButtonText:'10天内不再提示',
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
			this.https('wisdom.vshop.vshopStore.closeUMoneyTip',data)
			.then(data=>{
				if(data.code=='success'){
					this.getdatas()
				}
			})
		}
	},
	mounted(){
		window.scrollTo(0,0);
		if(utils.getCookie('users')){
			this.isshow = true
		}else{
			this.isshow = false
		}
		this.getdatas()
		statistics.page("utilities");
	}
}
</script>
<style lang="less" scoped>
  .utilitmain{
		min-height:600px;
		background: #f1f1fb;
		.utilitop{
			height:75px;
			background: #ffffff;
			display: flex;
			padding-left:15px;
			align-items: center;
			margin-bottom:15px;
			.utilitopbanner{
				width:50px;height:50px;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 15px;
				img{
					width:50px;height:50px;
				}
			}
			.utiliright{
				display: flex;
				align-items: center;
				font-size:18px;
				color:#333333;
				font-weight: bold;
				span{
					margin-right: 10px;
				}
				p{
					width:70px;height:17px;background: #F3B13E;
					color:#ffffff;
					font-size:10px;border-radius: 3px;
					text-align: center;
					line-height: 20px;
					img{
						width:10px;height:11px;margin-right: 5px;margin-top: -2px;
					}
				}
			}
		}
		.utilitslist{
			padding:0 15px;
			.utilistittle{
				height:40px;
				color:#4897FB;
				line-height:40px;
				background: #ffffff;
				font-size:12px;
				margin: 12px 0 10px;
				padding-left:15px;border-radius:4px;
			}
			.utilisdatalist{
				height:100px;
				padding-left:15px;
				display: flex;
				background: #ffffff;
				padding-top:25px;
				margin-bottom: 10px;
				border-radius: 4px;
				position: relative;
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
				.leftpic{
					position:absolute;
					top:0;
					left:0;
					img{
						width:35px;height:35px;
						z-index: 10;
					}
				}
				.datalistbanner{
					height:50px;
					width:50px;
					background: pink;
					margin-right: 10px;
					border-radius: 5px;
					overflow: hidden;
					img{
						width:50px;
						height:50px;
					}
				}
				.detailstittle{
					margin-top: -4px;
				}
				h4{
					font-size:19px;
					color:#333333;
					font-weight: bold;
					width:260px;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				p{
					font-size: 14px;
					color:#999999;
					width:260px;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
		.havemoney{
			height:103px;
			position: relative;
			.havamoneyImg{
				height:103px;
				img{
					width:100%;
					height:100%;
				}
			}
			.close{
				width:17px;
				height:17px;
				position: absolute;
				right:10px;
				top:8px;
			}
		}
	}  
</style>