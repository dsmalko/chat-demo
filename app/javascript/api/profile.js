import axios from 'axios'

export default {
  update(user) {
    const formData = new FormData();
    formData.set("user[nickname]", user.nickname)

    if (user.avatarFile) {
      formData.set("user[avatar]", user.avatarFile)
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    return axios.put('/profile.json', formData, config)
      .then((response) => {
        return Promise.resolve(response.data)
      })
  }
}