import type { CaseStudyMeta } from "@/lib/schemas";
import {
  Section,
  Grid,
  Column,
  GridSpacer,
  CaseStudyHero,
  PinnedMediaScroll,
  ImageTabsItem,
  Image,
  Blockquote,
  ListStack,
  ImageTabs,
} from "@/components/layout";
import { Stat, TweetEmbed } from "@/components/ui";

export const meta: CaseStudyMeta = {
  title: "Untangling the Auth0 Docs",
  description:
    "A research-informed approach to information architecture that improved navigation by 400%",
  overview:
    "I conducted user interviews, a content audit, card sorting, and usability testing to completely overhaul the information architecutre of Auth0's developer documentation.",
  labels: ["Developer Experience", "User Research", "Information Architecture"],
  featured: true,
  image: "docs-featured-image_nhms2n",
  date: "2022-03-05",
};

export default function DocsIA() {
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
            <p>
              A strong developer experience has always been a core part of
              Auth0’s DNA. Since their founding they have deliberately built a
              developer-first product and it continues to be a key part of their
              success to this day. Naturally, maintaining excellent developer
              documentation is an essential part of that strategy.
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Auth0 Docs - love ‘em or hate ‘em</h2>
            <p>
              We got a lot of feedback that our docs were amazing. They were
              frequently cited as a competitive differentiator. We also got a
              lot of feedback that our docs were terrible and impossible to
              navigate.
            </p>
          </Column>
        </Grid>
        <Grid columns={[1, 1]}>
          <Column>
            <TweetEmbed id="1423673225872121860" />
          </Column>
          <Column>
            <TweetEmbed id="1471256209047052293" />
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h3>Experience level was a key factor</h3>
            <p>
              I conducted interviews with 7 developers with various levels of
              experience with Auth0 and with Identity and Access Management
              (IAM) in general
            </p>
          </Column>
        </Grid>
        <Grid columns={[1, 1]}>
          <Column>
            <p>Developers who liked our docs:</p>
            <ul>
              <li>
                Had more pre-existing Identity and Access management (IAM)
                knowledge
              </li>
              <li>
                Relied more on Google searches to find docs or community forum
                posts
              </li>
            </ul>
          </Column>
          <Column>
            <p>Developers who struggled with our docs:</p>
            <ul>
              <li>Had less Identity and Access management (IAM) knowledge</li>
              <li>
                Relied more on our sidebar navigation because they didn’t know
                the concepts well enough to choose good search terms
              </li>
              <li>
                Ended up jumping back and forth between lots of open of tabs
              </li>
            </ul>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h3>Making sense of the mess</h3>
            <p>
              I performed a content audit of all 1000+ pages of docs, putting
              together a massive spreadsheet highlighting the problems in the
              IA. (I am precisely the kind of nerd 🤓 who loves this stuff). Our
              sidebar navigation was manually generated, but our breadcrumbs
              were automatically generated based on the file structure of our
              CMS. The two had diverged over time.
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <ImageTabs>
          <ImageTabsItem
            image="inconsistentHierarchy_tgbdun"
            alt="Snapshot restore terminal output"
          >
            <h3>Many pages had inconsistent hierarchies.</h3>
            <p>
              Content might be multiple levels deep in the sidebar navigation,
              but appear to be at the top level in the breadcrumb navigation.
            </p>
          </ImageTabsItem>

          <ImageTabsItem
            image="mismatchedNav_jja7yu"
            alt="A code sample that shows the React code, but not where to put it or how to use it."
          >
            <h3>Some pages were in multiple categories</h3>
            <p>
              Pages frequently had mismatches where the content resided in
              completely different categories in the sidebar versus the
              breadcrumbs.
            </p>
          </ImageTabsItem>

          <ImageTabsItem
            image="orphan_sejwxt"
            alt="A code sample that shows the React code, but not where to put it or how to use it."
          >
            <h3>More than half the pages were orphans</h3>
            <p>
              Entire sections were completely missing from the sidebar
              navigation.
            </p>
          </ImageTabsItem>
        </ImageTabs>
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1, 1]}>
          <Column>
            <p className="display-xl">
              {" "}
              <Stat value={75} suffix="%" /> of docs pages had navigational
              errors
            </p>
          </Column>
          <Column>
            <ListStack>
              <div>
                <p>
                  <span className="bold-text">
                    <Stat value={16} suffix="%" />
                  </span>{" "}
                  had inaccurate hierarchies
                </p>
              </div>
              <div>
                <p>
                  <span className="bold-text">
                    <Stat value={6} suffix="%" />
                  </span>{" "}
                  were in multiple categories
                </p>
              </div>
              <div>
                <p>
                  <span className="bold-text">
                    <Stat value={54} suffix="%" />
                  </span>{" "}
                  were orphans
                </p>
              </div>
            </ListStack>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Fixing the information architecture</h2>
            <p>
              First I worked with our engineering team and technical writers to
              resolve the underlying issues. Instead of manually generating the
              sidebar from a yaml file, we pulled from the CMS so the sidebar
              and breadcrumbs would always be in sync.
            </p>

            <p>
              Next I performed both open and closed card sorts with both regular
              Auth0 users and non-users to better understand their mental
              models.
            </p>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
