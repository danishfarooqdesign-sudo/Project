# Vonza Live – landing page

React + Vite build of the Figma "Experts" page (node 899:2872), animated with framer-motion.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

Dev aid: `http://localhost:5173/?static` turns animations off so every section renders in its final state.

## Structure

```
src/
  main.jsx                 entry (MotionConfig respects "reduce motion")
  App.jsx                  section order + scroll progress bar
  styles/global.css        tokens (colors, font), buttons, shared text styles
  components/
    motion.jsx             Reveal / Stagger helpers (scroll-triggered fades)
    ScaleBox.jsx           scales fixed-size mockups down on small screens
    Header, Hero, FeaturesTabs, HowItWorks, RoomControls,
    PersonalRoom, StreamsDashboard, Recordings, Faq, Footer  (+ .css each)
public/assets/<section>/   images and icons exported from Figma
```

## Notes

- **Font:** the design uses Haffer (commercial). Inter is used as the fallback; see the comment at the top of `global.css` to self-host Haffer.
- **Placeholder copy:** the Figma file only has content for the "Schedule" tab and the first FAQ answer. Other tab texts (`FeaturesTabs.jsx`) and FAQ answers (`Faq.jsx`) are drafts to replace.
- **Streams dashboard animation** follows the Figma prototype timeline; it plays once when scrolled into view instead of looping.
