<template>
    <div id="app">
        <!-- <iscrollbar></iscrollbar> -->
        <!-- <saveimg></saveimg> -->
        {{test}}{{arr[0]}}{{arr[1]}}{{arr[4]}}
        <test name="luo"></test>
    </div>
</template>

<script>
import iscrollbar from './components/iscrollbar';
import saveimg from './components/saveImg';
import Vue from 'vue'
export default {
    name: 'app',
    
    data() {
        return {
            test: 'luow',
            obj: {
                age: 10,
            },
            arr: [0, 1],
            age: 23
        }
    },

    computed: {
        myage: {
            get() {
                return this.age + 1;
            },

            set() {
                this.age = 5;
            }
        }
    },

    created() {
        this.test = 'jun';

        Vue.nextTick(() => {
            console.log('ff');
        });

        // Vue.delete(this.arr, 0);
        this.arr[4] = 6;

        console.log('-----------');
        console.log(this.age);
        this.myage = 5;
        console.log(this.age);
        console.log(this.myage);
    },

    components: {
        iscrollbar,
        saveimg
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
