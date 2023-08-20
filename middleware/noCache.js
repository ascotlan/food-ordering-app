// middleware to add no-cache headers. Use this middleware where-ever you intend to turn caching off.

const noCache = (req, res, next) => {
  res.header({
    "Cache-Control": "private, no-cache, no-store, must-revalidate",
    "Expires": "-1",
    "Pragma": "no-cache"
  });
  next();
};

module.exports = noCache;
