import { getFeaturedItems } from "@/lib/content";

export default function HomePage() {
  const { work, play } = getFeaturedItems();

  return (
    <main>
      <h1>Max Taylor</h1>
      <p>Product designer.</p>

      <section>
        <h2>Featured Work ({work.length})</h2>
        <ul>
          {work.map((item) => (
            <li key={item.slug}>
              <a href={`/work/${item.slug}/`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Featured Play ({play.length})</h2>
        <ul>
          {play.map((item) => (
            <li key={item.slug}>
              <a href={`/play/${item.slug}/`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
