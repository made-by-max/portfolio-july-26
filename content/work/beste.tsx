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
  title: "An AI Digital Assistant for Best Buy",
  description:
    "An internal RAG-powered AI assistant embedded in Best Buy’s developer portal",
  overview:
    "Best’e is an AI-driven digital assistant within Best Buy’s Internal Developer Portal that improves developer productivity by reducing the barriers to discoverability. Best’e is backed by a Retrieval Augmented Generation architecture accessible via a natural language prompt.",
  labels: ["Developer Experience", "AI", "0 - 1"],
  featured: true,
  image: "beste-featured-image_jk9xmc",
  video: "beste_iqkvfp",
  date: "2024-01-15",
};

export default function Beste() {
  return (
    <>
      <Section>
        {meta.video ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            video={meta.video}
            videoAutoplay={meta.videoAutoplay}
            alt="Best'e chat panel open in the Best Buy Internal Developer Portal, answering a natural-language question with a RAG-sourced response"
          />
        ) : meta.image ? (
          <CaseStudyHero
            title={meta.title}
            overview={meta.overview}
            image={meta.image}
            alt="Best'e chat panel open in the Best Buy Internal Developer Portal, answering a natural-language question with a RAG-sourced response"
          />
        ) : (
          <CaseStudyHero title={meta.title} overview={meta.overview} />
        )}
      </Section>

      <GridSpacer columns={[1, 1]} />

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Discoverability is a major issue for Best Buy engineers</h2>
            <p>
              Best Buy has too many teams, services, and tools for anyone to
              track, and information is scattered across Confluence, Slack,
              GitHub, and more. Finding accurate, up-to-date answers usually
              comes down to knowing who to ask — which shuts out new team
              members and doesn’t scale. Engineers waste an estimated 80,000
              hours a year just searching for information.
            </p>
            <p>
              Best’e cuts that search time by answering common questions about
              Best Buy’s problems, tools, services, policies, and acronyms.
            </p>
          </Column>
        </Grid>
      </Section>
      <GridSpacer columns={[1, 1]} />
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Crafting the Best’e UI</h2>
            <p>
              Best’e lives in the Best Buy Internal Developer Portal, accessed
              via a floating action button on every page. It opens a side panel
              so users can ask questions right in the context of whatever
              they’re working on.
            </p>
            <Image
              publicId="besteui_yp8mqg"
              alt="Best'e's floating action button and side panel open over a page in the Best Buy Internal Developer Portal"
              padded
            />
          </Column>
        </Grid>
      </Section>
      <GridSpacer columns={[1, 1, 1]} />
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Best’e users are invested</h2>
            <p>
              Because Best’e is an internal tool built for Best Buy engineers,
              users are invested in improving it — they make useful suggestions
              and want to know exactly where its answers come from.
            </p>
            <p>
              Users rate Best’e’s response to each question, with the option to
              follow up with quick responses or free-form text.
            </p>

            <p className="display-xl">
              <Stat value={80} suffix="%" /> of users who engage with the
              feedback widget opt to leave a comment
            </p>

            <Video
              publicId="bestfdbk_bzowum"
              alt="Best'e's feedback widget prompting a rating for its response, with quick-response and free-text follow-up options"
              autoplay
              padded
            />

            <p>
              Users can also make general suggestions for improving Best’e,
              including recommending answers to questions or suggesting new data
              sets. Every suggestion is reviewed by a member of the Best’e team.
            </p>
          </Column>
        </Grid>
      </Section>
      <GridSpacer columns={[1]} />
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Best’e experiments</h2>
            <p>
              Gen-AI assistants were still new when Best’e launched in late
              2023, so alongside these core features, we ran a few experiments
              to improve the experience.
            </p>
            <Image
              publicId="bestExperiments_duxniv"
              alt="Best'e's experimental model-selection dropdown for comparing responses across different large language models"
              padded
            />

            <p>
              During the alpha release, users could switch between different
              LLMs from a drop-down menu to see which gave the most accurate
              responses.
            </p>
            <p>
              Early on, some topics had answers that varied a lot by context, so
              we experimented with letting users pick a category, or showing
              which category Best’e thought it was answering in, to hone in on
              the right response.
            </p>

            <p>
              We found that users were asking a lot of the same questions over
              and over, so we focused on nailing the accuracy of those answers
              and added autocomplete for frequent questions.
            </p>
          </Column>
        </Grid>
      </Section>
      <GridSpacer columns={[1, 1]} />
      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Outcomes</h2>
            <p>
              Despite the limited number of data sets in the early iterations,
              the initial response to Best’e was very positive and engineers
              within the company were eager to test it out. The utility of
              Best’e will likely continue to grow as more sources are added and
              more users provide feedback.
            </p>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
