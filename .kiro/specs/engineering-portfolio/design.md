# Design Document

## Feature: Engineering Portfolio

---

## Overview

The Engineering Portfolio is a single-page static website for Mohamed Adel Mousa, a Cybersecurity & IT Infrastructure Engineer. The site is built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no server-side rendering. It is deployed as three files: `index.html`, `style.css`, and `script.js`.

The design goal is to communicate technical credibility through a dark, terminal-inspired aesthetic while remaining accessible and fast. The site targets recruiters and hiring managers who will spend 30–90 seconds scanning before deciding to read further, so information hierarchy and visual clarity are the primary design drivers.

**Key design decisions:**

- **No framework constraint** is a hard requirement (Requirement 9.4). All interactivity is implemented with the browser's native DOM APIs.
- **Single HTML file** keeps deployment trivial — no bundler, no CI pipeline needed.
- **Google Fonts via `<link>`** loads JetBrains Mono and Inter. A `font-display: swap` strategy ensures text is readable before fonts arrive.
- **IntersectionObserver** drives all scroll-triggered animations, replacing scroll event listeners to avoid jank.
- **CSS custom properties** centralize the design token system, making the color palette and spacing scale easy to maintain.

---

## Architecture

The site is a classic multi-section single-page application (SPA) without a router. All content is rendered in the initial HTML payload; JavaScript only adds interactivity and animation.

```
index.html          ← All markup, structured with semantic HTML5
style.css           ← Design tokens, layout, components, animations, responsive rules
script.js           ← Navigation, typing animation, IntersectionObserver, hamburger menu
```

### Rendering Model

```
Browser loads index.html
  └─ <link> fetches style.css (render-blocking, intentional — critical styles)
  └─ <link> fetches Google Fonts (preconnect + async via media trick)
  └─ <script defer> fetches script.js (non-blocking)

DOM ready
  └─ script.js initializes:
       ├─ TypingAnimator (hero title cursor effect)
       ├─ HamburgerMenu (mobile nav toggle)
       ├─ SmoothScroll (nav link click handlers)
       ├─ ScrollAnimator (IntersectionObserver for entrance animations)
       └─ NavHighlighter (active section tracking)
```

### Data Flow

All CV data is embedded directly in `index.html` as static markup. There is no runtime data fetching, no localStorage, and no state management. JavaScript reads the DOM but does not write data to it (except for class toggles and the typing cursor character).

---

## Components and Interfaces

### 1. Navigation Bar (`<header>` / `<nav>`)

**Markup structure:**
```html
<header class="nav-header">
  <nav class="nav-container">
    <a class="nav-logo" href="#hero">MA</a>
    <ul class="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#certifications">Certifications</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="hamburger" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>
```

**JavaScript interface (`HamburgerMenu`):**
```js
// Toggles .nav-open on <body> and updates aria-expanded
hamburger.addEventListener('click', () => { ... })
// Closes menu when a nav link is clicked (mobile UX)
navLinks.forEach(link => link.addEventListener('click', closeMenu))
// Closes menu on outside click
document.addEventListener('click', handleOutsideClick)
```

**CSS behavior:**
- `position: fixed; top: 0; z-index: 1000` — always visible
- `backdrop-filter: blur(10px)` with semi-transparent background for depth
- At `< 768px`: `.nav-links` hidden by default, revealed via `.nav-open` class on `<body>`
- Hamburger icon animates to an × via CSS transforms when open

---

### 2. Hero Section (`<section id="hero">`)

**Markup structure:**
```html
<section id="hero" class="hero">
  <div class="hero-content">
    <div class="availability-badge">
      <span class="pulse-dot"></span> Available for Opportunities
    </div>
    <h1 class="hero-name">Mohamed Adel Mousa</h1>
    <h2 class="hero-title">
      <span class="typing-text"></span><span class="cursor">|</span>
    </h2>
    <p class="hero-summary">...</p>
    <div class="hero-cta">
      <a href="#projects" class="btn btn-primary">View My Work</a>
      <a href="#contact" class="btn btn-secondary">Get In Touch</a>
    </div>
  </div>
  <div class="hero-visual"><!-- decorative grid/terminal graphic --></div>
</section>
```

