import type { Metadata } from "next";
import { getWorkItems, getPublishedPlayItems } from "@/lib/content";
import {
  ContentWrapper,
  Section,
  Grid,
  Column,
  GridSpacer,
  CaseStudyCard,
  PlayListRow,
} from "@/components/layout";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and design work",
};

export default async function WorkPage() {
  const caseStudies = await getWorkItems();
  const playTaggedWork = getPublishedPlayItems().filter((item) =>
    item.tags.includes("work")
  );

  return (
    <ContentWrapper>
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h1 className="display-xl">Work</h1>
          </Column>
        </Grid>
      </Section>

      {caseStudies.map((item, index) => (
        <div key={item.slug}>
          {/* Matches CaseStudyCard's own [1,1] split, same reasoning as
              the homepage's featured work list — the spacer's dividers
              read as continuing straight through the card's own. */}
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
          {index === caseStudies.length - 1 && playTaggedWork.length > 0 && (
            <GridSpacer columns={[1, 1]} />
          )}
        </div>
      ))}

      {playTaggedWork.length > 0 && (
        <Section>
          <Grid columns={[1]}>
            <Column>
              <h2 className="display-m">Also</h2>
              {playTaggedWork.map((item) => (
                <PlayListRow
                  key={item.slug}
                  title={item.title}
                  href={`/play/${item.slug}/`}
                  tags={item.tags}
                />
              ))}
            </Column>
          </Grid>
        </Section>
      )}
    </ContentWrapper>
  );
}
