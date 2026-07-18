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
  Video,
} from "@/components/layout";
import { Stat, TweetEmbed } from "@/components/ui";

export const meta: CaseStudyMeta = {
  title: "Untangling the Auth0 Docs",
  description:
    "A research-informed approach to information architecture that improved navigation by 400%",
  overview:
    "I conducted user interviews, a content audit, card sorting, and usability testing to overhaul the information architecture of Auth0’s developer documentation.",
  labels: ["Developer Experience", "User Research", "IA"],
  featured: true,
  image: "docs-featured-image_nhms2n",
  date: "2022-03-05",
};

export default function DocsIA() {
  return (
    <>
      <Section>
        {meta.video ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            video={meta.video}
            videoAutoplay={meta.videoAutoplay}
            alt={meta.title}
          />
        ) : meta.image ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            image={meta.image}
            alt={meta.title}
          />
        ) : (
          <CaseStudyHero title={meta.title} overview={meta.overview} />
        )}
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <p>
              A strong developer experience has always been core to Auth0’s DNA.
              Since their founding they have deliberately built a
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
            <h2>Auth0 docs — love ‘em or hate ‘em</h2>
            <p>
              We got a lot of feedback that our docs were amazing and they were
              frequently cited as a competitive differentiator. But we also got
              a lot of feedback that our docs were terrible and impossible to
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
            <h3>IA vs SEO: Why not both?</h3>
            <p>
              Based on customer feedback and my own use of the docs, I strongly
              suspected that our information architecture was largely to blame.
              I got a lot fof pushback from my PM, however. He argued that we
              should be focusing more on SEO, since 70% of our traffic came from
              search. I didn’t think that number told the whole story, so I
              decided it was time to actually talk to users.
            </p>
          </Column>
        </Grid>
      </Section>
      <GridSpacer columns={[1, 1]} />
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h3>Information architecture was a clear pain point</h3>
            <p>
              I interviewed developers with various levels of experience with
              Auth0 and with Identity and Access Management (IAM) in general.
            </p>

            <p>
              Developers who were happy with our docs generally had more domain
              knowledge and relied more on search, indicating that our SEO
              efforts were working well for that audience.
            </p>

            <p>
              Developers who struggled with our docs (and were therefore our
              target audience) had less domain knowledge and relied more on
              sidebar navigation. They frequently reported feeling lost and
              frustrated, and were less likely to use search, since formulating
              a good search query requires a certain level of domain knowledge.
              More SEO investment was unlikely to move the needle for these
              users.
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h3>Making sense of the mess</h3>
            <p>
              To better understand the problems with our information
              architecture, I performed a content audit of all 1000+ pages of
              docs, putting together a massive spreadsheet highlighting the
              problems in the IA. (I am precisely the kind of nerd 🤓 who loves
              this stuff).
            </p>

            <p>Things were even worse than I’d expected.</p>

            <p></p>
          </Column>
        </Grid>
      </Section>
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

      <Section>
        <ImageTabs>
          <ImageTabsItem
            image="inconsistentHierarchy_tgbdun"
            alt="Snapshot restore terminal output"
          >
            <h3>Many pages had inconsistent hierarchies</h3>
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
      <Section>
        <Grid columns={[1]}>
          <Column>
            <p>
              Our docs had originally been authored in a git-based system, with
              navigation manually generated from a yaml file. Then we migrated
              to a new CMS, where breadcrumbs were generated from the file
              structure in the CMS, but the sidebar navigation was still being
              manually generated. Over time the two had diverged significantly.
              It was no wonder users were struggling to find their way through
              the docs!
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <Grid columns={[2, 3]}>
          <Column>
            <h2>Information architecture improvements</h2>
          </Column>
          <Column>
            <ListStack>
              <div className="listStack">
                <h4>Fixing the underlying mismatch</h4>
                <p>
                  First, I worked with our engineering team and our technical
                  writers to resolve the mismatch at the source. Instead of
                  manually generating, we configured it to pull from the CMS, so
                  the sidebar and breadcrumbs would always stay in sync.
                </p>
              </div>
              <div className="listStack">
                <h4>Card sorting</h4>
                <p>
                  I performed both open and closed card sorting with two groups
                  of developers - Auth0 customers and non-Auth0 customers. I
                  identified two distinct mental models. Developers tended to
                  group topics either by feature or by a loose jobs-to-be-done
                  structure. Experience with Auth0 didn’t appear to be a factor
                  in their mental models.
                </p>
              </div>
              <div className="listStack">
                <h4>Tree testing</h4>
                <p>
                  I built two proposed versions of our navigation based on those
                  mental models and ran tree testing, again with both Auth0
                  customers and non-customers. The feature-based navigation
                  outperformed the jobs-to-be-done approach, and also aligned
                  with the educational materials our devrel team had created.
                </p>
              </div>
            </ListStack>
          </Column>
        </Grid>
      </Section>
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h3>Breaking up the monolith</h3>
            <p>
              Based on the card sorting and tree testing findings, I split the
              docs content into seven main categories, each with its own
              sub-menu: Get started, Authentication, Manage Users, Customize,
              Secure, Deploy and Monitor, and Troubleshoot.
            </p>

            <Image publicId="sidebars_knqe3u" alt="screenshot" padded />
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Landing pages provide a high-level overview</h2>
            <p>
              Beyond the navigation improvements, we wanted to introduce
              developers to each section and give them a better high-level
              understanding of the Auth0 product.
            </p>
            <p>
              Our technical writing staff developed new content for each landing
              page and the homepage, and I tested three different design ideas
              with users.
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>
        <ImageTabs>
          <ImageTabsItem
            image="landingpageillustration_xaxp4w"
            alt="screenshot"
          >
            <h3>Brand illustration</h3>
            <p>
              A simple illustration created by our brand design team. Users
              found it too abstract to be useful.
            </p>
          </ImageTabsItem>

          <ImageTabsItem
            image="landingpagesimplediagram_l4xskp"
            alt="screenshot"
          >
            <h3>Pipeline diagram</h3>
            <p>
              A simplified diagram giving users a big-picture overview of the
              Auth0 pipeline. Testers unanimously preferred this option, saying
              it provided just the right level of detail.
            </p>
          </ImageTabsItem>

          <ImageTabsItem image="landingpagearch_slq2yg" alt="screenshot">
            <h3>Architectural diagram</h3>
            <p>
              A detailed architectural diagram of the Auth0 ecosystem. Most
              developers found it to be too complex for a landing page.
            </p>
          </ImageTabsItem>
        </ImageTabs>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Finalizing the design</h2>
            <p>
              I made small tweaks based on usability testing feedback, then
              designed the new sidebar sections and paired with our frontend
              engineering team to iterate on the sidebar’s behavior, how users
              would move between sections, and the mobile version of the
              navigation menu.
            </p>
            <Video
              publicId="nav-demo_z4orvn"
              alt="a video of the navigation"
              autoplay
              padded
            />
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Outcomes</h2>
            <p>
              When I first assessed the docs site, 75% of pages had some sort of
              navigational error. After restructuring the information
              architecture and fixing the ingestion pipeline to keep breadcrumbs
              and sidebar navigation in sync, we saw a 400% improvement in
              navigation accuracy.
            </p>
            <h3>Qualitative feedback</h3>
            <p>
              Documentation can be challenging to measure quantitatively.
              Metrics can tell us whether a user spent more or less time on a
              page than before, but not whether that’s because they found what
              they needed faster or because they were in the wrong place.
            </p>
            <p>
              Therefore, most of the impact of this initiative was measured
              through qualitative feedback, including follow-up interviews with
              users, and monitoring the feedback from the customer satisfaction
              widget embedded on every page of our documentation.
            </p>
            <p>
              The response to the new design was overwhelmingly positive. Users
              reported that the new menus were much easier to navigate, and that
              the landing pages gave them more context and a better sense of the
              Auth0 product as a whole.
            </p>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
