import fs from "fs";
import path from "path";
import {
  WorkFrontmatterSchema,
  PlayFrontmatterSchema,
  type WorkFrontmatter,
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

export type WorkItem = WorkFrontmatter & { slug: string };
export type PlayItem = PlayFrontmatter & { slug: string };

export function getWorkItems(): WorkItem[] {
  const dir = path.join(CONTENT_ROOT, "work");
  const files = getMDXFiles(dir);

  return files.map((filePath) => {
    const slug = path.basename(filePath, ".mdx");
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = extractFrontmatter(source);

    const parsed = WorkFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/work/${slug}.mdx:\n${parsed.error.toString()}`
      );
    }

    return { ...parsed.data, slug };
  });
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return getWorkItems().find((item) => item.slug === slug);
}

export function getPublishedWorkItems(): WorkItem[] {
  return getWorkItems().filter((item) => !item.isDraft);
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

export function getFeaturedItems(): {
  work: WorkItem[];
  play: PlayItem[];
} {
  return {
    work: getPublishedWorkItems().filter((item) => item.featured),
    play: getPublishedPlayItems().filter((item) => item.featured),
  };
}
