<template>
    <div class="credcart">
		<div class="credtittle">各种热门信用卡，批卡率高，下卡快</div>
		<div>
			<div class="credlist" @click="tostiflingborrow(item.productCode)" v-for="(item,i) in cardList" :key="i">
				<div class="credlistbanner"><img :src=item.productLogo alt=""></div>
				<div class="credlistright">
					<h4>{{item.productName}}</h4>
					<p>{{item.subTitle}}</p>
					<p>{{item.desc}}</p>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
export default {
    data(){
			return{
				cardList:[],
				inviterCode:''
			}
		},
		methods:{
			tostiflingborrow(productCode){
				let data = {
					inviterCode:this.inviterCode,
					productCode:productCode
				}
				this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("tap", "creditcard","getnumbers");
						if(data.data.state==0){
							this.$router.push('/stiflingborrow?inviterCode='+this.inviterCode+'&'+'productCode='+productCode)
						}
						if(data.data.state==1){
							this.$router.push('/undershelf?inviterCode='+this.inviterCode)
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			getdatas(){
				let data = {
				storeCode:utils.getCookie('storeCode'),
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
			statistics.page("creditcard", "getnumber");
		}
}
</script>
<style lang="less" scoped>
.credcart{
	padding-bottom:20px;
}
   .credtittle{
		 height:40px;
		 line-height: 40px;
		 background: #ffffff;
		 font-size:12px;
		 color:#4897FB;
		 padding-left:15px;
		 margin-bottom: 5px;
		 border-radius: 4px;
	 }
	 .credlist{
		 display: flex;
		 height:100px;
		 align-items: center;
		 background: #ffffff;
		 padding-left:15px;
		 font-size:14px;
		 color:#999999;
		 margin-bottom:10px;
		 border-radius: 4px;
		 .credlistbanner{
			 width:100px;
			 height:70px;
			 margin-right: 10px;
			 border-radius: 5px;
			 overflow: hidden;
			 img{
				 width:100px;
				 height:70px;
			 }
		 }
		 .credlistright{
			h4{
				font-size:16px;
				color:#333333;
				font-weight: bold;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				width:200px;
			}
			p{
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			width:200px;
			}
		 }
	 }
</style>