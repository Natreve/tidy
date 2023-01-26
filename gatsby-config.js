require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    title: `codesby-telegram-house-keeping`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  flags: {
    FAST_DEV: true,
    DEV_SSR: false,
    PRESERVE_WEBPACK_CACHE: true,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
