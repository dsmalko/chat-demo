const state = {
  online: []
}

const getters = {
  usersOnline: state => state.online
}

const actions = {
  setUsersOnline({commit}, users) {
    commit('setUsersOnline', users)
  }
}

const mutations = {
  setUsersOnline(state, users) {
    state.online = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}