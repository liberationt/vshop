<template>
  <div>
    <button @click="onShare"> <img src="./imgs/share.png" alt="" class="footer_share"> 分享微店 </button>
  </div>
</template>
<script>
import utils from "../../utils/utils"
import wx from 'weixin-js-sdk'
export default {
  data(){
    return{
      
    }
  },
  methods:{
    onShare(){
      wx.onMenuShareAppMessage({
        title: '割让个人', // 分享标题
        desc: '割让个人', // 分享描述
        link: window.location.origin + "/#/shoppage", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户点击了分享后执行的回调函数
          alert('分享成功回调')
        },
        cancel: function(err){
          alert('分享取消回调')
        }
      });
    },
    wxShare(inviterCode) {
      this.request("wisdom.vshop.wechatOpen.getJsconf", {
        url: window.location.origin + "/"
      }).then(data => {
          utils.wxShare(data.data)
          wx.error(function(res){
            alert(JSON.stringify(res))
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.request("wisdom.vshop.vshopStoreManager.getShareRes", {})
      .then(data => {
        this.wxShare(data.data.inviterCode);
      })
      .catch(err => {
        console.log(err);
      });
      
  },
}
</script>
<style lang="less" scoped>

</style>

