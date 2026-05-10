# Implementation Plan: Engineering Portfolio

## Overview

This plan implements a single-page professional portfolio website for Mohamed Adel Mousa using vanilla HTML, CSS, and JavaScript. The site is already structured in `index.html` with semantic markup. The implementation focuses on creating the complete CSS design system (`style.css`) and interactive JavaScript behaviors (`script.js`).

The approach follows a layered implementation strategy:
1. Establish the design token system and base styles
2. Build layout and component styles section by section
3. Add responsive behavior and animations
4. Implement JavaScript interactivity modules
5. Validate accessibility and performance requirements

## Tasks

- [-] 1. Set up CSS design system and base styles
  - [x] 1.1 Create CSS custom properties for design tokens
    - Define color palette (dark theme: backgrounds, text, accents)
    - Define typography scale (font families, sizes, weights, line heights)
    - Define spacing scale (margins, padding, gaps)
    - Define breakpoints for responsive design
    - _Requirements: 7.2, 7.3, 7.4_

  - [ ] 1.2 Write CSS reset and base element styles
    - Apply box-sizing, margin/padding reset
    - Set base font family, size, and color on body
    - Define focus-visible styles for keyboard navigation
    - Apply smooth scroll behavior to html element
    - _Requirements: 1.3, 8.3, 8.5_

  - [ ]* 1.3 Write property test for CSS custom properties
    - **Property: Design token consistency**
    - **Validates: Requirements 7.3, 7.4**

- [ ] 2. Implement navigation bar styles and behavior
  - [ ] 2.1 Style the fixed navigation header
    - Position fixed at top with backdrop blur effect
    - Style nav logo and navigation links
    - Add hover and active states for nav links
    - Ensure visible focus indicators
    - _Requirements: 1.1, 1.2, 7.2, 8.3_

  - [ ] 2.2 Implement responsive hamburger menu styles
    - Style hamburger button with three-line icon
    - Create mobile navigation overlay styles
    - Add CSS transitions for menu open/close animation
    - Hide hamburger on desktop, show on mobile (<768px)
    - _Requirements: 1.4, 1.5, 7.1_

  - [ ] 2.3 Implement HamburgerMenu JavaScript class
    - Toggle .nav-open class on body when hamburger clicked
    - Update aria-expanded attribute
    - Close menu when nav link clicked
    - Close menu on outside click
    - _Requirements: 1.4, 1.5, 8.3_

  - [ ] 2.4 Implement SmoothScroll JavaScript class
    - Add click handlers to all nav links
    - Prevent default anchor behavior
    - Use scrollIntoView with smooth behavior
    - _Requirements: 1.3_

  - [ ] 2.5 Implement NavHighlighter JavaScript class
    - Use IntersectionObserver to detect active section
    - Add .active class to corresponding nav link
    - Remove .active from other links
    - _Requirements: 1.2_

  - [ ]* 2.6 Write unit tests for navigation behavior
    - Test hamburger toggle functionality
    - Test smooth scroll trigger
    - Test active link highlighting
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 3. Checkpoint - Verify navigation is functional
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement hero section styles and typing animation
  - [ ] 4.1 Style hero section layout and content
    - Set min-height: 100vh with flexbox centering
    - Style hero name (h1), title (h2), and summary text
    - Create decorative background grid and glow effects
    - Style availability badge with pulse animation
    - Style CTA buttons (primary and secondary variants)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 7.2_

  - [ ] 4.2 Implement TypingAnimator JavaScript class
    - Accept array of title strings and timing parameters
    - Implement type() method to append characters
    - Implement delete() method to remove characters
    - Cycle through strings with pause between cycles
    - Check prefers-reduced-motion and skip animation if set
    - _Requirements: 2.2_

  - [ ] 4.3 Add CSS keyframe animations for hero effects
    - Create @keyframes pulse for availability badge dot
    - Create @keyframes blink for typing cursor
    - Wrap animations in prefers-reduced-motion media query
    - _Requirements: 2.5, 7.2_

  - [ ]* 4.4 Write property test for content length constraints
    - **Property 1: Content Length Constraints**
    - **Validates: Requirements 2.3**

  - [ ]* 4.5 Write unit tests for hero section
    - Test hero contains correct name and title
    - Test CTA button links to projects section
    - Test typing animation initializes
    - _Requirements: 2.1, 2.2, 2.4_

