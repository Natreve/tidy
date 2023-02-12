//https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/index.d.ts
import { CreatePageArgs, CreateWebpackConfigArgs } from "gatsby";

const path = require(`path`);

exports.onCreateWebpackConfig = (
  args: CreateWebpackConfigArgs
): void | Promise<void> => {
  const { stage, loaders, actions } = args;
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /fabric/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};

// exports.onCreatePage = (args: CreatePageArgs): void | Promise<void> => {
//   const { page } = args;
//   //Setup Private Routes
//   if (page.path === "/") {
//     page.matchPath = "/*";
//     args.actions.createPage(page);
//   }
// };
