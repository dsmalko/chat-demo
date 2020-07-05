import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from './components/Signup'
import Login from './components/Login'
import Chat from './components/Chat'
import Profile from './components/Profile'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Chat,
      meta: { auth: true },
    },
    {
      path: '/channel/:channelId',
      component: Chat,
      meta: { auth: true },
    },
    {
      path: '/profile',
      component: Profile,
      meta: { auth: true },
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/login',
      component: Login,
    },
  ],
})
