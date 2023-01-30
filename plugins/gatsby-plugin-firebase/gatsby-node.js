exports.onPreInit = () => console.log("Loaded @codesby/gatsby-plugin-firebase");

exports.onCreateWebpackConfig = ({ plugins, actions }, options) => {
  if (options.credentials) {
    const {
      credentials: {
        apiKey,
        authDomain,
        databaseURL,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
      },
    } = options;
    actions.setWebpackConfig({
      plugins: [
        plugins.define({
          "process.env.GATSBY_FIREBASE_API_KEY": JSON.stringify(apiKey),
          "process.env.GATSBY_FIREBASE_AUTH_DOMAIN": JSON.stringify(authDomain),
          "process.env.GATSBY_FIREBASE_DATABASE_URL": JSON.stringify(databaseURL),
          "process.env.GATSBY_FIREBASE_PROJECT_ID": JSON.stringify(projectId),
          "process.env.GATSBY_FIREBASE_STORAGE_BUCKET": JSON.stringify(storageBucket),
          "process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID":
            JSON.stringify(messagingSenderId),
          "process.env.GATSBY_FIREBASE_APP_ID": JSON.stringify(appId),
        }),
      ],
    });
  }

};
