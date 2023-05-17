import axios from 'axios';

export default async function ({ route, error, app }) {
  const postId = route.params.id; // Assuming you have a dynamic route parameter 'id'
  const wpUrl = process.env.WP_URL;

  try {
    // Make a GET request to the WordPress API endpoint for the specific post ID
    const response = await axios.get(`${wpUrl}wp-json/wp/v2/posts/${postId}`);

    // Extract the data from the response
    const post = response.data;

    // Set the meta tags using the data
    app.head.meta.push({ property: 'og:title', content: post.title.rendered });
    app.head.meta.push({ property: 'og:description', content: post.excerpt.rendered });
    app.head.meta.push({ property: 'og:image', content: post.yoast_head_json.og_image[0].url });
    // Add more meta tags as needed
  } catch (err) {
    // Handle any errors that occur during the request
    console.error('Error fetching WordPress data:', err);
    error({ statusCode: 500, message: 'Failed to fetch WordPress data' });
  }
}
