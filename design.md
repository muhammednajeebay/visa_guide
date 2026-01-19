# VisaGuide - Design Specification Document

## Project Overview
A professional, corporate, and minimal visa services website with interactive elements optimized for both web and mobile devices.

---

## Color Palette

### Primary Colors
- **Primary Blue:** `#0A2E5C` - Deep professional blue for headers and primary CTAs
- **Accent Blue:** `#1E5BA8` - Lighter blue for hover states and secondary elements
- **Trust Blue:** `#2E7DD1` - Bright blue for icons and highlights

### Secondary Colors
- **Success Green:** `#10B981` - For success states, checkmarks, and positive indicators
- **Warm Accent:** `#F59E0B` - For important highlights and attention grabbers
- **Error Red:** `#EF4444` - For error states and urgent notices

### Neutral Colors
- **Dark Gray:** `#1F2937` - Primary text color
- **Medium Gray:** `#6B7280` - Secondary text, captions
- **Light Gray:** `#F3F4F6` - Background sections, cards
- **Border Gray:** `#E5E7EB` - Borders, dividers
- **Pure White:** `#FFFFFF` - Card backgrounds, primary background

### Gradient
- **Hero Gradient:** `linear-gradient(135deg, #0A2E5C 0%, #1E5BA8 100%)`
- **CTA Gradient:** `linear-gradient(90deg, #2E7DD1 0%, #1E5BA8 100%)`

---

## Typography

### Font Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Poppins', 'Inter', sans-serif;
```

### Font Sizes (Responsive)
```css
/* Desktop */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */

/* Mobile - scale down by ~20% */
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## Section-by-Section Design Guide

### 1. Navigation Bar
**Layout:**
- Fixed position on scroll with blur background
- Logo on left, navigation menu center, CTA button on right
- Mobile: Hamburger menu with slide-in drawer

**Design Elements:**
- Height: 80px (desktop), 64px (mobile)
- Background: White with `backdrop-filter: blur(10px)` when scrolled
- Box shadow: `0 2px 8px rgba(0,0,0,0.05)` on scroll

**Interactions:**
- Smooth scroll to sections on click
- Hamburger menu animates to X icon
- Active section highlighted in navigation
- CTA button has subtle pulse animation

**Animation:**
```css
- Fade in on page load (0.3s delay)
- Menu items stagger fade-in (mobile)
- Smooth background transition on scroll
```

---

### 2. Hero Section
**Layout:**
- Full viewport height with gradient background
- Content centered (60% width max 1200px)
- Two-column on desktop: Text left (60%), Illustration/Image right (40%)
- Mobile: Single column, stacked

**Design Elements:**
- Gradient background overlay
- Large bold heading (text-5xl desktop, text-3xl mobile)
- Subheading with opacity 0.9
- Highlight badges/pills for key features
- Primary CTA button + Secondary outline button

**Interactions:**
- Parallax scroll effect on background
- Floating animation on illustration
- Hover states on CTA buttons with scale transform
- Typewriter effect on main heading

**Animation:**
```css
- Hero content: Fade up (stagger 100ms per element)
- Highlight badges: Slide in from left sequentially
- CTA buttons: Scale and glow on hover
- Background: Subtle gradient shift animation
- Scroll indicator: Bounce animation at bottom
```

---

### 3. About Section
**Layout:**
- Two-column layout: Text (50%) + Stats grid (50%)
- Mobile: Stacked vertically
- Stats in 2x2 grid with dividers

