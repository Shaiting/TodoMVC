<template>
  <div>
    <section class="todoapp">
      <todo-header @addTodosList="handleAddTodo"></todo-header>
      <section class="main">
        <!--计算属性toggleAllStat set 和method方法handleToggleAllChange 实现全选全不选-->
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="toggleAllStat" @change="handleToggleAllChange" >
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <li class="completed"  v-for="(item,index) in filterTodos" :key="item.id" :class="{editing:currentEditing === item,completed: item.completed,}">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" >
              <!--双击触发的事件dblclick，双击添加编辑样式-->
              <label @dblclick="handleGetEditingDblclick(item)">{{item.title}}</label>
              <button class="destroy" @click="handleRemoveTodoClick(index,$event)"></button>
            </div>
            <input class="edit" :value="item.title" 
            @keydown.enter="handleSaveEditKeydown(item,index,$event)"
            @blur="handleSaveEditKeydown(item,index,$event)"
            @keydown.esc="handleCancelEditEsc"
            v-todo-focus="currentEditing === item" >
            <!--v-todo-focus 自定义指令 用于获取焦点-->
          </li>
        </ul>
      </section>
      <todo-footer :todos='todos' :filterText='filterText' @changeFilterText="changeFilter"></todo-footer>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
import TodoHeader from './TodoHeader' 
import TodoFooter from './TodoFooter' 
import AppFooter from './AppFooter' 

export default {
  name: 'TodoMVC',  
  data () {
    return {
      todos:JSON.parse(window.localStorage.getItem('todos') || '[]'),
      filterText : 'all',
      currentEditing : null
    }
  },
  // 计算属性是一种带有行为的属性，它相比方法的优势就在于会缓存计算的结果
  // 计算属性只能当做属性来使用，不能用于事件处理函数
  // 简写方式，一个函数，作为get方法
  computed : {
    toggleAllStat:{
      get(){
        // 计算属性知道它依赖了todos
				// 当todos发生变化，计算属性会重新计算
        return this.todos.every(t => t.completed)
      },
      set(){
        // 表单控件 checkbox 双向绑定了toggleAllStat
        // 所以checkbox 的变化会调用set方法
        // 在set方法中我们要做的就是
          // 1.得到当前checkbox的选中状态
          // 2.把所有任务项的选中状态都设置为toggle-all的选中状态
        const checked = !this.toggleAllStat
        this.todos.forEach(item=>{
          item.completed = checked
        })
      }
    },
    filterTodos(){
      switch(this.filterText){
        case 'active' :
          return this.todos.filter(t => !t.completed)
          break
        case 'completed':
          return  this.todos.filter(t => t.completed)
        default:
          return this.todos
          break
      }
    } 
  },
  watch:{
    // 当监视到todos改变的时候会自动调用handler方法
    // 你监视的谁，val就是谁  val 变化之后的最新值   oldVal 是变化之前的值
    todos:{
      handler(val,oldVal){
        //监视到todos变化，把todos本次存储记录数据的状态
        // window.localStorage.setItem('todos',JSON.stringify(this.todos))
        // 这里既可以通过this.todos来访问，也可以通过val来得到最新的todos
        window.localStorage.setItem('todos',JSON.stringify(val))
      },
      // 引用类型只能监视一层，无法监视内部成员的子成员的改变
      // 深度监视，只有这样才能监视到数组或者对象的子成员的改变
      deep:true
    }
  },
  methods : {
    //按下enter键添加
    handleAddTodo(addText){
      // 0.注册按下的回车事件
      // 1.获取文本框的内容
      // 2.数据校验
      // 3.添加到todos列表
      // 4.清空文本框
      let value = addText
      let valueText = value.trim()
      if(!valueText.length){
        return
      }
      let todos = this.todos
      todos.push({
        //如果数组是空的就给1，否则就是最后一个元素的id+1	
        id:todos.length ? todos[todos.length - 1].id + 1 : 1,
        title:valueText,
        completed:false
      })
    },
    // 全选和全不选
    handleToggleAllChange(e){
      // 0.获取 checkbox 的change 事件
      // 1.获取 checkbox 的选中的状态
      // 2.直接循环所有的子任务项的选中状态设置为toggleAll的状态
      const checked = e.target.checked
      this.todos.forEach(item=>{
        item.completed = checked
      })
    },
    // 双击添加编辑样式
    handleGetEditingDblclick(todo){
      this.currentEditing = todo
    },
    //编辑任务，敲回车或失去焦点保存编辑
    handleSaveEditKeydown(todo,index,e){
				//1.获取编辑文本框的数据
				var target = e.target
				var value = target.value.trim()
        
        //2.数据校验
				// 如果数据被编辑是空的，则直接删除该元素   否则保存编辑
				if (!value.length) {
					this.todos.splice(index,1)
				} else{
					todo.title = value
					this.currentEditing = null
				}
    },
    // 按esc键取消编辑
    handleCancelEditEsc(){
      this.currentEditing = null
    },
    // 删除
    handleRemoveTodoClick(index,e){
      this.todos.splice(index,1)
    },
    // 点击切换触发的事件
    changeFilter(text){
      this.filterText = text
    },
  },
  components:{
    TodoHeader,
    TodoFooter,
    AppFooter
  }
}
</script>

