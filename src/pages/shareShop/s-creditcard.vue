<template>
    <div>
			<div class="credtittle">各种热门信用卡，批卡率高，下卡快</div>
			<div>
				<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
				>	
					<div class="credlist" @click="tostiflingborrow">
						<div class="credlistbanner"><img src="" alt=""></div>
						<div class="credlistright">
							<h4>招商王者荣耀卡</h4>
							<p>玩家每月可获得500招行积分</p>
							<p>新户达标月月领好礼</p>
						</div>
					</div>
				</van-list>
			</div>
    </div>
</template>
<script>
export default {
    data(){
			return{
				finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
				loading: false,//控制上拉加载的加载动画
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
			tostiflingborrow(){
				this.$router.push('/stiflingborrow')
			}
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
			 background: red;
			 margin-right: 10px;
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