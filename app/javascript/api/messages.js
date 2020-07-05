import axios from 'axios'

export default {
  getAll() {
    return axios.get('/messages.json')
      .then((response) => {
        return Promise.resolve(response.data)
      })
  },
  send(item) {
    return axios.post('/messages.json', {
      message: item,
    })
  },
}
