<template>
  <div></div>
</template>
<script>
export default {
  // created() {
  //   const url = process.env.WP_URL;
  //   const fullpath = this.$route.fullPath;
  //   window.location.replace(`${url}${fullpath}`);
  // },
  asyncData({ redirect, route }) {
    const url = process.env.WP_URL;
    const fullpath = route.fullPath;
    return redirect(301, `${url}${fullpath}`); // Replace with your WordPress URL
  },
};
</script>
