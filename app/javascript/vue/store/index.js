import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import channels from './modules/channels'
import users from './modules/users'
import profile from './modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages,
    channels,
    users,
    profile,
  },
})