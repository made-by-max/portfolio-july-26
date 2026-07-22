import type { CaseStudyMeta } from "@/lib/schemas";
import {
  Section,
  Grid,
  Column,
  CaseStudyHero,
  Image,
  Blockquote,
  BlockquoteStack,
  ListStack,Video
} from "@/components/layout";

export const meta: CaseStudyMeta = {
  title: "Using Voice to Capture Endoscopic Findings",
  description:
    "An AI voice solution to decrease documentation time and reduce physician burnout",
  overview:
    "I integrated an AI scribe during endoscopic procedures to reduce physicians’ cognitive load and report writing time, leveraging creative prototyping for user testing and cross-team collaboration for implementation.",
  labels: ["Healthcare", "AI", "0 - 1"],
  featured: true,
  video: "reportfill_tshlgi",
  image: "voice-featured-image_sndh1d",
  date: "2026-03-31",
};

export default function Voice() {
  return (
    <>
      <Section>
        {meta.video ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            video={meta.video}
            videoAutoplay={meta.videoAutoplay}
            alt="Endoscopy procedure room monitor showing the AI voice scribe capturing findings in real time"
          />
        ) : meta.image ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            image={meta.image}
            alt="Endoscopy procedure room monitor showing the AI voice scribe capturing findings in real time"
          />
        ) : (
          <CaseStudyHero title={meta.title} overview={meta.overview} />
        )}
      </Section>
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>
              Gastroenterologists spend an average of 13 hours a week on
              documentation, leading to high levels of burnout
            </h2>
            <p>
              Growing complexity in healthcare procedures and regulatory
              requirements has increased both the volume and complexity of
              documentation for each patient encounter.
            </p>
            <p>
              At Olympus, we explored several ways to simplify documentation,
              including an ambient AI scribe that captures findings during
              endoscopic procedures.
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
              In complex procedures with multiple findings, a nurse might
              capture details on a sticky note, napkin, or other scrap of paper.
            </p>
          </Column>
          <Column>
            <Image
              publicId="scratch-paper_wmdnuw"
              alt="A nurse's handwritten notes on a scrap of paper, the old way of tracking findings during a procedure"
              padded
            />
          </Column>
        </Grid>
      </Section>
      <Section>
        <Grid columns={[1]}>
          <Column>
            <p>
              With an AI scribe, endoscopists can speak these details aloud,
              confident it’s capturing everything and adding it to their report.
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
        <Grid columns={[1, 1]}>
          <Column>
            <h2>
              Physicians were excited, but had concerns about control and
              accuracy
            </h2>
            <p>
              Our UX researcher interviewed 12 endoscopists to gauge their
              interest in a voice solution and surface any concerns.
            </p>
          </Column>
          <Column>
            <ListStack>
              <div className="listStack">
                <h4>Time savings</h4>
                <p>
                  Doctors were excited about using voice during a procedure and
                  expected it to save them a significant amount of time.
                </p>
              </div>
              <div className="listStack">
                <h4>Comfort with voice interfaces</h4>
                <p>
                  Most regularly used technologies like Siri or Alexa and were
                  already comfortable with voice interfaces.
                </p>
              </div>
              <div className="listStack">
                <h4>Autonomy</h4>
                <p>
                  Doctors wanted to be able to control when the scribe was
                  recording.
                </p>
              </div>
              <div className="listStack">
                <h4>Accuracy</h4>
                <p>
                  They wanted assurance the scribe could capture the nuances of
                  an endoscopic procedure and filter out side conversations.
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
              In order to validate the doctor’s mental model before the
              backend was in place I used Claude to create a realistic
              transcript of a colonoscopy procedure, complete with side
              conversations and interruptions. I then used ElevenLabs to turn it
              into an audio recording and played that over images from a
              procedure room.
            </p>
            <p>
              The video demonstrated how doctors could use vocal commands to
              start and stop recording, with real-time feedback on the monitor
              so they could be confident it was recording only when they wanted.
            </p>

            <Video
              publicId="demo-clip_ffvbrz"
              alt="Video of a procedure room with an audio track of a colonoscopy procedure"

              padded
            />

            <p>
              At the end of the video, users were shown a Figma prototype of the
              post-procedure report, showing how the relevant information had
              been captured and mapped into a structured format.
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
              The biggest design challenge wasn’t the UI — it was coordinating
              across teams
            </h2>
            <p>
              The intra-procedure experience and the post-procedure report
              writing experience were owned by different teams, each with its
              own roadmap and delivery constraints.
            </p>

            <p>
              I partnered closely with designers, engineers, and product
              managers from both teams to craft the end-to-end voice experience
              that spanned multiple touchpoints and integrated into their
              existing designs without risking their delivery timelines.
            </p>
          </Column>
        </Grid>
        <Grid columns={[1]}>
          <Column>
            <h3>Adding microphone controls to the touch screen interface</h3>
            <p>
              The intra-procedure experience used a touch screen connected to
              the endoscopy tower to capture images and videos. We needed to add
              microphone controls (in case wake words were not available) and
              status to their interface.
            </p>

            <Video
              publicId="intraprocedure_pof6ki"
              alt="Endoscopy tower touch screen with microphone controls and recording status added alongside the image and video capture tools"
              autoplay
              padded
            />


          </Column>
        </Grid>

        <Grid columns={[1]}>
          <Column>
            <h3>Mapping findings to the correct report fields</h3>
            <p>
              On the post-procedure report, I partnered with the report team’s
              designers to define how data would flow from the backend into the
              report, ensuring findings mapped to the correct fields and
              formatted the findings with the correct structure.
            </p>

            <Video
              publicId="reportfill_tshlgi"
              alt="Post-procedure report with voice-transcribed findings mapped into their correct structured fields"
              autoplay
              padded
            />
          </Column>
        </Grid>

        <Grid columns={[1]}>
          <Column>
            <h3>Adhering to EU regulations for AI and medical devices</h3>
            <p>
              I also worked closely with our internal regulatory team to meet
              AI-in-medical-devices guidelines across every jurisdiction where
              we planned to sell the voice solution. To comply, our designs had
              to clearly flag which fields were AI-populated and include a
              disclaimer that all AI content must be reviewed by a physician.
            </p>

            <Video
              publicId="AI_approval_ksomoi"
              alt="Post-procedure report highlighting AI-populated fields with a disclaimer prompting physician review"
              autoplay
              padded
            />
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
              Our user research team ran in-person testing of the end-to-end
              reporting experience. Physicians were impressed with both the
              voice capture technology and the overall ability to reduce
              reporting burden and cognitive load, and expected it would save
              significant time and free them up for patient care.
            </p>

            <Blockquote>
              If this was the report I got [from Voice], I would add the
              sentence here, and I would print it.
            </Blockquote>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
