---
name: Warm Shelter Modern
colors:
  surface: '#f7faf5'
  surface-dim: '#d8dbd6'
  surface-bright: '#f7faf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f0'
  surface-container: '#ecefea'
  surface-container-high: '#e6e9e4'
  surface-container-highest: '#e0e3df'
  on-surface: '#191c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#2d312e'
  inverse-on-surface: '#eff2ed'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#0e6c4a'
  on-secondary: '#ffffff'
  secondary-container: '#a0f4c8'
  on-secondary-container: '#19724f'
  tertiary: '#500c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#741b04'
  on-tertiary-container: '#ff8364'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#a0f4c8'
  secondary-fixed-dim: '#85d7ad'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a2'
  on-tertiary-fixed: '#3c0700'
  on-tertiary-fixed-variant: '#83260e'
  background: '#f7faf5'
  on-background: '#191c1a'
  surface-variant: '#e0e3df'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

The design system projects empathy, warmth, operational rigor, and unwavering credibility. Animal rescue and adoption platforms live at the nexus of emotional vulnerability and serious logistical responsibility; the visual language must therefore balance heartwarming approachability with orderly, institutional clarity. 

The aesthetic model synthesizes **Modern Humanist Minimalism** with **Organic Tactility**:
- Crisp, intentional layout structures mitigate cognitive load for shelter staff and prospective adopters alike.
- Generous internal padding and fluid curvatures communicate gentleness and safe harbor.
- Color and micro-details echo nature, sunlight, and domestic comfort, rejecting cold corporate clinical aesthetics while avoiding chaotic, childish cartoon styles.
- Interactions are reassuring and tactile, prioritizing accessible clarity, calm feedback states, and frictionless decision paths.

## Colors

The palette grounds the interface in nature-derived tones, using rich botanical greens for trust and authority, counterbalanced by sun-warmed neutrals and an alert terracotta accent.

### Color Tokens & Roles

- **Primary (`#1B4332`)**: Deep Forest Green. Anchor for primary actions, navigation shells, high-contrast headings, and foundational branding. A lighter active variation (`#2D6A4F`) handles interactive states (hover/focus).
- **Secondary (`#74C69D`)**: Soft Sage. Provides supportive brand presence, active highlights, success indications, and gentle structural emphasis. An ultra-soft tint (`#D8F3DC`) provides tinted surface backgrounds and non-disruptive card fills.
- **Tertiary / Accent (`#E76F51`)**: Terracotta / Friendly Orange. Used intentionally for rescue urgency badges, high-priority notifications, foster drives, and key call-to-action badges. An amber tint (`#F4A261`) supports secondary warnings and warm badges.
- **Backgrounds & Canvas**:
  - Base Page Canvas: `#FDFBF7` (Warm Cream). Eliminates harsh glare, introducing organic domestic comfort.
  - Surface Elevated / Card Fill: `#FFFFFF` (Clean White). Provides crisp contrast against the warm canvas.
  - Secondary Container / Subtle Fill: `#F4EFEA` (Warm Sand). Used for table headers, inactive segments, and nested input regions.
- **Neutrals & Text Hierarchy**:
  - Text Primary: `#2D312E` (Earthy Charcoal, ensuring AAA contrast across cream and white).
  - Text Secondary: `#59605B` (Muted Woodland).
  - Borders & Dividers: `#E5DFD7` (Soft Sand Border) and `#D0E4D7` (Subtle Sage Border for active components).

## Typography

The type system is powered by **Plus Jakarta Sans**, a modern humanist geometric grotesque font whose soft, open counters and subtle geometric rhythm infuse warmth, legibility, and contemporary sophistication into pet profiles, medical histories, and adoption forms alike.

### Typographic Principles

- **Clear Information Density**: Body text maintains a relaxed 1.6x line height to support comfortable reading of detailed behavioral assessments, shelter logs, and pet adoption backstories.
- **Rhythmic Weights**: Use `700` and `800` weights exclusively for headlines and major hero units to communicate vitality and decisive structure. Reserve `600` for titles, micro-headers, buttons, and badges. Use `400` for conversational body copy and descriptive metadata.
- **Accessible Scale**: Micro-text never dips below 11px. All critical data points (intake dates, breed identification, medical indicators) are mapped to `label-md` or higher with enhanced letter-spacing to prevent visual clumping.

## Layout & Spacing

The layout model is anchored on an 8pt base grid unit, utilizing an adaptive fluid-grid structure that smoothly resizes across standard viewports.

### Breakpoints & Columns

- **Mobile (< 768px)**: 4 columns, `margin-sm` (16px), `gutter-sm` (16px). Single-column feeds for pet cards and medical records; sticky bottom actions for intake and adoption application steps.
- **Tablet (768px – 1199px)**: 8 columns, `margin-md` (32px), `gutter` (24px). Split master-detail views (e.g., shelter kennel map alongside animal status sheet).
- **Desktop (≥ 1200px)**: 12 columns, max-width container capped at `1440px`, `margin-lg` (48px), `gutter-lg` (32px). Multi-column dashboard workflows, search facet rails, and gallery card grids.

### Spatial Rhythm

