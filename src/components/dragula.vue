<template>
  <div class="examples" id="examples-3">
    <div class="parent">
      <label>Copy between containers</label>
      <div class="wrapper">
        <div class="container utils" v-dragula="copyOne" bag="third-bag">
          <div v-for="text in copyOne" :key="text">
              <span>{{text}}</span>
              <div class="content">{{'我是' + text + '的内容'}}</div>
          </div>
        </div>
        <div class="container gallery" v-dragula="copyTwo" bag="third-bag">
          <div v-for="text in copyTwo" :key="text">
              <div class="content">{{'我是' + text + '的内容'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入vue的拖拽插件
import VueDragula from 'vue-dragula'
import Vue from 'vue'
Vue.use(VueDragula);

export default {
  data() {
      return {
        copyOne: [
            '组件一',
            '组件二',
            '组件三',
            '组件四'
        ],
        copyTwo: [
            '组件五'
        ]
      }
  },
  created() {
        // 配置vueDragula
        Vue.vueDragula.options('third-bag', {
            direction: 'vertical',
            copy(el, source) {
                return !!source.className.match('utils');
            },
            accepts(el, target) {
                return !!target.className.match('gallery');
            }
        })
        // 拖拽完成事件
        Vue.vueDragula.eventBus.$on('drop', (el)=> {
            var els = el[1].childNodes;
            for (var i = 0; i < els.length; i++) {
                if(els[i].nodeName === 'SPAN') {
                    els[i].parentNode.removeChild(els[i]);
                    break;
                }
                
            }
        })
  }
}
</script>
<style scoped>
/* dragula-specific example page styles */
.wrapper {
  display: table;
}
.container {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}
.container:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.2);
}
.gallery span {
    display: none;
}
.utils .content {
    display: none;
}
.gu-mirror .content {
    display: none;
}
.container div {
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  margin-bottom: 10px;
}
.container div:last-child {
  margin-bottom: 0;
}
/*
 * 拖拽时的mirror样式
 */
.container div,
.gu-mirror {
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s ease-in-out;
}
.gu-mirror {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}
.gu-hide {
  display: none !important;
}
.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
.gu-transit {
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}
</style>


