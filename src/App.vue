<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view v-if='isRouterlive'></router-view>
  </div>
</template>
<script>

export default {
   components: {
    
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterlive:true
    }
  },
  methods:{
    reload () {
      this.isRouterlive = false
      this.$nextTick(function () {
        this.isRouterlive = true
      })
    }
  }
  
}
</script>

<style lang="less">
@import '../common/index';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 375px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
