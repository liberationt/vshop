<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin" :disabled="disabled=='贷款'">
	<div class="srelamain">
		<header class="srelatop">
			<div class="srelatopmain">
				<div class="bannerudius"><img :src= personImg alt=""></div>
				<div class="srelate_menu">
					<van-tabs type="card" @click='onClick' v-model="active">
						<van-tab v-for="(item,i) in loanlist" :title = item.label :key='i'></van-tab>
					</van-tabs>
				</div>
			</div>
			<div class="invitenum"><img src="./images/xiantiaobanner.png"/>邀请码 &nbsp;{{inviterCode}}</div>
		</header>
		<div class="havemoney" >
			<div class="havemoneytop" v-show="showUMoney">
				<div @click="tohavemoney" class="havamoneyImg"><img :src=havemoneyImg alt=""></div>
				<div class="close" @click="closeTost" v-show="isshow"><img src="./images/close.png" alt=""></div>
			</div>
			<div>
				<officialloans v-show="disabled=='贷款'"></officialloans>
				<creditcard ref="getcred" v-show="disabled=='信用卡'"></creditcard>
				<financingloan ref='getfin'  v-show="disabled=='自营'"></financingloan>
			</div>
		</div>
		
	</div>
	</van-pull-refresh>
</template>
<script>
import { statistics } from "wisdom-h5";
import utils from '../../utils/utils'
import financingloan from './s-financingloan'
import officialloans from './s-officialloans'
import creditcard from './s-creditcard'
import { Tab, Tabs ,Dialog} from 'vant'
import { constants } from 'crypto';
export default {
	components:{
		[Tab.name]:Tab,
		[Tabs.name]:Tabs,
		[Dialog.name]:Dialog,
		financingloan, //自营贷款
		officialloans, //官方贷款
		creditcard //信用卡
	},
	data(){
		return{
			active:'0',
			inviterCode:'',
			isLoading:false,
			loanlist:[],
			disabled:'',
			personImg:require('./images/touxiangban.png'),
			havemoneyImg:'',
			showUMoney:false,
			dayUMoney:'',
			isshow:false,
			jumpUrl:''
		}
	},
	methods:{
		onClick(i,v){
			if(v=='贷款'){
				statistics.page("officialloans");
			}else if(v=='信用卡'){
				statistics.page("creditcard");
			}else{
				statistics.page("financingloan");
			}
			this.disabled = v
		},
		tohavemoney(){
			
			if(this.jumpUrl){
				window.location.href = this.jumpUrl+'?inviterCode='+this.inviterCode
			}
		},
		closeTost(){
			statistics.click("relatedproducts","getnumber");
			Dialog.confirm({
				confirmButtonText:this.dayUMoney+"天内不再提示",
				cancelButtonText:'永不提示',
				message: '确认关闭此提示框吗？'
			}).then(() => {
				statistics.click("relatedproducts","closeone");
				this.closehaveMoney(0)
			}).catch(() => {
				statistics.click("relatedproducts","closetwo");
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
		},
			// 下拉刷新
		onRefresh(){
			// var that = this
			setTimeout(() => {
				if(this.disabled=='信用卡'){
					this.$refs.getcred.getdatas()
				}else{
					this.$refs.getfin.getdatas()
				}
				this.isLoading = false; //关闭下拉刷新效果
			}, 500);
		},
		//获取数据
		getdatas(){
			let data = {
				storeCode:utils.getCookie('storeCode'),
				head : true , 
				type:1
			}
			this.https('wisdom.vshop.vshopStore.queryStoreProduct',data)
			.then(data=>{ 
				this.loanlist = data.data.searchOptionBeanList
				this.inviterCode = data.data.inviterCode
				this.personImg = (data.data.personImg==""?this.personImg:data.data.personImg)
				if(data.data.bannerResList.length){
					this.havemoneyImg=data.data.bannerResList[0].bannerUrl
					this.jumpUrl = data.data.bannerResList[0].jumpUrl
				}
				this.dayUMoney = data.data.dayUMoney
				this.showUMoney = data.data.showUMoney
				this.$emit('toparent',data.data.storeName,1,data.data.inviterCode)
				if(this.$route.query.disbaled){
					this.disabled=decodeURI(this.$route.query.disbaled)
				}else{
					this.disabled = this.loanlist[0].label
				}
			})
		}
	},
	created(){
		window.scrollTo(0,0);
		if(utils.getCookie('users')){
			this.isshow = true
		}else{
			this.isshow = false
		}
		if(this.$route.query.index){
			this.active =String(this.$route.query.index)
		}
		this.getdatas()
		
	}
}
</script>
<style lang="less" scoped>
.srelamain{
	background:#f1f1fb;
	min-height: 610px;
	.invitenum{
		text-align: center;
		margin-top: 12px;
		font-size: 11px;
		color:#999999;
		line-height:11px;
		position: relative;
		img{
			position: absolute;
			left:0;
		}
	}
	.srelatop{
		height:110px;
		background: #ffffff;;
		padding:15px;
		margin-bottom:15px;
		.srelatopmain{
			display: flex;
			align-items: center;
			.bannerudius{
				width:60px;
				height:60px;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20px;
			}
			img{
				width:60px;
				height:60px;
			}
		}
		.srelate_menu{
			width:265px;
			height:44px;
		}
	}
	.havemoney{
		padding:0 15px;
		height:100%;
		.havemoneytop{
			height:103px;
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
	}
}
</style>