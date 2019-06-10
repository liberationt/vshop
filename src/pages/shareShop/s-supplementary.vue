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
			<div class='optionstyle'>
				<options :options="occupationalList"></options>
			</div>
		</div>
		<div class="applyloan">
			<div class="applyloanhouse">
				<div>
					<label>信用状况:</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="value1" :options="option1" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>信用卡额度:</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="value1" :options="option1" />
						</van-dropdown-menu>
					</div>
				</div>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>寿险缴纳情况</h3>
			<div class='optionstyle'>
				<options :options="paymentList" :isMultiply=true></options>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>微粒贷额度</h3>
			<div class='optionstyle'>
				<options :options="incomeList" :isMultiply=true></options>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>芝麻信用卡</h3>
			<div class="optionstyles">
				<options :options="securityLisr" :cssStyle="object"></options>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>房产情况</h3>
			<div class="optionstyles">
				<options :options="accumulationList" :isMultiply=true></options>
			</div>
			<div class="applyloanhouse">
				<div>
					<label>所在地区:</label>
					<input type="text" placeholder='请选择'>
				</div>
				<div>
					<label>产权人</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="houseproperty" :options="housepropertyList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>房产状态</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="housestatus" :options="housestatusList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>是否抵押</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="housemortgage" :options="housemortgageList" />
						</van-dropdown-menu>
					</div>
				</div>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>车辆情况</h3>
			<div class="optionstyles">
				<options :options="accumulationList" :isMultiply=true></options>
			</div>
			<div class="applyloanhouse">
				<div>
					<label>车产状态:</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="carstatus" :options="carstatusList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>购车时间:</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="cartime" :options="cartimeList" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<label>是否抵押:</label>
					<div class="dropdown">
						<van-dropdown-menu>
							<van-dropdown-item v-model="mortgage" :options="mortgageList"/>
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
import { DropdownMenu, DropdownItem,Checkbox } from 'vant';
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
			option1: [
				{ text: '全部商品', value: 0 },
				{ text: '新款商品', value: 1 },
				{ text: '活动商品', value: 2 }
			],
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
					{label:'已购置房产',value:1},
					{label:'未购置房产',value:2},
			],
			//房产人
			houseproperty:1,
			housepropertyList:[
				{text:'本人',value:1},
				{text:'配偶',value:2},
				{text:'父母',value:3},
			],
			// 房状态
			housestatus:1,
			housestatusList:[
				{text:'全款',value:1},
				{text:'按揭',value:2},
				{text:'其他',value:3},
			],
			// 房抵押
			housemortgage:1,
			housemortgageList:[
				{text:'不考虑',value:1},
				{text:'可考虑',value:2}
			],
			//车状态
			carstatus:1,
			carstatusList:[
				{text:'全款',value:1},
				{text:'按揭',value:2},
				{text:'其他',value:3},
			],
			// 车时间
			cartime:1,
			cartimeList:[
				{text:'满三个月',value:1},
				{text:'不满三个月',value:2},
			],
			//车抵押
			mortgage:1,
			mortgageList:[
				{text:'不考虑',value:1},
				{text:'可考虑',value:2}
			]
		}
	},
	computed:{
		object(){
			return {
								
			}
		}
	},
    methods:{
			onSelect(){

			},
			nextstep(){
				this.$emit('tosteps',3)
			},
			returngo(){

			},
			close(){
				
			},
			serviceAgreement(){

			},
			privacyAgreement(){

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
</style>