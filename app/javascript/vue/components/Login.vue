<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6">
        <h1>Log in</h1>

        <div class="alert alert-danger" role="alert" v-if="errors.length" v-for="error in errors">
          {{error}}
        </div>
        
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="user_email">Email</label>
            <input
              type="email"
              class="form-control"
              id="user_email"
              v-model="user.email">
          </div>
          <div class="form-group">
            <label for="user_password">Password</label>
            <input
              type="password"
              class="form-control"
              id="user_password"
              v-model="user.password">
          </div>
          <button type="submit" class="btn btn-success">Log In</button>
          <router-link to="/signup" tag="button" class="btn btn-link">Signup</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        errors: []
      }
    },
    methods: {
      login() {
        this.errors = []

        this.$auth.login({
          data: this.user,
          rememberMe: true
        }).catch(error => {
          this.errors = error.response.data.errors
        })
      }
    }
  }
</script>
