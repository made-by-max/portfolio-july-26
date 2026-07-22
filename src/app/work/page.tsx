import type { Metadata } from "next";
import { getWorkItems, getPublishedPlayItems } from "@/lib/content";
import {
  ContentWrapper,
  Section,
  Grid,
  Column,
  GridSpacer,
  CaseStudyCard,
  ListStack,
  PlayListRow,
} from "@/components/layout";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and design work",
};

export default async function WorkPage() {
  const workItems = await getWorkItems();
  // CaseStudyMetaSchema enforces "at least one of image/video" at build
  // time, but that isn't visible to the TS type, hence the filter — the
  // video/image branch below (same pattern as the case-study pages'
  // CaseStudyHero usage) is what actually narrows each field to string.
  const caseStudies = workItems.filter((item) =>
    Boolean(item.image || item.video)
  );
  const playTaggedWork = getPublishedPlayItems().filter((item) =>
    item.tags.includes("work")
  );

  return (
    <ContentWrapper>
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h1 className="display-xl">Case Studies</h1>
          </Column>
        </Grid>
      </Section>

      {caseStudies.map((item, index) => (
        <div key={item.slug}>
          {/* Matches CaseStudyCard's own [1,1] split, same reasoning as
              the homepage's featured work list — the spacer's dividers
              read as continuing straight through the card's own. */}
          {/*<GridSpacer columns={[1, 1]} />*/}
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
          {/*{index === caseStudies.length - 1 && playTaggedWork.length > 0 && (
            <GridSpacer columns={[1, 1]} />
          )}*/}
        </div>
      ))}

      {playTaggedWork.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Related content</h2>
              <ListStack>
                {playTaggedWork.map((item) => (
                  <PlayListRow
                    key={item.slug}
                    title={item.title}
                    href={`/play/${item.slug}/`}
                    tags={item.tags}
                  />
                ))}
              </ListStack>
            </Column>
          </Grid>
        </Section>
      )}
    </ContentWrapper>
  );
}
