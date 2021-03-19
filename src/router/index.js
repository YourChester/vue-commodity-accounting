import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import Home from '../views/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    console.log(store);
    const userInfo = store.getters['user/userInfo']
    
    if (to.name === 'auth' && userInfo) {
      next('/');
    } else if (to.name !== 'auth' && !userInfo) {
      next('/auth');
    } else {
      next();
    }
  } catch (e) {
    next();
  }
});

export default router
