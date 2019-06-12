<template>
    <div>
			<div class="credtittle">各种热门信用卡，批卡率高，下卡快</div>
			<div>
				<!-- <van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
				>	 -->
					<div class="credlist" @click="tostiflingborrow(item.productCode)" v-for="(item,i) in cardList" :key="i">
						<div class="credlistbanner"><img :src=item.productLogo alt=""></div>
						<div class="credlistright">
							<h4>{{item.productName}}</h4>
							<p>{{item.subTitle}}</p>
							<p>{{item.desc}}</p>
						</div>
					</div>
				<!-- </van-list> -->
			</div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
export default {
    data(){
			return{
				finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
				loading: false,//控制上拉加载的加载动画
				cardList:[],
				inviterCode:''
			}
		},
		methods:{
			//页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
			onLoad() {
				setTimeout(() => {
						this.loading = false
						this.finished = true
				}, 500);
			},
			tostiflingborrow(productCode){
				utils.setCookie('ProductCode',productCode)
				utils.setCookie('InviterCode',this.inviterCode)
				this.$router.push('/stiflingborrow')
			},
			getdatas(){
				let data = {
				storeCode:'0001',
				head : true , 
				type:1
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProduct',data)
				.then(data=>{ 
					if(data.code=='success'){
						this.cardList = data.data.productResList
						this.inviterCode = data.data.inviterCode
					}
				})
			},
		},
		mounted(){
			this.getdatas()
		}
}
</script>
<style lang="less" scoped>
   .credtittle{
		 height:40px;
		 line-height: 40px;
		 background: #ffffff;
		 font-size:12px;
		 color:#4897FB;
		 padding-left:15px;
		 margin-bottom: 5px;
	 }
	 .credlist{
		 display: flex;
		 height:100px;
		 align-items: center;
		 background: #ffffff;
		 padding-left:15px;
		 font-size:14px;
		 color:#999999;
		 .credlistbanner{
			 width:100px;
			 height:70px;
			 margin-right: 10px;
			 img{
				 width:100%;
				 height:100%;
			 }
		 }
		 .credlistright{
			 h4{
				 font-size:17px;
				 color:#333333;
				 font-weight: bold;
			 }
		 }
	 }
</style>