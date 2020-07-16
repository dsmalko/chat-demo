<template>
  <div class="sidebar">
    <Channels />
    <UsersOnline />
  </div>
</template>

<script>
  import Channels from './Channels'
  import UsersOnline from './UsersOnline'

  export default {
    components: {
      Channels,
      UsersOnline
    },
  }
</script>