# Unified Color System Guide

## Overview

Your portfolio now uses a **centralized, consistent color system** that maintains visual harmony across all pages, components, and themes. All colors are defined as CSS variables and automatically adapt between light and dark modes.

---

## 🎨 Color Palette

### Light Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary** | `#2563EB` | `37, 99, 235` | Buttons, CTAs, active states |
| **Accent/Gold** | `#7C3AED` | `124, 58, 237` | Highlights, badges, interactive elements |
| **Background** | `#F8FAFC` | `248, 250, 252` | Page background |
| **Surface** | `#FFFFFF` | `255, 255, 255` | Cards, panels, containers |
| **Text Primary** | `#0F172A` | `15, 23, 42` | Main text, headings |
| **Text Secondary** | `#475569` | `71, 85, 105` | Descriptions, muted text |
| **Border** | `#E2E8F0` | `226, 232, 240` | Dividers, borders |

### Dark Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary** | `#3B82F6` | `59, 130, 246` | Buttons, CTAs, active states |
| **Accent/Gold** | `#8B5CF6` | `139, 92, 246` | Highlights, badges, interactive elements |
| **Background** | `#020617` | `2, 6, 23` | Page background |
| **Surface** | `#0F172A` | `15, 23, 42` | Cards, panels, containers |
| **Text Primary** | `#E2E8F0` | `226, 232, 240` | Main text, headings |
| **Text Secondary** | `#94A3B8` | `148, 163, 184` | Descriptions, muted text |
| **Border** | `#1E293B` | `30, 41, 59` | Dividers, borders |

---

## 🔧 CSS Variables Reference

### Core Colors
```css
--primary              /* Blue: action items, buttons */
--accent               /* Purple: highlights, badges */
--gold                 /* Alias for --accent */
--text                 /* Primary text color */
--text-secondary       /* Secondary/muted text */
--background           /* Page background */
--surface              /* Card/panel background */
--border               /* Border color */
```

### RGB Values (For Dynamic Opacity)
```css
--primary-rgb          /* 37, 99, 235 (light) / 59, 130, 246 (dark) */
--accent-rgb           /* 124, 58, 237 (light) / 139, 92, 246 (dark) */
--surface-rgb          /* 255, 255, 255 (light) / 15, 23, 42 (dark) */
--text-rgb             /* 15, 23, 42 (light) / 226, 232, 240 (dark) */
```

### Opacity Variants
```css
--primary-50           /* Primary at 5% opacity */
--primary-10           /* Primary at 10% opacity */
--primary-20           /* Primary at 20% opacity */
--accent-50            /* Accent at 5% opacity */
--accent-10            /* Accent at 10% opacity */
--accent-20            /* Accent at 20% opacity */
```

### Shadows
```css
--shadow-soft          /* Soft, subtle shadow */
--shadow-pop           /* Medium shadow */
--shadow-primary       /* Primary color shadow */
--shadow-accent        /* Accent color shadow */
```

### Glass Effect
```css
--glass-bg             /* Glass background color */
--glass-border         /* Glass border color */
--gold-glass-bg        /* Accent glass background */
--gold-glass-border    /* Accent glass border */
```

---

## 📋 How to Use in Components

### ✅ DO - Use CSS Variables

**Buttons:**
```jsx
<button className="bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
  Click me
</button>
```

**Cards:**
```jsx
<div className="bg-surface border border-border rounded-lg p-6">
  <h2 className="text-text font-bold">Title</h2>
  <p className="text-text-secondary">Description</p>
</div>
```

**Text with Shadow:**
```jsx
<h1 className="text-primary shadow-primary">
  Heading
</h1>
```

**Dynamic Opacity:**
```jsx
<div className="bg-[rgba(var(--primary-rgb),0.1)] border border-primary/20">
  Content
</div>
```

---

## ❌ DON'T - Avoid These Patterns

**Hardcoded Hex Colors:**
```jsx
// ❌ BAD
<button className="bg-[#2563EB]">Click me</button>

// ✅ GOOD
<button className="bg-primary">Click me</button>
```

**Hardcoded RGBA Values:**
```jsx
// ❌ BAD
<div className="shadow-[0_0_20px_rgba(59,130,246,0.3)]">Content</div>

// ✅ GOOD
<div className="shadow-primary">Content</div>
```

**Inconsistent Accent Colors:**
```jsx
// ❌ BAD
<span className="text-cyan-400">Badge</span>  // Not part of theme
<span className="text-violet-300">Badge</span> // Not part of theme

// ✅ GOOD
<span className="text-accent">Badge</span>    // Consistent theme
<span className="text-gold">Badge</span>      // Consistent theme
```

**Inline Styles with Colors:**
```jsx
// ❌ BAD
<div style={{ color: '#0F172A' }}>Text</div>

// ✅ GOOD
<div className="text-text">Text</div>
```

---

## 🎯 Component Consistency Examples

