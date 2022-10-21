import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    public : true,
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    public : true,
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    public : true,
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ '../views/auths/Login.vue')  
  },
  {
    public : true,
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "about" */ '../views/auths/Register.vue')
  },
  {
    public : false,
    path: "/unit",
    name: "Unit",
    component: () => import(/* webpackChunkName: "about" */ '../views/units/UnitView.vue')
  },

]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {

  const publicPages = routes.filter(route => route.public).map(route => route.path);
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
