# Mental Model Hub

> Think clearly. Decide better.

A full-stack Next.js app that teaches 12 mental models using a structured WHAT / WHY / HOW framework — with AI-powered analysis, progress tracking, and favorites.

## Features

- **12 mental models** across Psychology, Business, Economics, and Decision Making
- **Structured detail pages** — What, Why, How, Examples, Application, Failure Case, Visual diagram
- **Progress tracker** — marks models as read automatically when you open them; per-category progress bars
- **Favorites** — save models for quick reference
- **AI Explain** — type any situation and Claude analyzes it using relevant mental models
- **Search & filter** by category
- **Dark mode** — follows system preference
- **Fully responsive** — works on mobile and desktop

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Anthropic SDK** (Claude Sonnet for AI Explain)
- **localStorage** for persistence (no database needed)

## Getting Started

### 1. Clone or unzip the project

```bash
cd mental-model-hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set your Anthropic API key

Create a `.env.local` file in the project root:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key at https://console.anthropic.com

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
mental-model-hub/
├── app/
│   ├── page.tsx              # Homepage — search, filter, model grid
│   ├── model/[id]/page.tsx   # Model detail page
│   ├── progress/page.tsx     # Progress tracker
│   ├── saved/page.tsx        # Saved/favorites
│   ├── ai-explain/page.tsx   # AI analysis page
│   ├── api/ai-explain/       # Server-side Anthropic API route
│   └── layout.tsx            # Root layout with fonts
├── components/
│   ├── Navbar.tsx            # Sticky nav with live counts
│   ├── ModelCard.tsx         # Card with read/fav toggles
│   ├── ModelDiagram.tsx      # SVG flow diagram
│   └── ProgressBanner.tsx    # Homepage progress bar
└── lib/
    ├── models.ts             # All 12 models + type definitions
    └── useProgress.ts        # localStorage hook for read/fav state
```

## Deployment

### Vercel (recommended — zero config)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add `ANTHROPIC_API_KEY` in Environment Variables
4. Deploy

### Other platforms

```bash
npm run build
npm start
```

Set `ANTHROPIC_API_KEY` as an environment variable on your host.

## Adding More Models

Edit `lib/models.ts` — add a new entry to the `MODELS` array following the existing shape. The rest of the app picks it up automatically.

## License

MIT
