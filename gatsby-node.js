"use strict";
// const path = require(`path`);
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /fabric/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
//   actions.setWebpackConfig({
//     resolve: {
//       modules: [path.resolve(__dirname, "src"), "node_modules"],
//       fallback: {
//         fs: false,
//         window: false,
//       },
//     },
//     node: {
//       fs: "empty",
//     },
//   });
// };
// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage } = actions;
//   //Setup Private Routes
//   if (page.path === "/") {
//     page.matchPath = "/*";
//     createPage(page);
//   }
// };
