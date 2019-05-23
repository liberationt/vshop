<template>
    <div>
        <header></header>
        <section>
            <!-- <ul>
                <li v-for="(item,i) in dataList" :key="i" @click=""></li>
            </ul> -->
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div  v-for="(item,i) in dataList" :key="i" class="dalist">
                    {{item}}
                </div>
            </van-list>
        </section>
    </div>
</template>
<script>
import { List,Cell } from 'vant';
export default {
    components:{
        [List.name]:List,
        [Cell.name]:Cell
    },
    data(){
        return{
            finished:false,
            loading:false,
            dataList:[]
        }
    },
    methods:{
			onLoad(){
				setTimeout(() => {
				
					
					// 加载状态结束
					this.loading = false;
					if(this.dataList.length>=40){
						this.finished = true;
					}
				}, 500);
			},
			getdatalist(){
			}
    },
    mounted(){
        this.$emit('toparent','实用工具')
    }
}
</script>
<style lang="less">
    .dalist{
        height:80px;
        border-bottom: 1px solid #333;
    }
</style>