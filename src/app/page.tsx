import { getFeaturedItems } from "@/lib/content";
import {
  ContentWrapper,
  Section,
  Grid,
  Column,
  GridSpacer,
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

      <GridSpacer columns={[1]} />

      {work.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Featured Work</h2>
            </Column>
          </Grid>
        </Section>
      )}
      {work.map((item, index) => (
        <div key={item.slug}>
          {/* Matches the CaseStudyCard's own [1,1] split, on either side —
              between "Featured Work" and the first card, and between
              cards themselves — so the card's own divider reads as
              continuing straight through the gap. */}
          <GridSpacer columns={[1, 1]} />
          <Section>
            <CaseStudyCard
              title={item.title}
              description={item.description}
              labels={item.labels}
              image={item.image}
              imageAlt={item.title}
              href={`/work/${item.slug}/`}
            />
          </Section>
          {index === work.length - 1 && featuredPlay.length > 0 && (
            <GridSpacer columns={[1, 1]} />
          )}
        </div>
      ))}

      {featuredPlay.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Featured Play</h2>
            </Column>
          </Grid>
          {/* FeaturedContentGrid is an auto-fit grid, not a fixed columns
              array, so there's no real column structure to match here —
              an evenly-spaced fallback per GridSpacer's own docs. */}
          <GridSpacer columns={[1, 1, 1, 1]} />
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
