<template>
    <div>
        <section>
            <ul>
                <li v-for="(item,i) in menuList" :key="i"></li>
            </ul>
        </section>
        <footer>
            <ul>
                <li v-for="(item,v) in tweetsList" :key="v"></li>
            </ul>
        </footer>
    </div>
</template>
<script>
export default {
    data(){
        return{
            menuList:[],
            tweetsList:[]
        }
    },
    methods:{
        getDatas(){
            this.request('',{}).then((data)=>{
                this.data = data.data
            })
        }
    },
    mounted(){
        this.$emit('toparent','店铺首页',1)
    }
}
</script>
<style lang="less">
    
</style>