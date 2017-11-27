<template>
  <div id="app">
    <!-- 直接引入custom-cropper组件 组件中包括了上传图片，操作图片及图片预览 -->
    <Custom-Cropper></Custom-Cropper>
  </div>
</template>

<script>
  import CustomCropper from './CustomCropper';
  export default {
    components: {
      CustomCropper
    }
  };
</script>
