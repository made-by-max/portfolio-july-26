import type { CaseStudyMeta } from "@/lib/schemas";
import {
  Section,
  Grid,
  Column,
  CaseStudyHero,
  Image,
  Blockquote,
  BlockquoteStack,
  ListStack,
} from "@/components/layout";

export const meta: CaseStudyMeta = {
  title: "Using Voice to Capture Endoscopic Findings",
  description:
    "An AI voice solution to decrease documentation time and reduce physician burnout",
  overview:
    "I integrated an AI scribe during endoscopic procedures to reduce physicians' cognitive load and report writing time, leveraging creative prototyping for user testing and cross-team collaboration for implementation.",
  labels: ["Healthcare", "AI", "0 - 1"],
  featured: true,
  image: "voice-featured-image_sndh1d",
  date: "2026-03-31",
};

export default function Voice() {
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
            <h2>
              Gastroenterologists spend an average of 13 hours a week on
              documentation, leading to high levels of burnout
            </h2>
            <p>
              The growing complexity of healthcare procedures and regulatory
              requirements has led to an increase in the amount and the
              complexity of documentation for each patient encounter.
            </p>
            <p>
              At Olympus we explored a number of different avenues to simplify
              the documentation process, including the use of an ambient AI
              scribe to capture findings during endoscopic procedures.
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1, 1]}>
          <Column>
            <h3>Ambient scribes reduce the cognitive load during procedures</h3>
            <p>
              Traditionally, endoscopists have had to rely on their memory to
              recall the details of a procedure in order to document it after
              the fact.
            </p>
            <p>
              In more complicated procedures with multiple findings a nurse
              might capture the details on a sticky note, napkin, or other bit
              of scrap paper.
            </p>
          </Column>
          <Column>
            <Image publicId="scratch-paper_wmdnuw" alt="screenshot" />
          </Column>
        </Grid>
        <Grid columns={[1]}>
          <Column>
            <p>
              With an AI scribe, endoscopists are able to speak these details
              aloud and can be confident that the AI scribe is capturing
              everything and adding it to their report.
            </p>
            <Blockquote>
              Because of ability to use voice I won’t forget things that I’ve
              seen. If I see something on the way in and then on the way out, I
              completely forget that I’m looking for something like that. Then
              at least I’ve got a recording of me seeing something on the way in
              and then it’s already written down.
            </Blockquote>
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[3, 2]}>
          <Column>
            <h2>
              Physicians were excited, but had concerns about control and
              accuracy
            </h2>
            <p>
              Our UX Researcher conducted interviews with 12 endoscopists to
              gauge their interest in a voice solution and identify any concerns
              they had.
            </p>
          </Column>
          <Column>
            <ListStack>
              <div className="listStack">
                <h4>Time savings</h4>
                <p>
                  Doctors were very excited about using voice during a procedure
                  and believed it would save them a significant amount of time.
                </p>
              </div>
              <div className="listStack">
                <h4>Comfort with voice interfaces</h4>
                <p>
                  Most regularly used technologies like Siri or Alexa ane were
                  comfortable with voice interfaces.
                </p>
              </div>
              <div className="listStack">
                <h4>Automony</h4>
                <p>
                  Doctors wanted to be able to control when the scribe was
                  recording.
                </p>
              </div>
              <div className="listStack">
                <h4>Accuracy</h4>
                <p>
                  They wanted to be sure that the scribe would be able to
                  capture the nuances of an endoscopic procedure and filter out
                  side conversations.{" "}
                </p>
              </div>
            </ListStack>
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>User testing a voice interface presented unique challenges</h2>
            <p>
              In order validate the doctor&rsquo;s mental model before the
              backend was in place I used Claude to create a realistic
              transcript of a colonoscopy procedure, complete with side
              conversations and interruptions. I then used ElevenLabs to turn it
              into an audio recording and played that over images from a
              procedure room.
            </p>
            <p>
              The video demonstrated how doctors could use vocal commands to
              start and stop the recording and showed real time feedback on the
              monitor so they could be confident it was recording when they
              wanted and only when they wanted.
            </p>
            <p>
              At the end of the video user&rsquo;s were shown a Figma prototype
              of the post procedure report where they could see how the relevant
              information had been captured and mapped to the report in a
              structured format.{" "}
            </p>
          </Column>
        </Grid>
        <Grid columns={[1]}>
          <Column>
            <Blockquote>
              If this works it is a dream. If we can add all this information
              while we are doing the procedure and it works well and goes to the
              report and we just basically have to validate that’s amazing. I
              mean it’s really a good thing.
            </Blockquote>
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>
              The biggest design challenge wasn’t the UI - it was coordinating
              across teams
            </h2>
            <p>
              The intra-procedure experience and post procedure report writing
              experience were owned by different teams, each with their own
              roadmaps and delivery constraints.
            </p>

            <p>
              I partnered closely with the designers, engineers, and product
              managers from both teams to craft an end-to-end voice experience
              that spanned multiple touchpoints and integrated into their
              existing designs without risking their delivery timelines.
            </p>
          </Column>
        </Grid>
        <Grid columns={[1, 1]}>
          <Column>
            <h3>Adding microphone controls to the touch screen interface</h3>
            <p>
              The intra-procedure experience used a touch screen connected to
              the endoscopy tower to capture images and videos. We needed to add
              microphone controls (in case wake words were not available) and
              status to thier interface.
            </p>
          </Column>
          <Column>
            <Image publicId="intra-active_yl2u0g" alt="screenshot" />
          </Column>
        </Grid>

        <Grid columns={[1, 1]}>
          <Column>
            <h3>Adding microphone controls to the touch screen interface</h3>
            <p>
              The intra-procedure experience used a touch screen connected to
              the endoscopy tower to capture images and videos. We needed to add
              microphone controls (in case wake words were not available) and
              status to thier interface.
            </p>
          </Column>
          <Column>
            <Image publicId="intra-active_yl2u0g" alt="screenshot" />
          </Column>
        </Grid>

        <Grid columns={[1, 1]}>
          <Column>
            <h3>Mapping findings to the correct report fields</h3>
            <p>
              On the post-procedure report, I partnered with the designers on
              the report team to define how the data would flow from the backend
              to the report, ensuring that it mapped to the correct fields and
              formatted the findings with the correct structure.
            </p>
          </Column>
          <Column>
            <Image publicId="report-transcript_fnid3t" alt="screenshot" />
          </Column>
        </Grid>

        <Grid columns={[1, 1]}>
          <Column>
            <h3>Adhering to EU regulations for AI and medical devices</h3>
            <p>
              We also collaborated closely with our internal regulatory team to
              ensure we were meeting the guidelines for AI use in the medical
              field for all the jurisdictions where we planned to sell our voice
              solution. In order to meet these requirements, our designs had to
              clearly indicate which fields were populated by AI and include a
              disclaimer that all AI content be carefully reviewed by a
              physician.
            </p>
          </Column>
          <Column>
            <Image publicId="data-review-cropped_ztttj2" alt="screenshot" />
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>
              Faster documentation leads to reduced cognitive load and less
              burnout
            </h2>
            <p>
              Our user research team performed in-person testing of the
              end-to-end reporting experience and physicians were very impressed
              with both the voice caapture technology and the overall ability to
              reduce the reporting burden and cognitive load. They anticipated
              that the voice feature would save them a significant amount of
              time and allow them to devote more time to patient care.
            </p>

            <BlockquoteStack>
              <div>
                [Voice reporting] would give us a lot of time to explain to the
                patient properly what we did or to do things in the proper way,
                because sometimes we’re in a rush and we don’t have enough time
                to do all the things we have to do.
              </div>
              <div>
                I spent a lot of time doing a structured report. ... And if you
                avoid spending a lot of time doing that...with this tool we can
                save a lot of time and use this time for the procedure and the
                patient.”
              </div>
              <div>
                when there is one or two polyps, that is, you have that in your
                mind and there's no mistakes. But if there are three or four or
                five, then you sometimes, often we forget details and most of
                the times, do not have a clinical implication. If we do it
                during the procedure, you avoid these kind of problems.
              </div>
              <div>
                If this was the report I got [from Voice], I would add the
                sentence here, and I would print it.
              </div>
            </BlockquoteStack>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
