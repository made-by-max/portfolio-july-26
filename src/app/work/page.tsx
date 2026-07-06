import type { Metadata } from "next";
import { getPublishedWorkItems, getPublishedPlayItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and design work",
};

export default function WorkPage() {
  const caseStudies = getPublishedWorkItems();
  const playTaggedWork = getPublishedPlayItems().filter((item) =>
    item.tags.includes("work")
  );

  return (
    <main>
      <h1>Work</h1>

      <section>
        <h2>Case Studies</h2>
        <ul>
          {caseStudies.map((item) => (
            <li key={item.slug}>
              <a href={`/work/${item.slug}/`}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {playTaggedWork.length > 0 && (
        <section>
          <h2>Also</h2>
          <ul>
            {playTaggedWork.map((item) => (
              <li key={item.slug}>
                <a href={`/play/${item.slug}/`}>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
