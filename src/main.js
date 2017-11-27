// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'Vue-Router'
import Hello from './components/Hello'
import Drag from './components/drag'
import vueCropper from './components/vueCropper'
import clip from './components/clip'
import nest from './components/nest'
import jianshu from './components/jianshu'
import saveImg from './components/saveImg'
import CustomCropper from './components/CustomCropper'
import dragula from './components/dragula'
import axios from 'axios'

Vue.prototype.$http = axios

import 'jquery-ui';


Vue.config.productionTip = false

Vue.use(VueRouter);

console.log(Vue.version);

let test = new Vue({
    data: {
        name: 'luo',
        age: 13
    }
})

console.log(test.name);
console.log(test.$data.age);

Vue.config.silent = false;

Vue.config.devtools = true;

Vue.config.warnHandler =  (err, vm, info) => {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    console.log(err);
    console.log(vm);
    console.log(info);
    console.log('error');
}

Vue.component('test', Vue.extend({
    template: '<h1>{{name}}</h1>',
    props: {
        name: {
            type: String,
            required: false,
            validator(value) {
                return value === 'luo'
            }
        }
    }
}));
// 定义路由
const routes = [
    { path: '/', component: Hello },
    { path: '/drag', component: Drag },
    { path: '/crop', component: vueCropper },
    { path: '/clip', component: clip },
    { path: '/nest', component: nest },
    { path: '/jianshu', component: jianshu },
    { path: '/saveImg', component: saveImg },
    { path: '/CustomCropper', component: CustomCropper },
    { path: '/dragula', component: dragula }
]

const router = new VueRouter({
    routes
})
/* eslint-disable no-new */
const app = new Vue({
    router,
    template: '<App/>',
    components: { App }
}).$mount('#app');

