<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin">
		<div class="utilitmain">
			<div class="utilitop">
				<div class="utilitopbanner"><img src="./images/tou xiang.png" alt=""></div>
				<div class="utiliright">
					<span>成都 </span>
					<span>郑经理</span>
					<p>身份认证</p>
				</div>
			</div>
			<div class="utilitslist">
				<div class="havemoney" v-show="show">
					<div @click="tohavemoney"><img src="" alt=""></div>
					<div class="close" @click="closeTost"><img src="./images/close.png" alt=""></div>
				</div>
				<div class="utilistittle">申请多个产品，可大幅度提高贷款成功率</div>
				<div class="utilisdatalist" @click="tostiflingborrow">
					<div class="datalistbanner"><img src="" alt=""></div>
					<div>
						<h4>工具名称</h4>
						<p>工具简介</p>
					</div>
				</div>
			</div>
		</div>
	</van-pull-refresh>
</template>
<script>
import { Tab, Tabs ,Dialog} from 'vant'
export default {
	components:{
		[Dialog.name]:Dialog
	},
	data(){
		return{
			isLoading:false,
			show:true,
		}
	},
	methods:{
		onRefresh(){
			setTimeout(() => {
				// 加载状态结束
				this.isLoading = false;
			
			}, 500);
		},
		getdatalist(){
		},
		tohavemoney(){

		},
		tostiflingborrow(){
			this.$router.push('/stiflingborrow')
		},
		closeTost(){
			Dialog.confirm({
				confirmButtonText:'10天内不再提示',
				cancelButtonText:'永不提示',
				message: '确认关闭此提示框吗？'
			}).then(() => {
			// on confirm
			}).catch(() => {
			// on cancel
			});
		}
	},
	mounted(){
			this.$emit('toparent','实用工具')
	}
}
</script>
<style lang="less" scoped>
  .utilitmain{
		min-height:500px;
		background: #f1f1fb;
		
		.utilitop{
			height:75px;
			background: #ffffff;
			display: flex;
			padding-left:15px;
			align-items: center;
			margin-bottom:15px;
			.utilitopbanner img{
				width:50px;height:50px;
				margin-right: 15px;
			}
			.utiliright{
				display: flex;
				align-items: center;
				font-size:18px;
				color:#333333;
				font-weight: bold;
				span{
					margin-right: 10px;
				}
				p{
					width:70px;height:17px;background: #F3B13E;
					color:#ffffff;
					font-size:10px;border-radius: 3px;
					text-align: center;
					line-height: 17px;
				}
			}
		}
		.utilitslist{
			padding:0 15px;
			.utilistittle{
				height:40px;
				color:#4897FB;
				line-height:40px;
				background: #ffffff;
				font-size:12px;
				margin: 15px 0 5px;
				padding-left:15px;
			}
			.utilisdatalist{
				height:100px;
				padding-left:15px;
				display: flex;
				align-items: center;
				background: #ffffff;
				margin-top: 10px;
				.datalistbanner{
					height:50px;
					width:50px;
					background: red;
					margin-right: 10px;
					img{
						width:50px;
						height:50px;
					}
				}
				h4{
					font-size:19px;
					color:#333333;
					font-weight: bold;
				}
				p{
					font-size: 14px;
					color:#999999;
				}
			}
		}
		.havemoney{
			height:95px;
			background: red;
			position: relative;
			.close{
				width:17px;
				height:17px;
				position: absolute;
				right:10px;
				top:8px;
			}
		}
	}  
</style>