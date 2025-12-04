# Butter Trade Terminal - Color Scheme Guide

## Primary Color Palette

### Background Colors
- **Primary Background**: `bg-brown-900` (#2B2520) - Main dark background
- **Secondary Background**: `bg-brown-800` (#3A3530) - Cards, containers
- **Tertiary Background**: `bg-brown-700` (#524533) - Elevated elements
- **Gradient Background**: `bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900`

### Accent Colors (Butter Yellow/Gold)
- **Primary Accent**: `bg-butter-400` (#E8C547) - Main buttons, highlights
- **Hover Accent**: `bg-butter-500` (#D4B03D) - Button hover states
- **Light Accent**: `bg-butter-300` (#FFDB66) - Subtle highlights
- **Text Accent**: `text-butter-400` or `text-yellow-300` - Key headings, important text
- **Gradient Text**: `bg-gradient-to-r from-butter-300 to-butter-500 bg-clip-text text-transparent`

### Text Colors
- **Primary Text**: `text-white` - Main content, headings
- **Secondary Text**: `text-slate-300` or `text-slate-400` - Descriptions, labels
- **Muted Text**: `text-slate-500` - Placeholders, disabled text
- **Accent Text**: `text-yellow-300` or `text-butter-400` - Emphasized text
- **Dark Text on Yellow**: `text-yellow-800` or `text-brown-900` - Text on yellow buttons

### Border Colors
- **Default Border**: `border-slate-700` or `border-brown-700` - Standard borders
- **Hover Border**: `border-butter-400` or `border-butter-500` - Interactive borders
- **Focus Border**: `border-butter-500` - Input focus states

## Component-Specific Color Usage

### Buttons
```tsx
// Primary Action Button
className="bg-butter-400 hover:bg-butter-500 text-yellow-800 rounded-xl"

// Secondary Button
className="bg-brown-800 hover:bg-brown-700 text-white border border-slate-700 rounded-xl"

// Text Button
className="text-slate-400 hover:text-white"
```

### Cards & Containers
```tsx
// Card Background
className="bg-brown-800/50 border border-slate-700 rounded-xl"

// Elevated Card
className="bg-brown-700 border border-slate-600 rounded-xl"
```

### Input Fields
```tsx
// Input Background
className="bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-butter-500"
```

### Status Colors
- **Success**: `text-green-400` / `bg-green-400/10` / `border-green-400`
- **Error**: `text-red-400` / `bg-red-400/10` / `border-red-400`
- **Warning**: `text-yellow-400` / `bg-yellow-400/10` / `border-yellow-400`
- **Info**: `text-blue-400` / `bg-blue-400/10` / `border-blue-400`

### Wallet-Specific Colors

#### Balance Display
- **Total Balance**: `text-white` (large, bold)
- **Available Balance**: `text-slate-300`
- **Locked Balance**: `text-slate-500`

#### PNL Colors
- **Positive PNL**: `text-green-400`
- **Negative PNL**: `text-red-400`
- **Neutral**: `text-slate-400`

#### Position Status
- **Active Position**: `bg-green-400/10 border-green-400/30`
- **Pending Position**: `bg-yellow-400/10 border-yellow-400/30`
- **Closed Position**: `bg-slate-800/50 border-slate-700`

## Gradient Patterns

### Hero/Header Gradients
```tsx
// Background
className="bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900"

// Text Gradient
className="bg-gradient-to-r from-butter-300 to-butter-500 bg-clip-text text-transparent"

// Button Glow
className="shadow-lg shadow-butter-400/30 hover:shadow-butter-500/50"
```

### Card Gradients
```tsx
// Subtle glow effect
className="bg-gradient-to-r from-butter-400/20 via-butter-500/20 to-butter-400/20 rounded-xl blur-3xl"
```

## Usage Examples

### Wallet Onboarding Screen
```tsx
<div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900">
  <div className="bg-brown-800/50 border border-slate-700 rounded-xl">
    <h1 className="text-white">Create Your Butter Wallet</h1>
    <p className="text-slate-400">Description text</p>
    <button className="bg-butter-400 hover:bg-butter-500 text-yellow-800">
      Create Wallet
    </button>
  </div>
</div>
```

### Wallet Dashboard
```tsx
<div className="bg-brown-800/50 border border-slate-700 rounded-xl p-6">
  <h2 className="text-white">Total Balance</h2>
  <p className="text-butter-400 text-2xl font-bold">1,234.56 SOL</p>
  <div className="text-green-400">+12.34 SOL (+5.2%)</div>
</div>
```

### Transaction History Item
```tsx
<div className="bg-brown-800/50 border border-slate-700 rounded-lg p-4">
  <span className="text-white">Trade</span>
  <span className="text-green-400">+5.67 SOL</span>
  <span className="text-slate-400">2 hours ago</span>
</div>
```

## Accessibility Notes

- Ensure sufficient contrast ratios:
  - White text on brown-900: ✅ Good contrast
  - Yellow-800 on butter-400: ✅ Good contrast
  - Slate-400 on brown-800: ✅ Good contrast
- Use focus states with butter-500 for keyboard navigation
- Provide alternative indicators beyond color (icons, patterns)

## Tailwind Config Reference

The colors are defined in `tailwind.config.js`:
- `butter-*`: Yellow/gold accent colors (50-900)
- `brown-*`: Dark background colors (50-900)
- Standard Tailwind colors: `slate-*`, `green-*`, `red-*`, `yellow-*`, `blue-*`



