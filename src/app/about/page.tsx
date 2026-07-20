import type { Metadata } from "next";
import {
  ContentWrapper,
  Section,
  Grid,
  Column,
  GridSpacer,
  CaseStudyCard,
  FeaturedContentCard,
  FeaturedContentGrid,
} from "@/components/layout";

export const metadata: Metadata = {
  title: "About",
  description: "About Max Taylor",
};

export default function AboutPage() {
  return (
    <ContentWrapper>
      <Section>

        <Grid columns={[1]}>
          <Column>
            <h1 className="display-xxl head">👋 Hey there, I&#39;m Max!</h1>

            <p className="display-xl text-in text-in-delay-2">
              I work hard so my dog can have a better life
            </p>
          </Column>
        </Grid>
      </Section>

      <Section>

        <Grid columns={[1]}>
          <Column>
            <p>
              I started my career as a librarian, which is either a weird origin
              story for a product designer or a completely obvious one,
              depending on how you look at it. Librarians spend a lot of time
              thinking about how to organize information so people can actually
              find it, how to help someone who doesn't know the right
              terminology yet, and how to build systems that work for the person
              who uses them rather than the person who built them. Turns out
              that's most of what product design is too.
            </p>
            <p>
              As a senior product designer with over a decade of experience, I
              specialize in simplifying complexity — finding the patterns,
              naming the problems clearly, and creating the kind of shared
              understanding that gets teams and stakeholders aligned around the
              right work. The through line of my career has been pattern
              recognition across large, complex spaces — whether that's an
              information architecture problem, a fragmented multi-team product
              experience, or a design system that needs to scale. I'm drawn to
              the kind of problem where you have to zoom way out before you can
              figure out what you're actually solving.
            </p>
            <p>
              Lately, I've been investing heavily in my engineering skills, and
              particularly in working with design systems on both sides of the
              design-to-code handoff. That end-to-end thinking, where a naming
              decision at the token level ripples up into the component API, is
              exactly the kind of problem that just clicks for me. I'm
              particularly interested in roles where the boundary between design
              and code is something to explore rather than something to stay on
              one side of.
            </p>
            <p>
              I'm based in Portland, OR, and when I'm not working, you might find
              me lifting heavy weights at my local powerlifting gym, hiking in
              the Columbia River Gorge, reading three books at once, or just
              hanging out and taking long walks with my dog, Rufus.
            </p>
          </Column>
        </Grid>
      </Section>
    </ContentWrapper>
  );
}
