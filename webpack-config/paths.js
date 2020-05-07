const fs = require("fs");
const path = require("path");
const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
    appBuild: resolveApp("build/"),
    appPublic: resolveApp("public"),
    appNodeModules: resolveApp("node_modules"),
    appPackageJson: resolveApp("package.json"),
    appHtml: resolveApp("public/index.html"),
    appIndexJs: resolveApp("src/index.js")
};