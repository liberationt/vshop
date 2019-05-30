<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin" :disabled="disabled=='官方贷款'">
	<div class="srelamain">
		<header class="srelatop">
			<div class="srelatopmain">
				<div><img src="./images/tou xiang.png" alt=""></div>
				<div class="srelate_menu">
					<van-tabs type="card" v-model="active" @click='onClick'>
						<van-tab class='van-tab van-tab--active' title="官方贷款"></van-tab>
						<van-tab title="信用卡"></van-tab>
						<van-tab title="自营贷款"></van-tab>
					</van-tabs>
				</div>
			</div>
			<div class="invitenum">邀请码6S89WH</div>
		</header>
		<div class="havemoney" >
			<div class="havemoneytop" v-show="show">
				<div @click="tohavemoney"><img src="" alt=""></div>
				<div class="close" @click="closeTost"><img src="./images/close.png" alt=""></div>
			</div>
			<div>
				<officialloans v-if='index==0'></officialloans>
				<creditcard v-if='index==1'></creditcard>
				<financingloan v-if='index==2'></financingloan>
			</div>
		</div>
		
	</div>
	</van-pull-refresh>
</template>
<script>
import financingloan from './s-financingloan.vue'
import officialloans from './s-officialloans.vue'
import creditcard from './s-creditcard.vue'
import { Tab, Tabs ,Dialog} from 'vant'
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
			active:'',
			index:'',
			show:true,
			isLoading:false,
			disabled:'官方贷款'
		}
	},
	methods:{
		onClick(i,v){
			this.index =i
			this.disabled = v
		},
		tohavemoney(){
			this.$router.push('')
		},
		closeTost(){
			Dialog.confirm({
				confirmButtonText:'10天内不再提示',
				cancelButtonText:'永不提示',
				message: '确认关闭此提示框吗？'
			}).then(() => {
			// on confirm
			}).catch(() => {
			// on cancel
			});
		},
			// 下拉刷新
		onRefresh(){
			setTimeout(() => {
				this.isLoading = false; //关闭下拉刷新效果
			}, 500);
		}
	},
	computed:{
		backgroundcolor(){
			return 
		}
	},
	created(){
		this.$emit('toparent','相关产品',1)
		if(this.$route.query.index){
			this.index= Number(this.$route.query.index)
			this.active = this.$route.query.index
		}
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
	}
	.srelatop{
		height:110px;
		background: #ffffff;;
		padding:15px;
		margin-bottom:15px;
		.srelatopmain{
			display: flex;
			align-items: center;
			img{
				width:60px;
				height:60px;
				margin-right: 20px;
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
			height:95px;
			margin-bottom: 15px;
			position: relative;
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