// Required by @next/mdx when using the App Router.
// Add custom MDX component overrides here as needed.
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
