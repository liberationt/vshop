<template>
    <div>
        <header></header>
        <section>
            <ul>
                <li v-for="(item,i) in dataList" :key="i" @click=""></li>
            </ul>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dataList:[]
        }
    },
    methods:{

    },
    mounted(){
        this.$emit('toparent','实用工具')
    }
}
</script>
<style lang="less">
    
</style>