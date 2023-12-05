import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartView from '../views/ChartView.vue'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
