# Outside The Box — Event Landing Page

A bilingual (English / Bulgarian) landing page and registration site for **"Outside The Box"**, a one-day personal-development event held at Toplocentrala, Sofia. I designed, built and deployed it for a real client, from the first commit to production on a self-managed Linux server.

> The site ran in production at `otb-events.com` for the event (December 2025) and has since been taken offline.

---

## Highlights

- **Custom Express server around Next.js**: a `/healthz` endpoint for uptime checks, proxy-aware config for running behind Nginx, and graceful shutdown on `SIGINT`/`SIGTERM`.
- **Registration flow with email notifications**: a form posts to a Next.js API route, which validates the input and sends a templated email through **Resend** using **React Email**.
- **Validation on both client and server**: name, email and phone (international formats) are checked in the browser and again on the server, with typed DTOs and clear error messages.
- **Bilingual UI (EN / BG)**: all copy lives in one typed translation dictionary, and a language toggle switches it instantly without a page reload.
- **GDPR-minded**: a privacy policy and terms-and-conditions modal (in both languages), plus separate opt-in checkboxes for terms and for marketing consent.
- **Mobile-first, responsive design** with Tailwind CSS v4: a slide-in sidebar navigation, smooth-scroll section anchors and a gradient hero.
- **Performance work**: a custom Sharp script that pre-compresses images, AVIF/WebP output through `next/image`, gzip compression and the `X-Powered-By` header disabled.
- **Production deployment** with **PM2** (auto-restart, restart backoff, timestamped log files) behind an Nginx reverse proxy.

## Tech Stack

| Area        | Tools                                                  |
| ----------- | ------------------------------------------------------ |
| Framework   | Next.js 16 (App Router), React 19, TypeScript          |
| Styling     | Tailwind CSS v4, Heroicons, React Icons                |
| Backend     | Next.js Route Handlers, Express 4 (custom server)      |
| Email       | Resend, React Email                                    |
| Tooling     | ESLint 9, Prettier, Sharp                              |
| Deployment  | PM2, Nginx, Linux VPS                                  |

## Page Sections

Hero → About the Event → What You'll Experience → Schedule → Your Hosts → Event Details (with an embedded map) → Registration Form → Footer with social links.

## Project Structure

```
app/
  api/email/route.ts      # POST /api/email — validates the registration and sends the email via Resend
  components/
    email-template.tsx    # React Email template for the registration notification
    PrivacyPopup.tsx      # Bilingual privacy policy / terms modal
    sidebar.tsx           # Mobile navigation drawer with language toggle
  translations.ts         # Typed EN/BG copy dictionary
  page.tsx                # Landing page
  layout.tsx              # Root layout and metadata
lib/api/email.request.ts  # Client-side API wrapper with input validation
types/                    # Shared DTOs and HTTP status code enums
scripts/                  # Image optimization script (Sharp)
server.js                 # Custom Express server (health check, graceful shutdown)
ecosystem.config.js       # PM2 process configuration
```

## Getting Started

**Prerequisites:** Node.js 20+ and a [Resend](https://resend.com) API key (only needed for sending emails).

```bash
git clone https://github.com/MaximVanchev/OutsideTheBox.git
cd OutsideTheBox
npm install
```

Create a `.env` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key
```

Run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| `npm run dev`             | Start the Next.js dev server                  |
| `npm run build`           | Build for production                          |
| `npm start`               | Start the custom Express + Next.js server     |
| `npm run lint`            | Lint with ESLint                              |
| `npm run format`          | Format with Prettier                          |
| `npm run optimize-images` | Compress images in `public/` into `public/optimized/` |

## Deployment

The app runs on a Linux server under PM2, behind Nginx:

```bash
npm ci
npm run build
pm2 start ecosystem.config.js --env production
```

Nginx proxies traffic to the Node process on port `3000`. `GET /healthz` returns the service status for monitoring.

## Author

**Maxim Vanchev** — [GitHub](https://github.com/MaximVanchev)
