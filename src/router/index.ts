import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartView from '../views/ChartView.vue'
import DatePickerView from '../views/DatePickerView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/chart',
    name: 'chart',
    component: ChartView
  },
  {
    path: '/date-picker',
    name: 'date-picker',
    component: DatePickerView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
