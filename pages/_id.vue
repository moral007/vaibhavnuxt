<template>
  <div></div>
</template>
<script>
export default {
  mounted() {
    const url = process.env.WP_URL;
    const postId = this.$route.params.id;
    window.location.href = `${url}${postId}`;
  },
  // asyncData({ redirect, params }) {
  //   const url = process.env.WP_URL;
  //   const postId = params.id;
  //   return redirect(302, `${url}${postId}`); // Replace with your WordPress URL
  // },
};
</script>
