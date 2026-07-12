import { Children, isValidElement } from "react";
import { getImageDimensions } from "@/lib/cloudinary";
import {
  PinnedMediaScrollItem,
  type PinnedMediaScrollItemProps,
} from "./PinnedMediaScrollItem";
import { PinnedMediaScrollClient } from "./PinnedMediaScrollClient";

type Props = {
  children: React.ReactNode;
};

export async function PinnedMediaScroll({ children }: Props) {
  const items = Children.toArray(children).filter(
    (child): child is React.ReactElement<PinnedMediaScrollItemProps> =>
      isValidElement(child) && child.type === PinnedMediaScrollItem
  );

  const resolved = await Promise.all(
    items.map(async (item, index) => {
      const { width, height } = await getImageDimensions(item.props.image);
      return {
        index,
        publicId: item.props.image,
        alt: item.props.alt,
        width,
        height,
        content: item.props.children,
      };
    })
  );

  return <PinnedMediaScrollClient items={resolved} />;
}
