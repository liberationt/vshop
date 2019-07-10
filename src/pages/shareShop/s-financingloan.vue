<template>
    <div class="finacmain">
		<div class="financtittle">申请多个产品，可大幅度提高贷款成功率</div>
		<div>
			<!-- <van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>	 -->
				<div class="financlist" v-for="(item,i) in financList" :key="i" @click="toproductnamedetail(item.proprietaryProductCode)">
					<div class="financlistbanner"><img :src=item.productLogo alt=""></div>
					<div class="financlistright">
						<h4>{{item.productName}}</h4>
						<p>综合月利率：<span>{{item.productRate}}</span></p>
						<p>贷款额度：<span>{{item.limitMin}}-{{item.limitMax}}元</span></p>
					</div>  
				</div>
			<!-- </van-list> -->
		</div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
export default {
    data(){
			return{
				finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
				loading: false,//控制上拉加载的加载动画
				financList:[],
				inviterCode:''
			}
		},
		methods:{
			//页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
			// onLoad() {
			// 	setTimeout(() => {
			// 			this.loading = false
			// 			this.finished = true
			// 	}, 1);
			// },
			getdatas(){
				let data = {
					storeCode:utils.getCookie('storeCode'),
					head : true , 
					type:3
				}
				this.request('wisdom.vshop.vshopStore.queryStoreProduct',data)
				.then(data=>{ 
					if(data.code=='success'){
						this.financList = data.data.proprietaryProductResList
						this.inviterCode = data.data.inviterCode
						
					}
				})
			},
			toproductnamedetail(productCode){
				let data = {
					inviterCode:this.inviterCode,
					productCode:productCode,
					productType:3
				}
				this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("tap", "financingloan","getnumbers");
						if(data.data.state==0){
						this.$router.push('/mselfshopdetails?inviterCode='+this.inviterCode+'&'+'code='+productCode)
						}
						if(data.data.state==1){
							this.$router.push('/undershelf?inviterCode='+this.inviterCode)
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			},
		},
		mounted(){
			this.getdatas()
			statistics.page("financingloan", "getnumber");
		}
}
</script>
<style lang="less" scoped>
.finacmain{
	padding-bottom:20px;
}
   .financtittle{
		 height:40px;
		 line-height: 40px;
		 background: #ffffff;
		 font-size:12px;
		 color:#4897FB;
		 padding-left:15px;
		 margin-bottom: 5px;
		 border-radius: 4px;
		 margin-top:12px;
	 }
	 .financlist{
		 display: flex;
		 height:90px;
		 margin-bottom:10px;
		 align-items: center;
		 background: #ffffff;
		 padding-left:15px;
		 font-size:14px;
		 color:#999999;
		 border-radius: 4px;
		 .financlistbanner{
			 width:60px;
			 height:60px;
			 margin-right: 15px;
			 border-radius: 3px;
			 overflow: hidden;
			 img{
				 width:100%;
				 height:100%;
			 }
		 }
		 .financlistright{
				 margin-top: -4px;
			 h4{
				 font-size:17px;
				 color:#333333;
				 font-weight: bold;
				 width:240px;
				 overflow: hidden;
				 text-overflow:ellipsis;
				 white-space: nowrap;
			 }
			 span{
				 color:#FE951E;
			 }
		 }
	 }
</style>