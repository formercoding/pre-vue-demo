<template>
  <div class="root">
    <button @click="addNode">Add Node</button>
    <!-- 使用vue-tree-list组件 -->
    <vue-tree-list class="tree" :model="data" default-tree-node-name="new node" default-leaf-node-name="new leaf"></vue-tree-list>
    <button @click="getNewTree">Get new tree</button>
    <pre>{{newTree}}</pre>
  </div>
</template>
<script>
// 引入npm安装的组件
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'
export default {
    components: {
      VueTreeList
    },
    data () {
      return {
        newTree: {},
        data: new Tree([ // 渲染节点的数据结构
          {
            name: 'Node 1',
            children: [
              {
                name: 'Node 1-2',
              }
            ]
          },
          {
            name: 'Node 2',
          },
          {
            name: 'Node 3',
          }
        ])
      }
    },
    methods: {
      // 增加节点按钮函数
      addNode: function () {
        var node = new TreeNode('new node', false)
        if (!this.data.children) this.data.children = []
        this.data.addChildren(node)
      },
      // 遍历节点数据
      getNewTree: function () {
        const vm = this
        function _dfs (oldNode) {
          let newNode = {}
 
          newNode.name = oldNode.name
 
          if (oldNode.children && oldNode.children.length > 0) {
            newNode.children = []
            for (let i = 0, len = oldNode.children.length; i < len; i++) {
              newNode.children.push(_dfs(oldNode.children[i]))
            }
          }
          return newNode
        }
        vm.newTree = _dfs(vm.data)
      }
    }
}
</script>
<style lang="less">
    .root {
      .tree {
        width: 50%;
        .tree-node {
          justify-content: space-between;
          width: 100%;
          margin: 5px 0 0 0;
          border: 2px dashed #0ab;
          .operation {
            display: block !important;
          }
          .item-icon {
            display: none;
            width: 0;
            flex: 0;
          }
          .icon-plus {
            display: none;
          }
        }
        .border {
          height: 10px;
          &.active {
            height: 50px;
            border-bottom: 3px dashed #f0f0f0;
          }
        }
        .tree-margin {
          > div {
            margin: 5px 0;
            .icon-folder-plus-e {
              display: none;
            }
          }
        } 
      }
    }
</style>

