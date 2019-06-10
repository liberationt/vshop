<template>
  <div class="appliationlocnmain applicamain pddingTop">
		<header>
			<van-nav-bar title='有钱花' left-arrow fixed @click-left="returngo"></van-nav-bar>
		</header>
		<div class="applireminder">温馨提示：帮你贷仅支持线下签约贷款 <div @click="close"><img src="./images/close.png" alt=""></div></div>
		<div class="applistap">
			<div class="applistaplist">
				<div><img src='./images/loanapply.png' alt=""></div>
				<p>申请借款</p>
			</div>
			<div class="applistaplist">
				<div><img src='./images/basic1.png' alt=""></div>
				<p>基本信息</p>
			</div>
			<div class="applistaplist">
				<div><img src='./images/job2.png' alt=""></div>
				<p>工作信息</p>
			</div>
			<div class="applistaplist">
				<div><img src='./images/add.png' alt=""></div>
				<p>补充信息</p>
			</div>
		</div>
			<div class="applyloan">
				<h3><span></span>职业类型</h3>
				<options :options="occupationalList"></options>
			</div>
			<div class="applyloan">
				<h3><span></span>工资发放形式</h3>
				<options :options="paymentList" :isMultiply=true></options>
			</div>
			<div class="applyloan">
				<h3><span></span>月收入</h3>
				<options :options="incomeList" :isMultiply=true></options>
			</div>
			<div class="applyloan">
				<h3><span></span>公司代缴社保</h3>
				<options :options="securityLisr" :isMultiply=true></options>
			</div>
			<div class="applyloan">
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
			close(){

			},
			returngo(){
				this.$router.go(-1)
			},
			nextstep(){
				this.$emit('tosteps',3)
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
</style>