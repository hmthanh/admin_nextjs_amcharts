const withPlugins = require("next-compose-plugins");

// const withTM = require("next-transpile-modules")([
//   "@amcharts/amcharts5",
//   "@amcharts/amcharts5/charts"
//   // "@amcharts/amcharts5/xy",
//   // "@amcharts/amcharts5/themes/Animated"
// ]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // transpileModules: [/^\@amcharts\/.*/],
  swcMinify: true,
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      "/": { page: "/" }
    };
  }
  
};
// module.exports = withPlugins([withTM], nextConfig);
module.exports = nextConfig;
