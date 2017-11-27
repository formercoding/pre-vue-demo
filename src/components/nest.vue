<template>
    <div class="nest">
        <ol class="sortable">
            <li v-for="(item, index) in data" :key="index" :data-id="item.name">
               <div class="name">
                    <span class="switch" @click="collapse(item)">{{item.showChild ? '折叠': '展开'}}</span>
                    <input v-model="item.name" :disabled="!item.isEdit"  @blur="changeEdit(item)">
                    <span class="add" @click="addItems(item)">加</span>
                    <span class="rename" @click="changeEdit">{{item.isEdit ? '修改': '完成'}}</span>
                    <span class="del" @click="delItem(index, data)">删除</span>
                </div>
                <ol v-if="item.children" v-show="item.showChild">
                    <li v-for="(iitem, iindex) in item.children" :key="iindex" :data-id="iitem.name">
                        <div class="name">
                            <span class="switch" @click="collapse(iitem)">{{iitem.showChild ? '折叠': '展开'}}</span>
                            <input v-model="iitem.name" :disabled="!iitem.isEdit"  @blur="changeEdit(iitem)">
                            <span class="add" @click="addItems(iitem)">加</span>
                            <span class="rename" @click="changeEdit">{{iitem.isEdit ? '完成': '修改'}}</span>
                            <span class="del" @click="delItem(iindex, item)">删除</span>
                        </div>
                    </li>
                </ol>
            </li>
        </ol>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [
                {
                    name: '水果',
                    showChild: true,
                    isEdit: false,
                    autofocus: false,
                    root: 1,
                    children: [
                        {
                            name: '苹果',
                            showChild: true,
                            isEdit: false
                        }, {
                            name: '葡萄',
                            showChild: true,
                            isEdit: false
                        }
                    ]
                }, {
                    name: '饮品',
                    showChild: true,
                    autofocus: false,
                    root: 1,
                    children: [
                        {
                            name: '奶茶',
                            isEdit: false,
                            autofocus: false,
                            showChild: true,
                        }, {
                            name: '咖啡',
                            isEdit: false,
                            autofocus: false,
                            showChild: true,
                        }
                    ]
                }, {
                    name: '干果',
                    isEdit: true,
                    autofocus: true,
                    showChild: true,
                    root: 1,
                }
            ]
        }
    },
    methods: {
        saveData($eles, arr, root) {
            for(var i = 0, len = $eles.length; i < len; i++) {
                var $el = $($eles[i]);
                arr[i] = {};
                arr[i].name = $el.data('id');
                arr[i].showChild = true;
                arr[i].isEdit = false;
                arr[i].autofocus = false;
                arr[i].showChild = true;
                arr[i].root = root || 1;
                if($el.children('ol').children('li').length) {
                    arr[i].children = [];
                    this.saveData($el.children('ol').children('li'), arr[i].children, 2);
                }
            }
        },
        collapse(item) {
            item.showChild = !item.showChild;
        },
        addItems(item) {
            if(item.root == 2) {
                return false;
            }
            if(item.children) {
                item.showChild = true;
                item.children.push({
                    name: '',
                    showChild: true,
                    isEdit: true,
                });
            } else {
                item.showChild = true;
                this.$set(item, 'children', [{
                    name: '',
                    showChild: true,
                    isEdit: false
                }]);
            }
        },
        changeEdit(item) {
            item.isEdit = !item.isEdit;
        },
        delItem(index, item) {
            if(Array.isArray(item)) {
                item.splice(index, 1);
            } else {
                item.children.splice(index, 1);
            }
        }
    },
    mounted() {
        let self = this;
        $('.sortable').nestedSortable({
			handle: 'div',
			items: 'li',
            toleranceElement: '> div',
            maxLevels: 2,
            opacity: .6,
            relocate: () => {
                console.log('relocate')
                self.data = [];
                self.saveData($('.sortable > li'), self.data);
			}
        });
    }
}
</script>
<style lang="less">
    .nest {
        width: 500px;
        padding: 0;
        .sortable {
            text-align: left;
            padding: 0;
            ol {
                padding: 0;
            }
            > li {
                width: 400px;
                line-height: 50px;
                list-style: none;
                > .name {
                    margin: 5px 0;
                    padding: 0 10px;
                    color: #fff;
                    background: #0ab;
                    border-radius: 5px;
                    display: inline-block;
                    width: 380px;
                    line-height: 30px;
                    input {
                        width: 100px;
                        height: 50px;
                        padding: 0;
                        font-size: 16px;
                        color: #fff;
                        text-align: center;
                        background: none;
                        border: none;
                        outline: none;
                    }
                }
                &.ui-sortable-placeholder {
                    visibility: visible !important;
                    width: 400px;
                    background: #0ab;
                    border-radius: 5px;
                    opacity: .8;
                }
                > ol {
                    padding: 0;
                    > li {
                        width: 380px;
                        line-height: 50px;
                        list-style: none;
                        > .name {
                            margin: 5px 0 5px 20px;
                            padding: 0 10px;
                            color: #fff;
                            background: #0ab;
                            border-radius: 5px;
                            display: inline-block;
                            width: 360px;
                            line-height: 30px;
                            input {
                                width: 100px;
                                height: 50px;
                                padding: 0;
                                font-size: 16px;
                                color: #fff;
                                text-align: center;
                                background: none;
                                border: none;
                                outline: none;
                            }
                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                        &.ui-sortable-placeholder {
                            visibility: visible !important;
                            width: 380px;
                            margin: 5px 0 5px 20px;
                            background: #0ab;
                            border-radius: 5px;
                            opacity: .8;
                        }
                    }
                }
            }
        }
        
    }
</style>
