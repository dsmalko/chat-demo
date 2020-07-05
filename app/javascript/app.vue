<template>
  <div id="app">
    <router-view v-if="$auth.ready()"></router-view>
  </div>
</template>

<script>
  export default {}
</script>