<template>
    <div>
        <ul class="chooser-list">
					<li :style="cssStyle"
					v-for="(item, index) in options" :key="index"
					@click="optionsClick(item)"
					:class="{active: checkActive(item)}"
					>{{ item.label }}</li>
				</ul>    
    </div>
</template>
<script>
export default {
    data () {
			return {
				currValArr: []
			}
  	},
		props: {
			options: Array, //传入的数组
			isMultiply: { //是否是多选。默认为false：单选；true：多选
				type: Boolean,
				default: false
			},
			cssStyle: Object //可以自定义单选或者多选的样式
		},
		methods:{
			optionsClick(item){
				if (this.isMultiply === false) { //单选
					this.$set(this.currValArr, 0, item) // 将该值设为当前数组的第一项
				} else { //多选
					if (this.currValArr.indexOf(item) === -1) {
						// 当前数组中没有该值则push到数组
						this.currValArr.push(item)
					} else {
						//当前数组中有该值，找到该值下标并删除
						this.currValArr.splice(this.currValArr.indexOf(item), 1)
					}
				}
				console.log(this.currValArr)
			},
			checkActive(item){
				if (this.isMultiply === false) {
					this.currValArr.length = 1
				}
				return this.currValArr.indexOf(item) !== -1
				}
		}
}
</script>
<style lang="less">
ul, li {
  margin: 0;
  padding:0;
  list-style: none;
}
.chooser {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  margin: 5px;
  width: 80px;
  height: 40px;
  line-height: 40px;
  border-radius: 7px;
  display: inline-block;
  border: 1px solid #9C9C9C;
  color: #9C9C9C;
  text-align: center;
  background: #fff;
}
.chooser-list li.active {
  border-color: #097fe0;
  color: #097fe0;
  background: #fff;
}
</style>