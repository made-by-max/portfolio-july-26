import fs from "fs";
import path from "path";
import {
  CaseStudyMetaSchema,
  PlayFrontmatterSchema,
  type CaseStudyMeta,
  type PlayFrontmatter,
} from "./schemas";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function parseFrontmatter(raw: string): Record<string, unknown> {
  const lines = raw.split("\n");
  const result: Record<string, unknown> = {};

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();

    if (value === "true") {
      result[key] = true;
    } else if (value === "false") {
      result[key] = false;
    } else if (value.startsWith("[") && value.endsWith("]")) {
      result[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      result[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return result;
}

function extractFrontmatter(source: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content: source };
  return {
    data: parseFrontmatter(match[1]),
    content: source.slice(match[0].length).trim(),
  };
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => path.join(dir, f));
}

export type WorkItem = CaseStudyMeta & { slug: string };
export type PlayItem = PlayFrontmatter & { slug: string };

function getTSXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => path.join(dir, f));
}

// Case studies live as plain .tsx files exporting a `meta` object (see
// content/work/*.tsx), so building the list requires dynamically importing
// each module rather than parsing frontmatter off disk.
export async function getWorkItems(): Promise<WorkItem[]> {
  const dir = path.join(CONTENT_ROOT, "work");
  const files = getTSXFiles(dir);

  return Promise.all(
    files.map(async (filePath) => {
      const slug = path.basename(filePath, ".tsx");
      const mod = await import(`../../content/work/${slug}.tsx`);

      const parsed = CaseStudyMetaSchema.safeParse(mod.meta);
      if (!parsed.success) {
        throw new Error(
          `Invalid meta export in content/work/${slug}.tsx:\n${parsed.error.toString()}`
        );
      }

      return { ...parsed.data, slug };
    })
  );
}

export async function getWorkBySlug(
  slug: string
): Promise<WorkItem | undefined> {
  const items = await getWorkItems();
  return items.find((item) => item.slug === slug);
}

// Follows the same order getWorkItems() returns (also what the /work index
// renders), so "next" always matches what's visually next in that list.
// Wraps around from the last case study back to the first.
export async function getNextWorkItem(
  slug: string
): Promise<WorkItem | undefined> {
  const items = await getWorkItems();
  if (items.length < 2) return undefined;

  const index = items.findIndex((item) => item.slug === slug);
  if (index === -1) return undefined;

  return items[(index + 1) % items.length];
}

export function getPlayItems(): PlayItem[] {
  const dir = path.join(CONTENT_ROOT, "play");
  const files = getMDXFiles(dir);

  return files.map((filePath) => {
    const slug = path.basename(filePath, ".mdx");
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = extractFrontmatter(source);

    const parsed = PlayFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/play/${slug}.mdx:\n${parsed.error.toString()}`
      );
    }

    return { ...parsed.data, slug };
  });
}

export function getPlayBySlug(slug: string): PlayItem | undefined {
  return getPlayItems().find((item) => item.slug === slug);
}

export function getPublishedPlayItems(): PlayItem[] {
  return getPlayItems().filter((item) => !item.isDraft);
}

export async function getFeaturedItems(): Promise<{
  work: WorkItem[];
  play: PlayItem[];
}> {
  const work = await getWorkItems();
  const play = getPublishedPlayItems();

  return {
    work: work.filter((item) => item.featured),
    play: play.filter((item) => item.featured),
  };
}
