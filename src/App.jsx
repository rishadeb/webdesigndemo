import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const themes = [
  {
    id: 'minimal',
    name: 'Minimalism',
    tone: 'Quiet precision',
    blurb: 'Whitespace, monochrome tension, and careful hierarchy.',
    motion: 'minimal',
    scheme: 'light',
    stageLabel: 'Silence becomes hierarchy',
    principles: ['Whitespace-led', 'Monochrome', 'Soft depth'],
    blueprint: {
      typography:
        'Use a restrained sans-serif stack, tight display tracking, and medium weights with very little decorative styling.',
      spacing:
        'Create breathing room with long vertical rhythm, narrow text columns, and wide outer gutters so every module feels intentional.',
      css: [
        'background: rgb(247, 245, 240)',
        'border: 1px solid rgba(18, 18, 18, 0.14)',
        'border-radius: 30px and pill controls',
        'shadows: minimal or ultra-soft only',
      ],
      metaPrompt:
        'Design a minimalist product landing page with generous whitespace, monochrome surfaces, sans-serif typography, subtle fades, thin dividers, and almost no ornament. Let spacing, scale, and alignment create contrast instead of color.',
    },
    vars: {
      '--bg': '247 245 240',
      '--panel': '255 255 255',
      '--panel-soft': '241 238 232',
      '--text': '18 18 18',
      '--muted': '102 99 95',
      '--accent': '32 32 32',
      '--accent-2': '104 104 104',
      '--border': '32 32 32',
      '--grid-line': '32 32 32',
      '--button-text': '247 245 240',
      '--font-display': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--font-body': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--display-tracking': '-0.06em',
      '--grid-opacity': '0.045',
      '--halo-opacity': '0.18',
      '--surface-blur': '0px',
      '--outline-size': '1px',
      '--card-radius': '30px',
      '--button-radius': '999px',
      '--panel-alpha': '0.94',
      '--shadow': '0 30px 70px rgba(18, 18, 18, 0.08)',
    },
  },
  {
    id: 'azure',
    name: 'Azure Minimal',
    tone: 'Calm signal',
    blurb: 'Minimal structure with cool blue contrast and product clarity.',
    motion: 'minimal',
    scheme: 'light',
    stageLabel: 'Blue carries the hierarchy',
    principles: ['Whitespace-led', 'Blue ink accents', 'Quiet precision'],
    blueprint: {
      typography:
        'Keep the same restrained sans-serif system as classic minimalism, but let blue-toned contrast and crisp spacing carry the personality instead of monochrome tension.',
      spacing:
        'Preserve long vertical rhythm, disciplined content widths, and generous outer gutters so the interface still feels sparse, measured, and premium.',
      css: [
        'background: cool paper blues',
        'border: 1px solid rgba(32, 58, 102, 0.14)',
        'accent color: deep azure instead of black',
        'shadows: soft and low-contrast only',
      ],
      metaPrompt:
        'Design a blue-minimal product landing page with generous whitespace, crisp sans-serif typography, cool paper-like surfaces, deep azure accents, thin dividers, and almost no ornament. Let spacing, type, and blue contrast create hierarchy instead of heavy decoration.',
    },
    vars: {
      '--bg': '238 244 252',
      '--panel': '250 252 255',
      '--panel-soft': '229 237 248',
      '--text': '20 35 64',
      '--muted': '93 110 140',
      '--accent': '38 92 184',
      '--accent-2': '108 156 232',
      '--border': '32 58 102',
      '--grid-line': '76 118 188',
      '--button-text': '245 249 255',
      '--font-display': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--font-body': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--display-tracking': '-0.06em',
      '--grid-opacity': '0.05',
      '--halo-opacity': '0.22',
      '--surface-blur': '0px',
      '--outline-size': '1px',
      '--card-radius': '30px',
      '--button-radius': '999px',
      '--panel-alpha': '0.95',
      '--shadow': '0 30px 70px rgba(38, 92, 184, 0.1)',
    },
  },
  {
    id: 'glass',
    name: 'Glassmorphism',
    tone: 'Ambient layers',
    blurb: 'Frosted panels, prism color, and atmospheric blur.',
    motion: 'glass',
    scheme: 'light',
    stageLabel: 'Light bends through the interface',
    principles: ['Blurred glass', 'Iridescent color', 'Floating stacks'],
    blueprint: {
      typography:
        'Keep typography clean and modern so the glass effects stay dominant. Use smooth weights and a calm sans-serif with plenty of line height.',
      spacing:
        'Layer modules with generous gaps and overlapping depth. Give cards enough padding to read through the blur without feeling dense.',
      css: [
        'backdrop-filter: blur(24px)',
        'background: rgba(255, 255, 255, 0.22)',
        'border: 1px solid rgba(255, 255, 255, 0.35)',
        'gradient glows behind panels',
      ],
      metaPrompt:
        'Create a glassmorphism landing page with translucent panels, colorful gradient halos, soft borders, rounded corners, and buoyant spring motion. Typography should stay clean and minimal while the surfaces feel frosted and luminous.',
    },
    vars: {
      '--bg': '232 238 255',
      '--panel': '255 255 255',
      '--panel-soft': '213 224 255',
      '--text': '24 31 58',
      '--muted': '87 97 136',
      '--accent': '85 121 255',
      '--accent-2': '255 91 176',
      '--border': '255 255 255',
      '--grid-line': '115 145 255',
      '--button-text': '255 255 255',
      '--font-display': '"SF Pro Display", "Avenir Next", sans-serif',
      '--font-body': '"SF Pro Text", "Helvetica Neue", sans-serif',
      '--display-tracking': '-0.05em',
      '--grid-opacity': '0.06',
      '--halo-opacity': '0.9',
      '--surface-blur': '24px',
      '--outline-size': '1px',
      '--card-radius': '32px',
      '--button-radius': '999px',
      '--panel-alpha': '0.28',
      '--shadow': '0 30px 80px rgba(85, 121, 255, 0.22)',
    },
  },
  {
    id: 'brutal',
    name: 'Neo-Brutalism',
    tone: 'Loud contrast',
    blurb: 'Heavy borders, bright clashes, and unapologetic geometry.',
    motion: 'brutal',
    scheme: 'light',
    stageLabel: 'Impact over polish',
    principles: ['Thick outlines', 'Clashing colors', 'Staccato motion'],
    blueprint: {
      typography:
        'Pair a familiar serif with bold uppercase labels. Size shifts should feel abrupt and intentionally unrefined.',
      spacing:
        'Use punchy, modular spacing with hard-edged blocks that sit close enough to feel energetic rather than serene.',
      css: [
        'border: 4px solid #111',
        'box-shadow: 10px 10px 0 #111',
        'backgrounds in bright, clashing solids',
        'border-radius kept low or sharply rectangular',
      ],
      metaPrompt:
        'Build a neo-brutalist landing page with thick black borders, offset shadows, serif typography, high-contrast labels, and clashing colors. Motion should land in punchy stepped movements instead of smooth glides.',
    },
    vars: {
      '--bg': '255 244 128',
      '--panel': '255 255 255',
      '--panel-soft': '255 106 181',
      '--text': '16 16 16',
      '--muted': '66 66 66',
      '--accent': '41 199 165',
      '--accent-2': '255 84 84',
      '--border': '17 17 17',
      '--grid-line': '17 17 17',
      '--button-text': '17 17 17',
      '--font-display': '"Georgia", "Times New Roman", serif',
      '--font-body': '"Trebuchet MS", "Arial", sans-serif',
      '--display-tracking': '-0.035em',
      '--grid-opacity': '0.08',
      '--halo-opacity': '0.28',
      '--surface-blur': '0px',
      '--outline-size': '4px',
      '--card-radius': '16px',
      '--button-radius': '14px',
      '--panel-alpha': '0.96',
      '--shadow': '10px 10px 0 rgba(17, 17, 17, 0.98)',
    },
  },
  {
    id: 'cyber',
    name: 'Futuristic / Cyber',
    tone: 'Neon systems',
    blurb: 'Dark surfaces, electric accents, and glowing signal lines.',
    motion: 'cyber',
    scheme: 'dark',
    stageLabel: 'Signals cut through the dark',
    principles: ['Neon glow', 'Dark chrome', 'Signal-led UI'],
    blueprint: {
      typography:
        'Use a technical sans-serif or mono-accent mix. Uppercase microcopy and glowing separators help the interface feel machine-tuned.',
      spacing:
        'Keep spacing precise and modular, with stacked rows, compact metadata, and enough padding to let the glow breathe.',
      css: [
        'background: rgb(9, 10, 16)',
        'box-shadow: 0 0 30px rgba(0, 255, 214, 0.2)',
        'border: 1px solid rgba(0, 255, 214, 0.45)',
        'text-shadow or glow on key accents only',
      ],
      metaPrompt:
        'Design a cyber-futuristic landing page with dark chrome surfaces, neon cyan and magenta accents, glowing borders, uppercase utility text, and clipped reveal animations that feel like signal scans.',
    },
    vars: {
      '--bg': '9 10 16',
      '--panel': '18 20 32',
      '--panel-soft': '20 28 47',
      '--text': '233 246 255',
      '--muted': '128 153 173',
      '--accent': '0 255 214',
      '--accent-2': '255 0 168',
      '--border': '0 255 214',
      '--grid-line': '0 255 214',
      '--button-text': '8 12 17',
      '--font-display': '"Eurostile", "Avenir Next", sans-serif',
      '--font-body': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--display-tracking': '-0.045em',
      '--grid-opacity': '0.1',
      '--halo-opacity': '0.72',
      '--surface-blur': '12px',
      '--outline-size': '1.5px',
      '--card-radius': '24px',
      '--button-radius': '14px',
      '--panel-alpha': '0.88',
      '--shadow': '0 0 40px rgba(0, 255, 214, 0.15)',
    },
  },
  {
    id: 'editorial',
    name: 'Editorial',
    tone: 'Magazine serenity',
    blurb: 'Elegant serif rhythm with warm paper-like restraint.',
    motion: 'editorial',
    scheme: 'light',
    stageLabel: 'Storytelling through measured pace',
    principles: ['Serif display', 'Paper tones', 'Measured reveals'],
    blueprint: {
      typography:
        'Lead with a refined serif for headlines and pair it with a quieter sans-serif body. Let text blocks feel like editorial columns.',
      spacing:
        'Use consistent baselines, balanced margins, and elegant negative space. Sections should feel paced like spreads, not dashboards.',
      css: [
        'background: warm neutral paper tones',
        'fine borders and hairline dividers',
        'very soft shadows, if any',
        'narrow content columns for supporting copy',
      ],
      metaPrompt:
        'Create an editorial landing page with warm paper colors, refined serif headlines, disciplined column widths, and smooth upward reveals. The page should feel like a luxury magazine translated into product design.',
    },
    vars: {
      '--bg': '242 233 222',
      '--panel': '250 245 240',
      '--panel-soft': '229 214 200',
      '--text': '35 27 22',
      '--muted': '116 92 78',
      '--accent': '122 61 33',
      '--accent-2': '179 132 81',
      '--border': '91 67 56',
      '--grid-line': '122 61 33',
      '--button-text': '248 241 233',
      '--font-display': '"Iowan Old Style", "Georgia", serif',
      '--font-body': '"Gill Sans", "Trebuchet MS", sans-serif',
      '--display-tracking': '-0.04em',
      '--grid-opacity': '0.04',
      '--halo-opacity': '0.2',
      '--surface-blur': '0px',
      '--outline-size': '1px',
      '--card-radius': '10px',
      '--button-radius': '999px',
      '--panel-alpha': '0.95',
      '--shadow': '0 30px 60px rgba(91, 67, 56, 0.12)',
    },
  },
  {
    id: 'organic',
    name: 'Organic Warmth',
    tone: 'Human-centered calm',
    blurb: 'Rounded shapes, natural greens, and tactile softness.',
    motion: 'organic',
    scheme: 'light',
    stageLabel: 'Interfaces with a pulse',
    principles: ['Soft radii', 'Natural color', 'Gentle drift'],
    blueprint: {
      typography:
        'Choose approachable sans-serif typography with moderate contrast and enough softness that the page feels welcoming, not sterile.',
      spacing:
        'Lean into roomy but cozy spacing, nested rounded sections, and overlapping organic shapes that keep the layout from feeling mechanical.',
      css: [
        'large border-radius values',
        'muted green and clay accent palette',
        'soft inset highlights and subtle shadows',
        'gradient blobs or organic backgrounds',
      ],
      metaPrompt:
        'Build an organic landing page with rounded forms, natural greens, clay accents, soft gradients, and gentle floating transitions. Typography should feel approachable and human while surfaces stay calm and tactile.',
    },
    vars: {
      '--bg': '238 242 232',
      '--panel': '250 252 247',
      '--panel-soft': '214 227 207',
      '--text': '33 45 31',
      '--muted': '96 110 87',
      '--accent': '62 116 74',
      '--accent-2': '187 108 59',
      '--border': '99 126 91',
      '--grid-line': '99 126 91',
      '--button-text': '247 250 245',
      '--font-display': '"Optima", "Gill Sans", sans-serif',
      '--font-body': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--display-tracking': '-0.045em',
      '--grid-opacity': '0.045',
      '--halo-opacity': '0.26',
      '--surface-blur': '8px',
      '--outline-size': '1px',
      '--card-radius': '34px',
      '--button-radius': '999px',
      '--panel-alpha': '0.9',
      '--shadow': '0 28px 70px rgba(62, 116, 74, 0.14)',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Cinema',
    tone: 'Cinematic warmth',
    blurb: 'Deep twilight surfaces with amber spotlights and drama.',
    motion: 'midnight',
    scheme: 'dark',
    stageLabel: 'A spotlight across the product',
    principles: ['Low-light depth', 'Amber highlights', 'Cinematic reveals'],
    blueprint: {
      typography:
        'Use a dramatic display serif or high-contrast sans for headlines, paired with a simpler body face that feels premium in low light.',
      spacing:
        'Let sections breathe like scenes. Add strong top and bottom padding, deep horizontal framing, and layered foreground/background depth.',
      css: [
        'background: deep navy to plum tones',
        'warm amber accent glows',
        'soft vignettes and long shadows',
        'rich panels with subtle transparency',
      ],
      metaPrompt:
        'Design a cinematic dark landing page with deep indigo surfaces, warm amber highlights, soft vignettes, and elegant reveal motion. The result should feel like a premium trailer frame rather than a standard SaaS page.',
    },
    vars: {
      '--bg': '18 22 35',
      '--panel': '35 41 62',
      '--panel-soft': '22 29 48',
      '--text': '245 241 234',
      '--muted': '176 171 186',
      '--accent': '247 143 95',
      '--accent-2': '255 213 102',
      '--border': '93 82 129',
      '--grid-line': '255 213 102',
      '--button-text': '27 22 36',
      '--font-display': '"Didot", "Georgia", serif',
      '--font-body': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--display-tracking': '-0.045em',
      '--grid-opacity': '0.055',
      '--halo-opacity': '0.5',
      '--surface-blur': '8px',
      '--outline-size': '1px',
      '--card-radius': '28px',
      '--button-radius': '999px',
      '--panel-alpha': '0.82',
      '--shadow': '0 30px 90px rgba(0, 0, 0, 0.35)',
    },
  },
  {
    id: 'luxe',
    name: 'Luxe Noir',
    tone: 'Gilded drama',
    blurb: 'Dark velvet surfaces with gold trim and controlled opulence.',
    motion: 'luxe',
    scheme: 'dark',
    stageLabel: 'Luxury through restraint',
    principles: ['Gold accents', 'Velvet darks', 'Slow zooms'],
    blueprint: {
      typography:
        'Favor high-contrast serif headlines and polished body text. The typography should feel premium without becoming ornamental overload.',
      spacing:
        'Use generous spacing, narrow text columns, and carefully framed sections so gold accents feel precious rather than busy.',
      css: [
        'dark chocolate or charcoal base',
        'thin metallic borders',
        'subtle glow or sheen instead of bright gradients',
        'rich shadows with clean silhouette edges',
      ],
      metaPrompt:
        'Create a luxe noir landing page with deep dark surfaces, gold accents, refined serif typography, and slow, deliberate motion. Avoid clutter and let selective highlights make the interface feel premium and exclusive.',
    },
    vars: {
      '--bg': '22 18 17',
      '--panel': '39 31 29',
      '--panel-soft': '60 42 37',
      '--text': '245 234 226',
      '--muted': '180 157 145',
      '--accent': '221 177 92',
      '--accent-2': '187 80 62',
      '--border': '124 98 56',
      '--grid-line': '221 177 92',
      '--button-text': '24 18 16',
      '--font-display': '"Baskerville", "Times New Roman", serif',
      '--font-body': '"Avenir Next", "Helvetica Neue", sans-serif',
      '--display-tracking': '-0.05em',
      '--grid-opacity': '0.05',
      '--halo-opacity': '0.3',
      '--surface-blur': '6px',
      '--outline-size': '1px',
      '--card-radius': '20px',
      '--button-radius': '999px',
      '--panel-alpha': '0.86',
      '--shadow': '0 30px 90px rgba(0, 0, 0, 0.4)',
    },
  },
  {
    id: 'blueprint',
    name: 'Blueprint Tech',
    tone: 'Structured clarity',
    blurb: 'Measured grids, technical blue ink, and schematic precision.',
    motion: 'blueprint',
    scheme: 'light',
    stageLabel: 'Every surface feels plotted',
    principles: ['Visible grids', 'Blueprint blue', 'Precise layout'],
    blueprint: {
      typography:
        'Use crisp sans-serif typography with occasional mono accents for metadata. Everything should read as engineered and deliberate.',
      spacing:
        'Work on a visible grid, align panels to clean increments, and let margins feel mathematically consistent across sections.',
      css: [
        'background: pale blueprint wash',
        'thin blueprint line grid',
        '1px to 2px borders with technical color',
        'small-radius panels and compact utility labels',
      ],
      metaPrompt:
        'Build a blueprint-inspired landing page with visible grid lines, cool blue accents, precise spacing, technical labels, and crisp reveal motion. The layout should feel engineered, readable, and methodical from top to bottom.',
    },
    vars: {
      '--bg': '230 240 248',
      '--panel': '246 251 255',
      '--panel-soft': '215 229 241',
      '--text': '17 46 76',
      '--muted': '84 109 131',
      '--accent': '0 98 255',
      '--accent-2': '53 177 255',
      '--border': '72 122 179',
      '--grid-line': '72 122 179',
      '--button-text': '244 249 255',
      '--font-display': '"Avenir Next Condensed", "Arial Narrow", sans-serif',
      '--font-body': '"Menlo", "Courier New", monospace',
      '--display-tracking': '-0.03em',
      '--grid-opacity': '0.11',
      '--halo-opacity': '0.22',
      '--surface-blur': '4px',
      '--outline-size': '1px',
      '--card-radius': '18px',
      '--button-radius': '12px',
      '--panel-alpha': '0.9',
      '--shadow': '0 24px 65px rgba(0, 98, 255, 0.12)',
    },
  },
];

const themeGuideContent = {
  minimal: {
    thesis: 'Create calm through scale, spacing, and a nearly monochrome material palette.',
    layout:
      'Treat the first viewport like a poster with one oversized headline, a narrow supporting paragraph, and almost no competing decoration. Keep sections open, aligned, and lightly divided.',
    components:
      'Use pill buttons, hairline borders, soft rounded cards, and simple content grouping. Components should disappear into the layout rather than call attention to themselves.',
    motion:
      'Use subtle fades, small vertical lifts, and quiet transitions with no bounce. Motion should clarify hierarchy, not add personality.',
    avoid: ['Harsh gradients', 'Dense UI clusters', 'Oversized shadows', 'Decorative icons'],
  },
  azure: {
    thesis: 'Keep minimalist restraint, but use an azure palette to make hierarchy feel product-ready instead of monochrome.',
    layout:
      'Treat the page like a clean software brand system with wide negative space, narrow text measures, and calm blue contrast guiding the scan path.',
    components:
      'Use pill buttons, thin blue-toned borders, cool paper surfaces, understated panels, and restrained emphasis blocks that feel systematic rather than decorative.',
    motion:
      'Use the same quiet upward reveals and soft fades as minimalism. Motion should feel precise, clear, and almost invisible once the section settles.',
    avoid: ['Glossy gradients', 'Dark heavy chrome', 'Multiple accent colors', 'Loud glass effects'],
  },
  glass: {
    thesis: 'Build luminous depth with translucent surfaces floating above vivid atmospheric color.',
    layout:
      'Stack frosted panels over a spacious background with overlapping halos and rounded modules. Leave enough margin so blur and gradients can breathe.',
    components:
      'Use glass cards, soft borders, capsule controls, layered glows, and visible transparency. Keep text blocks calm so the surfaces remain the star.',
    motion:
      'Use buoyant spring entrances, slow drift, and blur-to-sharp reveals. Interactions should feel weightless and polished.',
    avoid: ['Heavy black outlines', 'Opaque surfaces', 'Too many text styles', 'Crowded card grids'],
  },
  brutal: {
    thesis: 'Favor impact, contradiction, and attitude over polish.',
    layout:
      'Compose with chunky modules, abrupt spacing changes, and strong contrast blocks. Let sections feel loud and editorial rather than refined.',
    components:
      'Use thick black borders, offset shadows, bright clashing fills, bold labels, and rectangular or barely rounded corners.',
    motion:
      'Use stepped movement, punchy offsets, and quick positional snaps. The animation should feel physical and slightly rebellious.',
    avoid: ['Soft gradients', 'Elegant polish', 'Thin borders', 'Muted color systems'],
  },
  cyber: {
    thesis: 'Present the interface as a signal-rich control surface lit by neon energy.',
    layout:
      'Use modular rows, glowing dividers, clipped panels, and dark negative space. Structure the page like a futuristic dashboard with clear lanes.',
    components:
      'Use glowing borders, dark chrome surfaces, clipped buttons, utility labels, and disciplined metadata blocks.',
    motion:
      'Reveal sections with scan-like masks, sharp lateral movement, and restrained glow pulses. Motion should feel engineered and deliberate.',
    avoid: ['Warm paper textures', 'Organic curves everywhere', 'Playful color noise', 'Soft pastel shadows'],
  },
  editorial: {
    thesis: 'Translate magazine restraint into a product landing page.',
    layout:
      'Use elegant columns, refined measure, and paced vertical spacing. The layout should feel curated, almost like a print spread adapted for screen.',
    components:
      'Use hairline dividers, understated buttons, serif headlines, and content blocks that feel typographic before they feel componentized.',
    motion:
      'Use smooth upward reveals and slow fades with little spring. Transitions should feel measured and graceful.',
    avoid: ['Glassy chrome', 'Heavy dashboard cards', 'Neon accents', 'Aggressive motion'],
  },
  organic: {
    thesis: 'Make the interface feel human, tactile, and softly alive.',
    layout:
      'Favor roomy spacing, nested rounded surfaces, and natural asymmetry. Let the page feel less mechanical and more conversational.',
    components:
      'Use soft radii, gentle shadows, natural green and clay accents, and layered shapes with subtle tonal variation.',
    motion:
      'Use drift, float, and soft spring easing. Elements should settle naturally rather than snap into place.',
    avoid: ['Rigid geometry', 'Cold monochrome palettes', 'High-contrast technical labels', 'Overly sharp corners'],
  },
  midnight: {
    thesis: 'Stage the page like a cinematic frame with warm highlights in deep darkness.',
    layout:
      'Use broad framing, dramatic spacing, and layered depth so sections read like scenes. Let warm accents guide attention instead of loud decoration.',
    components:
      'Use rich dark panels, amber glows, soft vignettes, and premium typography with visible contrast in scale.',
    motion:
      'Use slow reveal timing, subtle zoom, and long easing curves. The page should feel atmospheric rather than fast.',
    avoid: ['Bright flat backgrounds', 'Clashing color accents', 'Tiny cramped modules', 'Hyperactive motion'],
  },
  luxe: {
    thesis: 'Signal exclusivity through restraint, dark richness, and metallic detail.',
    layout:
      'Keep the composition spacious and selective so every highlight feels expensive. Let typography and framing carry the luxury tone.',
    components:
      'Use velvet-dark surfaces, gold trim, refined serif headlines, and minimal but deliberate highlights and shadows.',
    motion:
      'Use measured slow zooms, gentle fades, and polished hover lifts. Motion should feel controlled and premium.',
    avoid: ['Too many accent colors', 'Playful shapes', 'Noisy gradients', 'Dense information stacking'],
  },
  blueprint: {
    thesis: 'Make every section feel plotted, engineered, and technically precise.',
    layout:
      'Work off a visible grid with consistent increments, clean module spacing, and highly ordered alignment. The whole page should feel diagrammed.',
    components:
      'Use technical labels, compact radii, crisp borders, mono accents, and clear utility spacing between content layers.',
    motion:
      'Use crisp reveals, short offsets, and precise linear-feeling motion. Interactions should feel engineered, not emotional.',
    avoid: ['Loose asymmetry', 'Painterly surfaces', 'Decorative flourishes', 'Unstructured spacing'],
  },
};

const features = [
  {
    number: '01',
    title: 'Adaptive design system',
    body: 'Swap the visual language instantly while keeping the same product story, CTA hierarchy, and commercial structure intact.',
  },
  {
    number: '02',
    title: 'Motion tuned to the mood',
    body: 'Each theme has its own entrance cadence, from quiet fades to punchy stepped movement and clipped cyber scans.',
  },
  {
    number: '03',
    title: 'Prompt-ready blueprint',
    body: 'Every aesthetic exposes the typography, spacing rules, and CSS ingredients needed to recreate the look in your own project.',
  },
];

const testimonials = [
  {
    quote:
      'We used Nexus Corp to present one launch concept to five different stakeholders, and each team finally saw a direction they could believe in.',
    name: 'Leila Grant',
    role: 'Creative Director, Northstar Labs',
  },
  {
    quote:
      'The blueprint panel turned our design review into a teaching moment. It made the why behind each visual decision instantly legible.',
    name: 'Marcus Yoon',
    role: 'Design Systems Lead, Kinetic Cloud',
  },
  {
    quote:
      'Most style switchers stop at paint. This one changes hierarchy, surface treatment, and motion language in a way that feels intentional.',
    name: 'Priya Raman',
    role: 'Frontend Architect, Studio Vanta',
  },
];

const carouselSlides = [
  {
    label: 'Use Case 01',
    title: 'Carousel modules are for rotating comparable stories, not hiding critical information.',
    body: 'This example carousel shows how a builder might preview launch modes, case studies, or featured layouts in one shared region. It works best when each slide deserves equal emphasis and the user can control the pace.',
    takeaway: 'Best for featured stories, portfolios, campaign highlights, or product tours with equal-weight items.',
  },
  {
    label: 'Use Case 02',
    title: 'A good carousel still communicates clearly when users only see one frame.',
    body: 'Each slide needs a strong headline, short explanation, and visible controls. If the content only makes sense after several rotations, the component is doing too much hidden work.',
    takeaway: 'Make every slide independently legible and keep controls visible and accessible.',
  },
  {
    label: 'Use Case 03',
    title: 'Use a carousel only when it earns its footprint.',
    body: 'If the content is mission-critical, comparison-heavy, or likely to be skipped, a grid or stacked layout is often stronger. Carousels are best when they help pace a narrative without crowding the page.',
    takeaway: 'Do not use a carousel as a dumping ground for extra content you could not fit elsewhere.',
  },
];

const faqItems = [
  {
    question: 'What is an accordion in web design?',
    answer:
      'An accordion is an expandable content pattern that reveals deeper information on demand. It helps keep long explanations, FAQs, or technical details organized without forcing the whole page to stay fully expanded.',
  },
  {
    question: 'When should I use an accordion instead of plain text sections?',
    answer:
      'Use an accordion when visitors may need supporting depth, but not everyone needs to read every answer. It is especially useful for objections, implementation details, policy notes, onboarding questions, or dense product explanations.',
  },
  {
    question: 'What makes an accordion effective?',
    answer:
      'Strong accordions use clear questions, short direct answers, predictable expand and collapse behavior, and a hierarchy that still scans well when closed. Important purchase-critical information should not be hidden if users must see it to decide.',
  },
];

const componentGuides = [
  {
    name: 'Hero Section',
    status: 'Used Here',
    purpose: 'The hero is the first high-impact viewport that introduces the brand, frames the offer, and points to the primary action.',
    whenToUse: 'Use it when the page needs a strong first impression, a clear value proposition, and one dominant visual or message.',
    anatomy: 'Common parts include an eyebrow, headline, supporting copy, CTA group, and a visual anchor such as imagery, product art, or a motion-led stage.',
    caution: 'Do not overcrowd it with too many badges, stats, cards, or competing CTAs.',
  },
  {
    name: 'Feature Grid',
    status: 'Used Here',
    purpose: 'A feature grid breaks the product story into a small set of digestible value points.',
    whenToUse: 'Use it after the hero when visitors need a quick scan of capabilities, outcomes, or differentiators.',
    anatomy: 'Typical feature cards include a short label, benefit-focused title, concise explanation, and sometimes an icon or number.',
    caution: 'Avoid writing generic marketing filler or making every card say the same thing in different words.',
  },
  {
    name: 'Testimonials',
    status: 'Used Here',
    purpose: 'Testimonials provide social proof by showing how other people or teams benefited from the product.',
    whenToUse: 'Use them when trust, credibility, and reduced purchase anxiety matter to the conversion path.',
    anatomy: 'Strong testimonial modules include a quote, a real-seeming name, a role, and context about why that person is relevant.',
    caution: 'If all quotes sound interchangeable or too polished, the section stops feeling credible.',
  },
  {
    name: 'Pricing Table',
    status: 'Used Here',
    purpose: 'Pricing tables help visitors compare plans, understand value tiers, and make a purchase decision.',
    whenToUse: 'Use them when the offer naturally breaks into packages, subscriptions, or plan-based comparisons.',
    anatomy: 'A good pricing table shows plan names, pricing, included benefits, a visual emphasis on one plan, and a next-step CTA.',
    caution: 'Do not hide key tradeoffs or overload each plan with too many tiny differences.',
  },
  {
    name: 'Call To Action',
    status: 'Used Here',
    purpose: 'A CTA turns interest into movement by giving the visitor a clear next step.',
    whenToUse: 'Use primary CTAs wherever you want users to start, buy, explore, book, or request access.',
    anatomy: 'Great CTA systems include a clear action verb, strong contrast, and logical placement near decision-making moments.',
    caution: 'Too many primary CTAs dilute attention and make the page feel indecisive.',
  },
  {
    name: 'Navigation Bar',
    status: 'Used Here',
    purpose: 'Navigation orients the visitor, reinforces branding, and offers persistent access to important actions.',
    whenToUse: 'Use it on almost every marketing page unless the experience is intentionally immersive or campaign-like.',
    anatomy: 'It usually includes brand identity, navigation links or utilities, and sometimes a secondary or primary CTA.',
    caution: 'Avoid stuffing it with too many destinations in a one-page experience.',
  },
  {
    name: 'Carousel',
    status: 'Used Here',
    purpose: 'A carousel rotates through multiple items in one footprint, usually to show stories, testimonials, work, or product highlights.',
    whenToUse: 'Use it only when multiple items genuinely need equal emphasis and there is a clear interaction model.',
    anatomy: 'Good carousels need visible controls, clear active states, keyboard support, and content that still works without auto-rotation.',
    caution: 'Carousels often hide content, reduce visibility, and create accessibility issues when used as filler.',
  },
  {
    name: 'FAQ / Accordion',
    status: 'Used Here',
    purpose: 'Accordions condense supporting information such as objections, technical details, or policy answers.',
    whenToUse: 'Use them when users need expandable depth without forcing the whole page to become too long.',
    anatomy: 'Each item should have a scannable question, a concise answer, and a predictable expand/collapse interaction.',
    caution: 'Do not hide critical purchase information inside collapsed content if users need it to decide.',
  },
];

const plans = [
  {
    tier: 'Starter',
    price: '$19',
    description: 'For solo makers exploring visual directions.',
    perks: ['3 live themes', 'Hero and feature blocks', 'Prompt-ready CSS notes'],
  },
  {
    tier: 'Studio',
    price: '$59',
    description: 'For teams shaping design systems and pitch-ready prototypes.',
    perks: ['All themes', 'Pricing and testimonial modules', 'Exportable brand blueprint'],
    featured: true,
  },
  {
    tier: 'Enterprise',
    price: '$149',
    description: 'For internal enablement, workshops, and design education.',
    perks: ['Unlimited seats', 'Custom motion tuning', 'Design playbook sessions'],
  },
];

function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

function formatRgbToken(token) {
  return `rgb(${token.split(' ').join(', ')})`;
}

function getMotionGuideline(themeId) {
  switch (themeId) {
    case 'glass':
      return 'Animate with spring easing, blur-to-focus reveals, and slight floating motion on key hero objects.';
    case 'brutal':
      return 'Use stepped movement, abrupt offsets, and intentional impact instead of soft interpolation.';
    case 'cyber':
      return 'Use clipped reveals, lateral scan-like transitions, and selective neon glows on emphasis moments.';
    case 'editorial':
      return 'Use slow upward fades and refined, almost print-like pacing with no bouncy easing.';
    case 'organic':
      return 'Use soft spring motion, subtle drift, and gentle settling behavior that feels natural and calm.';
    case 'midnight':
      return 'Use cinematic easing, long fades, and low-amplitude parallax or zoom for atmosphere.';
    case 'luxe':
      return 'Use slow, polished transitions with restrained hover lifts and no flashy movement.';
    case 'blueprint':
      return 'Use precise, linear-feeling movement with short travel distances and disciplined timing.';
    default:
      return 'Use subtle fades, light vertical movement, and low-drama timing that never competes with content.';
  }
}

function buildThemePrompt(theme) {
  const guide = themeGuideContent[theme.id];

  return [
    `Design a single-page landing page for Nexus Corp in the ${theme.name} style.`,
    guide.thesis,
    `Layout direction: ${guide.layout}`,
    `Typography direction: ${theme.blueprint.typography}`,
    `Spacing direction: ${theme.blueprint.spacing}`,
    `Component direction: ${guide.components}`,
    `Motion direction: ${guide.motion}`,
    `Use background ${formatRgbToken(theme.vars['--bg'])}, surface ${formatRgbToken(theme.vars['--panel'])}, primary accent ${formatRgbToken(theme.vars['--accent'])}, and secondary accent ${formatRgbToken(theme.vars['--accent-2'])}.`,
    'Keep the page structure to a hero, features grid, testimonials, pricing, and a final CTA while preserving a premium editorial composition.',
    `Avoid: ${guide.avoid.join(', ')}.`,
  ].join(' ');
}

function getReveal(themeId, delay = 0) {
  const base = {
    viewport: { once: true, amount: 0.12 },
  };

  switch (themeId) {
    case 'glass':
      return {
        ...base,
        initial: { opacity: 0, y: 36, scale: 0.97, filter: 'blur(10px)' },
        whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        transition: { duration: 0.8, delay, type: 'spring', stiffness: 90, damping: 18 },
      };
    case 'brutal':
      return {
        ...base,
        initial: { opacity: 0, x: -48, y: 22, rotate: -2 },
        whileInView: { opacity: 1, x: [0, 10, -4, 0], y: [0, -8, 2, 0], rotate: [0, 1, -1, 0] },
        transition: { duration: 0.72, delay, times: [0, 0.45, 0.7, 1] },
      };
    case 'cyber':
      return {
        ...base,
        initial: { opacity: 0, x: -24, clipPath: 'inset(0 100% 0 0)' },
        whileInView: { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' },
        transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
      };
    case 'editorial':
      return {
        ...base,
        initial: { opacity: 0, y: 52 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] },
      };
    case 'organic':
      return {
        ...base,
        initial: { opacity: 0, y: 28, scale: 0.95, rotate: -1.4 },
        whileInView: { opacity: 1, y: 0, scale: 1, rotate: 0 },
        transition: { duration: 0.82, delay, type: 'spring', stiffness: 88, damping: 16 },
      };
    case 'midnight':
      return {
        ...base,
        initial: { opacity: 0, y: 42, scale: 0.98 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.88, delay, ease: [0.19, 1, 0.22, 1] },
      };
    case 'luxe':
      return {
        ...base,
        initial: { opacity: 0, y: 32, scale: 1.03, filter: 'blur(6px)' },
        whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        transition: { duration: 0.92, delay, ease: [0.19, 1, 0.22, 1] },
      };
    case 'blueprint':
      return {
        ...base,
        initial: { opacity: 0, x: 18, y: 14 },
        whileInView: { opacity: 1, x: 0, y: 0 },
        transition: { duration: 0.62, delay, ease: [0.25, 0.8, 0.25, 1] },
      };
    default:
      return {
        ...base,
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
      };
  }
}

function getCarouselMotion(themeId) {
  switch (themeId) {
    case 'glass':
      return {
        variants: {
          enter: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 96 : -96,
            scale: 0.985,
            filter: 'blur(10px)',
          }),
          center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
          exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -96 : 96,
            scale: 0.985,
            filter: 'blur(10px)',
          }),
        },
        transition: { duration: 0.68, type: 'spring', stiffness: 112, damping: 20 },
      };
    case 'brutal':
      return {
        variants: {
          enter: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 104 : -104,
            y: 10,
            rotate: direction > 0 ? 1.8 : -1.8,
          }),
          center: { opacity: 1, x: 0, y: 0, rotate: 0 },
          exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -104 : 104,
            y: -8,
            rotate: direction > 0 ? -1.2 : 1.2,
          }),
        },
        transition: { duration: 0.46, ease: [0.2, 0.84, 0.24, 1] },
      };
    case 'cyber':
      return {
        variants: {
          enter: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 110 : -110,
            clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
          }),
          center: { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0)' },
          exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -110 : 110,
            clipPath: direction > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
          }),
        },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };
    case 'editorial':
      return {
        variants: {
          enter: (direction) => ({ opacity: 0, x: direction > 0 ? 84 : -84, y: 16 }),
          center: { opacity: 1, x: 0, y: 0 },
          exit: (direction) => ({ opacity: 0, x: direction > 0 ? -84 : 84, y: -8 }),
        },
        transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
      };
    case 'organic':
      return {
        variants: {
          enter: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 86 : -86,
            scale: 0.985,
            rotate: direction > 0 ? 0.8 : -0.8,
          }),
          center: { opacity: 1, x: 0, scale: 1, rotate: 0 },
          exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -86 : 86,
            scale: 0.985,
            rotate: direction > 0 ? -0.5 : 0.5,
          }),
        },
        transition: { duration: 0.64, type: 'spring', stiffness: 104, damping: 18 },
      };
    case 'midnight':
      return {
        variants: {
          enter: (direction) => ({ opacity: 0, x: direction > 0 ? 90 : -90, scale: 0.99 }),
          center: { opacity: 1, x: 0, scale: 1 },
          exit: (direction) => ({ opacity: 0, x: direction > 0 ? -90 : 90, scale: 0.99 }),
        },
        transition: { duration: 0.78, ease: [0.19, 1, 0.22, 1] },
      };
    case 'luxe':
      return {
        variants: {
          enter: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 86 : -86,
            scale: 1.015,
            filter: 'blur(4px)',
          }),
          center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
          exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -86 : 86,
            scale: 0.99,
            filter: 'blur(4px)',
          }),
        },
        transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
      };
    case 'blueprint':
      return {
        variants: {
          enter: (direction) => ({ opacity: 0, x: direction > 0 ? 76 : -76, y: 8 }),
          center: { opacity: 1, x: 0, y: 0 },
          exit: (direction) => ({ opacity: 0, x: direction > 0 ? -76 : 76, y: -8 }),
        },
        transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] },
      };
    default:
      return {
        variants: {
          enter: (direction) => ({ opacity: 0, x: direction > 0 ? 72 : -72 }),
          center: { opacity: 1, x: 0 },
          exit: (direction) => ({ opacity: 0, x: direction > 0 ? -72 : 72 }),
        },
        transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
      };
  }
}

