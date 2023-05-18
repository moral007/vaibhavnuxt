<template>
  <div class="p-7">
    <section v-html="pageContent"></section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async asyncData({ params }) {
    try {
      const url = process.env.WP_URL;
      const postId = params.id;
      // console.log(`${url}wp-json/wp/v2/posts/${postId}`);
      const response = await axios.get(`${url}wp-json/wp/v2/posts/${postId}`);
      const data = response.data;

      const pageContent = data.content.rendered;
      const title = data.yoast_head_json.title;
      const description = data.yoast_head_json.og_description;
      const ogTitle = data.yoast_head_json.title;
      const ogDescription = data.yoast_head_json.og_description;
      const ogImage = data.yoast_head_json.og_image[0].url;

      return {
        title,
        description,
        ogTitle,
        ogDescription,
        ogImage,
        pageContent,
      };
    } catch (e) {
      console.error("Error fetching data:", e);
      error({ statusCode: 500, message: "Failed to fetch data" });
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.description },
        { hid: "og:title", property: "og:title", content: this.ogTitle },
        {
          hid: "og:description",
          property: "og:description",
          content: this.ogDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: `${this.ogImage}?transform=w_200,h_200,c_fit`,
        },
        // Add other meta tags as needed
      ],
    };
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
  },
  data() {
    return {
      pageContent: this.pageContent,
    };
  },
};
</script>

<style>
/* Component styles */
</style>
