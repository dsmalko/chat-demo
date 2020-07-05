import profileApi from 'api/profile'

const state = {
}

const getters = {
}

const actions = {
  updateProfile(_, { user, auth }) {
    return profileApi.update(user)
        .then((updatedUser) => {
          auth.user(updatedUser)
        })
        .catch((error) => {
          return Promise.reject(error.response.data.errors)
        })
  },
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations,
}
