<template lang="pug">
.page-member
  p メンバー一覧

  .memberlist(v-if="pageData")
    p _______________________________
    ul
      li(v-for="(item, index) in pageData.custom.name")
        p.name {{item}}
        p.description {{pageData.custom.description[index]}}
        p ____________
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
        .get("wp/v2/pages", {
          params: { slug: "member" }
        })
        .then(res => {
          this.pageData = res.data[0];
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
</style>

