// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/index.css"

Vue.config.productionTip = false

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  //指令的钩子函数 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) { //指令钩子函数参数 el：指令所绑定的元素 
    // 聚焦元素
    el.focus()
  }
})
// 注册一个全局自定义指令 `v-todo-focus`
Vue.directive('todo-focus', {
  // 所在组件的 VNode 更新时调用
  update(el, binding) { //binding：一个对象
    if (binding.value) {  //value：指令的绑定值
      el.focus()
    }
  }
})

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})


