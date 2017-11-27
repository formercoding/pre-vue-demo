<template>
    <!-- 容器（需要保存为图片的元素） -->
    <div class="container">
        <div class="pre" style="background: #63EBAF;">
            <h1>带背景标题</h1>
            <img src="../assets/logo.png">
            <img src="http://via.placeholder.com/300x1500">
            <img src="http://via.placeholder.com/300x1000">
            <img src="http://via.placeholder.com/300x1000">
            <img src="http://via.placeholder.com/300x1000">
            <img src="http://via.placeholder.com/300x200">
        </div>
        <span class="btn">点击生成图片</span>
        <div class="img-box"></div>
    </div>
</template>
<script>
// 引入html2canvas插件
import html2canvas from 'html2canvas';
export default {
    mounted() {
        let self = this;
        let cloneObj = document.getElementsByClassName('pre')[0].cloneNode(true);
        document.body.appendChild(cloneObj);
            cloneObj.style.height = document.getElementsByClassName('pre')[0].getBoundingClientRect().height + 'px';
        setTimeout(() => {
            html2canvas(cloneObj, { // 需要保存为图片的元素
                onrendered: function(canvas) {
                    // self.saveImageInfo(canvas); // 将绘制的canvas转为图片
                    document.getElementsByClassName('img-box')[0].appendChild(canvas);
                },
                allowTaint: true,
                // height: document.getElementsByClassName('pre')[0].getBoundingClientRect().height
            });
            console.log(document.getElementsByClassName('pre')[0].getBoundingClientRect().height)
        }, 1000);
        // var targetDom = document.getElementsByClassName('pre')[0];    
        // html2canvas(targetDom, {    
        //     allowTaint: true,    
        //     taintTest: false,    
        //     onrendered : function(canvas) {    
        //     imgData = canvas.toDataURL(type);    
        //   }    
        // });    

    },
    methods: {
        saveImageInfo(mycanvas) { // 将canvas转化为图片数据，并自动保存
            var imgdata = mycanvas.toDataURL("image/png"); // canvas的原生方法，转化为image
            var saveFile = function(data, filename) {
                var link = document.createElement('a');
                link.href = data;
                link.download = filename;
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                link.dispatchEvent(event);
                var img = document.createElement('img');
                img.src = data;
                document.getElementsByClassName('img-box')[0].appendChild(img);
            }
            var filename = new Date().toLocaleDateString() + '.' + 'png';
            document.getElementsByClassName('btn')[0].onclick = function() {
                saveFile(imgdata, '图片');
            }
        }
    }
}
</script>
<style scoped>
.btn {
    width: 50px;
    height: 30px;
    margin: 0 auto;
    border-radius: 5px;
    background: pink;
}
</style>
