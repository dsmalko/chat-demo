<template>
  <div>
    <h2>People</h2>

    <div class="user" v-for="user in usersOnline">
      {{user.nickname}}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        usersOnline: 'usersOnline'
      })
    },
  }
</script>