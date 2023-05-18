export default function (req, res, next) {  
    const referrer = req.headers.referer || req.headers.referrer;
    const isFromFacebook = referrer && referrer.includes('facebook');
    if (isFromFacebook) {
        next();
    } else if (!isFromFacebook) {
        const postId = req.url.split('/')[1];
        if(req.url.includes('posts')){
            next();
        }else if(req.url == '/'){
            next();
        }else{
            res.writeHead(302, { Location: `/posts/${postId}` });
            res.end();
        }
    } else {
        next();
    }
  }
  