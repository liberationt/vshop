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
				<input type="text" placeholder="请选择城市" @click="tocity" v-model="adNameFirst">
			</p>
		</div>
		<div class="applyloan">
			<h3><span></span>学历</h3>
			<options :options="selections"></options>
		</div>
		<div class="applyloan">
			<h3><span></span>婚姻状态</h3>
			<options :options="selections1"></options>

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
					selections: [],
					selections1: [],
					value:'',
					username:'',
					idcard:'',
					adNameFirst:''
				}
    },
    methods:{
			returngo(){
				this.$router.go(-1)
			},
			close(){

			},
			tocity(){

			},
			nextstep(){

			},
			getdatainfo(){
				let data = {
						pageName:'baseInfo'
				}
				this.request('wisdom.vshop.vshopUserSelect.initBaseInfoData',data)
				.then(data=>{
					if(data.code= 'success'){
						let dataobject = data.data
						this.data
					}
				})
			}

    },
    mounted(){
			this.getdatainfo()
			this.selections =	[{label:'赵雅芝',value:'1'},
						{label:'刘雪华',value:'2'},
						{label:'俞飞鸿',value:'3'},]
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