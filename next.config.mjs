import createMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  productionBrowserSourceMaps: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/task/:name/statement",
        destination: "/task/:name",
        permanent: false,
      },
      {
        source: "/user/:username/profile",
        destination: "/user/:username",
        permanent: false,
      },
      {
        source: "/user/:username/edit",
        destination: "/user/:username/edit/password",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://training.olinfo.it/api/:path*",
      },
      {
        source: "/api-terry/:path*",
        destination: "https://territoriali.olinfo.it/:path*",
      },
    ];
  },
};

export default createMDX({ extension: /\.mdx?$/ })(nextConfig);
