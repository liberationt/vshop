<template>
  <div class="appliationlocnmain  pddingTop">
		<header>
			<van-nav-bar title='有钱花' left-arrow fixed @click-left="returngo">
			</van-nav-bar>
		</header>
		<div class="applireminder" v-show="toasttittle">温馨提示：帮你贷仅支持线下签约贷款 <div @click="close"><img src="./images/close.png" alt=""></div></div>
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
					<li v-for="item,index of loanperiodList" :class="{checked:item.infoOptionKey===loanperiod}" @click="changeList(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
			
		</div>
		<div class="applyloan">
			<h3><span></span>贷款用途</h3>
			<div class='optionstyle'>
				<ul class="box">
					<li v-for="item,index of loanpurposeList" :class="{checked:item.infoOptionKey===loanpurpose}" @click="changeloan(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
			<!-- <div class="optionstyle">
				<options :options="loanpurposeList" @toparents='child' v-model='loanpurpose' ref='getloanpurpose'></options>
			</div> -->
		</div>
		<div @click="nextstep" class="loneNext">下一步</div>
	</div>
</template>
<script>
import options from '../../views/options.vue'
import { DropdownMenu, DropdownItem,Step, Steps ,Toast} from 'vant';

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
			value1:'',
			option1: [],
			loanperiod:'',
			loanperiodList: [],
			loanpurpose:'',
			loanpurposeList: [],
			toasttittle:true
		}
    },
	methods:{
		close(){
			this.toasttittle = false
		},
		changeList(item,indexs){
			this.loanperiod = item.infoOptionKey
		},
		changeloan(item,indexs){
			this.loanpurpose = item.infoOptionKey
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
			if(!this.value1){
				Toast({
						message:'请选择贷款金额',
						duration:800
					})
					return false
			}
			if(!this.loanperiod){
				Toast({
						message:'请选择贷款期限',
						duration:800
					})
					return false
			}
			if(!this.loanpurpose){
				Toast({
						message:'请选择贷款用途',
						duration:800
					})
					return false
			}
			let data = {
				loanTimeLimit:this.loanperiod,
				loanAmount:this.value1,
				loanUse:this.loanpurpose
			}
			this.request('wisdom.vshop.vshopUserSelect.saveInfo',data)
			.then(data=>{
				if(data.code=='success'){
					this.$router.push('/essentialinformation')
				}
			})
		},
		getdatalist(){
			let data = {
				pageName:'apply'
			}
			this.request('wisdom.vshop.vshopUserSelect.initTitleData',data)
			.then(data=>{
				if(data.code=='success'){
					let datalist = data.data.pageData
					for(let i=0;i<datalist.length;i++){
						if(datalist[i].infoTitleKey=='loanAmount'){
							this.value1 = datalist[i].valueKey
							let optionlist=[]
							optionlist = datalist[i].optionRes
							for(let j=0;j<optionlist.length;j++){
								this.option1.push(
									{
										text:optionlist[j].infoOptionName,
										value:optionlist[j].infoOptionKey
									}
								)
							}
						}
						if(datalist[i].infoTitleKey=='loanTimeLimit'){
							this.loanperiodList = datalist[i].optionRes
							this.loanperiod = datalist[i].valueKey
						}
						if(datalist[i].infoTitleKey=='loanUse'){
							this.loanpurposeList = datalist[i].optionRes
							this.loanpurpose = datalist[i].valueKey
						}
					}
				}
			}).catch(err=>{
				console.log(err)
			})
		}
	},
	mounted(){
		this.getdatalist()
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