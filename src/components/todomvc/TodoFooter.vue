<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>{{remaningCount}}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li @click="tabClick('all')">
        <a :class="{selected: filterText === 'all'}" href="#/all">All</a>
      </li>
      <li @click="tabClick('active')">
        <a :class="{selected: filterText === 'active'}" href="#/active">Active</a>
      </li>
      <li @click="tabClick('completed')">
        <a :class="{selected: filterText === 'completed'}" href="#/completed">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" v-if="todos.some(item => item.completed)" 	@click="handleClearAllDoneClick">Clear completed</button>
  </footer>
</template>

<script>
export default {
  props: ['todos','filterText'],
  computed : {
    remaningCount:{
      //当你访问remaningCount会自动调用 get 方法·
      get(){
        return this.todos.filter(t => !t.completed).length
      }
    },
  },
  methods : {
    // 点击切换触发的事件
    tabClick(value) {
      this.$emit('changeFilterText',value)
    },
     //清除所有已完成的
    handleClearAllDoneClick(){
      // 手动控制遍历索引的方式
      for(let i=0; i<this.todos.length;i++){
        if(this.todos[i].completed){
          this.todos.splice(i,1)
          // 删除元素之后，让我们遍历的这个索引倒退一次，
          // 因为你删除之后，后面的所有元素的索引都会倒退一次
          // 纠正索引的遍历
          i--
        }
      }

      // 另一种方法
      //把需要的结果给过滤出来重新赋值到todos中
      // this.todos = this.todos.filter(t => !t.completed)
    },
  }
}
</script>
