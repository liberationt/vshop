<template>
    <div>
			<div class="lonamoney">
				<label>贷款金额</label>
				<div @click="todolist" class="dropdown dropdowns">
					<van-dropdown-menu>
						<van-dropdown-item v-model="value1" :options="option1" />
					</van-dropdown-menu>
				</div>
			</div>
			<div class="applyloan">
				<h3><span></span>贷款期限</h3>
				<options :options="selections"></options>
			</div>
			<div class="applyloan">
				<h3><span></span>贷款用途</h3>
				<!-- <options :options="selections1" :isMultiply=true></options> -->
				<options :options="selections1"></options>
			</div>
			<div @click="nextstep" class="loneNext">下一步</div>
		</div>
</template>
<script>
import options from '../../views/options.vue'
import { DropdownMenu, DropdownItem } from 'vant';
export default {
		components:{
			[DropdownMenu.name]:DropdownMenu,
			[DropdownItem.name]:DropdownItem,
			options
		},
    data(){
			return{
				carddataList:[1,2,3,4,5,6,7,8,9,10],
				show:true,
				value1:0,
				option1: [
					{ text: '全部商品', value: 0 },
					{ text: '新款商品', value: 1 },
					{ text: '活动商品', value: 2 }
				],
				selections: [],
				selections1: [
					{label:'慕容冲',value:1},
					{label:'潘安',value:2},
					{label:'宋玉',value:3},
					{label:'卫玠',value:4},
					{label:'兰陵王',value:5},
				],
				value:''
			}
    },
	methods:{
		onSelect(){

		},
		todolist(value){
			this.show = true
		},
		//取消
		onCancel(i){
			console.log(i)
		},
		//确认
		onConfirm(item){
			var lonatext = document.getElementsByClassName('lonatext')[0]
			lonatext.innerHTML = item.text
			this.show = false
		},
		nextstep(){
			this.$emit('tosteps',1)
		}
	},
	mounted(){
		this.selections =	[{label:'赵雅芝',value:'1'},
			{label:'刘雪华',value:'2'},
			{label:'俞飞鸿',value:'3'},]
	}
}
</script>
<style lang="less" scoped>
    .lonamoney{
			height:50px;background:#ffffff;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			margin:20px 0 10px;
			padding:0 15px;
			font-size:14px;
			.dropdowns{
				margin-right: 15px;
				.van-dropdown-menu__title{
					color:#4597FD !important;
				}
			}
		}
		.loneNext{
			height:50px;
			background: #4597FD;
			text-align: center;
			position: fixed;
			width:100%;
			bottom:0;
			line-height:50px;
			color:#ffffff;
			font-size:16px;
			text-align: center;
		}
		.applyloan{
			background: #ffffff;
			margin-bottom:8px;
			h3{
				height:39px;
				line-height:39px;
				display: flex;
				align-items: center;
				font-size:14px; 
				color:#333333;
				padding:0 15px;
				border-bottom:1px solid #E7E7E7 /*no*/;
				span{
					display: block;
					width:3px;
					height:18px;
					background: #4597FB;
					border-radius: 1px;
					margin-right: 8px;
				}
			}
		}
</style>