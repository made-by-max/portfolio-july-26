// Required by @next/mdx when using the App Router.
// Add custom MDX component overrides here as needed.
import type { MDXComponents } from "mdx/types";
import {
  Grid,
  Column,
  Image,
  Video,
  ListStack,
  ImageTabs,
  ImageTabsItem,
  Blockquote,
  PinnedMediaScroll,
  PinnedMediaScrollItem,
} from "@/components/layout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Grid,
    Column,
    Image,
    Video,
    ListStack,
    ImageTabs,
    ImageTabsItem,
    Blockquote,
    PinnedMediaScroll,
    PinnedMediaScrollItem,
    ...components,
  };
}
