<template>
    <div>
			<h1>工作信息</h1>
			<div class="applyloan">
				<h3><span></span>职业类型</h3>
				<options :options="occupationalList"></options>
			</div>
			<div>
				<h3><span></span>贷款用途</h3>
				<options :options="paymentList" :isMultiply=true></options>
			</div>
			<div>
				<h3><span></span>月收入</h3>
				<options :options="incomeList" :isMultiply=true></options>
			</div>
			<div>
				<h3><span></span>公司代缴社保</h3>
				<options :options="securityLisr" :isMultiply=true></options>
			</div>
			<div>
				<h3><span></span>公司代缴公积金</h3>
				<options :options="accumulationList" :isMultiply=true></options>
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
					occupationalList: [],
					paymentList: [
						{label:'打卡工资',value:1},
						{label:'个人转账',value:2},
						{label:'现金发放',value:3},
					],
					incomeList:[
						{label:'2千以下',value:1},
						{label:'2千-5千',value:2},
						{label:'5千-8千',value:3},
						{label:'8千-1万',value:4},
						{label:'1万以上',value:5},
					],
					securityLisr:[
						{label:'最近连续缴纳≥6个月',value:1},
						{label:'最近连续缴纳<6个月',value:1},
						{label:'没有缴纳',value:1},
					],
					accumulationList:[
						
					]
				}
    },
    methods:{
			onSelect(){

			},
			nextstep(){
				this.$emit('tosteps',1)
			}
    },
    mounted(){
			this.occupationalList =	[
						{label:'上班族',value:'1'},
						{label:'公务员',value:'2'},
						{label:'企业法人',value:'3'},
						{label:'个体户',value:'4'},
						{label:'自由职业',value:'5'},
					]
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