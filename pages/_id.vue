<script>
export default {
  asyncData({ redirect, params }) {
    const url = process.env.WP_URL;
    const postId = params.id;
    return redirect(302, `${url}${postId}`); // Replace with your WordPress URL
  },
};
</script>