- [ ] 5. Implement skills section styles
  - [ ] 5.1 Style skills section layout
    - Style section header with label and title
    - Create responsive grid for skill categories (auto-fit, minmax)
    - Single column on mobile (<768px), multi-column on desktop
    - _Requirements: 5.1, 5.3, 5.4, 7.1_

  - [ ] 5.2 Style skill category cards
    - Style category title with icon
    - Style skill list as flex-wrapped pill badges
    - Add hover effects on skill tags
    - _Requirements: 5.2, 7.2_

  - [ ]* 5.3 Write property test for skill category completeness
    - **Property 4: Skill Category Completeness**
    - **Validates: Requirements 5.1, 5.2**

  - [ ]* 5.4 Write unit tests for skills section
    - Test skills section contains required categories
    - Test cybersecurity-relevant skills are present
    - Test responsive grid behavior
    - _Requirements: 5.1, 5.2, 5.5_

- [ ] 6. Implement experience section styles
  - [ ] 6.1 Style experience section with timeline layout
    - Style section header
    - Create vertical timeline with left border line
    - Style timeline markers as circular dots
    - Style timeline content cards
    - _Requirements: 7.2_

  - [ ] 6.2 Style experience card content
    - Style role title, company name, job type badge
    - Style period metadata
    - Style responsibilities list
    - Add card hover effects
    - _Requirements: 7.2, 7.4_

  - [ ]* 6.3 Write unit tests for experience section
    - Test experience entry is rendered
    - Test timeline structure exists
    - _Requirements: 7.1_

- [ ] 7. Checkpoint - Verify sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Implement projects section styles
  - [ ] 8.1 Style projects section layout
    - Style section header
    - Create responsive grid for project cards (auto-fit, minmax)
    - _Requirements: 3.1, 7.1_

  - [ ] 8.2 Style project card components
    - Style card header with category badge and links
    - Style project title, description, and contributions list
    - Style tech tags as pill badges
    - Add hover effects (translateY, box-shadow)
    - Add smooth transitions
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 7.2, 7.4_

  - [ ]* 8.3 Write property test for project card structural completeness
    - **Property 2: Project Card Structural Completeness**
    - **Validates: Requirements 3.2, 3.3, 3.4**

  - [ ]* 8.4 Write unit tests for projects section
    - Test projects section contains at least one card
    - Test SOC project card exists with correct content
    - Test external links have correct attributes
    - Test hover effects apply
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 9. Implement certifications section styles
  - [ ] 9.1 Style certifications section layout
    - Style section header
    - Create responsive grid for cert cards (auto-fit, minmax)
    - Apply distinct visual treatment (different accent color)
    - _Requirements: 4.1, 4.5, 7.1_

  - [ ] 9.2 Style certification card components
    - Style cert issuer badge with organization branding
    - Style cert name, issuer, and date
    - Style status badges (completed, in-progress)
    - Add conditional rendering for verification links
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 7.2_

  - [ ]* 9.3 Write property test for certification card completeness
    - **Property 3: Certification Card Completeness**
    - **Validates: Requirements 4.1, 4.3**

  - [ ]* 9.4 Write unit tests for certifications section
    - Test CCNA and MCSA cert cards exist
    - Test date display for dated certifications
    - Test verification link rendering
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 10. Implement contact section styles
  - [ ] 10.1 Style contact section layout
    - Style section header and intro text
    - Create contact grid layout
    - _Requirements: 6.5, 7.1_

  - [ ] 10.2 Style contact items
    - Style contact icon, label, and value
    - Style links with hover effects
    - Ensure external links have target="_blank" and rel attributes
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 7.2_

  - [ ]* 10.3 Write property test for external links safety
    - **Property 5: External Links Open in New Tab Safely**
    - **Validates: Requirements 6.4**

  - [ ]* 10.4 Write unit tests for contact section
    - Test email link exists
    - Test LinkedIn link exists and opens in new tab
    - Test GitHub link exists and opens in new tab
    - Test invitation message is present
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 11. Implement footer styles
  - [ ] 11.1 Style footer section
    - Center-align footer text
    - Apply consistent padding and background
    - _Requirements: 7.2_

