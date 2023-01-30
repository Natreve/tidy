# 🔥 gatsby-plugin-firebase

Adds drop-in support for firebase version 9 javascript SDK which introduces a modular approach that provides reduced SDK size and greater efficiency with modern JavaScript build tools like [Webpack](https://webpack.js.org/)

## Install

`npm i @codesby/gatsby-plugin-firebase`

### Option 1. Setting up environment variables

```
npm i -D dotenv
```

In your `gatsby-config.js`

```javascript:title=gatsby-config.js
require("dotenv").config()

module.exports = {
  ...
  plugins: [`@codesby/gatsby-plugin-firebase`];
}
```

Add your firebase credentials to your `.env` file in your root directory like so:

```
GATSBY_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
GATSBY_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
GATSBY_FIREBASE_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
GATSBY_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
GATSBY_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
GATSBY_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
GATSBY_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
```

### Option 2. Passing credentioals into the plugin options

```javascript:title=gatsby-config.js
module.exports = {
  ...,
  plugins: [
    ...,
    {
      resolve: "@codesby/gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: 'YOUR_GATSBY_FIREBASE_API_KEY',
          authDomain: 'YOUR_GATSBY_FIREBASE_AUTH_DOMAIN',
          databaseURL: 'YOUR_GATSBY_FIREBASE_DATABASE_URL',
          projectId: 'YOUR_GATSBY_FIREBASE_PROJECT_ID',
          storageBucket: 'YOUR_GATSBY_FIREBASE_STORAGE_BUCKET',
          messagingSenderId: 'YOUR_GATSBY_FIREBASE_MESSAGING_SENDER_ID',
          appId: 'YOUR_GATSBY_FIREBASE_APP_ID',
        }
      },
    },
  ],
}
```

## How to use

In your react react app, add the Firebase products that you want to use, learn more about [firebase verison 9](https://firebase.google.com/docs/web/setup?sdk_version=v9)
