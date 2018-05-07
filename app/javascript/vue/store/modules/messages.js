import messagesApi from 'api/messages'
import moment from 'moment'

const state = {
  all: []
}

const getters = {
  allMessages: state => state.all,
  groupedMessages: state => {
    state.all
  },
  messagesByChannel: (state) => (channel) => {
    return state.all.filter((message) => message.channel == channel)
  }
}

const actions = {
  loadMessages({commit}) {
    return messagesApi.getAll()
      .then((messages) => {
        commit('setMessages', messages)
      })
  },
  sendMessage({commit}, message) {
    message.created_at = moment().format()

    return messagesApi.send(message)
      .then(() => {
        commit('addMessage', message)
      })
  },
  addMessage({commit}, message) {
    commit('addMessage', message)
  },
}

const mutations = {
  setMessages (state, messages) {
    state.all = messages
  },
  addMessage(state, message) {
    state.all.push({
      ...message,
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}