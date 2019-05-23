<template>
	<div>
		<header class="srela_top">
			<div>照片</div>
			<div class="srelate_menu">
				<van-tabs type="card" @click='onClick'>
					<van-tab title="官方贷款"></van-tab>
					<van-tab title="信用卡"></van-tab>
					<van-tab title="自营贷款"></van-tab>
				</van-tabs>
			</div>
		</header>
		<div class="havemoney" @click="closeTost">
			<div>图片</div>
			<div>
				<p>有钱花</p>
				<p>精准匹配</p>
			</div>
			<div>急速贷款</div>
		</div>
		<div>
			<officialloans v-if='index==0'></officialloans>
			<creditcard v-if='index==1'></creditcard>
			<financingloan v-if='index==2'></financingloan>
		</div>
	</div>
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
			financingloan, //官方贷款
			officialloans, //自营贷款
			creditcard //信用卡
		},
    data(){
        return{
			active:0,
			index:0
        }
    },
    methods:{
		onClick(i){
			this.index =i
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
		}
    },
    mounted(){
        this.$emit('toparent','相关产品',1)
    }
}
</script>
<style lang="less" scoped>
    .srela_top{
			display: flex;
			height:100px;
			background: red;
			justify-content: space-between;
			.srelate_menu{
				width:80%;
				overflow: hidden;
				
			}
		}
		.havemoney{
			display: flex;
			background:yellow;
			height:100px;
		}
</style>