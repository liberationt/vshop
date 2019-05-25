<template>
    <div class="backmain">
			<header class="pddingTop navbarrighttext">
				<van-nav-bar
					title="添加银行卡"
					left-arrow
					@click-left="onClickLeft"
				/> 
			</header>
			<div class='backcardinfor'>
				<div>
					<h4><span></span>持卡人姓名</h4>
					<div class="backcardname">
						<p>
							<label>姓名</label>
							<input type="text">
						</p>
						<p>
							<label>身份证</label>
							<input type="text">
						</p>
					</div>
				</div>
				<div>
					<h4><span></span>银行卡信息</h4>
					<div class="backcardname">
						<p>
							<label>银行卡号</label>
							<input type="text">
						</p>
						<p>
							<label>预留手机</label>
							<input type="text">
						</p>
						<p>
							<label>验证码</label>
							<input type="text" placeholder="请输入验证码">
							<span @click='obtain'>获取</span>
						</p>
					</div>
				</div>
				<div class=backcardtot>
					均加密保存，仅用于银行验证
				</div>
				<div class="addback"  @click="addback">
					添加
				</div>
			</div>
    </div>
</template>
<script>
export default {
    data(){
			return{

			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1)
			},
			addback(){

			},
			obtain(){

			}
		}
}
</script>
<style lang="less">
  .backmain{
		background:#f1f1fb;
		height:100%;
		.backcardinfor{
				font-size:14px;
			.backcardname{
				background: #ffffff;
				padding:0 15px;
				color:#333333;
				p{
					height:40px;
					border-bottom:1px solid #f1f1fb /*no*/;
					display: flex;
					align-items: center;
					position:relative;
					label{
						width:77px;
					}
					input{
						font-size:16px;
					}
					span{
						display: inline-block;
						background: #0C85FE;
						padding:5px 12px;
						border-radius: 2px;
						font-size:12px;
						color:#ffffff;
						position: absolute;
						right:0;
						top:5px;
					}
				}
				p:last-child{
					border:none/*no*/
				}
			}
			h4{
				display: flex;
				align-items: center;
				padding:0 15px;
				height:43px;
				span{
					display: inline-block;
					width:3px;
					height:18px;
					background: #4597FB;
					margin-right: 8px;
				}
			}
			.backcardtot{
				text-align: center;
				color:#999999;
				margin: 10px 0 36px;
			}
			.addback{
				height:45px;
				background:rgba(69,151,251,1);
				border-radius:23px;
				margin:0 15px;
				text-align: center;
				line-height:45px;
				color:#ffffff;
			}
		
		}
	}  
</style>
