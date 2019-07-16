<template>
  <div class="appliationlocnmain  pddingTop">
		<header>
			<van-nav-bar title='有钱花' left-arrow fixed @click-left="returngo">
			</van-nav-bar>
		</header>
		<div class="applireminder" v-show="toasttittle">温馨提示：帮你贷仅支持线下签约贷款 <div @click="close"><img src="./images/close.png" alt=""></div></div>
		<div class="applistap">
			<div class="applistapbanner"><img src="./images/jibenxinxi.png" alt=""></div>
			<div class="applistaplist">
				<p>申请借款</p>
				<p class="apply">基本信息</p>
				<p>工作信息</p>
				<p>补充信息</p>
			</div>
		</div>
		<div class="forminfor">
			<p>
				<label for="">姓名:</label>
				<input type="text" placeholder="请输入姓名" @focus="getFocus" v-model="username">
			</p>
			<p>
				<label for="">身份证:</label>
					<input type="text" placeholder="请输入身份证号" @focus="getFocus" v-model="idcard">
				</p>
			<p @click="shows">
				<label for="">工作所在地:</label>
				<input readonly="readonly"  placeholder="请选择城市" v-model="adNameSecond">
			</p>
		</div>
		<div class="applyloan">
			<h3><span></span>学历</h3>
			<div class='optionstyle'>
				<ul class="box">
					<li v-for="item,index of educationList" :class="{checked:item.infoOptionKey===education}" @click="changeedu(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
		</div>
		<div class="applyloan">
			<h3><span></span>婚姻状态</h3>
			<div class='optionstyle'>
				<ul class="box">
					<li v-for="item,index of marriagelist" :class="{checked:item.infoOptionKey===marriage}" @click="changemar(item,index)">{{item.infoOptionName}}</li>
				</ul>
			</div>
		</div>
		<div @click="nextstep" class="loneNext">下一步</div>
		<div v-show="flag" class="citystyle">
			<van-area :area-list="areaList" :columns-num="2" title="请选择城市" @confirm="onAddrConfirm" @cancel='displar'/>
		</div>
	</div>
</template>
<script>
import utils from '../../utils/utils'
import options from '../../views/options.vue'
import {Toast,Area } from 'vant'
import areaList from '../../static/area'
import { statistics } from "wisdom-h5";
export default {
		components:{
			[Area .name]:Area ,
			areaList
		},
    data(){
        return{
			education:'',
			marriage:'',
			educationList: [],
			marriagelist: [],
			username:'',	
			idcard:'',
			adNameSecond:'',
			toasttittle:true,
			areaList:areaList,
			flag:false
		}
    },
    methods:{
		getFocus() {
				window.scroll(0, 0);
		},
		onAddrConfirm(item){
			this.adNameSecond = item[1].name
			this.flag = false
		},
		displar(){
			this.flag = false
		},
		shows(){
			this.flag = true
		},
		changeedu(item){
			this.education = item.infoOptionKey
		},
		changemar(item){
			this.marriage = item.infoOptionKey
		},
		returngo(){
			this.$router.go(-1)
		},
		close(){
			this.toasttittle = false
		},
		nextstep(){
			let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
			if(!this.username){
				Toast({
					message:'请输入姓名',
					duration:800
				})
				return false
			}
			if (!/^[\u4E00-\u9FA5]{2,10}$/.test(this.username)) {
				Toast({
					message:'姓名有误，请重新输入',
					duration:800
				})
				return false
			}
			if(!this.idcard){
				Toast({
					message:'请输入身份证号',
					duration:800
				})
				return false
			}
			if(!reg.test(this.idcard)){
				Toast({
					message:'请输入正确格式证件号',
					duration:800
				})
				return false
			}
			if(!this.adNameSecond){
				Toast({
					message:'请选择城市',
					duration:800
				})
				return false
			}
			if(!this.education){
				Toast({
					message:'请选择学历',
					duration:800
				})
				return false
			}
				if(!this.marriage){
				Toast({
					message:'请选择婚姻状态',
					duration:800
				})
				return false
			}
			let data= {
				userName :this.username,
				idCard:this.idcard,
				adNameSecond:this.adNameSecond,
				educationBackground:this.education,
				marriageStatus:this.marriage
			}
			this.https('wisdom.vshop.vshopUserSelect.saveBaseInfo',data)
			.then(data=>{
				if(data.code=='success'){
					utils.setCookie('adNameSecond',this.adNameSecond)
					statistics.click("essentialinformation","getnumbers");
					this.$router.push('/workinformation')
				}
			})
		},
		getdatainfo(){
			let data = {
				pageName:'baseInfo',
				inviterCode:this.$route.query.inviterCode,
			}
			this.https('wisdom.vshop.vshopUserSelect.initBaseInfoData',data)
			.then(data=>{
				if(data.code= 'success'){
					let dataobject = data.data
					this.username = dataobject.userName
					this.idcard = dataobject.idCard
					this.adNameSecond = dataobject.adNameSecond?dataobject.adNameSecond:dataobject.officerAdNameFirst
					for(var i=0;i<dataobject.pageData.length;i++){
						if(dataobject.pageData[i].infoTitleKey=='educationBackground'){
							this.educationList = dataobject.pageData[i].optionRes
							this.education = dataobject.pageData[i].valueKey
						}
						if(dataobject.pageData[i].infoTitleKey =='marriageStatus'){
							this.marriagelist = dataobject.pageData[i].optionRes
							this.marriage = dataobject.pageData[i].valueKey
						}
					}
				}
			})
		}

    },
    mounted(){
		window.scrollTo(0,0);
		this.getdatainfo()
		utils.ip(e=>{
			this.city = e
		},data=>{
			if(utils.getCookie('adNameSecond')){
				this.city = utils.getCookie('adNameSecond')?utils.getCookie('adNameSecond'):this.adNameSecond 
			}
		})
		statistics.page("essentialinformation");
	}
}
</script>
<style lang="less" scoped>
		.forminfor{
			background: #ffffff;
			padding:0 15px;
			font-size:14px;
			margin:10px 0 7px;
			color:#33333333;
			p{
				color:#333333;
				height:48px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom:1px solid #f2f2f2;
				input{
					text-align: right;
				}
			}
			p:last-child{
				border:none;
			}
		}
		.citystyle{
			position:absolute;
			bottom:0;
			width:100%;
		}
</style>