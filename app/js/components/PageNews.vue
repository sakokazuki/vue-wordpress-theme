<template lang="pug">
.page-news
  p ニュース一覧
  p _______________________________
  ul(v-if="pageData")
    li(v-for="(item, index) in pageData")
      router-link.title(:to="`/news/${item.slug}`") {{item.title.rendered}}
      p -----
      p(v-html="item.content.rendered")


</template>

<script>
export default {
  props: {},
  components: {},
  computed: {},
  methods: {},
  created() {
    if (!this.pageData) {
      this.$http
        .get("wp/v2/news", {
          params: { per_page: 5 }
        })
        .then(res => {
          this.pageData = res.data;
        });
    }
  },
  mounted() {},
  data() {
    return {
      pageData: null
    };
  }
};
</script>

<style lang="stylus" scoped>
a {
  color: blue;
}
</style>

