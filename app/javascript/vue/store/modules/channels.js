const state = {
  all: ['general', 'support'],
  current: 'general'
}

const getters = {
  allChannels: state => state.all,
  currentChannel: state => state.current
}

const actions = {
  setCurrentChannel({commit}, channel) {
    commit('setCurrentChannel', channel)
  }
}

const mutations = {
  setCurrentChannel(state, channel) {
    state.current = channel
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}