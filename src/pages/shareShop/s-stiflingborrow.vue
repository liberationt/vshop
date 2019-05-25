<template>
    <div class="stiflmain">
			<header class="pddingTop">
				<van-nav-bar
					title="虫虫借钱"
				/>
			</header>
			<div class="stiflimg">
				<img src="" alt="">
			</div>
			<div class="applyinfor">
				<h4><span></span>申请人信息</h4>
				<div>
					<p>
						<span>手机号</span>
						<input type="number" v-model="text">
					</p>
					<p>
						<span>验证码</span>
						<input type="number" v-model="text" style="width:140px;">
						<i style='color:#4697FB'>获取验证码</i>
					</p>
					<p>
						<span>姓名</span>
						<input type="number" v-model="text">
					</p>
					<p>
						<span>身份证号</span>
						<input type="number" v-model="text">
					</p>
				</div>
			</div>
			<div class="comform">
				确认资料
			</div>
			<div class="recommender">
				<span><img src="" alt=""></span>
				<span>推荐人：134****1233</span>
			</div>
    </div>
</template>
<script>
export default {
	data(){
		return{
			text:111
		}
	},
	methods:{

	},
	mounted(){

	}
}
</script>
<style lang="less">
	.stiflmain{
		background: #f1f1fb;
		height:100%;
	}
	.stiflimg{
		height:157px;
		background: red;
		img{
			width:100%;
			height:100%;
		}
	}
	.applyinfor{
		padding:0 15px;
		background: #ffffff;
		h4{
			line-height: 44px;
			font-size:14px;
			color:#4597FB;
			span{
				display: inline-block;
				height:18px;
				width:3px;
				background: #4597FB;
				border-radius: 1px;
				margin-right: 8px;
			}
		}
		div{
			p{
				height:48px;
				font-size:14px;
				color:#333333;
				// background: #000;
				line-height: 48px;
				border-bottom:1px solid #E7E7E7;
				span{
					display:inline-block;
					width:118px;
				}
				input{
					height:40px;
					border:none;
				}
			}
		}
	}
	.comform{
		height:50px;
		background: #4597FB;
		margin:30px 15px 80px;
		border-radius: 25px;
		text-align: center;
		line-height: 50px;
		font-size:16px;
		color:#ffffff;
	}
	.recommender{
		margin:0 97px;
		height:35px;
		background: #E7F7FD;
		border-radius:0px  18px   18px  0px;
		line-height:35px;
		color:#4597FB;
		font-size:12px;
		img{
			width:35px;height:35px;border-radius: 50%;margin-right: 10px;
		}
	}
</style>