**JavaScript interface (`TypingAnimator`):**
```js
// Cycles through an array of title strings with typewriter effect
class TypingAnimator {
  constructor(element, strings, typingSpeed, deletingSpeed, pauseDuration)
  start()       // begins the animation loop
  type()        // appends one character, schedules next tick
  delete()      // removes one character, schedules next tick
}
```

**CSS behavior:**
- `min-height: 100vh` with flexbox centering
- `.pulse-dot` uses `@keyframes pulse` with `box-shadow` scaling
- `.cursor` uses `@keyframes blink` for the blinking `|` character
- Decorative background: CSS `radial-gradient` + subtle grid pattern via `background-image: linear-gradient`

---

### 3. Skills Section (`<section id="skills">`)

**Markup structure:**
```html
<section id="skills" class="skills">
  <h2 class="section-title">Technical Skills</h2>
  <div class="skills-grid">
    <div class="skill-category">
      <h3 class="category-title">
        <span class="category-icon">🔒</span> Security
      </h3>
      <ul class="skill-list">
        <li class="skill-tag">SOC Operations</li>
        ...
      </ul>
    </div>
    <!-- repeat for each category -->
  </div>
</section>
```

**CSS behavior:**
- `.skills-grid`: `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- At `< 768px`: single column via media query override
- `.skill-tag`: pill-shaped badge with accent color border and subtle background

---

### 4. Experience Section (`<section id="experience">`)

**Markup structure:**
```html
<section id="experience" class="experience">
  <h2 class="section-title">Experience</h2>
  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <h3 class="role-title">Part-Time Programming Mentor</h3>
        <div class="company-info">
          <span class="company-name">Tasabuq – تسابق</span>
          <span class="job-type">Onsite</span>
          <span class="period">Jun 2024 – Nov 2024</span>
        </div>
        <ul class="responsibilities">...</ul>
      </div>
    </div>
  </div>
</section>
```

**CSS behavior:**
- Vertical timeline with a left border line (`border-left: 2px solid var(--accent-cyan)`)
- `.timeline-marker`: circular dot on the timeline line
- Cards use `.card` base class for consistent styling

---

### 5. Projects Section (`<section id="projects">`)

**Markup structure:**
```html
<section id="projects" class="projects">
  <h2 class="section-title">Projects</h2>
  <div class="projects-grid">
    <article class="project-card">
      <div class="card-header">
        <span class="project-category">Cybersecurity</span>
        <div class="card-links">
          <!-- conditional: only rendered if link exists -->
          <a href="..." target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </div>
      <h3 class="project-title">Security Operations Center (SOC) – RAGMind AI Platform</h3>
      <p class="project-description">...</p>
      <ul class="project-contributions">...</ul>
      <div class="tech-tags">
        <span class="tech-tag">SIEM</span>
        <span class="tech-tag">RBAC</span>
        ...
      </div>
    </article>
  </div>
</section>
```

**CSS behavior:**
- `.projects-grid`: `display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))`
- `.project-card:hover`: `transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0, 212, 255, 0.15)`
- Transition: `transform 0.3s ease, box-shadow 0.3s ease`

---

### 6. Certifications Section (`<section id="certifications">`)

**Markup structure:**
```html
<section id="certifications" class="certifications">
  <h2 class="section-title">Certifications</h2>
  <div class="certs-grid">
    <div class="cert-card">
      <div class="cert-icon"><!-- issuer icon or letter badge --></div>
      <div class="cert-info">
        <h3 class="cert-name">CCNA: Introduction to Networks</h3>
        <span class="cert-issuer">Cisco</span>
        <span class="cert-date">May 2024</span>
      </div>
      <div class="cert-badge">Verified</div>
    </div>
    <!-- repeat -->
  </div>
