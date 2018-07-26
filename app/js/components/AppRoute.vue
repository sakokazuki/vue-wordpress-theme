<template lang="pug">
#app
  p Hello, World
  p ===========================
  .glonavi
    router-link(to="/news") news >
    router-link(to="/member") member >
    router-link(to="/") home >
  p ===========================

  router-view
</template>

<script>


export default {
  props:{},
  components: {},
  computed: {
  },
  methods: {
    url: function(path){
      return this.base_url+path;

    }
  },
  created () {},
  mounted () {
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="stylus" scoped>
a
  display block
</style>

