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
  // CaseStudyMetaSchema enforces "at least one of image/video" at build
  // time, but that isn't visible to the TS type, hence the filter — the
  // video/image branch below (same pattern as the case-study pages'
  // CaseStudyHero usage) is what actually narrows each field to string.
  // FeaturedContentCard (play) is still image-only, so that guard stays
  // as-is.
  const featuredWork = work.filter((item) => Boolean(item.image || item.video));
  const featuredPlay = play.filter(
    (item): item is typeof item & { image: string } => Boolean(item.image)
  );

  return (
    <ContentWrapper>
      <Section>
        {/* Asymmetric, hand-placed — deliberately not pinned to a
            container corner like ContentWrapper's mark. */}

        <Grid columns={[1]}>
          <Column>
            <h1 className="display-xxl head">Max Taylor</h1>
            <p className="display-m subhead">
              Product Designer
            </p>
            <p className="display-xl text-in text-in-delay-2">
              I turn &rdquo;it’s complicated&rdquo; into products that ship.
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1, 1]} />

      {featuredWork.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Selected Case Studies</h2>
            </Column>
          </Grid>
        </Section>
      )}
      {featuredWork.map((item, index) => (
        <div key={item.slug}>
          {/* Matches the CaseStudyCard's own [1,1] split, on either side —
              between "Featured Work" and the first card, and between
              cards themselves — so the card's own divider reads as
              continuing straight through the gap. */}

          <Section>
            {item.video ? (
              <CaseStudyCard
                title={item.title}
                description={item.description}
                labels={item.labels}
                video={item.video}
                alt={item.title}
                href={`/work/${item.slug}/`}
              />
            ) : item.image ? (
              <CaseStudyCard
                title={item.title}
                description={item.description}
                labels={item.labels}
                image={item.image}
                alt={item.title}
                href={`/work/${item.slug}/`}
              />
            ) : null}
            <GridSpacer columns={[1]} />
          </Section>
          {/*{index === featuredWork.length - 1 && featuredPlay.length > 0 && (
            <GridSpacer columns={[1, 1]} />
          )}*/}
        </div>
      ))}

      {featuredPlay.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Side Quests</h2>
            </Column>
          </Grid>
          {/* FeaturedContentGrid is an auto-fit grid, not a fixed columns
              array, so there's no real column structure to match here —
              an evenly-spaced fallback per GridSpacer's own docs. */}

          <FeaturedContentGrid>
            {featuredPlay.map((item) => (
              <FeaturedContentCard
                key={item.slug}
                title={item.title}
                description={item.description}
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
