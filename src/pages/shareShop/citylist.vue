<template>
	<div>
		<div>
			<header class="pddingTop">
				<van-nav-bar
					title="城市列表"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header>
		</div>
		<div class="citylists">
			<ul>
				<li v-for="(item,i) in cityList" :key="i" @click="tocitylsit(item)">{{item}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
import utils from '../../utils/utils'
export default {
	data(){
		return{
			cityList:[],
			number:''
		}
	},
	methods:{
		onClickLeft(){
			this.$router.go(-1)
		},
		tocitylsit(e){
			if(this.number==1){
				utils.setCookie('adNameSecond',e)
				this.$router.push('/stiflingborrow')
			}
			if(this.number==2){
				utils.setCookie('adNameSecond',e)
				this.$router.push('/essentialinformation')
			}
			if(this.number==3){
				this.$router.push('/supplementary?city='+e)
			}
			
		}
	},
	created(){
		this.number = this.$route.query.number
		this.cityList=require( '../../static/adress_json.json')[`100000,${this.$route.query.id}`];

	}
}
</script>
<style lang="less">
	.citylists{
		li{
			padding:0 15px;
			line-height: 40px; 
			border-bottom:1px solid #f2f2f2 /*no*/;
			font-size:16px;
			color:#333333;
			position:relative;
			span{
				position: absolute;
				right:0;
				top:4px;
			}
		}
	}
</style>