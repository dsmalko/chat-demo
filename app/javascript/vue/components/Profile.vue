<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-6">
        <h1>Edit Your Profile</h1>
        
        <div class="alert alert-danger" role="alert" v-if="errors.length" v-for="error in errors">
          {{error}}
        </div>

        <form action='#' @submit.prevent="save">
          <div class="form-group">
            <label for="user_nickname">Nickname</label>
            <input type="text" class="form-control" id="user_nickname" v-model="user.nickname">
          </div>
          <div class="form-group">
            <label for="user_avatar">Avatar</label>

            <div class="profile-avatar">
              <img :src="user.avatar_medium_url" alt="My Avatar">
            </div>
            <input type="file" class="form-control" id="user_avatar" @change="handleAvatarFileChange">
          </div>
          <button type="submit" class="btn btn-success">Save Changes</button>
          <router-link to="/" tag="button" class="btn btn-light">Cancel</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {...this.$auth.user()},
        errors: []
      }
    },
    methods: {
      save() {
        this.$store.dispatch('updateProfile', {user: this.user, auth: this.$auth})
          .then(() => {
            this.$router.push('/')
          })
          .catch(errors => {
            this.errors = errors
          })
      },
      handleAvatarFileChange(e) {
        this.user.avatarFile = e.target.files[0]
      }
    }
  }
</script>