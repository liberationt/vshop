<template>
    <div>
			<h1>申请贷款</h1>
			<div>
				<label>贷款金额</label>
				<van-action-sheet
					v-model="show"
					:actions="actions"
					@select="onSelect"
				/>
			</div>
    </div>
</template>
<script>
import { ActionSheet } from 'vant';
export default {
    data(){
        return{
					carddataList:[1,2,3,4,5,6,7,8,9,10],
					show: false,
					actions: [
						{ name: '选项' },
						{ name: '选项', loading: true },
						{ name: '禁用选项', disabled: true }
					]
        }
    },
    methods:{
			onSelect(){

			}
    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>
    
</style>