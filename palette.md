# SelaMasa: Color Palette & Typography Audit

This document details the scraped color palette and typography specifications from the reference image (`app.arkibjanji.com` light blue/baby blue theme).

---

## 🎨 Color Palette Specifications

### 1. Page Background Gradient
A luxury, high-end three-layer soft sky-blue gradient:
- **Radial Layer 1 (Top Center)**: `rgba(255, 255, 255, 0.96)` blending out at `34%`
- **Radial Layer 2 (Top Right)**: `rgba(74, 144, 226, 0.18)` (translucent sky-blue) blending out at `30%`
- **Linear Layer (Base)**: `linear-gradient(180deg, #f4f9ff 0%, #e6f2ff 58%, #d5e9ff 100%)` (soft ice/baby blue base)

### 2. Branding & Couple Highlights
- **Couple Name Text (`Nureen & Nizam`)**: `#2f78c4` (Deep Premium Ocean Blue)
- **Metadata Circle Badges & Text Icons**: `#3a86d4` (Brilliant Sky Blue)
- **Kicker Label Text & Accents**: `#4a6f94` (Refined Slate Blue)
- **Horizontal Separators / Kicker Lines**: `linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.58), transparent)`

### 3. Cards & Glassmorphic Layers
- **Welcome Note Card Background**: `rgba(255, 255, 255, 0.62)`
- **Welcome Note Card Border**: `1px solid rgba(74, 144, 226, 0.18)`
- **Welcome Note Card Shadow**: `inset 0 1px 0 rgba(255, 255, 255, 0.78), 0 10px 22px rgba(42, 68, 95, 0.04)`

### 4. Stacked Actions (Capsules)
- **Primary Button Background**: `linear-gradient(135deg, #0e1217, #1d2228 58%, #0c0f12)` (Deep Midnight Blue-Black)
- **Primary Button Border**: `1px solid rgba(119, 172, 220, 0.75)`
- **Secondary/Ghost Buttons Background**: `rgba(255, 255, 255, 0.78)`
- **Secondary/Ghost Buttons Border**: `1px solid rgba(74, 144, 226, 0.22)`
- **Icon Circles Background**: `linear-gradient(145deg, #ffffff, #c7e1fa)` (Translucent Ice-Blue)
- **Icon Circles Border**: `1px solid rgba(74, 144, 226, 0.32)`
- **Trailing Arrow (`›`) & Icon Fill**: `#3a86d4`

---

## 🔤 Typography & Font Checklist

The Welcome Screen utilizes a highly refined, premium font system:

| Element | CSS Font Family | Styling | Purpose |
| :--- | :--- | :--- | :--- |
| **Couple Title** | `var(--font-great-vibes)` | `Great Vibes`, cursive, `40px` - `56px` | Romantic focal name display |
| **Kicker/Event Type** | `var(--font-poppins)` | `Poppins`, sans-serif, bold `8.5px`, spacing `0.20em`, uppercase | Structured event header |
| **Bismillah & Small tagline** | `var(--font-playfair)` | `Playfair Display`, serif, italic `12.5px`, color `#3a86d4` | Scriptural blessing & metadata |
| **Note Card Content** | `var(--font-playfair)` | `Playfair Display`, serif, `11.5px`, line-height `1.27` | Soft, elegant quote |
| **Date/Location Label** | `var(--font-poppins)` | `Poppins`, sans-serif, bold `8.2px`, spacing `0.14em`, uppercase | Dynamic info row |
| **Action Button Labels** | `var(--font-playfair)` | `Playfair Display`, serif, bold `12.0px`, spacing `0.13em` | Premium calligraphy navigation |
| **Brand Capsule Header** | `var(--font-poppins)` | `Poppins`, sans-serif, bold `10px`, spacing `0.28em` | Identity system heading |
