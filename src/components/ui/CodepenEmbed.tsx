// src/components/mdx/CodepenEmbed.tsx
export function CodepenEmbed({
  penId,
  user = "made-by-max",
  tab = "result",
}: {
  penId: string;
  user?: string;
  tab?: string;
}) {
  return (
    <iframe
      height="600"
      width="800"

      src={`https://codepen.io/${user}/embed/${penId}?default-tab=${tab}`}
      loading="lazy"
      allowFullScreen
    />
  );
}
