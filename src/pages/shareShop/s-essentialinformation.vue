<template>
    <div>
			<h1>基本信息</h1>
			<div>
				<h3>贷款期限</h3>
				<options :options="selections"></options>
			</div>
			<div>
				<h3>贷款用途</h3>
				<options :options="selections1" :isMultiply=true></options>
			</div>
			<div @click="nextstep" class="loneNext">下一步</div>
		</div>
</template>
<script>
import options from '../../views/options.vue'
export default {
		components:{
			options
		},
    data(){
        return{
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
			height:50px;background:red;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
		}
		.loneNext{
			height:30px;
			background: #000;
			text-align: center;
			position: fixed;
			width:60%;
			bottom:0;
			left:20%;
		}
</style>