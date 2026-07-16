export type ImageTabsItemProps = {
  image: string;
  alt: string;
  children: React.ReactNode;
};

// Marker component only — ImageTabs reads these props directly off its
// children and never renders ImageTabsItem itself.
export function ImageTabsItem(_props: ImageTabsItemProps) {
  return null;
}
