import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    // Metadata itself is parsed separately (gray-matter, in content.ts) —
    // this just strips the --- delimited block so it doesn't render as
    // literal markdown in the page body. Referenced by module name (not
    // imported as a function) since Turbopack needs plugin config to be
    // serializable — a live function reference only works under webpack.
    remarkPlugins: ["remark-frontmatter"],
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
