<template>
  <div class="appliationlocnmain  pddingTop">
		<header>
			<van-nav-bar title='有钱花' left-arrow fixed @click-left="returngo">
			</van-nav-bar>
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
				<div><img src='./images/job1.png' alt=""></div>
				<p>工作信息</p>
			</div>
			<div class="applistaplist">
				<div><img src='./images/add.png' alt=""></div>
				<p>补充信息</p>
			</div>
		</div>
		<div class="lonamoney">
			<label>贷款金额</label>
			<div class="dropdown dropdowns">
				<van-dropdown-menu>
					<van-dropdown-item v-model="value1" :options="option1" @change="onSelect"/>
				</van-dropdown-menu>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>贷款期限</h3>
			<div class="optionstyle">
				<!-- <options :options="loanperiodList" @toparents='child' ></options> -->
				<ul class="box">
					<li v-for="item,index of loanperiodList" :class="{checked:index===indexs}" @click="changeList(item,index)">{{item.label}}</li>
				</ul>
			</div>
			
		</div>
		<div class="applyloan">
			<h3><span></span>贷款用途</h3>
			<div class="optionstyle">
				<options :options="loanpurposeList" @toparents='child' v-model='loanpurpose' ref='getloanpurpose'></options>
			</div>
		</div>
		<div @click="nextstep" class="loneNext">下一步</div>
	</div>
</template>
<script>
import options from '../../views/options.vue'
import { DropdownMenu, DropdownItem,Step, Steps } from 'vant';

export default {
		components:{
			[DropdownMenu.name]:DropdownMenu,
			[DropdownItem.name]:DropdownItem,
			[Step.name]:Step,
			[Steps.name]:Steps,
			options
		},
    data(){
		return{
			value1:0,
			option1: [
				{ text: '1万-2万', value: 0 },
				{ text: '2万-5万', value: 1 },
				{ text: '5万以上', value: 2 }
			],
			loanperiod:[],
			loanperiodList: [
				{label:'3个月',value:1},
				{label:'6个月',value:2},
				{label:'9个月',value:3},
				{label:'12个月',value:4},
				{label:'24个月',value:5},
			],
			loanpurpose:[],
			loanpurposeList: [
				{label:'日常消费',value:1},
				{label:'购车',value:2},
				{label:'购房',value:3},
				{label:'教育培训',value:4},
				{label:'短期周转',value:5},
				{label:'其他',value:6},
			],
			value:[],
			indexs:2
		}
    },
	methods:{
		close(){

		},
		changeList(item,indexs){
			this.indexs = indexs
			console.log(item,indexs)
		},
		onSelect(value){
			this.value1 = value
		},
		returngo(){
			this.$router.go(-1)
		},
		child(emg){
			this.loanperiod= emg
		},
		nextstep(){
			// console.log(this.value)
			console.log(this.loanperiod)
		}
	},
	mounted(){
		// this.child()
	}
}
</script>
<style lang="less" scoped>
    .lonamoney{
			height:50px;background:#ffffff;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			margin:10px 0;
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