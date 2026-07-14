import type { CaseStudyMeta } from "@/lib/schemas";
import {
  Section,
  Grid,
  Column,
  GridSpacer,
  CaseStudyHero,
  Image,
} from "@/components/layout";

export const meta: CaseStudyMeta = {
  title: "Example Case Study",
  description: "A short description shown on the work index card.",
  overview: "A longer overview shown inside the case study page itself.",
  labels: ["product", "mobile"],
  featured: true,
  image: "logout_t50qg0",
  date: "2024-06-01",
};

export default function ExampleCaseStudy() {
  return (
    <>
      <Section texture>
        <CaseStudyHero
          title={meta.title}
          overview={meta.overview}
          labels={meta.labels}
          image={meta.image}
          imageAlt={meta.title}
        />
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Problem</h2>
            <p>Lorem ipsum.</p>
            <h2>Solution</h2>
            <p>Lorem ipsum.</p>
            <Image publicId="logout_t50qg0" alt="image" />
          </Column>
        </Grid>
      </Section>
    </>
  );
}
