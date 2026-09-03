# @omni/ui

Step 3 of the implementation plan: one shared component set, skinned
entirely in `@omni/tokens`, built once for all eight products instead of
per-repo. Plain HTML+Tailwind where a component has no real interaction
logic; unstyled Radix primitives underneath the ones that do (dialog,
tabs, tooltip, dropdown menu, select) — never a component library's own
default skin.

## Components

| Component | Interaction primitive | Notes |
|---|---|---|
| `Button` | — | `variant`: primary / secondary / ghost |
| `Input` | — | Label always visible, 44px min height |
| `Select` | Radix Select | Keyboard nav, positioning |
| `Badge` | — | `tone`: success/warning/error/info/accent — `accent` only for a genuine product-specific state |
| `Alert` | — | `tone`: success/warning/error/info |
| `EmptyState` | — | `title`/`description` required — no filler copy allowed by the type |
| `StatRow` | — | Horizontal scroll-snap strip under `sm`, static grid at `sm`+ |
| `DataTable` | — | Real `<table>` at `sm`+; each row becomes a card below `sm` (doc: "Table → list") |
| `Tabs` | Radix Tabs | |
| `Tooltip` | Radix Tooltip | Wrap the app once in `<TooltipProvider>` |
| `DropdownMenu` | Radix DropdownMenu | |
| `Dialog` | Radix Dialog | Centered at `sm`+, bottom sheet with real drag-to-dismiss below `sm` |
| `BottomTabNav` | — | Fixed, 56px, under `sm` only, caps at 5 destinations (warns past that in dev) |
| `Sidebar` | — | Full sidebar at `lg`+ (1024px), icon rail from `sm`–`lg`, hidden under `sm` |

## Breakpoint mapping

The doc's three breakpoints map directly onto Tailwind's defaults — nothing
custom needed:

| Doc | Tailwind | Used as |
|---|---|---|
| mobile (< 640px) | unprefixed (mobile-first base) | `BottomTabNav` visible, `Sidebar` hidden, `DataTable` renders cards, `Dialog` renders as a bottom sheet |
| tablet (640–1023px) | `sm:` | `Sidebar` visible as icon rail, `DataTable` renders as a table, `Dialog` centers |
| desktop (≥ 1024px) | `lg:` | `Sidebar` shows full labels |

## Install (per product repo, once `@omni/tokens` is published)

```jsonc
"dependencies": {
  "@omni/tokens": "github:omniglobal-one/omni-tokens#v1.0.0",
  "@omni/ui": "github:omniglobal-one/omni-ui#v1.0.0"
}
```

Until then, both resolve via `file:../omni-tokens` / `file:../omni-ui` for
local development against the pilot (see the pilot repo's package.json).

## What was found by actually compiling this against the preset

Writing the components against `@omni/tokens/tailwind-preset` and running
them through the real Tailwind CLI (not just typechecking) surfaced one
real bug: `bg-accent-subtle/8` — used in `Select`, `Sidebar`, and
`DataTable` for the doc's "subtle" selection wash — silently compiled to
nothing, because Tailwind's default opacity scale has no `8` stop. Fixed
in `@omni/tokens`'s preset by adding `theme.extend.opacity[8] = '0.08'`,
not by changing every call site — one fix, all eight products get it.

## Not yet in this package

- **Storybook / visual test harness.** Worth adding before the rollout in
  Step 6, so a change to one component can be checked against all twelve
  at once instead of only inside whichever product happens to use it.
- **A swipe-anywhere-on-the-sheet gesture.** The current drag-to-dismiss
  only triggers from the handle bar itself, which is correct and safe
  (no conflict with scrolling sheet content), but native bottom sheets
  often also accept a drag starting anywhere on the sheet when it's
  already scrolled to the top — not implemented here yet.
