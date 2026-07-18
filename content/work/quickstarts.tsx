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
              Auth0’s Quickstarts let developers quickly spin up a new
              application and add login and logout functionality, allowing them
              to learn the product by diving directly into the coding
              experience.
            </p>

            <p>
              We’d always gotten positive feedback on our Quickstart experience,
              as well as on our developer experience overall. However, our
              Quickstarts hadn’t seen a substantial update in about 5 years, and
              we wanted to modernize the experience and look for opportunities
              to make it even better.
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
              conducted usability testing with six developers with varying
              levels of experience with React. Experienced React developers
              typically completed our React Quickstart in about 15 minutes. Less
              experienced developers took closer to 30, and typically required
              some guidance.
            </p>
          </Column>
        </Grid>
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <PinnedMediaScroll>
          <PinnedMediaScrollItem
            image="accountcreationold_mnnbu3"
            alt="Snapshot restore terminal output"
          >
            <h3>Unclear benefits of account creation</h3>
            <p>
              One of the key features of our Quickstarts is that if users have a
              free Auth0 account and are logged in, the code samples in the
              Quickstart automatically update to include information tied to a
              user&rsquo;s application.
            </p>

            <p>
              Developers loved this feature...if they were aware of it. But
              testing showed that, while creating an account is recommended, the
              information is buried in the introduction and doesn&rsquo;t do an
              adequate job of conveying the advantages of doing so.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="codesampleOld_owiy0p"
            alt="A code sample that shows the React code, but not where to put it or how to use it."
          >
            <h3>Incomplete code samples</h3>
            <p>
              The code samples provided in the Quickstart were incomplete
              snippets and failed to call out a specific file name for where to
              put the code.
            </p>
            <p>
              While more experienced React developers generally figured this
              step out without assistance, I noticed that it was something
              novice developers really struggled with.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="contextswitchingold_qwx0mp"
            alt="Snapshot restore terminal output"
          >
            <h3>Too much context switching</h3>
            <p>
              In order to follow along with the Quickstart, users would have to
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

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1, 1]}>
          <Column>
            <h2>Redesign Goals</h2>
          </Column>
          <Column>
            <ListStack>
              <div className="listStack">
                <h3 className="display-xs">
                  Make “Create Account” or “Log In” a dedicated step
                </h3>
                <p>
                  Encourage account creation and login by making it an actual
                  step in the process as opposed to a suggestion.
                </p>
              </div>

              <div className="listStack">
                <h3 className="display-xs">
                  Provide pre-configured full file code samples
                </h3>
                <p>
                  Provide full file code samples, including the file that the
                  code would be placed in, rather than showing incomplete code
                  snippets.
                </p>
              </div>
              <div className="listStack">
                <h3 className="display-xs">
                  Configure URLs from the Quickstart
                </h3>
                <p>
                  Reduce context switching by allowing users to configure their
                  callback, logout, and web origins URLs directly from the
                  Quickstart.
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

      <GridSpacer columns={[1, 1]} />

      <Section>
        <PinnedMediaScroll>
          <PinnedMediaScrollItem
            image="signinV1_fwqljb"
            alt="Snapshot restore terminal output"
          >
            <h3>Dedicated sign up step</h3>
            <p>
              Users are prompted to log in or create an account and the benefits
              of doing so are more clear.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="codesamplesV1_cg6iga"
            alt="A code sample that shows the React code, but not where to put it or how to use it."
          >
            <h3>Complete code samples</h3>
            <p>
              A code editor shows the complete code sample, including the file
              structure. The code editor automatically updates as users scroll
              through the guide.
            </p>
          </PinnedMediaScrollItem>

          <PinnedMediaScrollItem
            image="configureV1_xucgqa"
            alt="A code sample that shows the React code, but not where to put it or how to use it."
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
              I shared these initial designs with the team and met with my
              product manager and the lead engineer on the project to discuss
              next steps. After discussing the technical feasibility, we opted
              to take the automation one step further by adding the ability to
              create or change an application directly from the Quickstart, thus
              eliminating the need to switch from the Quickstart to the
              dashboard at all.
            </p>

            <Image publicId="createAppV3_swzyle" alt="screenshot" padded />

            <p>
              We also decided that since the code samples wouldn’t be relevant
              until later in the Quickstart that we could put all of the
              application configuration steps on the right side of the new
              layout and have the content update automatically as the user
              scrolls through the guide.
            </p>

            <Image publicId="codesamplesV3_xzy7so" alt="screenshot" padded />
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
              new design and make sure we weren&rsquo;t taking the automation
              too far.
            </p>
            <p>
              The reactions to the new version of the quickstart were
              overwhelmingly positive, with participants noting that it was
              intuitive and easy to use and that having the code samples update
              as they scrolled through the instructions made following along a
              “no-brainer.”
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
              Once the design was validated I had regular syncs with my PM and
              engineering teams throughout the implementation process.
            </p>
            <p>
              After the new Quickstarts launched I conducted an additional round
              of unmoderated usability testing. Results were overwhelmingly
              positive, with just a few minor UI fixes needed. The time to
              complete the Quickstart went from around 30 minutes to about 10-15
              minutes.
            </p>
            <p className="display-xl">
              New design reduced onboarding time by more than{" "}
              <Stat value={50} suffix="%" />{" "}
            </p>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
