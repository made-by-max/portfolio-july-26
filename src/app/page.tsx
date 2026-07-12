import { getFeaturedItems } from "@/lib/content";
import {
  ContentWrapper,
  Section,
  Grid,
  Column,
  CaseStudyCard,
  FeaturedContentCard,
  FeaturedContentGrid,
} from "@/components/layout";

export default async function HomePage() {
  const { work, play } = await getFeaturedItems();
  // Featured Content Card assumes any featured /play item has an image —
  // guard here rather than widening the card's props for a case the
  // content model already rules out.
  const featuredPlay = play.filter(
    (item): item is typeof item & { image: string } => Boolean(item.image)
  );

  return (
    <ContentWrapper>
      <Section glow>
        {/* Asymmetric, hand-placed — deliberately not pinned to a
            container corner like ContentWrapper's mark. */}
        <span
          className="corner-mark"
          style={{ insetBlockStart: "18%", insetInlineEnd: "12%" }}
          aria-hidden="true"
        />
        <Grid columns={[1]}>
          <Column>
            <h1 className="display-xxl text-in">Max Taylor</h1>
            <p className="body-l text-in text-in-delay-1">Product designer.</p>
          </Column>
        </Grid>
      </Section>

      {work.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Featured Work</h2>
            </Column>
          </Grid>
        </Section>
      )}
      {work.map((item) => (
        <Section key={item.slug}>
          <CaseStudyCard
            title={item.title}
            description={item.description}
            labels={item.labels}
            image={item.image}
            imageAlt={item.title}
            href={`/work/${item.slug}/`}
          />
        </Section>
      ))}

      {featuredPlay.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Featured Play</h2>
            </Column>
          </Grid>
          <FeaturedContentGrid>
            {featuredPlay.map((item) => (
              <FeaturedContentCard
                key={item.slug}
                title={item.title}
                description={item.description}
                tags={item.tags}
                image={item.image}
                imageAlt={item.title}
                href={`/play/${item.slug}/`}
              />
            ))}
          </FeaturedContentGrid>
        </Section>
      )}
    </ContentWrapper>
  );
}
