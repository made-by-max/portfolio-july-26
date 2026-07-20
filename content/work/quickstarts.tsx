import type { CaseStudyMeta } from "@/lib/schemas";
import {
  Section,
  Grid,
  Column,
  GridSpacer,
  CaseStudyHero,
  PinnedMediaScroll,
  PinnedMediaScrollItem,
  Image,
  Blockquote,
  ListStack,
} from "@/components/layout";
import { Stat } from "@/components/ui";

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
      <Section>
        {meta.video ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            video={meta.video}
            videoAutoplay={meta.videoAutoplay}
            alt="Auth0's interactive Quickstart guide with a live code editor that updates alongside the instructions"
          />
        ) : meta.image ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            image={meta.image}
            alt="Auth0's interactive Quickstart guide with a live code editor that updates alongside the instructions"
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
              Auth0’s Quickstarts let developers quickly spin up a new
              application and add login and logout functionality, allowing them
              to learn the product by diving straight into the code.
            </p>

            <p>
              We’d always gotten positive feedback on the Quickstarts and on our
              developer experience overall. But Quickstarts hadn’t seen a
              substantial update in about five years, and we wanted to modernize
              the experience and look for opportunities to make it even better.
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Identifying pain points</h2>
            <p>
              In order to get a better understanding of what developers liked
              about our quickstarts as well as areas for improvement, I
              conducted usability testing with 6 developers with varying
              levels of experience with React. Experienced React developers
              typically completed our React Quickstart in about 15 minutes. Less
              experienced developers took closer to 30, and typically required
              some guidance.
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <PinnedMediaScroll>
          <PinnedMediaScrollItem
            image="accountcreationold_mnnbu3"
            alt="Original Quickstart introduction with the account-creation benefit buried in a paragraph of text, easy to miss"
          >
            <h3>Unclear benefits of account creation</h3>
            <p>
              One of the key features of our Quickstarts is that if users have a
              free Auth0 account and are logged in, the code samples in the
              Quickstart automatically update to include information tied to a
              user’s application.
            </p>

            <p>
              Developers loved this feature...if they were aware of it. But
              testing showed that, while creating an account is recommended, the
              information is buried in the introduction and doesn’t do an
              adequate job of conveying the advantages of doing so.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="codesampleOld_owiy0p"
            alt="Original Quickstart code sample shown as an incomplete snippet with no file name or placement instructions"
          >
            <h3>Incomplete code samples</h3>
            <p>
              Code samples in the Quickstart were incomplete snippets that
              didn&rsquo;t specify which file to put the code in.
            </p>
            <p>
              More experienced React developers generally figured this out on
              their own, but novice developers struggled with it.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="contextswitchingold_qwx0mp"
            alt="Original Quickstart flow requiring users to switch between the Auth0 dashboard and their code editor to configure URLs"
          >
            <h3>Too much context switching</h3>
            <p>
              To follow along, users had to jump to the Auth0 dashboard to enter
              their callback, logout, and web origin URLs, copy that information
              into their IDE, and then jump back to the Quickstart.
            </p>
            <p>
              This context switching slowed down integration, broke focus, and
              was error-prone, as users often forgot to save their URLs in the
              dashboard.
            </p>
          </PinnedMediaScrollItem>
        </PinnedMediaScroll>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <Grid columns={[1, 2]}>
          <Column>
            <h2>Redesign goals</h2>
          </Column>
          <Column>
            <ListStack>
              <div className="listStack">
                <h3 className="display-xs">
                  Make “Create Account” or “Log In” a dedicated step
                </h3>
                <p>
                  Make account creation and login an actual step in the process,
                  not just a suggestion.
                </p>
              </div>

              <div className="listStack">
                <h3 className="display-xs">
                  Provide pre-configured full file code samples
                </h3>
                <p>
                  Show full file code samples, including exactly where the code
                  goes, instead of incomplete snippets.
                </p>
              </div>
              <div className="listStack">
                <h3 className="display-xs">
                  Configure URLs from the Quickstart
                </h3>
                <p>
                  Let users configure their callback, logout, and web origin
                  URLs directly from the Quickstart to reduce context switching.
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
            <h2>New design offers more interaction, less context switching</h2>
          </Column>
        </Grid>
      </Section>

      <Section>
        <PinnedMediaScroll>
          <PinnedMediaScrollItem
            image="signinV1_fwqljb"
            alt="Redesigned Quickstart with a dedicated sign-up step that clearly explains the benefits of creating an account"
          >
            <h3>Dedicated sign-up step</h3>
            <p>
              Users are prompted to log in or create an account, with the
              benefits now made clear.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="codesamplesV1_cg6iga"
            alt="Redesigned Quickstart showing a complete code sample with file structure, in an editor that updates as the user scrolls"
          >
            <h3>Complete code samples</h3>
            <p>
              A code editor shows the complete code sample, including file
              structure, and updates automatically as users scroll through the
              guide.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="configureV1_xucgqa"
            alt="Redesigned Quickstart letting users configure their application settings without leaving the page"
          >
            <h3>Reduced context switching</h3>
            <p>
              Users can configure their account settings directly from the
              Quickstart instead of switching back and forth between the
              Quickstart, Product Dashboard, and IDE.
            </p>
          </PinnedMediaScrollItem>
        </PinnedMediaScroll>
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Design updates</h2>
            <p>
              I shared the initial designs with the team and met with my PM and
              lead engineer to discuss next steps. After confirming technical
              feasibility, we took automation a step further by adding the
              ability to create or change an application directly from the
              Quickstart, eliminating the need to switch to the dashboard at
              all.
            </p>

            <Image
              publicId="createAppV3_swzyle"
              alt="Quickstart step for creating or selecting an Auth0 application directly inline, without visiting the dashboard"
              padded
            />

            <p>
              Since code samples weren’t relevant until later in the flow, we
              moved application configuration steps to the right side of the new
              layout and have the content update automatically as the user
              scrolls through the guide.
            </p>

            <Image
              publicId="codesamplesV3_xzy7so"
              alt="Final Quickstart layout with configuration steps on the right and code samples that update automatically as the user scrolls"
              padded
            />
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>New design was a hit with testers</h2>
            <p>
              I ran unmoderated usability testing with 14 users to validate the
              new design and make sure we weren’t taking the automation
              too far.
            </p>
            <p>
              Reactions to the new version of the quickstart were overwhelmingly
              positive, with participants noting that it was intuitive and easy
              to use and that having the code samples update as they scrolled
              through the instructions made following along a “no-brainer.”
            </p>
            <Blockquote>
              It’s so clear and so precise that anyone could just follow it
              step-by-step – it’s broken down in a way that’s much more
              intuitive to the user.
            </Blockquote>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Implementation and outcomes</h2>
            <p>
              Once the design was validated, I synced regularly with my PM and
              engineering teams throughout implementation.
            </p>
            <p>
              After launch, I ran another round of unmoderated usability
              testing. Results were very positive, with only a few minor UI
              fixes needed. Time to complete the Quickstart dropped from around
              30 minutes to about 10-15 minutes.
            </p>
            <p className="display-xl">
              The redesigned Quickstarts reduced onboarding time by more than{" "}
              <Stat value={50} suffix="%" />{" "}
            </p>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
