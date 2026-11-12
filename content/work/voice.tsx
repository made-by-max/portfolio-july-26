import type { CaseStudyMeta } from "@/lib/schemas";
import {
  Section,
  Grid,
  Column,
  CaseStudyHero,
  Image,
  Blockquote,
  ListStack,
  Video,
  ImageTabsItem,
  ImageTabs,
  WideScrollImage,
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
            <h2>Navigating ambiguous constraints</h2>
            <p>
              This project came with a lot of unknowns and unanswered questions,
              including what hardware the feature would run on, how voice
              controls would be triggered, how to display system status, and
              more. Many were dependent on outside forces like other teams,
              external vendors, and product leadership, so I often felt like I
              was designing with more questions than answers.
            </p>
            <p>
              In order to move forward, I mapped out each of the unknowns and
              the possible directions for each and created user flows for all
              the different permutations.{" "}
            </p>
            <p>
              I identified the flow with the least friction for the end user,
              the flow with the most concessions, and the flow that seemed most
              likely based on our constraints.
            </p>

            <WideScrollImage
              publicId="Highly_complex_flow_ouhyh5"
              alt="Most complex user flow permutation, a long swimlane diagram mapping nurse, endoscopist, anesthesiologist, hardware, vendor software, and user interface actions across many procedure stages"
            />
            <WideScrollImage
              publicId="Less_complex_flow_yzk12z"
              alt="Least complex user flow permutation, a swimlane diagram where a central room microphone continuously records and transcribes from procedure start to post-procedure, with no voice triggers, recording indicator, or in-room feedback"
            />

            <p>
              I led a series of story mapping sessions with my PM, UX
              researcher, and engineering team to align on the most likely user
              flow and plan different phases of development.
            </p>
            <WideScrollImage
              publicId="Most_realistic_ct4p6k"
              alt="Most likely user flow based on project constraints, a swimlane diagram mapping each role, hardware, vendor software, and user interface step across the stages of a procedure"
            />
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>User testing a voice interface presented unique challenges</h2>
            <p>
              I wanted to validate the user flow against the doctors’ mental
              models before the engineering work began, but with almost no
              on-screen interactions I had to get creative. I used Claude to
              create a realistic transcript of a colonoscopy procedure, complete
              with side conversations and interruptions. I then used ElevenLabs
              to turn it into an audio recording and played that over images
              from a procedure room.
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
            <h2>Dealing with an unexpected twist</h2>

            <p>
              With the user flow validated, I was ready to move forward when we
              ran into a major speed bump.
            </p>
            <p>
              We were partnering with a voice AI company called Tandem to handle
              the backend part of parsing the speech, in part to reduce our
              engineering load, but primarily because they already had clearance
              as a medical device and Olympus was looking to avoid that
              regulatory burden.
            </p>

            <p>
              Our intention had always been to treat Tandem as an API and use
              our own UI, but there was a communication breakdown somewhere
              along the way, and we found out several months into the project
              that in order to meet the EU medical device requirements, the
              human-in-the-loop portion of the interface would have to be
              performed using Tandem’s UI and not the Olympus UI we’d been
              building. That meant I had to go back to the drawing board to
              figure out how to adapt our existing user flow and reporting
              product to accommodate an entirely new interface.
            </p>
            <p>
              I coordinated closely with our in-house regulatory team as well as
              the designers and PMs for adjacent features that would be
              impacted, and I came up with four potential flows that would
              ensure we were in compliance.
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>
        <ImageTabs>
          <ImageTabsItem
            image="Tandem-Oly-Option-1_zkkyxh"
            alt="Option 1, pure OlySense frontend: post-procedure flow where all voice content is reviewed, edited, and approved in the OlySense report, with pros and cons notes and report wireframes"
          >
            <h3>OlySense-only UI</h3>
            <p>
              Build in-house or work with a different vendor. Larger time and
              engineering effort, but Olympus retains complete control of the
              UI.
            </p>
          </ImageTabsItem>

          <ImageTabsItem
            image="Tandem-Oly-Option-2_itqqnz"
            alt="Option 2, mostly Tandem when using voice: post-procedure flow where the entire report is written in the Tandem UI, with pros and cons notes and report wireframes"
          >
            <h3>Tandem for voice procedures</h3>
            <p>
              Use the Tandem UI for voice procedures and the OlySense UI for
              other procedures. Preserves both UIs, but requires users to learn
              and use two completely different UIs depending on the procedure.
            </p>
          </ImageTabsItem>

          <ImageTabsItem
            image="Tandem-Oly-Option-3_wn6vfz"
            alt="Option 3, Tandem within OlySense: post-procedure flow where voice content is reviewed in a Tandem iFrame inside the OlySense report, with pros and cons notes and report wireframes"
          >
            <h3>Tandem within OlySense</h3>
            <p>
              Incorporate the Tandem UI into the OlySense report as an iFrame.
              Solves the regulatory issue, but presents two different UIs on the
              same screen.
            </p>
          </ImageTabsItem>
          <ImageTabsItem
            image="Tandem-Oly-Option-4_kjvoaw"
            alt="Option 4, Tandem before OlySense: post-procedure flow where voice content is approved in the Tandem UI and then populates the OlySense report, with pros and cons notes and report wireframes"
          >
            <h3>Tandem before OlySense</h3>
            <p>
              Users approve findings in the Tandem UI before moving to the
              OlySense UI.
            </p>
          </ImageTabsItem>
        </ImageTabs>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <p>
              I presented the options to the impacted teams, our regulatory
              department, and product leadership. The consensus was that while
              the OlySense-only UI flow was our ideal solution, Tandem was
              unlikely to agree to it and the next best option was the Tandem
              before OlySense flow.
            </p>
            <p>
              I worked with our regulatory team to come up with an argument for
              the first option that Tandem’s regulatory team might accept,
              though we knew it was a long shot. I met with their team and
              presented our case, but, as expected, they rejected it. I then
              came back with our fallback option, and we were able to reach a
              compromise that worked for both sides.
            </p>
            <Image
              publicId="Aligned_flow_igno2e"
              alt="Aligned workflow, Tandem before OlySense: voice content is reviewed and approved in a Tandem modal, then populates the OlySense report for final review and submission, with the remaining pros and cons"
              padded
            />
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
              report, ensuring findings mapped to the correct fields and were
              formatted with the correct structure.
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
            <p>
              This feature is expected to launch in Europe in April 2027, with a
              limited release to partner hospitals in January 2027.
            </p>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
