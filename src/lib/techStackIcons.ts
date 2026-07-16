import anthropic from "@/assets/icons/Anthropic.svg";
import database from "@/assets/icons/database.svg";
import claude from "@/assets/icons/Claude.svg";
import css from "@/assets/icons/css.svg";
import cursor from "@/assets/icons/cursor.png";
import figma from "@/assets/icons/figma.svg";
import js from "@/assets/icons/js.png";
import nextjs from "@/assets/icons/nextjs.svg";
import replit from "@/assets/icons/replit.svg";
import openaiIcon from "@/assets/icons/openai-icon.svg";
import pinecone from "@/assets/icons/pinecone.svg";
import react from "@/assets/icons/React.svg";
import shadcn from "@/assets/icons/shadcn.svg";
import supabase from "@/assets/icons/supabase.svg";

// Keys match the bare filename (minus extension) authors use in /play
// frontmatter's techStack[].icon, e.g. icon: "pinecone" -> Anthropic.svg.
const techStackIcons: Record<string, string> = {
  Anthropic: anthropic.src,
  database: database.src,
  Claude: claude.src,
  css: css.src,
  cursor: cursor.src,
  figma: figma.src,
  js: js.src,
  nextjs: nextjs.src,
  replit: replit.src,
  "openai-icon": openaiIcon.src,
  pinecone: pinecone.src,
  React: react.src,
  shadcn: shadcn.src,
  supabase: supabase.src,
};

export function getTechStackIcon(name: string): string | undefined {
  return techStackIcons[name];
}
