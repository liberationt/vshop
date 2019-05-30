<template>
	<div>
		<div class="forminfor">
			<p>
				<label for="">姓名:</label>
				<input type="text" placeholder="请输入姓名">
			</p>
			<p>
				<label for="">身份证:</label>
					<input type="text" placeholder="请输入身份证号">
				</p>
			<p>
				<label for="">工作所在地:</label>
				<input type="text" placeholder="请选择城市">
			</p>
		</div>
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
		.forminfor{
			background: #ffffff;
			padding:0 15px;
			font-size:14px;
			color:#33333333;
			p{
				height:48px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					text-align: right;
				}
			}
		}
</style>