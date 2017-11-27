<template>
    <draggable :options="option" @start="drag=true" @end="end" @choose="chose">
        <div v-for="(element, key, index) in items" :key="element.name">
            <div class="text">{{element.name}}</div>
        </div>
    </draggable>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  props: {
    items: {
        type: Array,
        default: []
    }
  },
  data() {
      return {
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
  computed: {
    scopeItem() {
        return this.items;
    }
  },
  methods: {
      end(evt) {
          console.log(this.items);
      },
      chose(evt) {
          console.log(evt);
      }
  },
  components: {
      draggable,
  },
}
</script>
<style lang="less">
</style>


