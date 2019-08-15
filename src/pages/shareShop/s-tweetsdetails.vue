<template>
	<div class="main">
		 <header class="pddingTop navbarrighttext">
			<van-nav-bar
				:title=tittle
				left-arrow
				@click-left="onClickLeft"
			/> 
		</header> 
      <div class="mainTop">
        <div class="title">{{responseData.contentTitle}}</div>
        <div class="business">
          <p>{{responseData.contentAuthor}}</p>
          <p class="timer">{{responseData.dataCreateTime}}</p>
        </div>
        <div class="contentLabel">
          <div v-for="(item,i) in responseData.contentLabel" :key="i"><span>{{item}}</span></div>
        </div>
      </div>
			 <div class="qrcodeimg" v-show="exhibitionUserRes.userName"> 
        <div id="qrcode"></div>
        <p><img class="qxdlogo" src="./images/qdxlogin.png" alt=""></p>
      </div>
      <div v-html="responseData.contentText" class="contentText"></div>
      <div class="bannercontent" v-show="exhibitionUserRes.userName">
        <div class="bannername">{{exhibitionUserRes.userName}}</div>
        <div class="banneradress">
          <div class="bannerphone">
            <span> 
              <img src="./images/tweetsphone.png" alt>
            </span>
            <span>{{exhibitionUserRes.userPhone}}</span>
          </div>
          <div class="bannerphone">
            <span> 
              <img src="./images/tweetsadress.png" alt>
            </span>
            <span class="adress">{{exhibitionUserRes.loanCompany}}</span>
          </div>
        </div>
      </div>
      <div class="loan" v-show="exhibitionUserRes.userName">贷款咨询请长按识别二维码</div>
  </div>
</template>
<script>
import utils from '../../utils/utils';
import QRCode from "qrcodejs2"; 
import { constants } from 'crypto';
import wx from 'weixin-js-sdk'
export default {
	data(){
		return{
			responseData:{},
      exhibitionUserRes:'',
      tittle:'',
		}
	},
	methods:{
		onClickLeft(){
      this.$router.go(-1)
		},
		getdata(){
			let data = {
        exhibitionContentCode:this.$route.query.exhibitionContentCode,
        storeCode:this.$route.query.storeCode
			}
			this.https('wisdom.vshop.vshopStore.getExhibitionContent',data)
			.then(data=>{
				if(data.code=='success'){
					this.responseData = data.data
          this.exhibitionUserRes = data.data.exhibitionUserRes
          this.tittle= data.data.contentTitle
          this.qrcode()
          this.$nextTick(()=> {
            let contentText = document.getElementsByClassName('contentText')[0].innerText.slice(0, 51) + "..."
            this.wxShare(data.data.exhibitionContentCode,this.$route.query.storeCode,this.tittle,contentText)
          })
				}
			})
		},
		qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 60,
        height: 60, // 高度
        text: this.exhibitionUserRes.qrUrl // 二维码内容
      });
    },
    wxShare(exhibitionContentCode,storeCode,tittle,sharecontnet) {
      let url
      if( !utils.isAndroid1() ){
        url =  decodeURIComponent(window.location.href)
      } else {
        url = window.location.href
      }
      let that = this
      this.https("wisdom.vshop.wechatOpen.getJsconf", {url:url})
      .then(data => {
        setTimeout(() => {
          utils.wxShare(data.data)
          wx.ready(function(){
            wx.updateAppMessageShareData({
            title: tittle, // 分享标题
            desc: sharecontnet, // 分享描述
            link: window.location.origin + "/tweetsdetails?exhibitionContentCode="+exhibitionContentCode+"&storeCode="+storeCode, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://wisdom-loan.oss-cn-shanghai.aliyuncs.com/productParam/60938f68-1fa0-4620-a90a-7a4d7a7c7117.png', // 分享图标
            success: function () {
            },
            cancel: function(err){

            }
            });
          })
　　　　 }, 500)
      })
      .catch(err => {
        console.log(err);
      });
    }
	},
	mounted(){
    this.getdata()
	}	
}
</script>
<style lang="less" scoped>
.main{
  width:375px;
  position: absolute;
  padding-bottom:30px;
}
  .mainTop {
      padding: 22px 17px 0 15px;
      .title {
        font-size: 19px;
        color: #333333;
      }
      .business {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        margin: 4px 0 8px;
        color: #666666;
        .timer {
          font-size: 12px;
          color: #999999;
        }
      }
      .contentLabel div {
        display: inline-block;
        margin-bottom: 5px;
        height: 19px;
        line-height: 18px;
        padding: 0 9px;
        font-size: 11px;
        font-family: Arial, '宋体', Helvetica, sans-serif;
        font-weight: 300;
        margin-right: 6px;
        color: #4597fb;
        background: rgba(69, 151, 251, 0.1);
        span {
          display: inline-block;
          height: 19px;
          line-height: 20px;
        }
      }
    }
	.contentText {
		font-size: 14px;
		padding: 0 15px 7px;
		margin-top: 30px;
		color: #666666;
		line-height: 25px;
		p {
			margin-bottom: 10px;
			img {
				width: 329px;
				height: 174px;
				padding-left: 14px;
				margin: 8px 0;
			}
		}
	}
	.qrcodeimg {
      background: #ffffff;
      padding:6px 6px 5px 6px;
      position: absolute;
      bottom: 85px;
      left: 50%;
      margin-left: 50px;
      z-index: 10;
      #qrcode {
        width: 55px;
        height: 55px;
      }
      p img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
      }
		}
		.bannercontent {
      width: 265px;
      height: 164px;
      background: #282526;
      border-radius: 5px;
      margin: 20px auto 5px;
      padding: 30px 8px 0 20px;
      position: relative;
      .bannername {
        font-size: 19px;
        margin-left: 17px;
        color: #ffffff;
        letter-spacing: 5px;
        margin-bottom: 15px;
      }
      .banneradress div {
        margin-top: 9px;
        color: #bfbebe;
        font-size: 10px;
      }
      .bannerphone {
        display: flex;
        img {
          width: 11px;
          height: 11px;
          margin-right: 10px;
        }
        .adress {
          width: 120px;
        }
      }
    }
    .loan {
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
</style>
