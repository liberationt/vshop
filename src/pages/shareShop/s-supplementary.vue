<template>
  <div class="appliationlocnmain applicamain pddingTop">
    <header>
			<van-nav-bar title='有钱花' left-arrow fixed @click-left="returngo"></van-nav-bar>
		</header>
		<div class="applireminder" v-show="toasttittle">温馨提示：帮你贷仅支持线下签约贷款 <div @click="close"><img src="./images/close.png" alt=""></div></div>
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
			<h3><span></span>微粒贷情况</h3>
			<div class='optionstyles'>
				<ul class="box">
					<li v-for="(item,index) in weilidaiStatusList" :key="index" :class="{checked:item.infoOptionKey===weilidaiStatus}" @click="change3(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
		</div>
		<div class="applyloan" v-if="weilidaiStatus=='have_used'">
			<div class="applyloanhouse">
				<div>
					<label>微粒贷额度:</label>
					<div class="dropdown dropdownstyle">
						<van-dropdown-menu>
							<van-dropdown-item v-model="weilidaiLimit" :options="weilidaiLimitList" />
						</van-dropdown-menu>
					</div>
				</div>
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
				<div @click="shows">
					<label>所在地区:</label>
					<input readonly="readonly" placeholder='请选择' v-model="houseAdNameSecond">
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
		<div v-show="flag" class="citystyle">
			<van-area :area-list="areaList" :columns-num="2" title="请选择城市" @confirm="onAddrConfirm" @cancel='displar'/>
		</div>
		<div class="agree">
			<van-checkbox icon-size='15px' v-model="checked"></van-checkbox>
			<p>已阅读并同意<span @click="serviceAgreement">《服务协议》</span>和<span @click="privacyAgreement">《隐私协议》</span></p>
		</div>
		<div @click="nextstep" class="loneNext">发布申请</div>
	</div>
