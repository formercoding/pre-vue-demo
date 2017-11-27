<template>
    <draggable v-model="myArray" :options="option" @start="drag=true" @end="end" class="drag">
        <div v-for="(element, key, index) in myArray" :key="element.name">
            <div class="text">{{element.name}}</div>
            <local-drag :items="element.children">
            </local-drag>
        </div>
    </draggable>
</template>
<script>
// console.log('close', window.onunload);
import localDrag from './localDrag'
import draggable from 'vuedraggable'
export default {
  data() {
    return {
        myArray: [{
                    name: 'outer1',
                    children: [
                        {
                            name: 'part1 inner1'
                        }, {
                            name: 'part1 inner2'
                        }
                    ]
                }, {
                    name: 'outer2',
                    children: [
                        {
                            name: 'part2 inner1'
                        }, {
                            name: 'part2 inner2'
                        }
                    ]
                }, {
                    name: 'outer3',
                    children: [
                        {
                            name: 'part3 inner1'
                        }, {
                            name: 'part3 inner2'
                        }
                    ]
                }
        ],
        option: {
            group: 'people',
            chosenClass: 'chose',
            ghostClass: 'place',
            pull: false,
            put: false,
            revertClone: false
        }
    }
  },
  created() {
        window.addEventListener("beforeunload", function( event ) {
  event.returnValue = "\o/";
});

  },
  methods: {
    end() {
        console.log(this.myArray);
    }
  },
  components: {
      draggable,
      localDrag
  }
}
</script>
<style lang="less">
    .drag {
       > div {
           display: inline-block;
           width: 80%;
           > .text {
             line-height: 60px;
             background: palevioletred;
           }
           div {
               min-height: 20px;
               .text {
                   line-height: 50px;
                   background: peachpuff;
               }
           }
       }
    }
</style>

