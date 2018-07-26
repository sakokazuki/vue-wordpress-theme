<template lang="pug">
.page-news-single
  p ニュース記事
  p _______________________________
  div(v-if="pageData")
    p.title {{pageData.title.rendered}}
    p -----
    p(v-html="pageData.content.rendered")
</template>

<script>


export default {
  props:{},
  components: {},
  computed: {},
  methods: {},
  created () {
    const routerId = this.$route.params.id;

    if(!this.pageData){
      this.$http.get('wp/v2/news',{
        params: {slug: routerId}
      }).then((res)=>{
        this.pageData = res.data[0];
　    })
    }
  },
  mounted () {},
  data () {
    return {
      pageData: null
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>

