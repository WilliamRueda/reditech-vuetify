import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import nav from '../views/nav.vue'
import formulario from '../views/fomulario.vue'
import eliminar from '../views/eliminar.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/eliminar',
    name: 'eliminar',
    component: eliminar
  },
  {
    path: '/nav',
    name: 'nav',
    component: nav
  },
  {
    path: '/formulario',
    name: 'formulario',
    component: formulario
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
