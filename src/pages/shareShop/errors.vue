<template>
	<div class="shopmain pddingTop">
		<header>
			<van-nav-bar title='出错啦' left-text="" fixed>
			</van-nav-bar>
		</header>
		<div class="mainfove">
			<img src="./images/404.png" alt="">
			<div>SORRY~您访问的页面不存在</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{

		}
	}
}
</script>
<style lang="less" scoped>
	.mainfove{
		padding:46px 47px;
		img{
			width:321px;
			height:231px;
		}
		div{
			text-align: center;
			font-size:15px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(102,102,102,1);
			margin-top: 20px;
		}
	}
</style>