</section>
```

**CSS behavior:**
- `.certs-grid`: `display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`
- Distinct visual treatment: left border accent in `var(--accent-green)` to differentiate from Projects (cyan) and Skills (purple)
- Null dates render as "In Progress" badge

---

### 7. Contact Section (`<section id="contact">`)

**Markup structure:**
```html
<section id="contact" class="contact">
  <h2 class="section-title">Get In Touch</h2>
  <p class="contact-intro">...</p>
  <div class="contact-grid">
    <div class="contact-info">
      <a href="mailto:..." class="contact-item">
        <span class="contact-icon">✉</span>
        <span>mohamed.adel.mousa.2004@gmail.com</span>
      </a>
      <a href="tel:+201122905730" class="contact-item">...</a>
      <a href="https://linkedin.com/..." target="_blank" rel="noopener noreferrer" class="contact-item">...</a>
      <a href="https://github.com/..." target="_blank" rel="noopener noreferrer" class="contact-item">...</a>
    </div>
  </div>
</section>
```

**CSS behavior:**
- All external links open in `target="_blank"` with `rel="noopener noreferrer"` (security requirement)
- Contact items use flexbox with icon + text layout
- Hover: accent color transition on text

---

### 8. Footer (`<footer>`)

```html
<footer class="footer">
  <p>© 2025 Mohamed Adel Mousa · Built with HTML, CSS & JavaScript</p>
