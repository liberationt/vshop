<template>
    <div>
        <h1>官方贷款</h1>
				<ul>
					<li v-for="(item,i) in officialdataList" :key="i">
						<div><img src="" alt=""></div>
						<div>
								<h4>标题</h4>
								<p>打点爱的色放阿斯顿</p>
								<p>大大是阿斯顿是</p>
						</div>
					</li>
				</ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
					officialdataList:[1,2,3,4,5,6,7,8,9,10]
        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>
<style lang="less">
    
</style>