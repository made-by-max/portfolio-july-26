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
    "An internal RAG-powered AI assistant embedded in Best Buy's developer portal",
  overview:
    "Best’e is an AI-driven digital assistant within Best Buy’s Internal Developer Portal that improves developer productivity by reducing the barriers to discoverability. Best’e is backed by a Retrievel Augmented Generation architecture accessible via a natural language prompt.",
  labels: ["Developer Experience", "AI"],
  featured: true,
  image: "beste-featured-image_jk9xmc",
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
            <h2>Discoverability is a major issue for Best Buy engineers</h2>
            <p>
              It’s not easy to discover information within Best Buy. There’s too
              many teams, services, and tools for anybody to keep track of and
              information is spread across Confluence, Slack, GitHub, and other
              tools. Finding accurate and up-to-date information frequently
              comes down to knowing who to ask, which presents barriers to new
              team members and doesn’t work at scale. Engineers waste an
              estimated 80,000 hours a year searching for information.
            </p>
            <p>
              Best’e can reduce the amount of time spent searching for
              information by answering basic questions about common problems,
              tools, services, policies, and acronyms at Best Buy.
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Crafting the Best’e UI</h2>
            <p>
              Best’e is located in the Best Buy Internal Developer Portal. It’s
              accessed via a floating action button on every page, which opens
              up a side panel, so that users can ask questions within the
              context of whatever they’re working on.
            </p>
            <Image publicId="besteui_yp8mqg" alt="screenshot" padded />
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Best’e users are invested</h2>
            <p>
              Because Best’e is an internal tool for Best Buy engineers, users
              are extremely invested in making useful suggestions, and are very
              interested in where Best’e is pulling its data from.
            </p>
            <p>
              Users are prompted to rate Best’e’s response to each question and
              can follow-up with quick responses or free form text.
            </p>
            <p>
              80% of users who engage with the feedback widget opt to leave a
              comment.
            </p>

            <Image publicId="bestFeedback_qjf40n" alt="screenshot" padded />

            <p>
              Users can also make general suggestions for improving Best’e,
              including recommending answers to questions or suggesting new data
              sets. Every suggestion is reviewed by a member of the Best’e team.
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Best’e Experiments</h2>
            <p>
              Gen-AI assistants were still relatively new when Best’e launched
              in late 2023, so in addition to these core features, we also
              introduced a few experiments to improve the Best’e experience.
            </p>
            <Image publicId="bestExperiments_duxniv" alt="screenshot" padded />

            <p>
              During the alpha release of Best’e, users were encouraged to
              experiment with different Large Language Models to see which was
              giving the most accurate responses. Users could use the drop down
              menu to select different options.
            </p>
            <p>
              We had some issues early on with topics that could be answered
              very differently in different contexts, so we were experimenting
              with letting users pick from potential categories, or showing the
              category Best’e thought it was answering in order to hone in on
              the best answer.
            </p>

            <p>
              We found that users were asking a lot of the same questions over
              and over, so we focused a lot of effort on ensuring the accuracy
              of those answers. We also added an autocomplete feature for
              frequent questions.
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>
        <Grid columns={[1]}>
          <Column>
            <h2>Outcomes</h2>
            <p>
              The initial response to Best’e has been quite positive, and
              engineers have been eager to test it out. It’s still in the early
              stages of development and is relying on a fairly small number of
              data sources, which limits the types of questions that can be
              answered. However, given its early success, we are confident that
              as we add more data sources Best’e will deliver tremendous value
              towards improving developer efficiency.
            </p>
          </Column>
        </Grid>
      </Section>
    </>
  );
}
