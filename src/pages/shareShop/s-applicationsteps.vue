<template>
    <div class="applicamain pddingTop">
			<header>
				<van-nav-bar title='有钱花' left-arrow fixed @click-left="returngo">
				</van-nav-bar>
			</header>
			<div class="applireminder">温馨提示：帮你贷仅支持线下签约贷款 <div @click="close"><img src="./images/close.png" alt=""></div></div>
			<div class="applistap">
				<van-steps :active="active" active-color="#4597FD">
					<van-step>
						<div class="applistaplist">
							<div><img :src='inactiveicon' alt=""></div>
							<p>申请借款</p>
						</div>
					</van-step>
					<van-step>
						<div class="applistaplist">
							<div><img :src='inactiveicon' alt=""></div>
							<p>基本信息</p>
						</div>
					</van-step>
					<van-step>
						<div class="applistaplist">
							<div><img :src='inactiveicon' alt=""></div>
							<p>工作信息</p>
						</div>
					</van-step>
						<van-step>
						<div class="applistaplist">
							<div><img :src='inactiveicon' alt=""></div>
							<p>补充信息</p>
						</div>
					</van-step>
				</van-steps>
			</div>
			<div>
				<!-- 申请贷款 -->
				<applicationloan @tosteps='getstepsnum' v-if='active==0'></applicationloan> 
				<!-- 基本信息 -->
				<essentialinformation @tosteps='getstepsnum' v-if="active==1"></essentialinformation>
				<workinformation @tosteps='getstepsnum' v-if="active==2"></workinformation>
			</div>
    </div>
</template>
<script>
import applicationloan from './s-applicationloan.vue'
import essentialinformation from './s-essentialinformation.vue'
import workinformation from './s-workinformation.vue'
import { Step, Steps } from 'vant';
export default {
		components:{
			[Step.name]:Step,
			[Steps.name]:Steps,
			applicationloan,
			essentialinformation,
			workinformation
		},
    data(){
        return{
					active:0,
        }
    },
    methods:{
			returngo(){
				this.$router.go(-1)
			},
			getstepsnum(msg){
				this.active = msg
			},
			close(){
				console.log(this.active)
			}
    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>
.applicamain{
	 background: #f1f1fb;
		.applireminder{
			height:40px;
			background: #FEF1E3;
			line-height:40px;
			font-size:13px;
			color:#FE951E;
			padding:0 15px;
			position: relative;
			img{
				width:11px;height:11px;
				position: absolute;
				right:30px;
				top:15px;
			}
		} 
		.applistap{
			height:96px;
			margin-bottom: 10px;
			.applistaplist{
				.van-step--horizontal.van-step--process .van-icon{
					display: none !important;
				}
				img{
					width:45px;
					height:45px;
				}
			}
		}
}
  
</style>