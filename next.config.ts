import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Sanity Studio 內嵌路由需要這個，不然 build 時會出現
  // "createContext is not a function"（webpack 把 client-only 的 UI 套件錯誤解析成 server 版本）。
  // 參考 https://github.com/sanity-io/next-sanity/issues/2201
  transpilePackages: ["@sanity/ui", "@sanity/icons"],
};

export default nextConfig;
