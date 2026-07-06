# CLAUDE.md

General working rules for this project. These apply throughout the entire
build process, not just initial scaffolding.

## Initiative — check before adding anything I didn't ask for

- Fine to do without asking: making reasonable technical decisions, adding
  error handling, accessibility attributes, and loading states, and doing the
  mechanical follow-through of a request (e.g. if I ask for a tag filter,
  it's fine to just write the filter function).
- **Check with me first**: adding new components, finishing or extending
  unfinished/pseudocode logic, or any other creative/product decision I
  didn't explicitly ask for.
- If I ask for help with something specific (e.g. debugging why an import
  isn't working), stay focused on that. Don't go implement unrelated logic
  instead, even if it seems like a natural next step — solve the thing I
  actually asked about first.

## CSS

- Use modern CSS features where appropriate: scroll-driven animations, view
  transitions, container queries, `:has()`, and similar. See the modern-css
  skill file for full guidance — consult it before writing CSS.
  Headline rules (in case the skill isn't loaded in a given session):
  - Prefer container queries over media queries for component-level
    responsiveness where it makes sense.
  - Use `:has()` for parent/sibling-state styling instead of adding extra
    classes via JS where reasonably possible.
  - Consider view transitions for page/state changes rather than manual
    enter/exit animation logic.
- **Use logical properties, not physical ones.** E.g. `margin-block-end` not
  `margin-bottom`, `inset-inline-start` not `left`, `padding-inline` not
  `padding-left`/`padding-right`, `text-align: start` / `text-align: end` not
  `left`/`right`. This applies throughout all CSS Modules.
- **Never hardcode design values.** Colors, font sizes, and spacing must
  always reference existing custom properties — never hardcoded values.
  Structural/non-design literals (e.g. `z-index` integers, unitless `1` for
  line-height/flex, `0` for resets) are fine as plain values and don't need
  a custom property.
- **Only reference custom properties that actually exist.** Never invent a
  `var()` fallback value for a custom property that isn't defined anywhere
  (e.g. `var(--spacing-md, 16px)` where `--spacing-md` was never declared).
  If a value is needed and no custom property exists for it yet, add it to
  the tokens file and say so explicitly in your response — don't paper over
  it with a hardcoded fallback.
- New custom properties are allowed, including component-scoped ones when a
  value is truly local to a single component and unlikely to be reused
  elsewhere. Either way, **flag any new custom property in your response**
  (what it's called, where it lives, and why it was needed) so I can review
  it.
- Do not force `aspect-ratio` on images or video — use real intrinsic
  width/height instead (see project-specific notes on Cloudinary image/video
  handling).

## Code style

- Prefer straightforward code over clever/abstracted code. Avoid unnecessary
  indirection or premature abstraction.
- Consistent formatting — Prettier handles this; don't fight it.
- Meaningful variable, function, and file names.
- No component size limits for now — don't split files up preemptively.

## Testing

- No formal automated test suites for this project. It's a static content
  site with no complex business logic or user data — the practical risk
  surface is small. The one safety net that matters is Zod validation on
  MDX frontmatter at build time, which is already part of the content
  pipeline.

## Process

- Don't suggest commit messages or manage git — I handle version control
  myself.
- When you make a decision on my behalf — even a small one — state the
  assumption explicitly in your response rather than silently picking
  something. Trivial calls can still just be made; just say what you chose
  and why.
