<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin">
  <div class="loanlistmain">
		<div class="loanlisttop">
			<div class="invitnum">邀请码6S89WH</div>
			<div class="dropdown">
				<van-dropdown-menu>
					<van-dropdown-item v-model="value1" @change="changelect" :options="option1" />
				</van-dropdown-menu>
			</div>
		</div>
	<div>
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>	
			<div class="listdata" @click="toproductnamedetail(item.productCode)" v-for="(item,i) in dataList" :key="i">
				<div class="listdatatop">
					<div>
						<div><img :src=item.productLogo alt=""></div>
					</div>
					<div>
						<h4>{{item.productName}}</h4>
						<p>{{item.subTitle}}</p>
					</div>
				</div>
				<div class="listdatabot">
					<div>
						<p style="font-size:16px;color:#FE951E">{{item.amount}}</p>
						<p>可用额度 (元)</p>
					</div>
					<div>
						<p>期限：<span>{{item.limit}}个月</span></p>
						<p>最快当天到账</p>
					</div>
					<div class="apply">立即申请</div>
				</div>
			</div>
		</van-list>
	</div>
  </div>
	</van-pull-refresh>
</template>
<script>
import utils from '../../utils/utils'
import { statistics } from "wisdom-h5";
import { DropdownMenu, DropdownItem } from 'vant';
export default {
	components:{
		[DropdownMenu.name]:DropdownMenu,
		[DropdownItem.name]:DropdownItem
	},
	data(){
		return{
			isLoading:false,
			value1:'-1',
			option1: [
				{text:'全部',value:'-1'}
			],
			dataList:[],
			finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			loading: false,//控制上拉加载的加载动画
			pageNum:1,
			pageSize:5,
			inviterCode:'',
		}
	},
	methods:{
		toproductnamedetail(productCode){
			let data = {
					inviterCode:this.inviterCode,
					productCode:productCode
				}
				this.request('wisdom.vshop.product.queryH5UserProductDetail',data)
				.then(data=>{
					if(data.code=='success'){
						statistics.click("tap", "loanlist","getnumber");
						if(data.data.state==0){
							this.$router.push('/productnamedetail?productCode='+productCode+'&'+'inviterCode='+this.inviterCode)
						}
						if(data.data.state==1){
							this.$router.push('/undershelf?inviterCode='+this.inviterCode)
						}
					}
				}).catch(err=>{
					console.log(err)
				})
		},
		//下拉框
		changelect(i){
			this.finished = false;
			this.dataList=[];
			this.productDetailType = i
			this.pageNum=1
			this.initialization()
		},
		init(){
			this.finished = false;
			if(this.loading){
                return false;
            }
            let datas = {
				storeCode:utils.getCookie('storeCode'),
				productDetailType:this.value1,
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				filter:true
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProductList',datas)
				.then(data=>{ 
					if(data.code=='success'){
						let options = data.data.productDetailTypeBean
						this.inviterCode = data.data.inviterCode
						let options2=[]
						for(var i=0;i<options.length;i++){
							options2.push(
								{
									text:options[i].label,
									value:options[i].code
								}
							)
						}
						this.option1= [{text:'全部',value:'-1'}]
						this.option1 =this.option1.concat(options2) 
						this.dataList= data.data.dataList
						this.isLoading = false; //关闭下拉刷新效果
                        this.finished = false;
						this.pageNum++;
					}
				})

		},
		initialization(){
            this.loading = true;//下拉加载中
			this.finished = false;//下拉结束
            if(this.loading){
                this.onLoad();
            }
		},
		inits(){
			this.isLoading = false;//下拉加载中
			this.finished = false;
			this.loading = false
			this.dataList = []
			this.pageNum=1
			this.onLoad()
		},
		// 下拉刷新
		onRefresh(){
			let that = this
			setTimeout(() => {
				this.pageNum=1
				that.init()
			}, 500);
		},
		//页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
		onLoad() {
			// console.log(this.pageNum)
			setTimeout(() => {
			if(this.isLoading){
                return false;
            }
			let datas = {
				storeCode:utils.getCookie('storeCode'),
				productDetailType:this.value1,
				pageNum:this.pageNum,
				pageSize:this.pageSize,
				filter:true
			}
			this.request('wisdom.vshop.vshopStore.queryStoreProductList',datas)
			.then(data=>{ 
				if(data.code=='success'){
					let options = data.data.productDetailTypeBean
					this.inviterCode = data.data.inviterCode
					this.dataList = this.dataList.concat(data.data.dataList)
					this.loading = false
					console.log(data.data.dataList.length)
					if(data.data.dataList<this.pageSize){
						this.finished = true
					}
					this.pageNum++;
					let options2=[]
					for(var i=0;i<options.length;i++){
						options2.push(
							{
								text:options[i].label,
								value:options[i].code
							}
						)
					}
					this.option1= [{text:'全部',value:'-1'}]
					this.option1 =this.option1.concat(options2) 
					// data.data.dataList.map((item)=>{
					// 	this.dataList.push(item)
					// })
				}
			})
			}, 500);
		},
	},
	created(){
		if(this.$route.query.productDetailType){
			this.value1=this.$route.query.productDetailType
		}
	},
	mounted(){
		// window.scrollTo(0,0);
		// statistics.page("loanlist", "shppagenum");
	}
}
</script>
<style lang="less" scoped>
	.loanlistmain{
		background: #f1f1fb;
		min-height: 500px;
		.loanlisttop{
			background: #ffffff;
			.invitnum{
				height:40px;
				font-size:11px;
				line-height: 40px;
				border-bottom:1px solid #E7E7E7 /*no*/;	
				text-align: center;
				color:#999999;
			}
		}
		.dropdown{
			width:100%;
		}
		.listdata{
			margin:15px;
			margin-bottom:10px;
			background: #ffffff;
			.listdatatop{
				height:53px;
				border-bottom:1px solid #E7E7E7 /*no*/;
				padding:0 15px;
				display: flex;
				align-items: center;
				img{
					width:33px;
					height:33px;
					margin-right: 10px;
				}
				h4{
					font-size:16px;
					color:#333333;
					font-weight: bold;
				}
				p{
					font-size: 11px;
					color:#999999;
					margin-top: 3px;
				}
			}
			.listdatabot{
				display: flex;
				padding:0 15px;
				justify-content: space-between;
				align-items: center;
				height:58px;
				font-size:12px;
				color:#333333;
				div{
					line-height:20px;
					span{
						color:#FE951E;
					}
				}
				.apply{
					background: #4597FB;
					color:#ffffff;
					font-weight: bold;
					border-radius: 15px;
					padding:5px 10px;
				}
			}
		}
	}
</style>