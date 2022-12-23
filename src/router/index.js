import { createRouter, createWebHashHistory } from 'vue-router'
import AuthDataService from '@/services/AuthDataService';

const defaultLocale = process.env.VUE_APP_I18N_LOCALE || 'en';

/**
 * Liste des routes de l'application
 */
const routes = [

  {
    path: `/:lang(fr|en)`,
    children: [
      {
        public: true,
        path: '',
        name: 'home',
        component: () => import('../views/units/UnitView.vue')
      },
      {
        public: true,
        path: "auth/login",
        name: "Login",
        component: () => import('../views/auths/Login.vue')
      },
      {
        public: true,
        path: "auth/register",
        name: "Register",
        component: () => import('../views/auths/Register.vue')
      },
      {
        public: true,
        path: "unit",
        name: "Unit",
        component: () => import('../views/units/UnitView.vue')
      },
      {
        public: false,
        path: "stat",
        name: "Stat",
        component: () => import('../views/stats/StatView.vue')
      }
    ]
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
  const publicPages = routes.flatMap(route => route.children).filter(route => route != undefined && route.public).map(route => route.path);

  //check if auth required base on code under but juste contain the path and not the lang
  const authRequired = !publicPages.includes(to.path.replace(`/${to.params.lang}`, '').replace('/', ''));

  return !(authRequired && !AuthDataService.isLogged());
}


/**
 * Enregistre la langue dans le local storage et dans l'objet i18n
 * 
 * @param {*} to | destination 
 */
let setLang = (to) => {
  console.log(to.params.lang + to)

  let hasNewLang = to.params.lang != localStorage.getItem('lang');

  //if no lang in local storage set current lang
  if (hasNewLang) {
    localStorage.setItem('lang', to.params.lang);


  }

}

/**
 * Avant chaque changement de route on vérifie si l'utilisateur est connecté et si la langue est correcte
 */
router.beforeEach((to, from, next) => {

  if (!to.params.lang) {
    return next(`/${defaultLocale}${to.path}`);
  }


  if (!hasAccess(to)) {
    return next('auth/login?returnUrl=' + to.path);
  }

  setLang(to);

  return next();
});




export default router
