<template>
    <div>
        我是父组件
        <slotc>
            <p slot="branch2">{{validate}}</p>
        </slotc>
    </div>
</template>

<script>
import slotc from './slotC'
export default {
    data() {
        return {
            validate: '父组件数据'
        }
    },

    components: {
        slotc
    }
}
</script>

<style lang="less">

</style>

