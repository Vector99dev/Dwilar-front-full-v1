# 🧭 Dwilar Voice Real Estate Agent – Frontend [Project ID: P-12335]

A modern, responsive Next.js web interface for the AI-powered Dwilar voice real estate agent — enabling real-time voice calls, bilingual property browsing, and seamless lead capture.

---

## 📚 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#%EF%B8%8F-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Screenshots](#-screenshots)
- [API Documentation](#-api-documentation)
- [Contact](#-contact)
- [Acknowledgements](#-acknowledgements)

---

## 🧩 About

This is the **frontend companion** to the [Dwilar Voice Real Estate Agent backend](https://github.com/yourusername/dwilar-voice-agent-v1). While the backend handles AI conversation, property search, and voice processing, this Next.js application provides the user-facing interface where users can:

- Start a real-time voice call with the AI agent
- Switch between English and Japanese
- Browse, select, and inspect property listings pushed by the agent
- Submit contact information through integrated forms

The two projects communicate in real time via **LiveKit RPC methods**, keeping the UI perfectly synchronized with the voice conversation state.

---

## ✨ Features

- **One-Click Voice Calls** – Connect to the AI agent instantly with microphone audio via LiveKit
- **Bilingual Interface (EN/JA)** – Language selector that syncs with the backend agent's spoken language
- **Live Property Cards** – Responsive grid of property cards populated in real time from the agent's search results
- **Detailed Property Modal** – Full-screen modal with image gallery (navigation arrows), floor plans, virtual tours, and comprehensive property specs
- **Integrated Contact Forms** – Modal-based email & phone capture triggered by the AI agent, with submission confirmation
- **Real-time RPC Sync** – Frontend registers LiveKit RPC handlers to receive data and UI commands from the backend agent
- **Responsive Design** – Mobile-first layout with Tailwind CSS, optimized for all screen sizes

---

## 🧠 Tech Stack

| Category          | Technologies                                                        |
| ----------------- | ------------------------------------------------------------------- |
| **Framework**     | Next.js 15.4.1 (App Router)                                        |
| **Language**      | TypeScript 5                                                        |
| **UI Library**    | React 19.1.0                                                       |
| **Styling**       | Tailwind CSS 4.0, PostCSS                                          |
| **Real-time/RTC** | LiveKit Client SDK, `@livekit/components-react`, `@livekit/components-styles` |
| **Auth/Tokens**   | `livekit-server-sdk` (server-side token generation)                 |
| **Fonts**         | Geist Sans & Geist Mono (via `next/font/google`)                   |
| **Linting**       | ESLint 9 with `eslint-config-next`                                  |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Dwilar-front-full-v1.git

# Navigate to the project directory
cd Dwilar-front-full-v1

# Install dependencies
npm install
# or
yarn install
```

### Prerequisites

- Node.js 18+
- npm or yarn
- A [LiveKit Cloud](https://livekit.io/) account (URL, API key, API secret)
- The [Dwilar backend agent](https://github.com/yourusername/dwilar-voice-agent-v1) running and connected to the same LiveKit project

---

## 🚀 Usage

```bash
# Start the development server
npm run dev
```

Then open your browser and go to:
👉 [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production            |
| `npm run start`   | Start production server         |
| `npm run lint`    | Run ESLint checks               |

### User Flow

1. **Select Language** – Choose English or Japanese from the dropdown
2. **Start Voice Call** – Click "Start Voice Call" to connect to the AI agent
3. **Speak Your Preferences** – Tell the agent your desired location, price, and bedrooms
4. **Browse Results** – Property cards appear in real time as the agent finds matches
5. **View Details** – Click any card to open a full modal with images, floor plans, and specs
6. **Submit Contact Info** – When interested, the agent triggers a contact form for email & phone
7. **End Call** – Click "End Call" to disconnect

---

## 🧾 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

### Remote Image Domains

The `next.config.ts` is pre-configured to allow property images from:
- `img-v2.gtsstatic.net`
- `m.sothebysrealty.com`
- `sothebysrealty.com`

### Project Structure

```
Dwilar-front-full-v1/
├── public/                        # Static assets
├── src/
│   ├── app/
│   │   ├── api/token/
│   │   │   └── route.ts           # LiveKit token generation endpoint
│   │   ├── globals.css            # Global styles & Tailwind imports
│   │   ├── layout.tsx             # Root layout (metadata, fonts)
│   │   └── page.tsx               # Main page (voice controls, property grid, modals)
│   └── components/
│       ├── PropertyCard.tsx       # Property summary card component
│       └── PropertyModal.tsx      # Detailed property modal with image gallery
├── eslint.config.mjs              # ESLint configuration
├── next.config.ts                 # Next.js config (image domains, env vars)
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS / Tailwind processing
└── tsconfig.json                  # TypeScript configuration (strict, path aliases)
```

---

## 🖼 Screenshots

> _Screenshots and demo GIFs of the frontend in action will be added here._

<!-- Example:
![Welcome Screen](docs/welcome.png)
![Property Results](docs/property-results.png)
![Property Modal](docs/property-modal.png)
![Contact Form](docs/contact-form.png)
-->

---

## 📜 API Documentation

### Token Endpoint

| Endpoint             | Method | Description                              |
| -------------------- | ------ | ---------------------------------------- |
| `/api/token`         | `GET`  | Generates a LiveKit access token         |

**Query Parameters:**

| Parameter  | Required | Description                     |
| ---------- | -------- | ------------------------------- |
| `room`     | Yes      | LiveKit room name to join       |
| `username` | Yes      | Identity for the participant    |

**Response:**
```json
{ "token": "<JWT>" }
```

**Granted Permissions:** `roomJoin`, `canPublish`, `canSubscribe`, `canUpdateOwnMetadata`

### LiveKit RPC Methods (Client-side)

The frontend registers these RPC handlers that the backend agent invokes:

| RPC Method            | Direction        | Description                                          |
| --------------------- | ---------------- | ---------------------------------------------------- |
| `initData`            | Agent → Client   | Receives property search results and renders cards    |
| `showContactForm`     | Agent → Client   | Opens the contact form modal with a message           |
| `submitContactInfo`   | Agent → Client   | Confirms submission and hides the contact form        |
| `contactFormSubmitted` | Agent → Client  | Acknowledges frontend-initiated form submission       |
| `getContactInfo`      | Agent → Client   | Retrieves contact info stored in frontend state       |

### Property Interface

```typescript
interface Property {
  title: string;
  imgs: Array<string>;
  videos: string;
  floor_plan: Array<string>;
  virtual_tutor: Array<string>;
  property_id: string;
  price: string;
  property_type: string;
  marketed_by: string;
  status: string;
  county: string;
  total_sqft: string;
  lot_size_unit: string;
  lot_size: string;
  full_bathrooms: string;
  bedrooms: string;
  address: string;
  structure: string;
  year_built: string;
  living_area: string;
  // ... additional detail fields
}
```

---

## 📬 Contact

- **Author:** Dwilar Company
- **GitHub:** [Vector99dev](https://github.com/yourgithub)
- **Email:** challengemode45@gmail.com
- **Website:** [Not deployed](https://dwilar.com)

---

## 🌟 Acknowledgements

- [Next.js](https://nextjs.org/) — React framework for production
- [LiveKit](https://livekit.io/) — Real-time communication infrastructure & React components
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Vercel](https://vercel.com/) — Hosting and deployment platform for Next.js
- [Geist Font](https://vercel.com/font) — Modern typeface by Vercel
- [Dwilar Voice Agent Backend](https://github.com/yourusername/dwilar-voice-agent-v1) — AI backend powering the voice agent