<template>
    <div>
        <div>
            我是子组件
        </div>
        <slot name="branch2">{{validate}}</slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            validate: '子组件数据'
        }
    }
}
</script>

<style>

</style>