</template>
<script>
import areaList from '../../static/area'
import { DropdownMenu, DropdownItem,Checkbox,Toast,Dialog,Area } from 'vant';
export default {
		components:{
			[DropdownMenu.name]:DropdownMenu,
			[DropdownItem.name]:DropdownItem,
			[Checkbox.name]:Checkbox,
			[Area.name]:Area,
			areaList
		},
	data(){
		return{
			flag:false,
			areaList:areaList,
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
			weilidaiStatus:'', //微粒贷
			weilidaiStatusList:[],
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
			toasttittle:true
		}
	},
    methods:{
		shows(){
			this.flag = true
		},
		onAddrConfirm(item){
			this.houseAdNameSecond = item[1].name
			this.flag = false
		},
		displar(){
			this.flag = false
		},
			nextstep(){
				if(!this.personalCredit){
					Toast({
						message:'请选择个人信用',
						duration:800
					})
					return false
				}
				if(!this.creditStatus){
					Toast({
						message:'请选择信用状况',
						duration:800
					})
					return false
				}
				if(!this.creditLimit){
					Toast({
						message:'请选择信用卡额度',
						duration:800
					})
					return false
				}
				if(!this.guaranteeSlip){
					Toast({
						message:'请选择寿险缴纳情况',
						duration:800
					})
					return false
				}
				if(!this.weilidaiStatus){
					Toast({
						message:'请选择微粒贷情况',
						duration:800
					})
					return false
				}
				if(this.weilidaiStatus=='have_used'){
					if(!this.weilidaiLimit){
						Toast({
							message:'请选择微粒贷',
							duration:800
						})
						return false
					}
				}
				if(!this.creditScore){
					Toast({
						message:'请选择芝麻信用卡',
						duration:800
					})
					return false
				}
				if(!this.ownHouseStatus){
					Toast({
						message:'请选择房产情况',
						duration:800
					})
					return false
				}
				if(this.ownHouseStatus =='have_house'){
					if(!this.houseAdNameSecond){
						Toast({
							message:'请选择房产所在地区',
							duration:800
						})
						return false
					}
					if(!this.ownerHouse){
						Toast({
							message:'请选择房产人',
							duration:800
						})
						return false
					}
					if(!this.houseStatus){
						Toast({
							message:'请选择房产状态',
							duration:800
						})
						return false
					}
					if(!this.houseIsPledge){
						Toast({
							message:'请选择房产否是抵押',
							duration:800
						})
						return false
					}
				}
				if(!this.ownCarStatus){
					Toast({
						message:'请选择车产情况',
						duration:800
					})
					return false
				}
				if(this.ownCarStatus=='have_car'){
					if(!this.carStatus){
						Toast({
							message:'请选择车产状态',
							duration:800
						})
						return false
					}
					if(!this.carTime){
						Toast({
							message:'请选择购车时间',
							duration:800
						})
						return false
					}
					if(!this.carIsPledge){
						Toast({
							message:'请选择车产是否抵押',
							duration:800
						})
						return false
					}
					
				}
				if(this.checked===false){
						Toast({
							message:'请同意用户协议',
							duration:800
						})
					}
				let data = {
					personalCredit:this.personalCredit,
					creditStatus:this.creditStatus,
					creditLimit:this.creditLimit,
					guaranteeSlip :this.guaranteeSlip,
					weilidaiStatus:this.weilidaiStatus,
					weilidaiLimit :this.weilidaiLimit,
					creditScore :this.creditScore,
					ownHouseStatus:this.ownHouseStatus,
					houseAdNameSecond:this.ownHouseStatus =='have_house'?this.houseAdNameSecond:'',
					ownerHouse :this.ownHouseStatus =='have_house'?this.ownerHouse:'',
					houseStatus :this.ownHouseStatus =='have_house'?this.houseStatus:'' ,
					houseIsPledge:this.ownHouseStatus =='have_house'?this.houseIsPledge:'',
					ownCarStatus:this.ownCarStatus,
					carStatus:this.ownCarStatus=='have_car'?this.carStatus:'',
					carTime:this.ownCarStatus=='have_car'?this.carTime:'',
					carIsPledge :this.ownCarStatus=='have_car'?this.carIsPledge:''
				}
				this.request('wisdom.vshop.vshopUserSelect.saveInfo',data)
				.then(data=>{
					if(data.code=='success'){
						Dialog.alert({
							title: '温馨提示',
							message: 'XXX平台不收取任何费用，信贷经理联系您要求放款前收取费用（例：手续费、保证金、会员费等），切勿盲信！谨防诈骗！'
						}).then(() => {
							// on close
						});
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			returngo(){
				this.$router.go(-1)
			},
			close(){
				this.toasttittle = false
			},
			serviceAgreement(){

			},
			privacyAgreement(){

			},
			tocity(){
				this.$router.push('city?id='+3)
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
							if(arr[i].infoTitleKey=='weilidaiStatus'){
								this.weilidaiStatusList = arr[i].optionRes
								this.weilidaiStatus = arr[i].valueKey
							}
							if(arr[i].infoTitleKey=='weilidaiLimit'){
								let optionlist=[]
								optionlist = arr[i].optionRes
								for(let j=0;j<optionlist.length;j++){
									this.weilidaiLimitList.push(
										{
											text:optionlist[j].infoOptionName,
											value:optionlist[j].infoOptionKey
										}
									)
								}
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
							if(arr[i].infoTitleKey=='houseAdNameSecond'){
								this.houseAdNameSecond = this.$route.query.city?this.$route.query.city:arr[i].valueKey
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
				this.weilidaiStatus = item.infoOptionKey
			},
			change4(item){
				this.creditScore = item.infoOptionKey
			},
			change5(item){
				this.ownHouseStatus = item.infoOptionKey
			},
			change6(item){
				this.ownCarStatus = item.infoOptionKey
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
		.citystyle{
			position:absolute;
			bottom:0;
			width:100%;
			z-index: 20
		}
		.applywld{
			display: flex;
			padding:0 15px;
			background: #ffffff;
			justify-content: space-between;
		}
</style>