<template>
  <div class="appliationlocnmain applicamain pddingTop">
		<header>
			<van-nav-bar title='有钱花' left-arrow fixed @click-left="returngo"></van-nav-bar>
		</header>
		<div class="applireminder" v-show="toasttittle">温馨提示：帮你贷仅支持线下签约贷款 <div @click="close"><img src="./images/close.png" alt=""></div></div>
		<div class="applistap">
			<div class="applistapbanner"><img src="./images/gongzuoxinxi.png" alt=""></div>
			<div class="applistaplist">
				<p>申请借款</p>
				<p>基本信息</p>
				<p class="apply">工作信息</p>
				<p>补充信息</p>
			</div>
		</div>
			<div class="applyloan">
				<h3><span></span>职业类型</h3>
				<div class='optionstyle'>
					<ul class="box">
						<li v-for="item,index of occupationalList" :class="{checked:item.infoOptionKey===jobType}" @click="changejob(item,index)">{{item.infoOptionName}}</li>
					</ul>
				</div>
			</div>
			<div class="applyloan" v-show="jobType=='employees'">
				<h3><span></span>工资发放形式</h3>
				<div class='optionstyle'>
					<ul class="box">
						<li v-for="item,index of paymentList" :class="{checked:item.infoOptionKey===salaryType}" @click="changeoffer(item,index)">{{item.infoOptionName}}</li>
					</ul>
				</div>
				<!-- <options :options="paymentList" :isMultiply=true></options> -->
			</div>
			<div class="applyloan">
				<h3><span></span>月收入</h3>
				<div class='optionstyle'>
					<ul class="box">
						<li v-for="item,index of incomeList" :class="{checked:item.infoOptionKey===monthlyIncome}" @click="changeincome(item,index)">{{item.infoOptionName}}</li>
					</ul>
				</div>
				<!-- <options :options="incomeList" :isMultiply=true></options> -->
			</div>
			<div class="applyloan">
				<h3><span></span>公司代缴社保</h3>
				<div class='optionstyles'>
					<ul class="box">
						<li v-for="item,index of securityList" :class="{checked:item.infoOptionKey===socialSecurity}" @click="changesecur(item,index)">{{item.infoOptionName}}</li>
					</ul>
				</div>
			</div>
			<div class="applyloan" v-show="socialSecurity!='social_no_social_security'">
				<h3><span></span>公司代缴公积金</h3>
				<div class='optionstyles'>
					<ul class="box">
						<li v-for="item,index of accumulationList" :class="{checked:item.infoOptionKey===accumulationFund}" @click="changeaccum(item,index)">{{item.infoOptionName}}</li>
					</ul>
				</div>
			</div>
		<div @click="nextstep" class="loneNext">下一步</div>
	</div>
</template>
<script>
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
import {Toast} from 'vant'
export default {
    data(){
        return{
			occupationalList: [],
			paymentList: [],
			incomeList:[],
			securityList:[],
			accumulationList:[],
			jobType:'',
			salaryType :'',
			monthlyIncome:'',
			socialSecurity:'',
			accumulationFund:'',
			toasttittle:true
		}
    },
    methods:{
			close(){
				this.toasttittle = false
			},
			returngo(){
				this.$router.go(-1)
			},
			nextstep(){
				if(!this.jobType){
					Toast({
						message:'请选择职业类型',
						duration:800
					})
					return false
				}
				if(this.jobType=='employees'){
					if(!this.salaryType){
						Toast({
							message:'请选择工资发放形式',
							duration:800
						})
						return false
					}
				}
				if(!this.monthlyIncome){
					Toast({
						message:'请选择月收入',
						duration:800
					})
					return false
				}
				if(!this.socialSecurity){
					Toast({
						message:'请选择公司代缴社保',
						duration:800
					})
					return false
				}
				if(this.socialSecurity!='social_no_social_security'){
					if(!this.accumulationFund){
						Toast({
							message:'请选择公司代缴公积金',
							duration:800
						})
						return false
					}
				}
				let data={
					jobType:this.jobType,
					salaryType :this.jobType=='employees'?this.salaryType:'',
					monthlyIncome:this.monthlyIncome,
					socialSecurity:this.socialSecurity,
					accumulationFund:this.socialSecurity!='social_no_social_security'?this.accumulationFund:''
					
				}
				this.https('wisdom.vshop.vshopUserSelect.saveInfo',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("workinformation","getnumbers");
						this.$router.push('/supplementary')
					}
				})
			},
			changejob(item){
				this.jobType = item.infoOptionKey
			},
			//工资
			changeoffer(item){
				this.salaryType = item.infoOptionKey
			},
			//收入
			changeincome(item){
				this.monthlyIncome = item.infoOptionKey
			},
			//社保
			changesecur(item){
				this.socialSecurity = item.infoOptionKey
			},
			//公积金
			changeaccum(item){
				this.accumulationFund = item.infoOptionKey
			},
			getdatainfor(){
				let data={
					pageName : 'workinfo'
				}
				this.https('wisdom.vshop.vshopUserSelect.initTitleData',data)
				.then(data=>{
					if(data.code = 'success'){
						let datalist = data.data.pageData
						for(let i=0;i<datalist.length;i++){
							if(datalist[i].infoTitleKey=='jobType'){
								this.occupationalList = datalist[i].optionRes
								this.jobType = datalist[i].valueKey
							}
							if(datalist[i].infoTitleKey=='salaryType'){
								this.paymentList = datalist[i].optionRes
								this.salaryType = datalist[i].valueKey
							}
							if(datalist[i].infoTitleKey=='monthlyIncome'){
								this.incomeList = datalist[i].optionRes
								this.monthlyIncome = datalist[i].valueKey
							}
							if(datalist[i].infoTitleKey=='socialSecurity'){
								this.securityList = datalist[i].optionRes
								this.socialSecurity = datalist[i].valueKey
							}
							if(datalist[i].infoTitleKey=='accumulationFund'){
								this.accumulationList = datalist[i].optionRes
								this.accumulationFund = datalist[i].valueKey
							}
						}
					}
				})
			}
    },
    mounted(){
		window.scrollTo(0,0);
		this.getdatainfor()
		statistics.page("workinformation");
    }
}
</script>
<style lang="less" scoped>
    .lonamoney{
			height:50px;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
		}
</style>