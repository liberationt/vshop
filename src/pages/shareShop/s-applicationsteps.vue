<template>
    <div class="applicamain">
			<header>
				<van-nav-bar title='有钱花' left-text="" left-arrow fixed @click-left="returngo">
				</van-nav-bar>
			</header>
			<div class="applireminder">温馨提示：帮你贷仅支持线下签约贷款</div>
			<div>
				<van-steps :active="active">
					<van-step>买家下单</van-step>
					<van-step>商家接单</van-step>
					<van-step>买家提货</van-step>
					<van-step>交易完成</van-step>
				</van-steps>
			</div>
			<div>
				<applicationloan></applicationloan>
			</div>
			<div @click="nextstep">下一步</div>
    </div>
</template>
<script>
import applicationloan from './s-applicationloan.vue'
import { Step, Steps } from 'vant';
export default {
		components:{
			[Step.name]:Step,
			[Steps.name]:Steps,
			applicationloan
		},
    data(){
        return{
					active:0
        }
    },
    methods:{
			returngo(){

			},
			nextstep(){
				this.active+=1
				if(this.active>=3){
					this.active =3
				}
			},
    },
    mounted(){

    }
}
</script>
<style lang="less">
.applicamain{
	padding:50px 0 0;
		.applireminder{
			height:30px;
			background: red;
		} 
}
  
</style>