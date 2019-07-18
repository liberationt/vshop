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
		 <!-- 风险弹窗 -->
		<van-popup class="yindaoshow" v-model="yindaoshow">
		<img src="./images/yingdao.png" alt="">
		</van-popup>
		<footer class="shophome">
			<van-tabbar v-model="active" active-color="#07c160" @change="onchange">
				<van-tabbar-item name="1"><router-link to="/shoppage"><div class="footbar"><img :src='this.active==1?srcs1:nosrc1'><span>店铺首页</span></div></router-link></van-tabbar-item>
				<van-tabbar-item name="2"><router-link to="/relatedproducts"><div class="footbar"><img :src='this.active==2?srcs2:nosrc2'><span>相关产品</span></div></router-link></van-tabbar-item>
				<van-tabbar-item name="3"><router-link to="/utilities"><div class="footbar"><img :src='this.active==3?srcs3:nosrc3'><span>实用工具</span></div></router-link></van-tabbar-item>
				<van-tabbar-item name="4"><div class="footbar" @click='toinvit'><img :src='this.active==4?srcs4:nosrc4'><span>我要开店</span></div></van-tabbar-item>
			</van-tabbar>
		</footer>
    </div>
</template>
<script>
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
import { mapState, mapMutations } from "vuex";
import { NavBar,Popup,Icon,Tabbar, TabbarItem } from 'vant';
import wx from 'weixin-js-sdk'
export default {
    components:{
        	[NavBar.name] : NavBar,
			[Icon.name] : Icon,
			[Popup.name] : Popup,
			[Tabbar.name] : Tabbar,
			[TabbarItem.name] : TabbarItem,
		},
		data(){
			return{
				yindaoshow:false,
				active:'1',
				tittle:'',
				number:'',
				storeCode:'',
				inviterCode:'',
				isLoading:false,
				name:'',
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
			getdata(msg,num,inviterCode,name){
				this.number = num
				this.tittle = msg
				this.inviterCode = inviterCode
				if(name){
					this.name=name
				}
			},
			toinvit(){
				statistics.click("shophome","setshop");
				window.location.href='http://dev.qdx.zanfin.com/main/#/register'
			},
			onClickLeft(){
				this.$router.go(-1)
				this.active = this.actives
			},
			onchange(i){
				this.active = i
				utils.putlocal('actives',i)
				this.getactive(i)
				if(i==1){
					statistics.click("shophome","sethome");
				}else if(i==2){
					statistics.click("shophome","relate");
				}else if(i==3){
					statistics.click("shophome","utils");
				}

			},
			toshare(){
				this.yindaoshow = true
				this.wxShare(this.inviterCode)
			},
			wxShare(inviterCode) {
				let url
				if( !utils.isAndroid1() ){
					url =  decodeURIComponent(window.location.href)
				} else {
					url = window.location.href
				}
				let that = this
				this.https("wisdom.vshop.wechatOpen.getJsconf", {url:url})
				.then(data => {
         			setTimeout(() => {
						utils.wxShare(data.data)
						wx.ready(function(){
							wx.updateAppMessageShareData({
							title: '急用钱？请找我，专业贷款！', // 分享标题
							desc: that.name+'向您推荐了自己的微店，提供工资贷、社保贷、消费贷、公积金贷、车贷房贷……规渠正规安全，服务专业周到，快来看看吧！', // 分享描述
							link: window.location.origin + "/shoppage?inviterCode="+inviterCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: 'https://wisdom-loan.oss-cn-shanghai.aliyuncs.com/productParam/60938f68-1fa0-4620-a90a-7a4d7a7c7117.png', // 分享图标
							success: function () {
							},
							cancel: function(err){

							}
							});
						})
　　　　  			}, 500)
				})
				.catch(err => {
					console.log(err);
				});
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
		this.wxShare(this.inviterCode)
		this.active = this.actives?this.actives:'1'
	}
}
</script>
<style lang="less" scoped>
    .shopmain{
			padding:50px 0;
		}
		.shophome{
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