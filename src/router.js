import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details/:beer_name',
      name: 'details',
      component: () =>
        import('./views/Details.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () =>
        import('./views/Checkout.vue')
    }
  ]
})
