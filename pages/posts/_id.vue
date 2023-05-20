<template>
  <div class="p-7">
    <section v-html="pageContent"></section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async asyncData({ params, req, route }) {
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
      const isServer = process.server;
      const protocol = isServer ? "https" : window.location.protocol;
      const host = isServer ? req.headers.host : window.location.host;
      const currentUrl = `${protocol}://${host}${route.fullPath}`;
      return {
        title,
        description,
        ogTitle,
        ogDescription,
        ogImage,
        pageContent,
        currentUrl,
      };
    } catch (e) {
      console.error("Error fetching data:", e);
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
        {
          hid: "og:type",
          property: "og:type",
          content: "article",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `${this.currentUrl}`,
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
