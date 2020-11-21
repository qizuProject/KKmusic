const path = require("path");

module.exports = {
  webpack: {
    // 配置路径别名：将来写路径可以简写
    alias: {
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@comps": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
};
