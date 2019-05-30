<template>
	<van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text='刷新成功' class="xialashuaxin">
  <div class="loanlistmain">
		<div class="loanlisttop">
			<div class="invitnum">邀请码6S89WH</div>
			<div class="dropdown">
				<van-dropdown-menu>
					<van-dropdown-item v-model="value1" :options="option1" />
				</van-dropdown-menu>
			</div>
		</div>
		<div class="listdata" @click="toproductnamedetail">
			<div class="listdatatop">
				<div>
					<div><img src="" alt=""></div>
				</div>
				<div>
					<h4>大王贷款</h4>
					<p>“门槛低 额度大 放款快 费率低”</p>
				</div>
			</div>
			<div class="listdatabot">
				<div>
					<p style="font-size:16px;color:#FE951E">1万-20万</p>
					<p>可用额度 (元)</p>
				</div>
				<div>
					<p>期限：<span>12个月-36个月</span></p>
					<p>最快当天到账</p>
				</div>
				<div class="apply" @click="apply">立即申请</div>
			</div>
		</div>
  </div>
	</van-pull-refresh>
</template>
<script>
import { DropdownMenu, DropdownItem } from 'vant';
export default {
	components:{
		[DropdownMenu.name]:DropdownMenu,
		[DropdownItem.name]:DropdownItem
	},
	data(){
		return{
			isLoading:false,
			value1:0,
			option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
		}
	},
	methods:{
		apply(){

		},
		toproductnamedetail(){
			this.$router.push('/productnamedetail')
		},
		// 下拉刷新
		onRefresh(){
			setTimeout(() => {
				this.isLoading = false; //关闭下拉刷新效果
			}, 500);
		}
	},
	mounted(){
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
			width:100px;
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