- Internal card and container padding uses `space-lg` (24px) for prominent animal cards and modal dialogs, scaling to `space-md` (16px) on compact dashboard metrics.
- Sibling relationships (e.g., pet tag lists, form labels to inputs) strictly use `space-xs` (4px) and `space-sm` (8px) gaps.
- Distinct functional sections within management layouts are separated by `space-2xl` (48px) to provide clean cognitive separation without heavy divider lines.

## Elevation & Depth

Visual hierarchy leverages **Ambient Warm Tonal Layering** coupled with diffused, nature-tinted drop shadows. Stark black shadows and harsh grey borders are excluded in favor of organic, warm-cast depths.

### Depth Levels

- **Level 0 (Flat Canvas)**: Canvas background `#FDFBF7`. Pure base layer for page backgrounds and layout canvas.
- **Level 1 (Resting Cards & Containers)**: Clean white `#FFFFFF` surface elevated over warm cream, encased with a delicate `1px solid #E5DFD7` border and an ambient shadow: `box-shadow: 0 2px 8px -2px rgba(27, 67, 50, 0.04), 0 4px 16px 0 rgba(45, 106, 79, 0.03)`.
- **Level 2 (Interactive Hover & Flyouts)**: Lifted state on animal profile cards, filter popovers, and segmented controls: `box-shadow: 0 8px 24px -4px rgba(27, 67, 50, 0.08), 0 2px 8px -1px rgba(27, 67, 50, 0.04)`. Accompanied by a 2px upward translation (`translateY(-2px)`).
- **Level 3 (Modals & Emergency Drawers)**: High-prominence overlays for medical incident logs, expedited adoption forms, and global search overlays: `box-shadow: 0 20px 40px -8px rgba(27, 67, 50, 0.16), 0 4px 12px 0 rgba(27, 67, 50, 0.06)`. Backdropped by an organic wash: `rgba(27, 67, 50, 0.4)` with an `8px` backdrop blur.

## Shapes

The system relies on generous, friendly curves that soften the visual weight of dense medical records and operational shelter tables.

### Curvature Tokens & Specs

- **Base Radius (`rounded-md`, 8px)**: Inputs, small action buttons, table cell inner highlights, and nested tooltips.
- **Component Large (`rounded-lg`, 16px)**: Standard animal profile cards, list item groupings, alert banners, and interactive filter controls.
- **Component Extra-Large (`rounded-xl`, 24px)**: Feature hero cards, pet highlight showcases, shelter intake dialogs, and slide-out detail drawers.
- **Full Pill (`rounded-full`, 9999px)**: Tags, urgency badges, status chips, floating action indicators, and avatar enclosures.

## Components

### Buttons
- **Primary**: Solid Deep Forest Green (`#1B4332`), white label, `rounded-md` (or `rounded-full` for consumer-facing CTA), 12px 24px padding (`label-lg`). Hover shifts to `#2D6A4F` with Level 2 elevation.
- **Secondary**: Soft Sage tint (`#D8F3DC`) with Forest Green text (`#1B4332`), hover tint `#74C69D` at 20% opacity.
- **Tertiary / Urgent**: Terracotta (`#E76F51`), white text, reserved for urgent fosters, critical medical flags, and donation drives.
- **Ghost**: Transparent fill, 1px border `#E5DFD7`, text `#2D312E`. Hover transitions to `#F4EFEA`.

### Status Badges & Chips
- **Adoption Status (Available, Foster, Adopted)**: Pill-shaped (`rounded-full`), 4px 12px padding, `label-sm` uppercase.
  - *Available*: Background `#D8F3DC`, text `#1B4332`.
  - *In Foster*: Background `#F4EFEA`, text `#59605B`.
  - *Urgent Rescue*: Background `#FCECE8`, text `#E76F51`, prefixed by a micro pulse indicator dot.
- **Attribute Chips (e.g., "Good with Cats", "Vaccinated")**: Background `#FFFFFF`, 1px border `#D0E4D7`, text `#2D6A4F`, `rounded-full`.

### Cards (Pet Profile & Intake Metrics)
- Constructed with white (`#FFFFFF`) surface fill and `rounded-lg` (16px) or `rounded-xl` (24px).
- Image containers within cards preserve an edge-to-edge top radius with an aspect ratio of 4:3 or 1:1, finished with an inner soft fade overlay for high-contrast badge legibility.
- Sub-data rows within cards feature `space-sm` gaps, using warm sand divider strokes (`#E5DFD7`).

### Input Fields & Controls
- **Text Inputs & Dropdowns**: Background `#FFFFFF`, border `1.5px solid #E5DFD7`, border-radius 8px, padding 12px 16px. Placeholder text `#8C938E`. Focus state utilizes a crisp 2px border `#2D6A4F` and a 3px soft green focus ring (`rgba(116, 198, 157, 0.25)`).
- **Checkboxes & Radios**: 20px box with 4px border radius (checkbox) or circle (radio). Active state fills with `#1B4332` housing a crisp white icon.

### Pet Medical & Shelter Timeline
- Vertical list rhythm with 16px left indicator rail. Completed items are punctuated with Forest Green check rings; pending treatments carry Terracotta or Amber status dots.
- Item bodies use `rounded-md` white cards over the cream base canvas.