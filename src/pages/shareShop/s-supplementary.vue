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
				<div><img src='./images/basic2.png' alt=""></div>
				<p>基本信息</p>
			</div>
			<div class="applistaplist">
				<div><img src='./images/job2.png' alt=""></div>
				<p>工作信息</p>
			</div>
			<div class="applistaplist">
				<div><img src='./images/add2.png' alt=""></div>
				<p>补充信息</p>
			</div>
		</div>	
		<div class="applyloan">
			<h3><span></span>个人信用情况</h3>
			<div class='optionstyles'>
				<ul class="box">
					<li v-for="(item,index) in personalCreditList" :key="index" :class="{checked:item.infoOptionKey===personalCredit}" @click="change1(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
		</div>
		<div class="applyloan">
			<div class="applyloanhouse">
				<div>
					<label>信用状况:</label>
					<div class="dropdown dropdownstyle">
						<van-dropdown-menu>
							<van-dropdown-item v-model="creditStatus" :options="creditStatusList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>信用卡额度:</label>
					<div class="dropdown dropdownstyles">
						<van-dropdown-menu>
							<van-dropdown-item v-model="creditLimit" :options="creditLimitList" />
						</van-dropdown-menu>
					</div>
				</div>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>寿险缴纳情况</h3>
			<div class='optionstyles'>
				<ul class="box">
					<li v-for="(item,index) in guaranteeSlipList" :key="index" :class="{checked:item.infoOptionKey===guaranteeSlip}" @click="change2(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>微粒贷额度</h3>
			<div class='optionstyles'>
				<ul class="box">
					<li v-for="(item,index) in weilidaiLimitList" :key="index" :class="{checked:item.infoOptionKey===weilidaiLimit}" @click="change3(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>芝麻信用卡</h3>
			<div class='optionstyle'>
				<ul class="box">
					<li v-for="(item,index) in creditScoreList" :key="index" :class="{checked:item.infoOptionKey===creditScore}" @click="change4(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>房产情况</h3>
			<div class='optionstyles'>
				<ul class="box">
					<li v-for="(item,index) in ownHouseStatusList" :key="index" :class="{checked:item.infoOptionKey===ownHouseStatus}" @click="change5(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
			<div class="applyloanhouse" v-if="ownHouseStatus=='have_house'">
				<div>
					<label>所在地区:</label>
					<input type="text" placeholder='请选择'>
				</div>
				<div>
					<label>产权人</label>
					<div class="dropdown dropdownstyles">
						<van-dropdown-menu>
							<van-dropdown-item v-model="ownerHouse" :options="ownerHouseList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>房产状态</label>
					<div class="dropdown dropdownstyles">
						<van-dropdown-menu>
							<van-dropdown-item v-model="houseStatus" :options="houseStatusList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>是否抵押</label>
					<div class="dropdown dropdownstyles">
						<van-dropdown-menu>
							<van-dropdown-item v-model="houseIsPledge" :options="houseIsPledgeList" />
						</van-dropdown-menu>
					</div>
				</div>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>车产情况</h3>
			<div class='optionstyles'>
				<ul class="box">
					<li v-for="(item,index) in ownCarStatusList" :key="index" :class="{checked:item.infoOptionKey===ownCarStatus}" @click="change6(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
			<div class="applyloanhouse" v-if="ownCarStatus=='have_car'">
				<div>
					<label>车产状态:</label>
					<div class="dropdown dropdownstyles">
						<van-dropdown-menu>
							<van-dropdown-item v-model="carStatus" :options="carStatusList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>购车时间:</label>
					<div class="dropdown dropdownstyless">
						<van-dropdown-menu>
							<van-dropdown-item v-model="carTime" :options="carTimeList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>是否抵押:</label>
					<div class="dropdown dropdownstyles">
						<van-dropdown-menu>
							<van-dropdown-item v-model="carIsPledge" :options="carIsPledgeList"/>
						</van-dropdown-menu>
					</div>
				</div>
			</div>
		</div>
		<div class="agree">
			<van-checkbox icon-size='15px' v-model="checked"></van-checkbox>
			<p>已阅读并同意<span @click="serviceAgreement">《服务协议》</span>和<span @click="privacyAgreement">《隐私协议》</span></p>
		</div>
		<div @click="nextstep" class="loneNext">下一步</div>
	</div>