</footer>
```

---

### 9. Scroll Animation System (`ScrollAnimator`)

**JavaScript interface:**
```js
class ScrollAnimator {
  constructor(selector, options)
  // options: { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  observe()   // attaches IntersectionObserver to all matching elements
  // Adds .visible class when element enters viewport
  // Elements start with opacity:0, transform:translateY(30px)
  // Transition defined in CSS: opacity 0.6s ease, transform 0.6s ease
}
```

**CSS:**
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Design decision:** `prefers-reduced-motion` media query disables all transitions and animations for users who have opted out of motion effects.

---

### 10. Active Navigation Highlighter (`NavHighlighter`)

```js
class NavHighlighter {
  constructor(sections, navLinks)
  observe()   // uses IntersectionObserver with rootMargin to detect active section
  // Adds .active class to the corresponding nav link
}
```

---

## Data Models

All data is static and embedded in HTML. No runtime data model is needed. The following describes the logical structure of each content entity as it maps to HTML attributes and classes.

### NavigationItem
```
{
  label: string,       // display text
  href: string,        // anchor target, e.g. "#projects"
}
```

### SkillCategory
```
{
  name: string,        // category heading
  icon: string,        // emoji or SVG icon
  skills: string[],    // list of skill names
}
```

### ExperienceEntry
```
{
  role: string,
  company: string,
  type: string,        // "Onsite" | "Remote" | "Hybrid"
  period: string,      // human-readable date range
  responsibilities: string[],
}
```

### ProjectEntry
```
{
  name: string,
  type: string,        // project type label
  description: string,
  contributions: string[],
  link: string | null, // null → no link rendered
  category: string,    // domain label for the badge
  techTags: string[],  // derived from contributions/description
}
```

### CertificationEntry
```
{
  name: string,
  issuer: string,
  date: string | null, // null → renders "In Progress"
  verifyUrl: string | null,
}
```

### ContactInfo
```
{
  email: string,
  phones: string[],
  linkedin: string,
  github: string,
  address: string,
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Content Length Constraints

*For any* text content rendered in the hero summary or in a project card description, the text SHALL contain no more than the specified maximum number of sentences (2 for the hero tagline, 4 for project descriptions). Sentence count is measured by counting sentence-ending punctuation marks (`.`, `!`, `?`).

**Validates: Requirements 2.3, 3.2**

---

### Property 2: Project Card Structural Completeness

*For any* project card rendered in the Projects Section, the card SHALL contain: a non-empty project title, a non-empty category label, and a non-empty description. Additionally, for any project card where the underlying project data includes a non-null external link, the card SHALL contain an anchor element whose `href` matches that link.

**Validates: Requirements 3.3, 3.4**

---

### Property 3: Certification Card Completeness

*For any* certification card rendered in the Certifications Section, the card SHALL contain a non-empty certification name and a non-empty issuer name. For any certification card where the underlying data includes a non-null date, the card SHALL display that date string.

**Validates: Requirements 4.1, 4.3**

---

### Property 4: Skill Category Completeness

*For any* skill category rendered in the Skills Section, the category SHALL contain a non-empty category title and at least one non-empty skill item.

**Validates: Requirements 5.1, 5.2**

---

### Property 5: External Links Open in New Tab Safely

*For any* anchor element in the Portfolio whose `href` begins with `http`, the element SHALL have `target="_blank"` and its `rel` attribute SHALL contain both `"noopener"` and `"noreferrer"`.

**Validates: Requirements 6.4**

---

### Property 6: Image Accessibility

*For any* `<img>` element in the Portfolio, the element SHALL have an `alt` attribute that is present and non-empty, so that screen readers and fallback rendering are meaningful.

**Validates: Requirements 7.5, 8.1**

---

### Property 7: Interactive Element Keyboard Accessibility

*For any* `<a>` or `<button>` element in the Portfolio, the element SHALL be keyboard-focusable (i.e., `tabindex` is not `-1`) and the stylesheet SHALL define a `:focus` or `:focus-visible` style for that element type.

**Validates: Requirements 8.3**

---

### Property 8: No External Framework Dependencies

*For any* `<script>` element in the Portfolio's HTML, the `src` attribute SHALL NOT reference a known JavaScript framework CDN (React, Vue, Angular, Svelte, Ember, Backbone, or similar). All JavaScript behavior SHALL be implemented in vanilla JS.

**Validates: Requirements 9.4**

---

## Error Handling

### Font Loading Failure

Google Fonts are loaded via `<link rel="preconnect">` and a stylesheet `<link>`. If the network request fails:
- `font-display: swap` in the `@font-face` declarations ensures the browser falls back to system fonts (`system-ui`, `monospace`) immediately.
- The layout does not depend on specific font metrics — all sizing uses `rem` units and `line-height` values that are stable across font families.
- No JavaScript error handling is needed; this is purely a CSS concern.

### Image Loading Failure

The portfolio currently contains no raster images (the design uses CSS-only decorative elements). If images are added in the future:
- All `<img>` elements MUST have descriptive `alt` attributes (enforced by Property 6).
- CSS `object-fit: cover` with a defined `background-color` on the container ensures the layout does not collapse if an image fails to load.

### JavaScript Errors

All JavaScript modules (`TypingAnimator`, `HamburgerMenu`, `ScrollAnimator`, `NavHighlighter`) are initialized inside a `DOMContentLoaded` listener. Each initialization is wrapped in a `try/catch` block so that a failure in one module does not prevent others from initializing.

```js
document.addEventListener('DOMContentLoaded', () => {
  try { new TypingAnimator(...).start(); } catch (e) { console.warn('TypingAnimator failed', e); }
  try { new HamburgerMenu(...).init(); } catch (e) { console.warn('HamburgerMenu failed', e); }
  try { new ScrollAnimator('.animate-on-scroll').observe(); } catch (e) { console.warn('ScrollAnimator failed', e); }
  try { new NavHighlighter(...).observe(); } catch (e) { console.warn('NavHighlighter failed', e); }
});
```

**Graceful degradation:** If JavaScript is disabled entirely, the page remains fully readable. All content is in the HTML; JS only adds animation and the hamburger toggle. The nav links are visible by default (CSS hides them only when `.nav-open` is toggled by JS, so without JS the links remain visible on all viewports).

### IntersectionObserver Not Supported

`IntersectionObserver` is supported in all modern browsers. For environments where it is unavailable (very old browsers), the `ScrollAnimator` checks for support and falls back to making all `.animate-on-scroll` elements immediately visible:

```js
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
  return;
}
```

### Reduced Motion

Users who have set `prefers-reduced-motion: reduce` in their OS settings receive a version of the site with all transitions and animations disabled:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

The typing animation loop is also paused in this case by checking `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before starting.

---

## Testing Strategy

### PBT Applicability Assessment

This feature is a static HTML/CSS/JS portfolio site. The majority of requirements are structural (does element X exist?), layout (does the grid collapse at breakpoint Y?), or content (does text Z appear?). These are best tested with example-based DOM assertions.

However, several requirements express **universal properties** that should hold across all instances of a repeated element (all project cards, all cert cards, all external links, all images). These are genuine property-based tests — the "input" is the set of rendered DOM elements, and the property must hold for every member of that set. A property-based testing library is appropriate here.

**PBT library:** [fast-check](https://github.com/dubzzz/fast-check) (JavaScript) — runs in Node.js with jsdom for DOM testing.

### Unit Tests (Example-Based)

These tests verify specific, concrete behaviors:

| Test | Requirement |
|------|-------------|
| Nav contains links to all 6 sections | 1.2 |
| Clicking a nav link triggers smooth scroll | 1.3 |
| Hero h1 contains "Mohamed Adel Mousa" | 2.1 |
| Hero subtitle contains the correct title | 2.2 |
| CTA button href="#projects" | 2.4 |
| Projects section contains at least one card | 3.1 |
| SOC project card exists | 3.6 |
| CCNA and MCSA cert cards exist | 4.2 |
| Skills section contains cybersecurity-relevant terms | 5.5 |
| Contact section has email link | 6.1 |
| LinkedIn link exists in contact section | 6.2 |
| GitHub link exists in contact section | 6.3 |
| Contact section has invitation text | 6.5 |
| Keyboard tab order follows DOM section order | 8.5 |

### Property-Based Tests

Each property test uses fast-check to generate inputs and runs a minimum of **100 iterations**.

Each test is tagged with a comment in the format:
`// Feature: engineering-portfolio, Property {N}: {property_text}`

| Property | Test Description | fast-check Strategy |
|----------|-----------------|---------------------|
| **Property 1** — Content length constraints | For each hero summary and project description in the DOM, sentence count ≤ limit | `fc.constantFrom(...domElements)` — sample from actual rendered elements |
| **Property 2** — Project card structural completeness | For each project card, title + category + description are non-empty; cards with links have anchors | `fc.constantFrom(...projectCards)` |
| **Property 3** — Certification card completeness | For each cert card, name + issuer non-empty; dated certs show date | `fc.constantFrom(...certCards)` |
| **Property 4** — Skill category completeness | For each skill category, title non-empty + ≥1 skill item | `fc.constantFrom(...skillCategories)` |
| **Property 5** — External links open safely | For each external anchor, target=_blank + rel contains noopener+noreferrer | `fc.constantFrom(...externalAnchors)` |
| **Property 6** — Image accessibility | For each img element, alt is present and non-empty | `fc.constantFrom(...imgElements)` |
| **Property 7** — Interactive element keyboard accessibility | For each a/button, tabindex ≠ -1 and :focus style defined | `fc.constantFrom(...interactiveElements)` |
| **Property 8** — No framework dependencies | For each script element, src does not match framework pattern | `fc.constantFrom(...scriptElements)` |

### Smoke Tests

These are single-execution checks for configuration and setup:

- Body background-color matches `#0a0e1a` (dark theme)
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` elements exist in DOM
- Hamburger button is visible at 767px viewport width
- Hero section has `min-height: 100vh`
- At most two distinct font-family values used in the stylesheet

### Integration Tests

These require external tooling and are run separately from unit/property tests:

- **Lighthouse Performance ≥ 90** — run via `lighthouse-ci` against a locally served build
- **FCP/LCP < 3 seconds** — measured via Lighthouse or WebPageTest
- **WCAG contrast ratio ≥ 4.5:1** — verified via `axe-core` or manual contrast checker for the primary text/background pair (`#e2e8f0` on `#0a0e1a` = ~14.7:1, well above threshold)

### Test File Structure

```
tests/
  unit/
    navigation.test.js
    hero.test.js
    projects.test.js
    certifications.test.js
    skills.test.js
    contact.test.js
  property/
    content-length.property.test.js      // Property 1
    project-card.property.test.js        // Property 2
    cert-card.property.test.js           // Property 3
    skill-category.property.test.js      // Property 4
    external-links.property.test.js      // Property 5
    image-accessibility.property.test.js // Property 6
    keyboard-accessibility.property.test.js // Property 7
    no-framework.property.test.js        // Property 8
  smoke/
    layout.smoke.test.js
    theme.smoke.test.js
```

**Test runner:** Jest with jsdom environment. Property tests use fast-check integrated with Jest (`@fast-check/jest`).
