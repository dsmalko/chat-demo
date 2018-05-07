<template>
  <div>
    <h2>Channels</h2>

    <router-link
      :to="'/channel/' + channel"
      class="channel"
      v-for="channel in channels"
      v-bind:class="{selected: (channel == currentChannel)}"
      >
      # {{channel}}
    </router-link>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        channels: 'allChannels',
        currentChannel: 'currentChannel',
      })
    },
  }
</script>