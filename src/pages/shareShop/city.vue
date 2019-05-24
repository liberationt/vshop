<template>
  <div>
	<div class="city_header clearfix">
		<router-link :to="{path:''}">
			<span class="left city_margin"></span>
		</router-link>
		<span>当前城市</span>
	</div>
      <div class="big_city">请您准确选择当前所在城市进行贷款，金融机构不接受跨地区贷款申请</div>
      <div class="location">
          <span class="img_ico"></span>
          <span>&nbsp您当前的位置</span>
      </div>
      <div class="city_province">上海</div>
			<div class="location">
        <span>国内热门城市</span>
      </div>
			<div class="city_hot">
					<span v-for="(item,i) in hot_city" :key="i" @click="hotcity(item)">{{item}}</span>
			</div>
			<div class="location">
        <span>全部省份</span>
      </div>
			<div class="city_province">
				<ul>
					<li v-for="(item,i) in city[0]" :key="i" v-if="item != '台湾' && item != '香港特别行政区' && item != '澳门特别行政区'" @click="city_shi(i)">
						<span>{{item}}</span>
						<span class="right city_province_icon"></span>
					</li>
				</ul>
			</div>
  </div>
</template>
<script>
import utils from '../../utils/http'
export default {
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
			]
    };
	},
	created() {
		utils.get(window.location.href + 'static/adress_json.json').then((resp) => {
			// this.sheng=resp[100000]
			// this.city.push(resp[100000]);
			console.log(1,"=====>",resp)
		})
	
	},
	mounted() {
	},
	methods: {
		city_shi(e) {
			this.$router.push({
				path:'hzDistrict',
				query:{id:e}
			})
		},
		hotcity(city) {
			utils.setCookie('city',city);
			this.$router.push({
				path: './hzPraiseinformation?isCity='+1
			})
		},
		historycity(c) {
			this.$router.push({
				path: 'hzPraiseinformation',
				query: {id:c}
			})
		}
	
	}
};
</script>
<style lang="less" scoped>
.img_ico>img {
	width: 25px;
	height: 28px;
	margin-bottom: 6px;
}
.city_province_icon {
	font-size: 24px;
	height: 72px;
	margin-top: 6px;
	color: #333;
	background-color: #fff;
}
.city_province ul {
	padding: 0 29px;
	background-color: #fff;
}
.city_province ul li {
	height: 80px;
	line-height: 80px;
	border-bottom: 1px solid #ccc; /*no*/
	font-size: 32px;
	color: #333;
}
.cicy_history{
	height: 123px;
	line-height: 123px;
}
.city_hot {
	padding: 22px 0px; 
	background-color: #fff;
}
.cicy_history span,
.city_hot span {
	display: inline-block;
	width: 201px;
	height: 79px;
	line-height: 79px;
	text-align: center;
	font-size: 28px;
	color: #333;
	border: 1px solid #ccc; /*no*/
	margin-left: 35px;
	margin-bottom: 17px;
}

.city_province {
	// height: 93px;
	font-size: 34px;
	color: #FF664D;
	line-height: 93px;
	padding-left: 30px;
	background-color: #fff;
}
.big_city {
	height: 73px;
	line-height: 73px;
	background-color: #FFF8E8;
	font-size: 22px;
	color: #FF664D;
	text-align: center;
}
.active {
	color: #FF664D;
	border: 1px solid #FF664D;/*no*/
}
</style>
