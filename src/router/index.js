import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoMVC from '@/components/todomvc/TodoMVC'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/todomvc',
      name: 'TodoMVC',
      component: TodoMVC
    },
    {
      path: '/all',
      name: 'all',
      component: TodoMVC
    },
    {
      path: '/active',
      name: 'active',
      component: TodoMVC
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodoMVC
    },
  ]
})
