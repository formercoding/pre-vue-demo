<template>
<div class="crop">
	<div class="wrapper">
        <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            @realTime="realTime"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
        ></vueCropper>
	</div>
    <div class="pre-wrap">
        <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <div style="width:200px;height:200px;background:pink;">
                <img :src="option.img" :style="previews.img">
            </div>
        </div>
    </div>
	<div class="test-button">
	<!-- <button @click="changeImg" class="btn">changeImg</button> -->
	<label class="btn" for="uploads">upload</label>
	<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
	 accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg">
	<button @click="startCrop" v-if="!crap" class="btn">start</button>
	<!-- <button @click="stopCrop" v-else class="btn">stop</button>
	<button @click="clearCrop" class="btn">clear</button>
	<button @click="finish('base64')" class="btn">preview(base64)</button> -->
	<!-- <button @click="finish('blob')" class="btn">preview(blob)</button> -->
	<!-- <a @click="down('base64')" class="btn" :href="downImg" download="demo">download(base64)</a>
	<a @click="down('blob')" class="btn" :href="downImg" download="demo">download(blob)</a> -->
    <button>save</button>
	</div>
</div>
</template>
<script>
import vueCropper from 'vue-cropper'
 
export default {
	data: function () {
		return {
			crap: false,
			previews: {
                w: 200,
                h: 100
            },
			lists: [
				{
					img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
				},
				{
					img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
				}
			],
			option: {
				img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg',
				size: 0.8,
                outputType: 'jpeg',
                fixed: true,
				fixedNumber: [4, 3]
			},
			downImg: '#'
		}
	},
	methods: {
		changeImg () {
			this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
		},
		startCrop () {
			// start
			this.crap = true
			this.$refs.cropper.startCrop()
		},
		stopCrop () {
			//  stop
			this.crap = false
			this.$refs.cropper.stopCrop()
		},
		clearCrop () {
			// clear
			// this.$refs.cropper.clearCrop()
		},
		// 实时预览函数
		realTime (data) {
			this.previews = data
		},
		finish (type) {
			// 输出
			var test = window.open('about:blank')
			test.document.body.innerHTML = '图片生成中..'
			if (type === 'blob') {
				this.$refs.cropper.getCropBlob((data) => {
					var test = window.open('')
					test.location.href = window.URL.createObjectURL(data)
				})
			} else {
				this.$refs.cropper.getCropData((data) => {
					test.location.href = data
				})
			}
		},

		down (type) {
			// event.preventDefault()
			var aLink = document.createElement('a')
			aLink.download = 'demo'
			// 输出
			if (type === 'blob') {
				this.$refs.cropper.getCropBlob((data) => {
					this.downImg = data
					aLink.href = data
					aLink.click()
				})
			} else {
				this.$refs.cropper.getCropData((data) => {
					this.downImg = data
					aLink.href = data
					aLink.click()
				})
			}
		},

		uploadImg (e) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
                this.option.img = e.target.result;
                console.log(this.option);
			}
			reader.readAsDataURL(file)
		}
	},
	components: {
		vueCropper
	},
}
</script>
<style lang="less">
.crop {
    .wrapper {
        display: inline-block;
        width: 300px;
        height: 200px;
        overflow: hidden;
    }
    .show-preview {
        display: inline-block;
        margin-left: 20px;
        overflow: hidden;
        background: pink;
    }
    button {
        height: 30px;
        line-height: 30px;
        border: none;
        border-radius: 2px;
        outline: none;
        background: salmon;
        font-size: 14px;

    }
    .btn {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border: none;
        border-radius: 2px;
        outline: none;
        background: salmon;
        font-size: 14px; 
    }
    .pre-wrap {
        width: 200px;
        height: 200px;
        overflow: hidden;
        display: inline-block;
    }
}
</style>


