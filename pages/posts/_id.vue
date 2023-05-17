<template>
  <div class="p-7">
    <section v-html="pageContent"></section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    postId() {
      return this.$route.params.id;
    },
  },
  async mounted() {
    const postId = this.$route.params.id;
    const wpUrl = process.env.WP_URL;
    this.$axios
      .get(`/wp-json/wp/v2/posts/${postId}`)
      .then((response) => {
        // Handle the response data
        const apiData = response.data;
        this.pageContent = apiData.content.rendered;
      })
      .catch((error) => {
        // Handle the error
        console.error("Error:", error);
      });
  },
  data() {
    return {
      pageContent: "",
    };
  },
};
</script>

<style>
/* Component styles */
</style>
