<template>
  <div class="shopmain pddingTop">
		<header>
			<van-nav-bar :title='tittle' left-text="" :left-arrow="this.active!=1" fixed @click-left="onClickLeft">
				<span slot="right" style='color:#4597FB' v-show='number==1' @click="toshare"> 分享微店</span>
			</van-nav-bar>
		</header>
			<div>
				<router-view @toparent='getdata'></router-view>
			</div>
			<footer class="shophome">
				<van-tabbar v-model="active" @change="onchange">
					<van-tabbar-item name="1"><router-link to="/shoppage"><div class="footbar"><img :src='this.active==1?srcs1:nosrc1'><span>店铺首页</span></div></router-link></van-tabbar-item>
					<van-tabbar-item name="2"><router-link to="/relatedproducts"><div class="footbar"><img :src='this.active==2?srcs2:nosrc2'><span>相关产品</span></div></router-link></van-tabbar-item>
					<van-tabbar-item name="3"><router-link to="/utilities"><div class="footbar"><img :src='this.active==3?srcs3:nosrc3'><span>实用工具</span></div></router-link></van-tabbar-item>
					<van-tabbar-item name="4"><router-link to="/"><div class="footbar"><img :src='this.active==4?srcs4:nosrc4'><span>我要开店</span></div></router-link></van-tabbar-item>
				</van-tabbar>
			</footer>
    </div>
</template>
<script>
import utils from '../../utils/utils'
import { mapState, mapMutations } from "vuex";
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
				active:1,
				tittle:'',
				number:'',
				isLoading:false,
				srcs1:require('./images/home1.png'),
				nosrc1:require('./images/home2.png'),
				srcs2:require('./images/about1.png'),
				nosrc2:require('./images/about2.png'),
				srcs3:require('./images/shop1.png'),
				nosrc3:require('./images/shop2.png'),
				srcs4:require('./images/true1.png'),
        nosrc4:require('./images/true2.png')
			}
		},
		methods:{
			...mapMutations(["getactive"]),
			getdata(msg,number){
				this.tittle = msg
				this.number = number
			},
			toshare(){

			},
			onClickLeft(){
				this.$router.go(-1)
				// this.active = utils.getlocal('active')
				this.active = this.actives
			},
			onchange(i){
				this.active = i
				utils.putlocal('actives',i)
				this.getactive(i)
			}
		},
		watch:{
			$route(to,from){
				this.active=Number(to.meta.tittle)
				utils.putlocal('actives',to.meta.tittle)
				this.getactive(to.meta.tittle)
			}
		},
		computed:{
			 ...mapState(['actives'])
		},
	mounted(){
		this.active = this.actives
	}
}
</script>
<style lang="less" scoped>
    .shopmain{
			padding:50px 0;
		}
		.shophome{
			background:red !important;
			.footbar{
				display: flex;
				align-items: center;
				flex-direction: column;
				padding:10px 0;
				height:100px;
				img{
					widows: 35px;
					height:35px;
					margin-bottom: 5px;
				}
			}
			.van-tabbar {
				padding:40px 0 20px;
			}
		}
		
		
</style>