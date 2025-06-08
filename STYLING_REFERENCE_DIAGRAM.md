# 📊 ORDINE DEI COPYWRITER ESTINTI - Complete Styling Reference Diagram

## 🎨 Global Styling Control Center

### 📁 `client/src/index.css` - Master Style Controller
```
Lines 1-3: Font Imports & Tailwind Setup
├── Line 1: @import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
├── Line 2: @tailwind base;
└── Line 3: @tailwind components;

Lines 7-47: Animation Keyframes
├── Lines 7-10: @keyframes gridMove
├── Lines 12-15: @keyframes float  
├── Lines 17-24: @keyframes pulse-glow
├── Lines 26-32: @keyframes morphing-border
├── Lines 34-37: @keyframes shimmer
├── Lines 39-42: @keyframes levitate
└── Lines 44-47: @keyframes typewriter-blink

Lines 49-68: Tablet Scrollbar Styling
├── Lines 50-52: .tablet-scrollbar base
├── Lines 54-56: webkit-scrollbar width
├── Lines 58-61: webkit-scrollbar-track
├── Lines 63-67: webkit-scrollbar-thumb
└── Lines 69-71: webkit-scrollbar-thumb:hover

Lines 73-101: Auto/Manual Scroll Effects
├── Lines 74-76: .auto-scroll behavior
├── Lines 78-91: .auto-scroll::before gradient indicator
├── Lines 93-95: .manual-scroll behavior
└── Lines 97-100: @keyframes scroll-pulse

Lines 102-110: Typewriter Cursor
├── Lines 103-105: .typewriter-cursor animation
└── Lines 107-110: @keyframes cursor-blink

Lines 112-152: RESPONSIVE TEXT SYSTEM (Main Control)
├── Lines 115-117: .responsive-hero-title (3rem mobile)
├── Lines 120-152: .responsive-nav-text (Progressive scaling)
│   ├── Line 121: Mobile: 1rem
│   ├── Line 126: 480px+: 1.25rem
│   ├── Line 131: 640px+: 1.5rem
│   ├── Line 138: 768px+: 1.875rem (tablet)
│   ├── Line 144: 1024px+: 2.25rem (PC)
│   └── Line 150: 1280px+: 2.5rem (large PC)

Lines 154-170: Section & Content Text Sizes
├── Lines 155-157: .responsive-section-title (2rem mobile)
├── Lines 159-161: .responsive-body-text (1rem mobile)
├── Lines 163-165: .responsive-subtitle (1.125rem mobile)
├── Lines 167-169: .responsive-button-text (1rem mobile)
└── Lines 171-173: .responsive-card-text (0.875rem mobile)

Lines 175-185: Tablet Typewriter Specific
├── Lines 176-178: .tablet-text-responsive (30px desktop)
└── Lines 181-185: Mobile override (15px, line-height 1.6)

Lines 187-230: Color Variables (CSS Custom Properties)
├── Lines 188-215: Shadcn/UI color system mapping
└── Lines 217-230: Official brand color palette

Lines 232-290: Component-Specific Styling
├── Lines 233-242: .purple-secondary button
├── Lines 244-251: .premium-input form styling
├── Lines 253-261: .service-card hover effects
├── Lines 263-268: .typewriter-paper background
└── Lines 270-290: Mobile responsiveness (@media max-width: 768px)
```

## 🧩 Component-Specific Font & Margin Controls

### 📁 `client/src/components/Navigation.tsx`
```
Lines 38-45: Header Title Styling
├── Line 38: className="responsive-nav-text font-bold tracking-tight..."
├── Line 40: fontFamily: 'MedievalSharp, serif'
└── Line 41: color: 'hsl(0, 0%, 96%)'

Lines 19-50: Layout & Spacing
├── Line 19: className="flex items-center h-20"
├── Line 21: className="flex-shrink-0" (hamburger container)
├── Line 36: className="flex-1 flex justify-center" (title container)
└── Line 49: className="flex-shrink-0 w-10" (right spacer)

Lines 62-103: Mobile Menu Styling
├── Line 62: className="block px-4 py-3 text-lg..."
├── Line 72: Same pattern repeated for each menu item
└── Lines 59-105: Dropdown container styling
```

