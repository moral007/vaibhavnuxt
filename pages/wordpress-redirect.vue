<template>
  <div></div>
</template>

<script>
export default {
  async asyncData({ redirect }) {
    const targetURL = "https://ewflix.com/"; // Replace with your WordPress site URL
    return redirect(302, targetURL);
  },
};
</script>
