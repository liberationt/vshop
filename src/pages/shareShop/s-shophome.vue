<template>
  <div class="shopmain">
		<header class="paddingTop">
			<van-nav-bar :title='tittle' left-text="" left-arrow fixed>
				<!-- <van-icon name="search" slot="right" /> -->
				<span slot="right" v-show='number==1' @click="toshare"> 分享微店</span>
			</van-nav-bar>
		</header>
		<div>
			<router-view @toparent='getdata'></router-view>
		</div>
		<footer>
			<van-tabbar v-model="active">
				<van-tabbar-item icon="search"><router-link to="/shoppage">店铺首页</router-link></van-tabbar-item>
				<van-tabbar-item icon="search"><router-link to="/relatedproducts">相关产品</router-link></van-tabbar-item>
				<van-tabbar-item icon="setting-o"><router-link to="/utilities">实用工具</router-link></van-tabbar-item>
				<van-tabbar-item icon="setting-o"><router-link to="/">我要开店</router-link></van-tabbar-item>
			</van-tabbar>
		</footer>
    </div>
</template>
<script>
import { NavBar,Icon,Tabbar, TabbarItem } from 'vant';
export default {
    components:{
        [NavBar.name] : NavBar,
				[Icon.name] : Icon,
				[Tabbar.name] : Tabbar,
				[TabbarItem.name] : TabbarItem,
		},
		data(){
			return{
				active:0,
				tittle:'',
				number:''
			}
		},
		methods:{
			getdata(msg,number){
				this.tittle = msg
				this.number = number
			},
			toshare(){

			}
		},
		mounted(){

		}
}
</script>
<style lang="less">
    .shopmain{
			padding:50px 0;
		}
</style>