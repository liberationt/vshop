<template>
    <div>
			<header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="有钱花"
					left-arrow
					@click-left="returngo"
				/> 
			</header> 
			<div class="havemoneybanner"><img src="./images/havebanner.png" alt=""></div>
			<!-- 轮播图 -->
			<div class="swiper">

			</div>
			<div class="backgroundcolor"></div>
			<div class="havemoneymain">
				<p class="havemoneymaintop"><img src='./images/circle.png'/>已经帮助 <span>2,789,233</span> 用户成功申请贷款<img src="./images/circle.png" alt=""></p>
				<div class="phoneinfor">
					<p>
						<input type="number"  pattern='[0-9]*' placeholder="请输入手机号码" v-model="phonenumber" oninput='if(value.length>11)value=value.slice(0,11)'>
					</p>
       		<p>
						<input type="number"  pattern='[0-9]*' placeholder="请输入短信验证码" v-model='verification' oninput='if(value.length>6)value=value.slice(0,6)'>
						<span class="get_number" @click="flag && getnum()">{{countext}}</span>
        	</p>
				</div>
				<div class="agree">
					<van-checkbox icon-size='15px' v-model="checked">已阅读并同意<span @click="serviceAgreement">《服务协议》</span>和<span @click="privacyAgreement">《隐私协议》</span></van-checkbox>
				</div>
				<div class="rightapply">立即申请贷款</div>
			</div>
    </div>
</template>
<script>
import { NavBar,Field ,Toast, Checkbox } from 'vant';
export default {
		components:{
        [NavBar.name] : NavBar,
				[Field.name] : Field,
				[Toast.name] : Toast,
				[Checkbox.name] : Checkbox,
				// [TabbarItem.name] : TabbarItem,
		},
    data(){
			return{
				phonenumber:'',
				verification:'',
				flag:true,
				countext:'获取验证码',
				countNumber:1,
				checked:true
			}
		},
		methods:{
			returngo(){
				alert(1)
			},
			//同意服务协议
			serviceAgreement(){
				this.$router.push('/')
			},
			privacyAgreement(){
				this.$router.push('/')
			},
			// 获取验证码
      publick(){
        if(!this.phonenumber){
          Toast({
						duration:800,
						message:'请输入手机号'
					});
          return false;
        }
        if(!/(1([3-9])[0-9]{9})/.test(this.phonenumber)){
					Toast({
						duration:800,
						message:'请输入正确格式的手机号'
					});
          return false;
        }
        return true
      },
      //获取验证码
      getnum(){
        this.countNumber = 2
        if(this.publick()){
          this.setTimeout()
          // let params = this.params;
          // let salt = this.salt; 
          // params.apiKey = "wisdom.netmoney.Luohui.sendCaptcha";
          // params.data = JSON.stringify({
          //     phoneNumber:this.phoneNumber
          // })
          // params.sign = MD5(params.apiKey+""+params.data+salt);
          // this.http.post(BASE_URL,params).then(data=>{
          //     if(data.code == 'success'){
          //       this.showPositionValue=true
          //       this.words = '短信发送成功'
          //     }else{
          //       this.showPositionValue=true
          //       this.words = data.message
          //       clearInterval(this.timer)
          //     }
          // }).catch(err=>{
          //     console.log(err)
          //     this.showPositionValue=true
          //     this.words = data.message
          //     clearInterval(this.timer)
          // })
        }
      },
      //立即领取
      immediately(){
        if(this.publick()){
          if(this.countNumber==1){
						Toast({
							duration:800,
							message:'请获取验证码'
						});
            return false;
          }
          if(this.verificationcode==''){
						Toast({
							duration:800,
							message:'请输入验证码'
						});
            return false;
          }
        }
      },
      // 定时器
    setTimeout(){
      const TIME_COUNT = 60;
      this.flag = false;
       if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.countext = this.count+' s后获取';
            } else {
                this.countext = '获取验证码';
                this.flag=true
                clearInterval(this.timer);
                this.timer = null;
            }
           }, 1000)
         }
     },
		}
}
</script>
<style lang="less" scoped>
    .havemoneybanner{
			height:180px;
		}
		.swiper{
			height:40px;
			background: red;
		}
		.backgroundcolor{
			height:10px;
			background: #f1f1fb;
		}
		.havemoneymain{
			padding:0 15px 23px;
			.havemoneymaintop{
				line-height: 40px;
				text-align: center;
				font-size:14px;
				img{
					width:10px;height:10px;margin:-2px 7px 0;
				}
				span{
					color:#4897FB;
				}
			}
			.phoneinfor{
				font-size:14px;
				color:#333333;
				p{
					display: flex;
					justify-content: space-between;
					align-items: center;
					span{
						color:#4896FB;
					}
				}
				input{
					line-height: 46px;
					height:48px;
				}
			}
			.agree{
				height:55px;
				line-height: 55px;
				font-size:12px;
				.van-checkbox{
					height:55px;
				}
				span{
					color:#4896FB;
				}
			}
			.rightapply{
				height:50px;
				font-size:14px;
				color:#ffffff;
				text-align:center;
				line-height:50px;
				background: #4597FB;
				border-radius:25px;
			}
		}
</style>