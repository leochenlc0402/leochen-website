import type { MetadataRoute } from "next";

const baseUrl = "https://leochen.genderequity.tw";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/speaking", "/media"];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
