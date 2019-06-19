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
					<div class="datalistbanner"><img :src=item.productLogo alt=""></div>
					<div>
						<h4>{{item.productName}}</h4>
						<p>{{item.desc}}</p>
					</div>
				</div>
			</div>
		</div>
	</van-pull-refresh>
</template>
<script>
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
			personImg:'',
			name:'',
			adNameSecond:'',
			havemoneyImg:'',
			realStatus:0,
			isshow:false
		}
	},
	methods:{
		onRefresh(){
			setTimeout(() => {
				// 加载状态结束
				this.isLoading = false;
			}, 500);
		},
		getdatas(){
			let data = {
				storeCode:'0001',
				head : true , 
				type:2
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProduct',data)
				.then(data=>{ 
					if(data.code=='success'){
						this.dataList = data.data.productResList
						this.inviterCode = data.data.inviterCode
						this.personImg=data.data.personImg
						this.name = data.data.name
						this.adNameSecond = data.data.adNameSecond
						this.havemoneyImg = data.data.bannerResList[0].bannerUrl
						this.realStatus = data.data.realStatus
						this.showUMoney = data.data.showUMoney
					}
				})
			},
		tohavemoney(){
			this.$router.push('/havemoney')
		},
		tostiflingborrow(productCode){
				this.$router.push('/stiflingborrow?productCode='+productCode+'&'+'inviterCode='+this.inviterCode)
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
			this.request('wisdom.vshop.vshopStore.closeUMoneyTip',data)
			.then(data=>{
				if(data.code=='success'){
					this.getdatas()
				}
			})
		}
	},
	mounted(){
		if(utils.getCookie('user')){
			this.isshow = true
		}else{
			this.isshow = false
		}
		this.getdatas()
		this.$emit('toparent','实用工具')
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
					line-height: 17px;
					img{
						width:10px;height:12px;margin-right: 5px;margin-top: -1px;
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
				margin: 15px 0 5px;
				padding-left:15px;
			}
			.utilisdatalist{
				height:100px;
				padding-left:15px;
				display: flex;
				align-items: center;
				background: #ffffff;
				margin-top: 10px;
				.datalistbanner{
					height:50px;
					width:50px;
					background: red;
					margin-right: 10px;
					img{
						width:50px;
						height:50px;
					}
				}
				h4{
					font-size:19px;
					color:#333333;
					font-weight: bold;
				}
				p{
					font-size: 14px;
					color:#999999;
				}
			}
		}
		.havemoney{
			height:95px;
			position: relative;
			.havamoneyImg{
				height:95px;
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