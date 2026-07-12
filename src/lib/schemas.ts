import { z } from "zod";

// Case studies are authored as .tsx files (see content/work/*.tsx) that
// export this shape as `meta`, rather than MDX frontmatter — no isDraft,
// since there's no publish-gating flow for the handful of case studies.
export const CaseStudyMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  overview: z.string(),
  labels: z.array(z.string()),
  featured: z.boolean(),
  image: z.string(),
  date: z.string(),
});

export type CaseStudyMeta = z.infer<typeof CaseStudyMetaSchema>;

export const PlayFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  isDraft: z.boolean().default(true),
  featured: z.boolean(),
  image: z.string().optional(),
  date: z.string(),
  type: z.enum(["blog", "note", "project", "experiment"]),
  techStack: z
    .array(z.object({ name: z.string(), icon: z.string() }))
    .optional(),
});

export type PlayFrontmatter = z.infer<typeof PlayFrontmatterSchema>;
