<template>
  <div>
		<header class="pddingTop navbarrighttext">
			<van-nav-bar
				title="当前城市"
				left-arrow
				@click-left="onClickLeft"
			/> 
		</header>
		<div class="currentcity paddingLift bgcolor">
			<img src="./images/positioncity.png" alt="">
			<span>您当前的位置</span>
		</div>
		<div class="positioncity paddingLift">上海</div>
		<div class="paddingLift bgcolor">国内热门城市</div>
		<div class="hotcitys">
			<ul>
				<li v-for="(item,i) in hot_city" :key="i" @click="hotcitys(item)">{{item}}</li>
			</ul>
		</div>
		<div class="paddingLift bgcolor">全部省份</div>
		<div class="province">
			<ul>
				<li v-for="(item,i) in provinceList[0]" :key="i" @click="province(item,i)">{{item}}<span><van-icon name="arrow" /></span></li>
			</ul>
		</div>
  </div>
</template>
<script>
import utils from '../../utils/utils'
import { Icon } from 'vant';
import { utimesSync } from 'fs';
export default {
	components:{
		[Icon.name]:Icon
	},
  data() {
    return {
			showMenus: false,
			city: [],
			hot_city: [
				'北京',
				'上海',
				'广州',
				'深圳',
				'成都',
				'杭州',
				'武汉',
				'苏州',
				'南京',
				'天津',
				'重庆',
				'厦门'
			],
			provinceList:[]
    };
	},
	created() {
		this.provinceList.push(require( '../../static/adress_json.json')[100000]);
	},
	methods: {
		onClickLeft(){
			this.$router.go(-1)
		},
		hotcitys(e){
			utils.setCookie('adNameFirst',e)
			this.$router.push('/productnamedetail?city='+e)
		},
		province(item,i){
			utils.setCookie('adNameFirst',item)
			this.$router.push('/citylist?id='+i)
		}
	}
};
</script>
<style lang="less" scoped>
	.currentcity{
		img{
			width:9px; height:11px;
			margin-right: 5px;
			margin-top:-3px;
		}
	}
	.paddingLift{
		padding-left:15px;
	}
	.bgcolor{
		background: #f1f1fb;
		height:30px;
		line-height: 32px;
		color:#999999;
		font-size:13px;
	}
	.positioncity{
		line-height: 45px;
		font-size:17px;
		color:#4697FB;
	}
	.hotcitys{
		ul{
			padding:12px 15px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			li{
				width:99px;height:38px;
				line-height: 38px;
				text-align: center;
				font-size:14px;
				color:#333333;
				border:1px solid #EFEFEF /*no*/;
				margin-bottom: 10px;
			}
		}
	}
	.province{
		ul{
			padding: 0 15px;
			li{
				line-height: 40px; 
				border-bottom:1px solid #E7E7E7;
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
	}
</style>
