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
				<div><img src='./images/basic2.png' alt=""></div>
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
		<div class="forminfor">
			<p>
				<label for="">姓名:</label>
				<input type="text" placeholder="请输入姓名" v-model="username">
			</p>
			<p>
				<label for="">身份证:</label>
					<input type="text" placeholder="请输入身份证号" v-model="idcard">
				</p>
			<p>
				<label for="">工作所在地:</label>
				<input type="text" placeholder="请选择城市" @click="tocity" v-model="adNameSecond">
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
	</div>
</template>
<script>
import utils from '../../utils/utils'
import options from '../../views/options.vue'
import {Toast} from 'vant'
export default {
		components:{
			options
		},
    data(){
        return{
					education:'',
					marriage:'',
					educationList: [],
					marriagelist: [],
					username:'',
					idcard:'',
					adNameSecond:''
				}
    },
    methods:{
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

			},
			tocity(){
				this.$router.push('/city?id='+1)
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
				if (!/^[\u4E00-\u9FA5]{2,20}$/.test(this.username)) {
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
				this.request('wisdom.vshop.vshopUserSelect.saveBaseInfo',data)
				.then(data=>{
					if(data.code=='success'){
						this.$router.push('/workinformation')
					}
				})
			},
			getdatainfo(){
				let data = {
						pageName:'baseInfo'
				}
				this.request('wisdom.vshop.vshopUserSelect.initBaseInfoData',data)
				.then(data=>{
					if(data.code= 'success'){
						let dataobject = data.data
						this.username = dataobject.userName
						this.idcard = dataobject.idCard
						this.adNameSecond = dataobject.adNameSecond?dataobject.adNameSecond:utils.getCookie('adNameSecond')
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
			this.getdatainfo()
		}
}
</script>
<style lang="less" scoped>
		.forminfor{
			background: #ffffff;
			padding:0 15px;
			font-size:14px;
			margin:10px 0 10px;
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