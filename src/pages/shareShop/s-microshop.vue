<template>
    <div class="microshop">
        <div class="microshopmain">
            <img src="./images/whatweishop.png" alt="">
            <div class='follow'>关注公众号</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.microshopmain{
    position: absolute;
    .follow{
        position:relative;
        top:-62px;
        height:48px;
        font-weight:bold;
        margin:0 44px;
        text-align: center;
        line-height:50px;
        font-size:22px;
        color:#ffffff;
        background:linear-gradient(90deg,rgba(255,156,48,1) 0%,rgba(253,91,23,1) 100%);
        box-shadow:0px 2px 5px 0px rgba(70,81,236,1);
        border-radius:24px;
    }
}
</style>
