# Year Progress Dots – Design Guidelines

## 1. Brand Identity

**Purpose**: A motivational live wallpaper that transforms your phone's background into a visual year tracker, marking each completed day with a single dot. Purpose-driven minimalism for daily accountability.

**Aesthetic Direction**: **Brutally minimal with dramatic contrast** — stark, essential, maximum impact through restraint. Think "data visualization meets zen meditation."

**Memorable Element**: The hypnotic dot grid itself — a living, breathing calendar that fills up day by day. The satisfaction of watching the year progress in real-time on your home screen.

**Personality**: Focused, disciplined, quietly motivating. Not gamified or playful — this is for people who appreciate understated elegance and data-driven progress tracking.

---

## 2. Navigation Architecture

**Root Structure**: Single Settings Activity launched from system wallpaper picker or long-press gesture.

**Screens**:
1. **Live Wallpaper** (main experience, always visible as device background)
2. **Settings Screen** (modal, accessed via system wallpaper settings or long-press)

No tabs, no complex navigation — pure utility.

---

## 3. Screen-by-Screen Specifications

### Live Wallpaper Canvas
**Purpose**: Display the entire year as a dot grid, automatically updating daily.

**Layout**:
- Full-screen canvas, edge-to-edge rendering
- Dark background (#0A0A0A, near-black with slight warm tint)
- Dot grid centered both horizontally and vertically
- Safe area considerations: Leave 80dp padding from top (status bar) and bottom (nav buttons) to prevent dots from being obscured

**Grid Structure**:
- 7 columns (representing days of the week, Monday–Sunday)
- 53 rows (to accommodate 365/366 days)
- Dots organized left-to-right, top-to-bottom (Jan 1 = top-left)
- Equal spacing between dots (minimum 12dp gap)
- Adaptive dot size based on screen height (target: 8–14dp diameter)

**Dot States**:
- **Past days**: Bright accent (#FFD700, golden/amber)
- **Today**: Highlighted with glowing ring (#FF6B35, vibrant orange, 2dp stroke around dot)
- **Future days**: Subtle dim gray (#2A2A2A, barely visible)
- All dots perfectly circular, anti-aliased edges

**Behavior**:
- Static rendering (no animations)
- Auto-refresh at midnight
- Immediate update when settings change

---

### Settings Screen
**Purpose**: Customize wallpaper appearance and behavior.

**Layout**:
- **Header**: Material Design app bar with "Year Progress Settings" title, no back button (modal presentation)
- **Content**: Scrollable preference list using Material Design components
- **Bottom**: "Preview" floating action button (bottom-right, 16dp margin) to instantly see changes applied to wallpaper

**Preference Groups**:

1. **Appearance**
   - Dot size slider (Small / Medium / Large, with live preview)
   - Spacing slider (Compact / Normal / Spacious)
   - Color pickers for:
     - Completed days (default: #FFD700)
     - Today highlight (default: #FF6B35)
     - Future days (default: #2A2A2A)
   
2. **Behavior**
   - Toggle: "Highlight today" (ON by default)
   - Toggle: "Start week on Sunday" (OFF by default, Monday is default)

3. **About**
   - App version
   - "Reset to defaults" button (destructive action, shows confirmation dialog)

**Components Needed**:
- Material Sliders with value labels
- Color picker dialogs (use Material color picker library)
- Material switches for toggles
- Floating Action Button for preview
- SnackBar for "Settings saved" confirmation

**Safe Areas**:
- Top inset: Use system insets.top + 16dp
- Bottom inset: Use system insets.bottom + 16dp + FAB height (56dp) for scrollable content
- Floating preview button: 16dp from bottom-right after system insets

---

## 4. Color Palette

**Philosophy**: High contrast, nocturnal palette with warm accent punches. Black canvas allows dots to glow like stars.

- **Background**: #0A0A0A (near-black, slightly warm)
- **Surface** (Settings screen): #121212 (Material dark surface)
- **Primary Accent** (completed days): #FFD700 (golden amber)
- **Today Highlight**: #FF6B35 (vibrant orange)
- **Future/Inactive**: #2A2A2A (dim gray)
- **Text Primary**: #E8E8E8 (off-white)
- **Text Secondary**: #8A8A8A (medium gray)

**Interaction States**:
- Settings list items: Subtle ripple (#FFFFFF, 8% opacity)
- Sliders: Use Primary Accent color for active thumb/track
- Disabled elements: 38% opacity

---

## 5. Typography

**Font**: System default (Roboto on Android) — no custom fonts needed. Clarity over personality for utility apps.

**Type Scale**:
- **Settings screen title**: 24sp, Medium weight
- **Preference group headers**: 14sp, Medium weight, All caps, Letter spacing +0.5sp
- **Preference labels**: 16sp, Regular weight
- **Preference descriptions**: 14sp, Regular weight, Text Secondary color

---

## 6. Assets to Generate

1. **icon.png** (512×512px)
   - Description: App icon showing a simplified 7×7 dot grid, with top-left dots filled (golden), one dot highlighted (orange), rest dim gray. Dark background.
   - WHERE USED: App launcher, system wallpaper picker

2. **preview-thumb.png** (400×800px)
   - Description: Thumbnail preview of the wallpaper showing partial year progress (approximately 40% completed dots)
   - WHERE USED: Live wallpaper preview in system settings

3. **empty-year.png** (Decorative illustration, 200×200dp)
   - Description: Subtle illustration of an empty dot grid with single glowing dot, used when year resets
   - WHERE USED: Settings screen header (optional decorative element) or New Year's Day special state

**Icon Specifications**:
- Style: Geometric, minimal, pixel-perfect alignment
- Colors: Match app palette exactly
- NO gradients, NO shadows — pure flat design
- High contrast to stand out on device launchers

---

## Visual Design Principles

- **No blur shadows** — hard edges only
- **Perfect circular dots** — use anti-aliasing for smooth curves
- **Touchable feedback**: Settings items use Material ripple (no custom press states needed for wallpaper itself)
- **Accessibility**: Ensure completed vs. future dots have minimum 3:1 contrast ratio against background
- **Performance**: Static rendering only; wallpaper should NOT animate or drain battery

---

**Total Token Budget**: ~1950 tokens