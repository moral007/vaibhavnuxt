export default function ({ route, req, res }) {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

  // Check if the request is coming from the Facebook app on mobile
  const isFacebookMobile = userAgent.includes('FBAN') || userAgent.includes('FBAV');

  // Redirect only if the request is from the Facebook app on mobile
  if (isFacebookMobile) {
    const redirectUrl = 'https://nuxt-3-redirect.vercel.app' + route.fullPath; // Replace with your Vercel deployment URL
    const queryString = Object.keys(route.query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(route.query[key])}`)
      .join('&');
    const finalUrl = queryString ? `${redirectUrl}?${queryString}` : redirectUrl;
    
    res.writeHead(302, {
      Location: finalUrl,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    res.end();
  }
}