- [ ] 12. Checkpoint - Verify all sections are styled
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Implement scroll animation system
  - [ ] 13.1 Implement ScrollAnimator JavaScript class
    - Use IntersectionObserver to detect elements entering viewport
    - Add .visible class when element intersects
    - Configure threshold and rootMargin options
    - Add fallback for browsers without IntersectionObserver support
    - _Requirements: 7.1_

  - [ ] 13.2 Add CSS for scroll-triggered animations
    - Define .animate-on-scroll initial state (opacity: 0, translateY)
    - Define .animate-on-scroll.visible final state (opacity: 1, translateY: 0)
    - Add smooth transitions
    - Wrap in prefers-reduced-motion media query
    - _Requirements: 7.2_

  - [ ]* 13.3 Write unit tests for scroll animation
    - Test IntersectionObserver initializes
    - Test .visible class is added on intersection
    - Test fallback for unsupported browsers
    - _Requirements: 7.1_

- [ ] 14. Implement accessibility features
  - [ ] 14.1 Verify semantic HTML structure
    - Confirm header, nav, main, section, footer elements are used
    - Confirm heading hierarchy is logical
    - _Requirements: 8.2_

  - [ ] 14.2 Add ARIA attributes where needed
    - Add aria-label to navigation and sections
    - Add aria-expanded to hamburger button
    - Add aria-hidden to decorative elements
    - _Requirements: 8.3_

  - [ ] 14.3 Verify keyboard navigation
    - Ensure all interactive elements are focusable
    - Ensure tab order follows logical section order
    - Ensure visible focus indicators exist
    - _Requirements: 8.3, 8.5_

  - [ ]* 14.4 Write property test for interactive element keyboard accessibility
    - **Property 7: Interactive Element Keyboard Accessibility**
    - **Validates: Requirements 8.3, 8.5**

  - [ ]* 14.5 Write property test for image accessibility
    - **Property 6: Image Accessibility**
    - **Validates: Requirements 8.1**

  - [ ]* 14.6 Write unit tests for accessibility
    - Test semantic HTML elements exist
    - Test ARIA attributes are present
    - Test keyboard tab order
    - Test color contrast ratio meets WCAG AA
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 15. Implement responsive design and media queries
  - [ ] 15.1 Add mobile-first responsive breakpoints
    - Define media queries for 768px, 1024px, 1440px breakpoints
    - Adjust grid columns for each breakpoint
    - Adjust font sizes and spacing for mobile
    - _Requirements: 7.1_

  - [ ] 15.2 Test responsive behavior across viewport widths
    - Test navigation collapses to hamburger at <768px
    - Test grids collapse to single column on mobile
    - Test hero section maintains full viewport height
    - _Requirements: 1.4, 2.5, 5.4, 7.1_

  - [ ]* 15.3 Write unit tests for responsive layout
    - Test viewport width range 320px to 2560px
    - Test hamburger visibility at breakpoints
    - Test grid column counts at breakpoints
    - _Requirements: 7.1_

- [ ] 16. Optimize performance and loading
  - [ ] 16.1 Verify CSS and JavaScript are optimized
    - Ensure no unused CSS rules
    - Ensure JavaScript modules are efficient
    - Verify font-display: swap is set for Google Fonts
    - _Requirements: 9.2, 9.3_

  - [ ] 16.2 Add error handling to JavaScript modules
    - Wrap each module initialization in try/catch
    - Add console warnings for initialization failures
    - Ensure graceful degradation if JavaScript is disabled
    - _Requirements: 9.1_

  - [ ]* 16.3 Write property test for no framework dependencies
    - **Property 8: No External Framework Dependencies**
    - **Validates: Requirements 9.4**

  - [ ]* 16.4 Write integration tests for performance
    - Test Lighthouse Performance score ≥ 90
    - Test FCP/LCP < 3 seconds
    - Test above-the-fold content loads within 3 seconds
    - _Requirements: 7.6, 9.1_

- [ ] 17. Final checkpoint - Complete validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical breaks
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and structural requirements
- The implementation uses vanilla HTML, CSS, and JavaScript only (no frameworks)
- All JavaScript modules include error handling and graceful degradation
- Accessibility and performance are validated throughout the implementation
