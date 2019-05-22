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
		<div class="havemoney">
			<div>图片</div>
			<div>
				<p>有钱花</p>
				<p>精准匹配</p>
			</div>
			<div>急速贷款</div>
		</div>
		<div>
			<ul>
				<li>
					<div>图片</div>
					<div></div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import financingloan from './s-financingloan.vue'
import { Tab, Tabs } from 'vant';
export default {
		components:{
			[Tab.name]:Tab,
			[Tabs.name]:Tabs,
			financingloan
		},
    data(){
        return{
					active:0
        }
    },
    methods:{
			onClick(i){
				alert(i)
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
				// border-radius: 20px;
				overflow: hidden;
				
			}
		}
		.havemoney{
			display: flex;
			background:yellow;
		}
</style>