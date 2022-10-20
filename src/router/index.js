import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ '../views/auths/Login.vue')  
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "about" */ '../views/auths/Register.vue')
  },
  {
    path: "/unit",
    name: "Unit",
    component: () => import(/* webpackChunkName: "about" */ '../views/units/UnitView.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
