import { z } from "zod";

// Case studies are authored as .tsx files (see content/work/*.tsx) that
// export this shape as `meta`, rather than MDX frontmatter — no isDraft,
// since there's no publish-gating flow for the handful of case studies.
// image/video are both optional, but a Hero needs one or the other — see
// the .refine() below (unlike PlayFrontmatterSchema, every case study
// today has a hero image, so enforcing "at least one" here is safe).
export const CaseStudyMetaSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    overview: z.string(),
    labels: z.array(z.string()),
    featured: z.boolean(),
    image: z.string().optional(), // Cloudinary public ID
    video: z.string().optional(), // Cloudinary public ID
    videoAutoplay: z.boolean().optional(), // defaults to false (controls) if omitted
    date: z.string(),
  })
  .refine((data) => Boolean(data.image || data.video), {
    message: "Either image or video must be provided",
    path: ["image"],
  });

export type CaseStudyMeta = z.infer<typeof CaseStudyMetaSchema>;

// No "at least one of image/video" refine here, unlike CaseStudyMetaSchema —
// plenty of existing /play entries (plain notes/blog posts) legitimately
// have neither, and WritingHero already renders fine with no media at all.
export const PlayFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()),
  isDraft: z.boolean().default(true),
  featured: z.boolean(),
  image: z.string().optional(),
  video: z.string().optional(), // Cloudinary public ID
  videoAutoplay: z.boolean().optional(), // defaults to false (controls) if omitted
  date: z.string(),
  type: z.enum(["blog", "note", "project", "experiment"]),
  techStack: z
    .array(z.object({ name: z.string(), icon: z.string() }))
    .optional(),
  buttons: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
        variant: z.enum(["primary", "secondary", "ghost"]).optional(),
      })
    )
    .optional(),
});

export type PlayFrontmatter = z.infer<typeof PlayFrontmatterSchema>;
