<template lang="pug">
div#app
  div#menu
  router-view
</template>

<script lang="coffee">
export default {
  name: 'app'
}
</script>

<style lang="stylus">
body
  margin: 0;
  padding: 0;
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
</style>