### 📁 `client/src/components/HeroSection.tsx`
```
Hero Text Styling (estimated lines):
├── Hero title: .responsive-hero-title class
├── Subtitle: .responsive-subtitle class
└── Button: .responsive-button-text class
```

### 📁 `client/src/components/TypewriterSection.tsx`
```
Lines 98-104: Typewriter Container
├── Line 99: className="w-full h-full overflow-y-auto p-4 text-[30px] md:text-[30px] leading-relaxed"
├── Line 106: className="text-white font-mono"
└── Line 114: className="typewriter-cursor text-gray-400"

Lines 107-112: Text Rendering
├── Inline text mapping with line breaks
└── Cursor animation integration
```

### 📁 `client/src/components/TabletFrame.tsx`
```
Lines 351-363: Mobile Text Styling
├── Line 356: className="text-gray-800 font-serif leading-relaxed p-1 tablet-text-responsive"
├── Lines 357-363: Inline styles for word wrapping
└── Line 361: className="typewriter-cursor text-gray-600"

Lines 395-401: Tablet/PC Text Styling
├── Line 396: className="text-gray-800 font-serif leading-relaxed px-2 sm:px-3 tablet-text-responsive"
└── Line 397: style={{ lineHeight: '1.6' }}

Layout Containers:
├── Lines 327-340: Mobile frame positioning
├── Lines 371-378: Tablet frame positioning
└── Frame SVG definitions with responsive viewBox
```

### 📁 `client/src/components/MorphingCard.tsx`
```
Card Text Styling (estimated):
├── Uses .responsive-card-text class
├── Margin/padding controlled by p-* classes
└── Font styling via className props
```

### 📁 `client/src/components/GlowingText.tsx`
```
Glow Effect Controls:
├── Text-shadow intensity levels
├── Color customization via props
└── Animation integration
```

## 🎯 Button Styling Controls

### 📁 `client/src/components/ui/button.tsx`
```
Button Variants (estimated lines):
├── Default: Standard padding, font-size
├── Large: Increased padding, .responsive-button-text
├── Small: Reduced padding, smaller font
└── Ghost/Outline: Border and background variants
```

### 📁 Form Components (`pages/*.tsx`)
```
client/src/pages/Contatti.tsx:
├── Form input styling via .premium-input
├── Button styling via shadcn variants
└── Error message styling

client/src/pages/DiagnosiChirurgica.tsx:
├── Similar form control patterns
└── Responsive layout classes
```

## 🔧 Quick Modification Guide

### To Change Font Sizes:
1. **Header**: Modify lines 120-152 in `index.css` (.responsive-nav-text)
2. **Body Text**: Modify lines 159-161 (.responsive-body-text)
3. **Buttons**: Modify lines 167-169 (.responsive-button-text)
4. **Typewriter**: Modify lines 176-185 (.tablet-text-responsive)

### To Change Margins/Padding:
1. **Navigation**: Lines 19-50 in `Navigation.tsx`
2. **Cards**: Component-specific className props
3. **Forms**: Lines 244-251 in `index.css` (.premium-input)
4. **Global**: Tailwind classes in component files

### To Change Colors:
1. **Brand Colors**: Lines 217-230 in `index.css`
2. **Component Colors**: Lines 187-215 (CSS variables)
3. **Specific Elements**: Inline styles in component files

### To Change Fonts:
1. **Add New Font**: Line 1 in `index.css` (Google Fonts import)
2. **Apply Font**: Update fontFamily in component inline styles
3. **Global Font**: Modify Tailwind config or CSS variables

## 📱 Responsive Breakpoints Reference
```
Mobile: < 480px
Small Tablet: 480px - 639px  
Tablet: 640px - 767px
Large Tablet: 768px - 1023px
PC: 1024px - 1279px
Large PC: 1280px+
```

---
*This diagram provides complete control over all visual elements in the ORDINE DEI COPYWRITER ESTINTI website.*