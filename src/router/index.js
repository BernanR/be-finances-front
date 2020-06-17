import Vue from 'vue'
import VueRouter from 'vue-router'

import { AUTH_TOKEN } from '@/plugins/apollo'
import AuthService from '@/modules/auth/services/auth-services'
import authRoutes from '@/modules/auth/router'
import dashboardRoutes from '@/modules/dashboard/router'

Vue.use(VueRouter)

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  { path: '', redirect: '/login' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  /* it check if route has required meta atribute */
  /* Here will also be changed loginRoute variable, case there are historic page that user tryed acess without login    */
  console.log(to)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const loginRoute = {
      path: '/login',
      query: { redirect: to.fullPath }
    }
    if (token) {
      try {
        await AuthService.user({ fetchPolicy: 'network-only' })
        return next()
      } catch (error) {
        console.log('Auto login Error:', error)
        return next(loginRoute)
      }
    }
    return next(loginRoute)
  }

  next()
})

export default router
