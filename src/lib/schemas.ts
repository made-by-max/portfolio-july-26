import { z } from "zod";

export const WorkFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  overview: z.string(),
  tags: z.array(z.string()),
  isDraft: z.boolean().default(true),
  featured: z.boolean(),
  image: z.string(),
  date: z.string(),
});

export type WorkFrontmatter = z.infer<typeof WorkFrontmatterSchema>;

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