**Design Elements:**
- Light gray background (#F3F4F6)
- Section title with accent line underneath
- Stats cards with large numbers and labels
- Clean typography with ample spacing

**Interactions:**
- Count-up animation on stats when in viewport
- Hover effect on stat cards (subtle lift)
- Parallax effect on background pattern

**Animation:**
```css
- Fade in from bottom on scroll trigger
- Stats counter animation (1.5s duration)
- Stat cards: Stagger fade-in (150ms delay each)
- Border accent line: Expand from left (0.6s)
```

---

### 4. Services Section
**Layout:**
- Grid layout: 3 columns desktop, 2 columns tablet, 1 column mobile
- Card-based design with icon, title, description, CTA
- Equal height cards

**Design Elements:**
- White cards with subtle shadow
- Icon at top (64px, accent blue)
- Card padding: 32px
- Border radius: 12px
- Hover: Elevated shadow and border accent

**Interactions:**
- Card lift on hover (translateY -8px)
- Icon color change on hover
- "Learn More" link underline animation
- Stagger reveal on scroll

**Animation:**
```css
- Cards: Fade in + slide up stagger (100ms delay)
- Hover: Transform scale(1.02) + shadow transition
- Icons: Rotate 360° on card hover
- CTA links: Underline expand from left
```

---

### 5. Destinations Section
**Layout:**
- Grid of country cards (4 columns desktop, 3 tablet, 2 mobile)
- Each card: Flag emoji + Country name
- Clean, minimal design

**Design Elements:**
- White cards with border
- Large flag emoji (48px)
- Country name below (text-lg, semibold)
- Subtle gradient background (#F9FAFB)

**Interactions:**
- Hover: Border color change to primary blue
- Scale effect on hover
- Click opens modal with country details (future)

**Animation:**
```css
- Grid items: Cascade fade-in (50ms stagger)
- Hover: Scale(1.05) + border glow
- Flag emoji: Gentle bounce on hover
```

---

### 6. Why Choose Us Section
**Layout:**
- Alternating layout: Icon + Content (left-right pattern)
- Mobile: Stacked cards
- 5 reasons in vertical list

**Design Elements:**
- Large circular icon backgrounds (gradient)
- Title + Description for each reason
- Checkmark or shield icons
- Divider lines between items

**Interactions:**
- Reveal animation on scroll
- Icon pulse animation
- Hover highlights entire row

**Animation:**
```css
- Items: Slide in from alternating sides
- Icons: Scale + rotate on reveal
- Hover: Background highlight fade-in
- Dividers: Expand from center
```

---

### 7. How It Works Section
**Layout:**
- Horizontal timeline (desktop) / Vertical (mobile)
- 4 steps with connecting line
- Step number, title, description

**Design Elements:**
- Large step numbers in circles (gradient background)
- Connecting line (dashed or solid, accent blue)
- Cards for each step
- Icons illustrating each step

**Interactions:**
- Progress line animates on scroll
- Active step highlights
- Step cards reveal sequentially

**Animation:**
```css
- Timeline line: Draw animation (2s)
- Step circles: Fade + scale in sequence (300ms delay)
- Step cards: Slide in from bottom (stagger)
- Active step: Pulse glow effect
```

---

### 8. Testimonials Section
**Layout:**
- Carousel/Slider (3 cards visible desktop, 1 mobile)
- Card design: Quote + Name + Location + Stars
- Navigation arrows + dots

**Design Elements:**
- White cards with left border accent
- Quote icon at top
- 5-star rating display
- Subtle shadow and border radius

**Interactions:**
- Auto-play carousel (5s interval)
- Swipe gesture support (mobile)
- Hover pauses auto-play
- Navigation arrows hover effect

**Animation:**
```css
- Cards: Smooth slide transition (0.5s ease)
- Hover: Lift effect on card
- Stars: Fill animation on load
- Quote icon: Gentle float animation
```

---

### 9. FAQ Section
**Layout:**
- Accordion-style expandable items
- Single column, max-width 800px centered
- Question + Expandable answer

**Design Elements:**
- White background with borders
- Plus/Minus icon toggle
- Smooth expand/collapse
- Border between items

**Interactions:**
- Click to expand/collapse
- Only one item open at a time
- Smooth height transition
- Icon rotation animation

**Animation:**
```css
- Accordion: Height transition (0.3s ease)
- Icon: Rotate 45° (plus to minus)
- Content: Fade in on expand
- Items: Stagger reveal on page load
```

---

### 10. Contact Section
**Layout:**
- Two-column: Form (60%) + Contact info (40%)
- Mobile: Stacked (form first)
- Form with input fields and submit button

**Design Elements:**
- Light blue background gradient
- White form container with shadow
- Input fields with focus states
- Contact info cards with icons

**Interactions:**
- Input focus: Border glow animation
- Form validation on submit
- Success/error message display
- Hover effects on contact cards

**Animation:**
```css
- Form: Slide in from left
- Contact cards: Slide in from right (stagger)
- Input focus: Border color transition + glow
- Submit button: Loading spinner on click
- Success: Checkmark animation
```

---

### 11. Footer
**Layout:**
- 4-column grid (desktop): Brand + Quick Links + Services + Contact
- Mobile: Stacked sections
- Bottom bar for copyright

**Design Elements:**
- Dark background (#1F2937)
- White/light gray text
- Subtle top border accent
- Social media icons (if added)

**Interactions:**
- Link hover: Underline animation
- Social icons: Color fill on hover
- Newsletter signup (if added)

**Animation:**
```css
- Sections: Fade in on scroll to footer
- Links: Underline slide from left
- Social icons: Scale + color transition
```

---

## Global Animations & Interactions

### Scroll Animations
- Use Intersection Observer API
- Trigger at 20% visibility
- Stagger delays for grouped elements
- Once-only animations (no repeat)

### Button Styles
**Primary Button:**
```css
background: linear-gradient(90deg, #2E7DD1, #1E5BA8);
padding: 14px 32px;
border-radius: 8px;
transition: transform 0.2s, box-shadow 0.3s;

&:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 91, 168, 0.3);
}
```

**Secondary Button:**
```css
background: transparent;
border: 2px solid #2E7DD1;
color: #2E7DD1;

&:hover {
  background: #2E7DD1;
  color: white;
}
```

### Card Hover Effects
```css
transition: transform 0.3s, box-shadow 0.3s;

&:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}
```

### Loading States
- Skeleton screens for data loading
- Smooth fade-in when content loads
- Spinner for form submissions

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--large: 1280px;
--xlarge: 1536px;
```

### Mobile Optimizations
- Larger touch targets (min 48px)
- Simplified navigation
- Stacked layouts
- Reduced animations on low-end devices
- Optimized images (WebP format)

---

## Accessibility

### Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Focus visible states
- ARIA labels for interactive elements
- Color contrast ratio ≥ 4.5:1
- Alt text for all images
- Skip to main content link

### Focus States
```css
:focus-visible {
  outline: 3px solid #2E7DD1;
  outline-offset: 2px;
}
```

---

## Performance Optimizations

### Loading Strategy
1. Critical CSS inline
2. Defer non-critical CSS
3. Lazy load images below fold
4. Preload hero images
5. Minimize JavaScript bundle

### Image Optimization
- Use WebP with fallback
- Responsive images (srcset)
- Lazy loading attribute
- Blur-up placeholders

### Animation Performance
- Use `transform` and `opacity` only
- `will-change` for animated elements
- Reduce motion for accessibility
- Hardware acceleration with `translateZ(0)`

---

## Design Principles Summary

1. **Minimal & Clean:** Ample white space, clear hierarchy
2. **Professional:** Corporate blue palette, serif-free fonts
3. **Interactive:** Subtle hover effects, smooth transitions
4. **Trustworthy:** Consistent branding, clear information
5. **Accessible:** High contrast, keyboard navigable
6. **Fast:** Optimized assets, smooth 60fps animations
7. **Responsive:** Mobile-first, fluid layouts

---

## File Structure

```
project/
├── index.html
├── css/
│   ├── styles.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── animations.js
│   └── form-handler.js
├── static/
│   ├── portfolio.json
│   └── images/
├── assets/
│   ├── icons/
│   └── illustrations/
└── admin/
    └── index.html
```

---

## Next Steps

1. Create HTML structure with semantic markup
2. Implement CSS with custom properties for theming
3. Add JavaScript for interactions and animations
4. Test responsive design across devices
5. Optimize performance and accessibility
6. Integrate with backend for form submissions