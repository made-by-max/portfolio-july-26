export type PinnedMediaScrollItemProps = {
  image: string;
  alt: string;
  children: React.ReactNode;
};

// Marker component only — PinnedMediaScroll reads these props directly off
// its children and never renders PinnedMediaScrollItem itself.
export function PinnedMediaScrollItem(_props: PinnedMediaScrollItemProps) {
  return null;
}
