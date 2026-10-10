# Thao Truong Art Website

The website for Thao Truong Art ("Joyful Art Getaway"), built with React, Vite and MUI and deployed on Vercel as a static site.

There is no backend. The contact section and the enquiry buttons open a pre-filled Gmail draft (with a `mailto:` fallback) addressed to thaotruongart@gmail.com.

## Development

```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
npm run build   # production build in frontend/dist
```

## Structure

- `src/constants.ts`: design palette and fonts, the contact email, Gmail/mailto helpers, and the collection list
- `src/pages/Home.tsx`: the About the Artist sections (slides 1–5 of the design deck)
- `src/pages/Collections.tsx`: Gallery Collections (slide 6); each card links to `/collections/:id`
- `src/pages/Contact.tsx`: contact section with the Gmail draft button
- `public/images/design/`: images from the design deck
