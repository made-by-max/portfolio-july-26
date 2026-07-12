import { Children, isValidElement } from "react";
import { getImageDimensions } from "@/lib/cloudinary";
import { ImageTabsItem, type ImageTabsItemProps } from "./ImageTabsItem";
import { ImageTabsClient } from "./ImageTabsClient";

type Props = {
  children: React.ReactNode;
};

// Click-driven caption-switcher. Dimension fetching needs the Cloudinary
// Admin API (server-only), but the switching interaction needs client
// state — so this server component resolves every item's image up front
// and hands fully-resolved data to a client subcomponent.
export async function ImageTabs({ children }: Props) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<ImageTabsItemProps> =>
      isValidElement(child) && child.type === ImageTabsItem
  );

  const resolvedItems = await Promise.all(
    items.map(async (item) => {
      const { width, height } = await getImageDimensions(item.props.image);
      return {
        publicId: item.props.image,
        alt: item.props.alt,
        width,
        height,
        content: item.props.children,
      };
    })
  );

  return <ImageTabsClient items={resolvedItems} />;
}
