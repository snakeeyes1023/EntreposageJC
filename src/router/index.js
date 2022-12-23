import { createRouter, createWebHashHistory } from 'vue-router'
import AuthDataService from '@/services/AuthDataService';

/**
 * Liste des routes de l'application
 */
const routes = [
  {
    public: true,
    path: '/',
    name: 'home',
    component: () => import('../views/units/UnitView.vue')
  },
  {
    public: true,
    path: "/auth/login",
    name: "Login",
    component: () => import('../views/auths/Login.vue')
  },
  {
    public: true,
    path: "/auth/register",
    name: "Register",
    component: () => import('../views/auths/Register.vue')
  },
  {
    public: true,
    path: "/unit",
    name: "Unit",
    component: () => import('../views/units/UnitView.vue')
  },
  {
    public: false,
    path: "/stat",
    name: "Stat",
    component: () => import('../views/stats/StatView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * Vérifie si l'utilisateur a accès à la page demandé en fonction de s'il est connecté ou non
 * 
 * @param {*} to 
 * @returns 
 */
let hasAccess = (to) => {
  const publicPages = routes.filter(route => route != undefined && route.public).map(route => route.path);
  //check if auth required base on code under but juste contain the path and not the lang
  const authRequired = !publicPages.includes(to.path);

  return !(authRequired && !AuthDataService.isLogged());
}

/**
 * Avant chaque changement de route on vérifie si l'utilisateur est connecté et si la langue est correcte
 */
router.beforeEach((to, from, next) => {

  if (!hasAccess(to)) {
    console.log('no access');
    return next('auth/login?returnUrl=' + to.path);
  }

  return next();
});

router.afterEach((to) => {
  if (to.query.lang == undefined) {

    let lang = localStorage.getItem('lang');

    if (lang == undefined || lang == "undefined") {
      lang = 'fr';
      localStorage.setItem('lang', lang);
    }

    router.push({ path: to.path, query: { lang: lang } });
  }
});




export default router
