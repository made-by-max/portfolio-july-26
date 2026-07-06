import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },
};

export default withMDX(nextConfig);