### Navigation
```jsx
<nav className="bg-background/90 border-b border-border">
  <a className="text-text hover:text-primary transition-colors">Home</a>
  <a className="text-primary font-bold">Active</a>
</nav>
```

### Buttons
```jsx
// Primary CTA
<button className="bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-primary">
  Submit
</button>

// Secondary
<button className="border border-border text-text hover:bg-surface/50">
  Cancel
</button>

// Accent
<button className="bg-accent text-white rounded-lg hover:bg-accent/90 shadow-accent">
  Special
</button>
```

### Cards
```jsx
<div className="bg-surface border border-border rounded-lg p-6 shadow-soft hover:shadow-pop transition-shadow">
  <h3 className="text-text font-bold">Title</h3>
  <p className="text-text-secondary">Description</p>
  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm">
    Badge
  </span>
</div>
```

### Badges & Tags
```jsx
// Gold/Accent
<span className="bg-gold/10 text-gold border border-gold/30 px-3 py-1 rounded-full text-xs">
  Featured
</span>

// Primary
<span className="bg-primary/10 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs">
  Active
</span>
```

---

## 🌓 Light & Dark Mode Handling

The color system **automatically handles light/dark mode switching**. CSS variables update based on the `.dark` or `.light` class on the root element.

**You don't need to do anything special:**
- Light mode colors apply by default
- Dark mode colors apply when `.dark` class is present
- Tailwind classes like `dark:bg-surface` work seamlessly

```jsx
// This automatically adapts to light/dark mode
<div className="bg-background text-text">
  <p className="text-text-secondary">Automatically adapts!</p>
</div>
```

---

## 📐 When Adding New Features

1. **Never create new colors** - reuse existing theme colors
2. **Use color variants** - leverage opacity variables for depth
3. **Check both themes** - verify light AND dark mode look good
4. **Reference existing components** - maintain visual consistency
5. **Test on all pages** - ensure harmony across the entire site

---

## 🔄 Maintaining Consistency

### Files That Define Colors
- `src/index.css` - Primary color system definition
  - `:root` - Light mode defaults
  - `.light` - Explicit light mode
  - `.dark` - Dark mode overrides

### Pages Using This System
- `src/pages/Home.tsx` - Hero, stats, testimonials
- `src/pages/Projects.tsx` - Project cards, filters
- `src/pages/About.tsx` - Bio, timeline, skills
- `src/pages/Experience.tsx` - Timeline, roles
- `src/pages/Contact.tsx` - Form, channels, CTAs
- `src/components/layout/Navbar.tsx` - Navigation
- `src/components/layout/Footer.tsx` - Footer

### What Was Standardized
✅ All shadow values use CSS variables  
✅ All primary/accent colors use theme tokens  
✅ All text colors use semantic variables  
✅ Gold highlights consistently use --gold  
✅ Border colors consistently use --border  
✅ Glass effects use dedicated variables  
✅ Responsive shadows maintain theme consistency  

---

## 🎨 Visual Hierarchy

### Typography Color Usage
- **H1, H2, H3**: `text-text` (primary text)
- **Body Text**: `text-text` (primary) or `text-text-secondary` (muted)
- **Labels/Captions**: `text-text-secondary`
- **Emphasis**: `text-primary` or `text-accent`
- **Links**: `text-primary hover:underline`

### Component Color Usage
- **Active Elements**: `bg-primary text-primary-foreground`
- **Hover States**: Add `brightness-110` or shift opacity
- **Disabled**: `opacity-50 cursor-not-allowed`
- **Focus**: `ring-2 ring-primary`
- **Success**: Use `--primary` (blue conveys trust)
- **Accents/Highlights**: Use `--accent` or `--gold`

---

## 🧪 Testing Your Changes

After modifying components:

1. **Switch theme** - Toggle dark/light mode
2. **Check both views** - Verify consistency
3. **Test all pages** - Navigate through entire site
4. **Validate contrast** - Ensure text is readable
5. **Build production** - Run `npm run build` to catch errors

---

## 📞 Quick Reference

| Need | CSS Variable | Tailwind Class |
|------|--------------|-----------------|
| Primary button bg | `--primary` | `bg-primary` |
| Primary text color | `--text` | `text-text` |
| Accent highlight | `--accent` | `bg-accent` / `text-accent` |
| Subtle bg | `--surface` | `bg-surface` |
| Border | `--border` | `border-border` |
| Shadow | `--shadow-primary` | `shadow-primary` |
| Muted text | `--text-secondary` | `text-text-secondary` |
| Page bg | `--background` | `bg-background` |

---

## 🚀 Summary

Your portfolio now has:
- ✅ **Unified color tokens** across all pages
- ✅ **Automatic light/dark mode** support
- ✅ **Consistent component styling** via CSS variables
- ✅ **Easy maintenance** - change colors in one place
- ✅ **Premium appearance** - cohesive design language
- ✅ **Brand consistency** - blue primary + purple accent theme

All colors are centrally managed in `src/index.css` and automatically update across the entire website!

