import Vue from 'vue'
import Router from 'vue-router'
import Timetable from './views/Timetable.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'timetable',
      component: Timetable
    }
  ]
})
