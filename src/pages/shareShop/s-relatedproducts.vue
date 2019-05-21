<template>
	<div>
		<header class="srela_top">
			<div>照片</div>
			<div class="srelate_menu">
				<van-tabs v-model="active">
					<van-tab title="官方贷款">

					</van-tab>
					<van-tab title="信用卡">

					</van-tab>
					<van-tab title="自营贷款">

					</van-tab>
				</van-tabs>
			</div>
		</header>
	</div>
</template>
<script>
import { Tab, Tabs } from 'vant';
export default {
		components:{
			[Tab.name]:Tab,
			[Tabs.name]:Tabs,
		},
    data(){
        return{
					active:0
        }
    },
    methods:{

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
			background: pink;
			.srelate_menu{
				width:90%;background: red;
			}
		}
</style>