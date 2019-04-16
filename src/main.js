import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.api_token) {
      next()
    } else {
      next({name: 'home'})
    }
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