</template>
<script>
import options from '../../views/options.vue'
import { DropdownMenu, DropdownItem,Checkbox,Toast } from 'vant';
import { constants } from 'crypto';
export default {
		components:{
			[DropdownMenu.name]:DropdownMenu,
			[DropdownItem.name]:DropdownItem,
			[Checkbox.name]:Checkbox,
			options
		},
	data(){
		return{
			value1:0,
			checked:true,
			personalCredit:'',//个人信用
			personalCreditList: [],
			creditStatus:'', //信用状况
			creditStatusList:[],
			creditLimit : '', //信用卡额度
			creditLimitList:[],
			guaranteeSlip:'', //寿险缴纳情况
			guaranteeSlipList:'',
			weilidaiLimit:'', //微粒贷额度
			weilidaiLimitList:[],
			creditScore:'',//芝麻信用
			creditScoreList:[],
			ownHouseStatus:'', //房产情况
			ownHouseStatusList:[],
			ownCarStatus:'',//车产
			ownCarStatusList:[],
			ownerHouse:'', //产权人
			ownerHouseList:[],
			houseStatus:'',//房产状态
			houseStatusList:[],
			houseIsPledge:'',//是否抵押
			houseIsPledgeList:[],
			carStatus:'', //车产状态
			carStatusList:[],
			carTime:'', //购车时间
			carTimeList:[],
			carIsPledge:'', //是否抵押
			carIsPledgeList:[],
			houseAdNameSecond:'',
		}
	},
    methods:{
			onSelect(){

			},
			nextstep(){
				let data = {
					personalCredit:this.personalCredit,
					creditStatus:this.creditStatus,
					creditLimit:this.creditLimit,
					guaranteeSlip :this.guaranteeSlip,
					weilidaiLimit :this.weilidaiLimit,
					creditScore :this.creditScore,
					ownHouseStatus:this.ownHouseStatus,
					houseAdNameSecond:this.houseAdNameSecond,
					ownerHouse : this.ownerHouse,
					houseStatus :this.houseStatus ,
					houseIsPledge:this.houseIsPledge,
					ownCarStatus:this.ownCarStatus,
					carStatus:this.carStatus,
					carTime:this.carTime,
					carIsPledge :this.carIsPledge 
				}
				this.request('wisdom.vshop.vshopUserSelect.saveInfo',data)
				.then(data=>{
					if(data.code=='success'){
						alert(1)
					}
				})
			},
			returngo(){

			},
			close(){
				
			},
			serviceAgreement(){

			},
			privacyAgreement(){

			},
			getdatainfor(){
				let data = {
					pageName :'moreInfo'
				}
				this.request('wisdom.vshop.vshopUserSelect.initTitleData',data)
				.then(data=>{
					if(data.code=='success'){
						let arr = data.data.pageData
						for(let i=0;i<arr.length;i++){
							if(arr[i].infoTitleKey=='personalCredit'){
								this.personalCreditList = arr[i].optionRes
								this.personalCredit = arr[i].valueKey
							}

							if(arr[i].infoTitleKey=='creditStatus'){
								this.creditStatus = arr[i].valueKey
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.creditStatusList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								console.log(this.creditStatusList)
							}
							if(arr[i].infoTitleKey=='creditLimit'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.creditLimitList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								this.creditLimit = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='guaranteeSlip'){
								this.guaranteeSlipList = arr[i].optionRes
								this.guaranteeSlip = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='weilidaiLimit'){
								this.weilidaiLimitList = arr[i].optionRes
								this.weilidaiLimit = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='weilidaiLimit'){
								this.creditScoreList = arr[i].optionRes
								this.creditScore = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='ownHouseStatus'){
								this.ownHouseStatusList = arr[i].optionRes
								this.ownHouseStatus = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='ownCarStatus'){
								this.ownCarStatusList = arr[i].optionRes
								this.ownCarStatus = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='ownerHouse'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.ownerHouseList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								this.ownerHouse = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='houseStatus'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.houseStatusList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								this.houseStatus = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='houseIsPledge'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.houseIsPledgeList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								this.houseIsPledge = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='carStatus'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.carStatusList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								this.carStatus = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='carTime'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.carTimeList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								this.carTime = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='ownHouse_address'){
								this.houseAdNameSecond = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='carIsPledge'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.carIsPledgeList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
								this.carIsPledge = arr[i].valueKey
							}
						}
					}
				})
			},
			change1(item){
				this.personalCredit = item.infoOptionKey
			},
			change2(item){
				this.guaranteeSlip = item.infoOptionKey
			},
			change3(item){
				this.weilidaiLimit = item.infoOptionKey
			},
			change4(item){
				this.creditScore = item.infoOptionKey
			},
			change5(item){
				this.ownHouseStatus = item.infoOptionKey
			},
			change6(item){
				this.ownCarStatus = item.infoOptionKey
				console.log(item)
			}
			
    },
    mounted(){
			this.getdatainfor()
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
		.agree{
				display: flex;
				padding:0 15px;
				height:55px;
				line-height: 55px;
				font-size:12px;
				.van-checkbox{
					height:55px;margin-right: 6px;
				}
				span{
					color:#4896FB;
				}
			}
		.dropdownstyle{
			width:200px;
		}
		.dropdownstyles{
			width:50px
		}
		.dropdownstyless{
			width:70px
		}
</style>