function getHover(themeId) {
  switch (themeId) {
    case 'brutal':
      return { x: -6, y: -6 };
    case 'cyber':
      return { y: -4, scale: 1.015 };
    case 'glass':
      return { y: -6, scale: 1.015 };
    case 'organic':
      return { y: -5, rotate: 0.4 };
    case 'blueprint':
      return { y: -4, x: 2 };
    case 'luxe':
      return { y: -6, scale: 1.018 };
    default:
      return { y: -3 };
  }
}

function StyleSwitcherDrawer({ activeTheme, isOpen, onChange, onClose }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close style drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="drawer-backdrop"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '100%', opacity: 0.85 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', stiffness: 230, damping: 24 }}
            className="drawer-shell"
            aria-label="Design switcher drawer"
          >
            <div className="theme-panel drawer-panel switcher-control-face h-full p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                    Style Switcher
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight">Design Languages</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[rgb(var(--muted))]">
                    Switch the visual system without sacrificing readability. This drawer uses a
                    consistent utility type system so the controls stay clean across every theme.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-[rgb(var(--border)/0.16)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                    {themes.length} modes
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="drawer-close"
                    aria-label="Hide design switcher"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-6 flex-1 space-y-3 overflow-y-auto pr-1">
                {themes.map((theme) => {
                  const isActive = theme.id === activeTheme.id;

                  return (
                    <motion.button
                      key={theme.id}
                      type="button"
                      layout
                      onClick={() => onChange(theme.id)}
                      whileTap={{ scale: 0.99 }}
                      className={classNames('theme-toggle theme-toggle-drawer', isActive && 'theme-toggle-active')}
                    >
                      <div
                        className="theme-swatch"
                        style={{
                          background: `linear-gradient(135deg, rgb(${theme.vars['--accent']}) 0%, rgb(${theme.vars['--accent-2']}) 100%)`,
                        }}
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-semibold leading-5">{theme.name}</span>
                          {isActive ? (
                            <motion.span
                              layoutId="active-style"
                              className="rounded-full border border-[rgb(var(--border)/0.18)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--muted))]"
                            >
                              Live
                            </motion.span>
                          ) : null}
                        </div>
                        <p className="text-xs leading-5 text-[rgb(var(--muted))]">{theme.tone}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function BlueprintDrawer({ theme, isOpen, onClose }) {
  const guide = themeGuideContent[theme.id];
  const prompt = buildThemePrompt(theme);
  const palette = [
    ['Background', formatRgbToken(theme.vars['--bg'])],
    ['Surface', formatRgbToken(theme.vars['--panel'])],
    ['Accent', formatRgbToken(theme.vars['--accent'])],
    ['Accent 2', formatRgbToken(theme.vars['--accent-2'])],
  ];

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close blueprint drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="drawer-backdrop"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '100%', opacity: 0.85 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', stiffness: 230, damping: 24 }}
            className="drawer-shell blueprint-drawer-shell"
            aria-label="Design blueprint drawer"
          >
            <div className="theme-panel drawer-panel h-full overflow-hidden p-0">
              <div className="border-b border-[rgb(var(--border)/0.12)] px-5 py-5 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-md">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                      Design Blueprint
                    </p>
                    <h3 className="display-face mt-3 text-3xl font-semibold leading-tight">
                      Recreate {theme.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{guide.thesis}</p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="drawer-close"
                    aria-label="Hide design blueprint"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <section className="space-y-3">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                    Prompt Guideline
                  </p>
                  <div className="rounded-[calc(var(--card-radius)/1.5)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel-soft)/0.42)] p-4 text-sm leading-7 text-[rgb(var(--text))]">
                    {prompt}
                  </div>
                </section>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      Layout Direction
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[rgb(var(--text))]">{guide.layout}</p>
                  </div>
                  <div className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      Component Logic
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[rgb(var(--text))]">{guide.components}</p>
                  </div>
                  <div className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      Typography
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[rgb(var(--text))]">{theme.blueprint.typography}</p>
                  </div>
                  <div className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      Spacing Rhythm
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[rgb(var(--text))]">{theme.blueprint.spacing}</p>
                  </div>
                </div>

                <section className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    Motion And Interaction
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[rgb(var(--text))]">
                    {getMotionGuideline(theme.id)}
                  </p>
                </section>

                <section className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    Palette Tokens
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {palette.map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-[calc(var(--card-radius)/2)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel-soft)/0.35)] p-3"
                      >
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                          {label}
                        </p>
                        <p className="mt-2 text-sm text-[rgb(var(--text))]">{value}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    CSS Building Blocks
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {theme.blueprint.css.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[rgb(var(--border)/0.14)] px-3 py-1 text-xs leading-5 text-[rgb(var(--text))]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.4)] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    Avoid These Mistakes
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {guide.avoid.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel-soft)/0.35)] px-3 py-1 text-xs leading-5 text-[rgb(var(--text))]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function HeroStage({ theme }) {
  return (
    <motion.div
      {...getReveal(theme.id, 0.18)}
      className="hero-stage relative min-h-[360px] overflow-hidden rounded-[calc(var(--card-radius)+8px)] border border-[rgb(var(--border)/0.14)] p-6 sm:min-h-[500px] sm:p-8"
    >
      <div className="hero-stage-glow" />
      <div className="hero-stage-grid" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
            <span>{theme.name}</span>
            <span className="h-px w-10 bg-[rgb(var(--border)/0.22)]" />
            <span>{theme.stageLabel}</span>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-7 text-[rgb(var(--muted))]">
              The same Nexus Corp story, re-composed through a different design philosophy.
            </p>
          </div>
        </div>

        <motion.div
          animate={
            theme.id === 'brutal'
              ? { rotate: [0, -2, 1, 0], scale: [1, 1.02, 1] }
              : theme.id === 'cyber'
                ? { rotate: [0, 1, 0], y: [0, -8, 0] }
                : theme.id === 'glass'
                  ? { y: [0, -10, 0], rotate: [0, 2, 0] }
                  : { y: [0, -6, 0] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-[rgb(var(--border)/0.16)] bg-[radial-gradient(circle_at_30%_30%,rgb(var(--accent)/0.38),transparent_32%),radial-gradient(circle_at_68%_38%,rgb(var(--accent-2)/0.4),transparent_28%),rgb(var(--panel)/0.52)] shadow-[var(--shadow)] sm:h-64 sm:w-64"
        >
          <div className="flex h-[72%] w-[72%] items-center justify-center rounded-full border border-[rgb(var(--border)/0.18)] bg-[rgb(var(--bg)/0.4)] backdrop-blur-[calc(var(--surface-blur)*0.5)]">
            <div className="text-center">
              <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                Active Mood
              </p>
              <p className="display-face mt-3 px-6 text-3xl font-semibold">{theme.tone}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-3">
          {theme.principles.map((item, index) => (
            <motion.div
              key={item}
              {...getReveal(theme.id, 0.14 + index * 0.05)}
              className="rounded-[calc(var(--card-radius)/1.8)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.42)] px-4 py-3 text-sm text-[rgb(var(--text))] backdrop-blur-[calc(var(--surface-blur)*0.45)]"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CarouselSlideContent({ slide }) {
  return (
    <>
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
        {slide.label}
      </p>
      <h3 className="display-face mt-4 text-3xl font-semibold leading-tight">{slide.title}</h3>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[rgb(var(--muted))]">{slide.body}</p>
      <div className="mt-auto pt-6">
        <div className="rounded-[calc(var(--card-radius)/2)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel-soft)/0.35)] p-4">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
            Key Teaching Point
          </p>
          <p className="mt-2 text-sm leading-7 text-[rgb(var(--text))]">{slide.takeaway}</p>
        </div>
      </div>
    </>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">{eyebrow}</p>
      <h2 className="display-face mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-[rgb(var(--muted))] sm:text-lg">{body}</p>
    </div>
  );
}

function getLayoutProfile(themeId) {
  switch (themeId) {
    case 'minimal':
    case 'azure':
    case 'editorial':
      return 'serene';
    case 'glass':
    case 'organic':
    case 'midnight':
    case 'luxe':
      return 'atmospheric';
    default:
      return 'structured';
  }
}

function getFeatureMetaLabel(index) {
  if (index === 0) {
    return 'System logic';
  }

  if (index === 1) {
    return 'Motion profile';
  }

  return 'Learning layer';
}

function FeaturesSection({ theme, layoutProfile }) {
  if (layoutProfile === 'serene') {
    return (
      <motion.section {...getReveal(theme.id, 0)} className="theme-panel p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <SectionHeading
            eyebrow="Features"
            title="A landing page that teaches the language behind the look."
            body="The content stays commercial and product-focused while the design engine changes typography, spacing, surface treatment, and animation behavior to demonstrate what really defines a style."
          />

          <div className="space-y-5">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                whileHover={getHover(theme.id)}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="border-t border-[rgb(var(--border)/0.12)] pt-5 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                      {feature.number}
                    </p>
                    <h3 className="display-face mt-4 text-3xl font-semibold leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
                    {getFeatureMetaLabel(index)}
                  </p>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[rgb(var(--muted))]">
                  {feature.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  if (layoutProfile === 'atmospheric') {
    return (
      <motion.section {...getReveal(theme.id, 0)} className="theme-panel p-6 sm:p-8">
        <SectionHeading
          eyebrow="Features"
          title="A landing page that teaches the language behind the look."
          body="The content stays commercial and product-focused while the design engine changes typography, spacing, surface treatment, and animation behavior to demonstrate what really defines a style."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
          <motion.article
            whileHover={getHover(theme.id)}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="rounded-[calc(var(--card-radius)/1.6)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.44)] p-6 sm:p-7"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
              {features[0].number}
            </p>
            <h3 className="display-face mt-5 max-w-lg text-4xl font-semibold leading-tight">
              {features[0].title}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[rgb(var(--muted))]">
              {features[0].body}
            </p>
            <p className="mt-8 text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
              {getFeatureMetaLabel(0)}
            </p>
          </motion.article>

          <div className="space-y-4">
            {features.slice(1).map((feature, index) => (
              <motion.article
                key={feature.title}
                whileHover={getHover(theme.id)}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="rounded-[calc(var(--card-radius)/1.8)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel-soft)/0.38)] p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                  {feature.number}
                </p>
                <h3 className="display-face mt-4 text-2xl font-semibold leading-tight">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted))]">{feature.body}</p>
                <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
                  {getFeatureMetaLabel(index + 1)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section {...getReveal(theme.id, 0)} className="theme-panel p-6 sm:p-8">
      <SectionHeading
        eyebrow="Features"
        title="A landing page that teaches the language behind the look."
        body="The content stays commercial and product-focused while the design engine changes typography, spacing, surface treatment, and animation behavior to demonstrate what really defines a style."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            whileHover={getHover(theme.id)}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className={classNames(
              'feature-slab rounded-[calc(var(--card-radius)/1.8)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.45)] p-5',
              index === 0 ? 'md:translate-y-6' : index === 2 ? 'md:-translate-y-4' : '',
            )}
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
              {feature.number}
            </p>
            <h3 className="display-face mt-5 text-2xl font-semibold leading-tight">
              {feature.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted))]">{feature.body}</p>
            <div className="mt-6 h-px w-full bg-[rgb(var(--border)/0.12)]" />
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
              {getFeatureMetaLabel(index)}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function TestimonialsSection({ theme, layoutProfile }) {
  if (layoutProfile === 'serene') {
    return (
      <motion.section {...getReveal(theme.id, 0.05)} className="theme-panel p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <SectionHeading
            eyebrow="Testimonials"
            title="Proof that the design story still sells."
            body="Each theme keeps the same trust-building structure: concise social proof, clear outcomes, and a product narrative that still feels coherent even when the aesthetic swings dramatically."
          />

          <div className="divide-y divide-[rgb(var(--border)/0.12)]">
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial.name}
                whileHover={getHover(theme.id)}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="py-5 first:pt-0 last:pb-0"
              >
                <p className="display-face text-3xl leading-none text-[rgb(var(--accent))]">"</p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-[rgb(var(--text))]">
                  {testimonial.quote}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[rgb(var(--muted))]">
                  <span className="font-semibold text-[rgb(var(--text))]">{testimonial.name}</span>
                  <span className="h-1 w-1 rounded-full bg-[rgb(var(--accent))]" />
                  <span>{testimonial.role}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  if (layoutProfile === 'atmospheric') {
    return (
      <motion.section {...getReveal(theme.id, 0.05)} className="theme-panel p-6 sm:p-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Proof that the design story still sells."
          body="Each theme keeps the same trust-building structure: concise social proof, clear outcomes, and a product narrative that still feels coherent even when the aesthetic swings dramatically."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.article
            whileHover={getHover(theme.id)}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="rounded-[calc(var(--card-radius)/1.6)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.42)] p-6 sm:p-7"
          >
            <p className="display-face text-4xl leading-none text-[rgb(var(--accent))]">"</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[rgb(var(--text))]">
              {testimonials[0].quote}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-[rgb(var(--muted))]">
              <span className="font-semibold text-[rgb(var(--text))]">{testimonials[0].name}</span>
              <span className="h-1 w-1 rounded-full bg-[rgb(var(--accent))]" />
              <span>{testimonials[0].role}</span>
            </div>
          </motion.article>

          <div className="space-y-4">
            {testimonials.slice(1).map((testimonial) => (
              <motion.article
                key={testimonial.name}
                whileHover={getHover(theme.id)}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="rounded-[calc(var(--card-radius)/1.8)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel-soft)/0.38)] p-5 sm:p-6"
              >
                <p className="text-base leading-8 text-[rgb(var(--text))]">{testimonial.quote}</p>
                <div className="mt-5 text-sm text-[rgb(var(--muted))]">
                  <p className="font-semibold text-[rgb(var(--text))]">{testimonial.name}</p>
                  <p className="mt-1">{testimonial.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section {...getReveal(theme.id, 0.05)} className="theme-panel p-6 sm:p-8">
      <SectionHeading
        eyebrow="Testimonials"
        title="Proof that the design story still sells."
        body="Each theme keeps the same trust-building structure: concise social proof, clear outcomes, and a product narrative that still feels coherent even when the aesthetic swings dramatically."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={testimonial.name}
            whileHover={getHover(theme.id)}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className={classNames(
              'rounded-[calc(var(--card-radius)/1.8)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.42)] p-5 sm:p-6',
              index === 1 ? 'md:translate-y-8' : '',
            )}
          >
            <p className="display-face text-3xl leading-none text-[rgb(var(--accent))]">"</p>
            <p className="mt-4 text-base leading-8 text-[rgb(var(--text))]">{testimonial.quote}</p>
            <div className="mt-6 text-sm text-[rgb(var(--muted))]">
              <p className="font-semibold text-[rgb(var(--text))]">{testimonial.name}</p>
              <p className="mt-1">{testimonial.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function ComponentGuidesSection({ theme, layoutProfile }) {
  if (layoutProfile === 'serene') {
    return (
      <motion.section {...getReveal(theme.id, 0.08)} className="theme-panel p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <SectionHeading
            eyebrow="Component Encyclopedia"
            title="Core web design building blocks, explained in plain language."
            body="This demo now teaches what the common modules actually do. Each pattern is framed as a plain-language system note instead of a generic UI card."
          />

          <div className="space-y-4">
            {componentGuides.map((item) => (
              <motion.article
                key={item.name}
                whileHover={getHover(theme.id)}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="rounded-[calc(var(--card-radius)/1.9)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.4)] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                      Web Pattern
                    </p>
                    <h3 className="display-face mt-3 text-3xl font-semibold leading-tight">
                      {item.name}
                    </h3>
                  </div>
                  <span className="rounded-full border border-[rgb(var(--border)/0.14)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                    {item.status}
                  </span>
                </div>

                <dl className="mt-6 space-y-4 text-sm leading-7 text-[rgb(var(--text))]">
                  <div>
                    <dt className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      Purpose
                    </dt>
                    <dd className="mt-1">{item.purpose}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      When To Use It
                    </dt>
                    <dd className="mt-1">{item.whenToUse}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      Typical Anatomy
                    </dt>
                    <dd className="mt-1">{item.anatomy}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                      Common Mistake
                    </dt>
                    <dd className="mt-1">{item.caution}</dd>
                  </div>
                </dl>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  if (layoutProfile === 'atmospheric') {
    return (
      <motion.section {...getReveal(theme.id, 0.08)} className="theme-panel p-6 sm:p-8">
        <SectionHeading
          eyebrow="Component Encyclopedia"
          title="Core web design building blocks, explained in plain language."
          body="This demo now teaches what the common modules actually do. The layout shifts between a lead teaching note and supporting pattern studies instead of using one repeated card rhythm."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {componentGuides.map((item, index) => (
            <motion.article
              key={item.name}
              whileHover={getHover(theme.id)}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className={classNames(
                'rounded-[calc(var(--card-radius)/1.8)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.45)] p-5 sm:p-6',
                index === 0 ? 'md:col-span-2 md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8' : '',
              )}
            >
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                  Web Pattern
                </p>
                <h3 className="display-face mt-3 text-3xl font-semibold leading-tight">{item.name}</h3>
                <span className="mt-4 inline-flex rounded-full border border-[rgb(var(--border)/0.14)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                  {item.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 text-sm leading-7 text-[rgb(var(--text))] md:mt-0">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    Purpose
                  </p>
                  <p className="mt-1">{item.purpose}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    When To Use It
                  </p>
                  <p className="mt-1">{item.whenToUse}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    Typical Anatomy
                  </p>
                  <p className="mt-1">{item.anatomy}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                    Common Mistake
                  </p>
                  <p className="mt-1">{item.caution}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section {...getReveal(theme.id, 0.08)} className="theme-panel p-6 sm:p-8">
      <SectionHeading
        eyebrow="Component Encyclopedia"
        title="Core web design building blocks, explained in plain language."
        body="This demo now teaches what the common modules actually do. The system view is denser here, with each pattern laid out more like an annotated spec row."
      />

      <div className="mt-10 divide-y divide-[rgb(var(--border)/0.12)]">
        {componentGuides.map((item) => (
          <motion.article
            key={item.name}
            whileHover={getHover(theme.id)}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="grid gap-6 py-5 first:pt-0 last:pb-0 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                Web Pattern
              </p>
              <h3 className="display-face mt-3 text-3xl font-semibold leading-tight">{item.name}</h3>
              <span className="mt-4 inline-flex rounded-full border border-[rgb(var(--border)/0.14)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                {item.status}
              </span>
            </div>

            <div className="space-y-4 text-sm leading-7 text-[rgb(var(--text))]">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                  Purpose
                </p>
                <p className="mt-1">{item.purpose}</p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                  When To Use It
                </p>
                <p className="mt-1">{item.whenToUse}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-7 text-[rgb(var(--text))]">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                  Typical Anatomy
                </p>
                <p className="mt-1">{item.anatomy}</p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                  Common Mistake
                </p>
                <p className="mt-1">{item.caution}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

function App() {
  const [activeThemeId, setActiveThemeId] = useState(themes[0].id);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState(1);
  const [mobileCarouselHeight, setMobileCarouselHeight] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const mobileCarouselMeasureRef = useRef(null);
  const activeTheme = themes.find((theme) => theme.id === activeThemeId) ?? themes[0];
  const layoutProfile = getLayoutProfile(activeTheme.id);
  const openStylesDrawer = () => setActiveDrawer('styles');
  const openBlueprintDrawer = () => setActiveDrawer('blueprint');
  const closeDrawer = () => setActiveDrawer(null);
  const activeSlide = carouselSlides[carouselIndex];
  const carouselMotion = getCarouselMotion(activeTheme.id);

  const updateCarouselIndex = (nextIndex) => {
    if (nextIndex === carouselIndex) {
      return;
    }

    const lastIndex = carouselSlides.length - 1;
    let nextDirection = nextIndex > carouselIndex ? 1 : -1;

    if (carouselIndex === lastIndex && nextIndex === 0) {
      nextDirection = 1;
    } else if (carouselIndex === 0 && nextIndex === lastIndex) {
      nextDirection = -1;
    }

    setCarouselDirection(nextDirection);
    setCarouselIndex(nextIndex);
  };

  const showPreviousSlide = () => {
    updateCarouselIndex((carouselIndex - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const showNextSlide = () => {
    updateCarouselIndex((carouselIndex + 1) % carouselSlides.length);
  };

  useEffect(() => {
    document.title = `Nexus Corp • ${activeTheme.name}`;
    document.documentElement.style.colorScheme = activeTheme.scheme;
    document.body.style.background = `rgb(${activeTheme.vars['--bg']})`;
  }, [activeTheme]);

  useEffect(() => {
    document.body.style.overflow = activeDrawer ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeDrawer]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDrawer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    const measureRoot = mobileCarouselMeasureRef.current;

    if (!measureRoot) {
      return undefined;
    }

    const measure = () => {
      const heights = Array.from(measureRoot.children, (node) =>
        Math.ceil(node.getBoundingClientRect().height),
      );
      const tallest = heights.length ? Math.max(...heights) : 0;
      setMobileCarouselHeight((current) => (current === tallest ? current : tallest));
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);

      return () => {
        window.removeEventListener('resize', measure);
      };
    }

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(measureRoot);
    Array.from(measureRoot.children).forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, [activeThemeId]);

  return (
    <div className="app-shell min-h-screen" data-theme={activeTheme.id} style={activeTheme.vars}>
      <div className="theme-canvas" />
      <StyleSwitcherDrawer
        activeTheme={activeTheme}
        isOpen={activeDrawer === 'styles'}
        onChange={setActiveThemeId}
        onClose={closeDrawer}
      />
      <BlueprintDrawer theme={activeTheme} isOpen={activeDrawer === 'blueprint'} onClose={closeDrawer} />

      <header className="top-nav fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
              Web Design Encyclopedia
            </p>
            <p className="display-face mt-1 text-xl font-semibold">Nexus Corp</p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button type="button" className="drawer-trigger" onClick={openStylesDrawer}>
              Open Styles
            </button>
            <button type="button" className="drawer-trigger" onClick={openBlueprintDrawer}>
              Open Blueprint
            </button>
            <span className="rounded-full border border-[rgb(var(--border)/0.14)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
              React + Tailwind + Motion
            </span>
            <span className="rounded-full border border-[rgb(var(--border)/0.14)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
              {activeTheme.name}
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-14 px-6 pb-16 pt-28 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:pb-20">
          <motion.div {...getReveal(activeTheme.id, 0)} className="max-w-2xl">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[rgb(var(--muted))]">
              An interactive landing page laboratory
            </p>
            <h1 className="display-face mt-6 text-[clamp(3.4rem,8vw,7.25rem)] font-semibold leading-[0.94]">
              Nexus Corp flexes into every era of web design.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[rgb(var(--muted))] sm:text-xl">
              Explore how one product story transforms across minimal, glass, brutalist, cyber,
              editorial, and more. Switch the active style to rewrite the entire visual system,
              motion language, and teaching notes in real time.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="theme-button"
                onClick={openStylesDrawer}
              >
                Start Styling
              </button>
              <button
                type="button"
                className="theme-button secondary"
                onClick={openBlueprintDrawer}
              >
                View Blueprint
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ['09', 'Aesthetic systems'],
                ['04', 'Core landing-page sections'],
                ['02', 'Overlay drawers'],
              ].map(([value, label], index) => (
                <motion.div
                  key={label}
                  {...getReveal(activeTheme.id, 0.08 + index * 0.04)}
                  className="rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.12)] bg-[rgb(var(--panel)/0.45)] p-4 backdrop-blur-[calc(var(--surface-blur)*0.5)]"
                >
                  <p className="display-face text-3xl font-semibold">{value}</p>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))]">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <HeroStage theme={activeTheme} />

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              className="theme-panel switcher-control-face flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              onClick={openStylesDrawer}
            >
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                  Hidden Drawer
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight">Open The Design Switcher</h3>
                <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">
                  Browse all {themes.length} styles inside a dedicated side panel with stable control
                  typography and clearer spacing.
                </p>
              </div>
              <span className="drawer-trigger shrink-0">Browse Styles</span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              className="theme-panel flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              onClick={openBlueprintDrawer}
            >
              <div className="max-w-lg">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                  Blueprint Drawer
                </p>
                <h3 className="display-face mt-3 text-2xl font-semibold leading-tight">
                  Open The Theme Recreation Guide
                </h3>
                <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">
                  Keep the landing page focused on storytelling, then open a separate overlay for a
                  detailed prompt, token palette, motion notes, and do-not-do rules for the active
                  theme.
                </p>
              </div>
              <span className="drawer-trigger shrink-0">View Guide</span>
            </motion.button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="space-y-10">
              <FeaturesSection theme={activeTheme} layoutProfile={layoutProfile} />

              <TestimonialsSection theme={activeTheme} layoutProfile={layoutProfile} />

              <motion.section {...getReveal(activeTheme.id, 0.07)} className="theme-panel p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Carousel"
                  title="A carousel is useful when multiple moments need one shared stage."
                  body="This live example demonstrates a carousel as a rotating teaching module. It shows how one frame changes at a time, why controls matter, and what kind of content belongs in a carousel in the first place."
                />

                <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
                  <div
                    className="relative overflow-hidden sm:min-h-[26rem] lg:min-h-[24rem]"
                    style={mobileCarouselHeight ? { minHeight: `${mobileCarouselHeight}px` } : undefined}
                  >
                    <div
                      ref={mobileCarouselMeasureRef}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 -z-10 opacity-0 sm:hidden"
                    >
                      {carouselSlides.map((slide) => (
                        <div
                          key={slide.label}
                          className="mb-6 flex flex-col rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.45)] p-6 last:mb-0"
                        >
                          <CarouselSlideContent slide={slide} />
                        </div>
                      ))}
                    </div>

                    <AnimatePresence initial={false} custom={carouselDirection}>
                      <motion.article
                        key={activeSlide.title}
                        custom={carouselDirection}
                        variants={carouselMotion.variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={carouselMotion.transition}
                        className="absolute inset-0 flex h-full flex-col rounded-[calc(var(--card-radius)/1.7)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.45)] p-6"
                      >
                        <CarouselSlideContent slide={activeSlide} />
                      </motion.article>
                    </AnimatePresence>
                  </div>

                  <div className="self-start space-y-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="theme-button secondary flex-1 justify-center"
                        onClick={showPreviousSlide}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="theme-button flex-1 justify-center"
                        onClick={showNextSlide}
                      >
                        Next
                      </button>
                    </div>

                    <div className="rounded-[calc(var(--card-radius)/1.9)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.4)] p-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                        Slide Navigation
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {carouselSlides.map((slide, index) => (
                          <button
                            key={slide.label}
                            type="button"
                            onClick={() => updateCarouselIndex(index)}
                            className={classNames(
                              'rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em]',
                              index === carouselIndex
                                ? 'border-[rgb(var(--accent)/0.45)] bg-[rgb(var(--panel-soft)/0.55)] text-[rgb(var(--text))]'
                                : 'border-[rgb(var(--border)/0.14)] text-[rgb(var(--muted))]',
                            )}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              <ComponentGuidesSection theme={activeTheme} layoutProfile={layoutProfile} />

              <motion.section {...getReveal(activeTheme.id, 0.09)} className="theme-panel p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Accordion"
                  title="Accordions let you hide depth until someone actually needs it."
                  body="This section shows the FAQ or accordion pattern as a progressive disclosure tool. It keeps the page readable while still making room for detailed answers, objections, or implementation guidance."
                />

                <div className="mt-10 space-y-3">
                  {faqItems.map((item, index) => {
                    const isOpen = openFaqIndex === index;

                    return (
                      <motion.div
                        key={item.question}
                        whileHover={getHover(activeTheme.id)}
                        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                        className="rounded-[calc(var(--card-radius)/1.8)] border border-[rgb(var(--border)/0.14)] bg-[rgb(var(--panel)/0.45)]"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                        >
                          <div>
                            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
                              FAQ {String(index + 1).padStart(2, '0')}
                            </p>
                            <h3 className="display-face mt-3 text-2xl font-semibold leading-tight">
                              {item.question}
                            </h3>
                          </div>
                          <span className="rounded-full border border-[rgb(var(--border)/0.14)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                            {isOpen ? 'Open' : 'Closed'}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-[rgb(var(--border)/0.12)] px-5 py-5 sm:px-6">
                                <p className="text-sm leading-7 text-[rgb(var(--muted))]">
                                  {item.answer}
                                </p>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>

              <motion.section
                {...getReveal(activeTheme.id, 0.1)}
                className="theme-panel p-6 sm:p-8"
              >
                <SectionHeading
                  eyebrow="Pricing"
                  title="Commercial structure that survives any aesthetic."
                  body="The plans remain legible and conversion-focused under every theme. What changes is how each visual system frames value, urgency, and hierarchy."
                />

                <div className="mt-10 grid gap-4 xl:grid-cols-3">
                  {plans.map((plan) => (
                    <motion.article
                      key={plan.tier}
                      whileHover={getHover(activeTheme.id)}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      className={classNames(
                        'relative rounded-[calc(var(--card-radius)/1.8)] border bg-[rgb(var(--panel)/0.5)] p-5 sm:p-6',
                        plan.featured
                          ? 'border-[rgb(var(--accent)/0.5)] shadow-[0_0_0_1px_rgb(var(--accent)/0.28)]'
                          : 'border-[rgb(var(--border)/0.14)]',
                      )}
                    >
                      {plan.featured ? (
                        <div className="absolute right-4 top-4 rounded-full bg-[rgb(var(--accent))] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--button-text))]">
                          Recommended
                        </div>
                      ) : null}
                      <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
                        {plan.tier}
                      </p>
                      <div className="mt-5 flex items-end gap-2">
                        <span className="display-face text-5xl font-semibold">{plan.price}</span>
                        <span className="pb-1 text-sm text-[rgb(var(--muted))]">/ month</span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted))]">
                        {plan.description}
                      </p>
                      <div className="mt-6 space-y-3 text-sm text-[rgb(var(--text))]">
                        {plan.perks.map((perk) => (
                          <div key={perk} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
                            <span className="leading-6">{perk}</span>
                          </div>
                        ))}
                      </div>
                      <button type="button" className="theme-button mt-8 w-full justify-center">
                        Choose {plan.tier}
                      </button>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                {...getReveal(activeTheme.id, 0.14)}
                className="theme-panel overflow-hidden p-6 sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                      Final CTA
                    </p>
                    <h2 className="display-face mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                      Make the design rationale as tangible as the design itself.
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[rgb(var(--muted))] sm:text-lg">
                      Nexus Corp turns style references into a living interface. Switch a theme,
                      inspect the blueprint, and teach the visual logic without losing product
                      clarity.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="theme-button"
                      onClick={openStylesDrawer}
                    >
                      Launch Demo
                    </button>
                    <button
                      type="button"
                      className="theme-button secondary"
                      onClick={openBlueprintDrawer}
                    >
                      View Blueprint
                    </button>
                  </div>
                </div>
              </motion.section>
          </div>
        </section>
      </main>

      <div className="floating-drawer-stack">
        <button type="button" className="floating-drawer-trigger" onClick={openStylesDrawer}>
          Styles
        </button>
        <button type="button" className="floating-drawer-trigger" onClick={openBlueprintDrawer}>
          Guide
        </button>
      </div>
    </div>
  );
}

export default App;
