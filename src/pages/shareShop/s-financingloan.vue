<template>
    <div>
			<div class="financtittle">申请多个产品，可大幅度提高贷款成功率</div>
			<div>
				<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
				>	
					<div class="financlist">
						<div class="financlistbanner"><img src="" alt=""></div>
						<div class="financlistright">
							<h4>人人贷借款</h4>
							<p>综合月利率：<span>0.78% - 0.85%</span></p>
							<p>贷款额度：<span>1000 - 20000元</span></p>
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
			}
		}
}
</script>
<style lang="less" scoped>
   .financtittle{
		 height:40px;
		 line-height: 40px;
		 background: #ffffff;
		 font-size:12px;
		 color:#4897FB;
		 padding-left:15px;
		 margin-bottom: 5px;
	 }
	 .financlist{
		 display: flex;
		 height:90px;
		 align-items: center;
		 background: #ffffff;
		 padding-left:15px;
		 font-size:14px;
		 color:#999999;
		 .financlistbanner{
			 width:60px;
			 height:60px;
			 background: red;
			 margin-right: 15px;
		 }
		 .financlistright{
			 h4{
				 font-size:17px;
				 color:#333333;
				 font-weight: bold;
			 }
			 span{
				 color:#FE951E;
			 }
		 }
	 }
</style>