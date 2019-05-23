<template>
    <div>
			<div>自营贷款</div>
			<ul>
				<li v-for="(item,i) in supportdataList" :key="i">
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
				supportdataList:[1,2,3,4,5,6]
			}
		}
}
</script>
<style lang="less">
    
</style>