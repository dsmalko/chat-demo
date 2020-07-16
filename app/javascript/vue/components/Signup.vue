<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6">
        <h1>Signup</h1>

        <div class="alert alert-danger" role="alert" v-if="errors.length" v-for="error in errors">
          {{error}}
        </div>

        <form @submit.prevent="signup">
          <div class="form-group">
            <label for="user_email">Email</label>
            <input type="email" class="form-control" id="user_email" autocomplete="login" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="user_nickname">Nickname</label>
            <input type="nickname" class="form-control" id="user_nickname" autocomplete="off" v-model="user.nickname">
          </div>
          <div class="form-group">
            <label for="user_password">Password</label>
            <input type="password" class="form-control" id="user_password" autocomplete="new-password" v-model="user.password">
          </div>
          <button type="submit" class="btn btn-success">Signup</button>
          <router-link to="/login" tag="button" class="btn btn-link">Login</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        user: {
          email: '',
          password: '',
          nickname: ''
        },
        errors: []
      }
    },
    methods: {
      signup() {
        this.errors = []
        
        axios.post('/auth.json', {
          ...this.user,
          confirm_success_url: '/'
        }).then((response) => {
          this.$auth.login({
            data: this.user,
            rememberMe: true
          })
        }).catch(error => {
          this.errors = error.response.data.errors.full_messages
        })
      }
    }
  }
</script>
