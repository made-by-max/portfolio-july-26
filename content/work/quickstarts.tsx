import type { CaseStudyMeta } from "@/lib/schemas";
import {
  Section,
  Grid,
  Column,
  CaseStudyHero,
  PinnedMediaScroll,
  PinnedMediaScrollItem,
} from "@/components/layout";

export const meta: CaseStudyMeta = {
  title: "Interactive Quickstarts at Auth0",
  description:
    "An interactive quickstart experience that decreased onboarding time by 50%",
  overview:
    "I redesigned the Auth0 quickstarts from the ground up, addressing user pain points and making it easier for developers to onboard to Auth0.",
  labels: ["Developer Experience", "User Research", "Onboarding"],
  featured: true,
  image: "featuredImage_fjxnfc",
  date: "2022-03-05",
};

export default function Quickstarts() {
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

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Identifying Pain Points</h2>
            <p>
              In order to get a better understanding of what developers liked
              about our quickstarts as well as areas for improvement, I ran
              usability testing on our existing quickstarts to identify where
              users were struggling.
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>
        <PinnedMediaScroll>
          <PinnedMediaScrollItem
            image="accountCreation_hoeqey"
            alt="Snapshot restore terminal output"
          >
            <h3>Unclear Benefits of Account Creation</h3>
            <p>
              One of the key features of our Quickstarts is that if users have a
              free Auth0 account and are logged in, the code samples in the
              Quickstart automatically update to include information tied to a
              user&rsquo;s application. This was hugely appreciated by
              developers who noticed the feature. However, our testing showed
              that, while the Quickstarts recommend creating an account, the
              information is buried in the introduction and doesn&rsquo;t do an
              adequate job of conveying the advantages of doing so.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="codeSamples_duafeq"
            alt="A code sample that shows the React code, but not where to put it or how to use it."
          >
            <h3>Incomplete code samples</h3>
            <p>
              The code samples provided in the quickstart were incomplete
              snippets and failed to call out a specific file name for where to
              put the code.
            </p>
            <p>
              While more experienced React developers generally figured this
              step out without assistance, we noticed that it was something
              novice developers really struggled with.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="contextSwitching_zu4pro"
            alt="Snapshot restore terminal output"
          >
            <h3>Too much context switching</h3>
            <p>
              In order to follow along with the quickstart, users would have to
              navigate to the Auth0 dashboard to enter their callback, logout,
              and web origins URLs, then copy the information from the
              quickstart into their code editor.
            </p>
            <p>
              This context switching slowed down the integration process, and
              created a less focused experience. It was also prone to error, as
              users frequently forgot to save their URLs in the dashboard.
            </p>
          </PinnedMediaScrollItem>
        </PinnedMediaScroll>
      </Section>
    </>
  );
}
